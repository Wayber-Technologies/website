/**
 * Draws the Wayber mark as a field of small squares, as the hero background.
 *
 * - On load, the squares fly in once and form the mark. After that the mark
 *   stays still.
 * - Squares move away from the pointer. The pointer is tracked on the
 *   canvas's parent element, so text and buttons on top don't block it.
 * - Nothing is drawn while idle. Frames only run during the intro or while
 *   squares are moving.
 *
 * Users with "prefers-reduced-motion" see the finished mark with no fly-in.
 */

const MARK_PATH =
  "M898.796 173.928L674.342 300.432V112.251L629.271 87.0405L404.817 213.545V25.3641L359.746 0.15332L0.0791016 203.19V494.015L45.6009 519.676L269.604 393.172V580.902L315.126 606.563L539.129 480.059V667.789L584.651 693L943.417 490.863V199.139L898.796 173.928Z";
const MARK_W = 944;
const MARK_H = 693;

// Kept light so the headline on top stays readable.
const MARK_COLOR = "rgba(20, 98, 255, 0.34)";
const GRID_COLOR = "#E1E6EE";

const REPEL_RADIUS = 140;
const INTRO_MS = 1100;

type MarkSquare = {
  x: number;
  y: number;
  startX: number;
  startY: number;
  delay: number;
  offX: number;
  offY: number;
};

type GridDot = { homeX: number; homeY: number; x: number; y: number };

export type CubeField = { destroy: () => void };

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function createCubeField(canvas: HTMLCanvasElement): CubeField {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { destroy() {} };

  const host = canvas.parentElement ?? canvas;
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  let width = 0;
  let height = 0;
  let squareSize = 4;
  let squares: MarkSquare[] = [];
  let dots: GridDot[] = [];
  let pointer = { x: -9999, y: -9999 };
  let frame = 0;
  let alive = true;
  let startedAt = 0;

  function build(): boolean {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    if (!width || !height) return false;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    const mark = new Path2D(MARK_PATH);
    const probe = document.createElement("canvas").getContext("2d")!;
    const narrow = width < 700;
    const scale = Math.min((height * (narrow ? 0.52 : 0.74)) / MARK_H, (width * (narrow ? 0.92 : 0.78)) / MARK_W);
    const originX = (width - MARK_W * scale) / 2;
    const originY = (height - MARK_H * scale) / 2;

    const gap = narrow ? 8 : 11;
    squareSize = narrow ? 3 : 4;
    squares = [];
    dots = [];

    for (let y = gap / 2; y < height; y += gap) {
      for (let x = gap / 2; x < width; x += gap) {
        if (probe.isPointInPath(mark, (x - originX) / scale, (y - originY) / scale)) {
          squares.push({
            x, y, offX: 0, offY: 0,
            startX: reduceMotion ? x : x + (Math.random() - 0.5) * width * 0.9,
            startY: reduceMotion ? y : y + (Math.random() - 0.5) * height * 1.4,
            delay: reduceMotion ? 0 : Math.random() * 400,
          });
        } else {
          dots.push({ homeX: x, homeY: y, x, y });
        }
      }
    }

    startedAt = performance.now();
    return squares.length > 0;
  }

  function draw() {
    frame = 0;
    if (!alive) return;
    const now = performance.now();
    let busy = false;
    ctx!.clearRect(0, 0, width, height);

    const grid = new Path2D();
    for (const d of dots) {
      let tx = d.homeX, ty = d.homeY;
      const dx = d.homeX - pointer.x, dy = d.homeY - pointer.y;
      const dist = Math.hypot(dx, dy);
      if (dist < REPEL_RADIUS && dist > 0.01) {
        const push = (1 - dist / REPEL_RADIUS) * 14;
        tx += (dx / dist) * push;
        ty += (dy / dist) * push;
      }
      d.x += (tx - d.x) * 0.1;
      d.y += (ty - d.y) * 0.1;
      if (Math.abs(tx - d.x) > 0.2 || Math.abs(ty - d.y) > 0.2) busy = true;
      grid.rect(d.x - 0.8, d.y - 0.8, 1.6, 1.6);
    }
    ctx!.fillStyle = GRID_COLOR;
    ctx!.fill(grid);

    const marks = new Path2D();
    for (const s of squares) {
      const intro = Math.max(0, Math.min(1, (now - startedAt - s.delay) / INTRO_MS));
      if (intro < 1) busy = true;
      const e = easeOutCubic(intro);
      const x = s.startX + (s.x - s.startX) * e;
      const y = s.startY + (s.y - s.startY) * e;

      let pushX = 0, pushY = 0;
      const dx = x - pointer.x, dy = y - pointer.y;
      const dist = Math.hypot(dx, dy);
      if (dist < REPEL_RADIUS && dist > 0.01) {
        const push = (1 - dist / REPEL_RADIUS) * 24;
        pushX = (dx / dist) * push;
        pushY = (dy / dist) * push;
      }
      s.offX += (pushX - s.offX) * 0.15;
      s.offY += (pushY - s.offY) * 0.15;
      if (Math.abs(pushX - s.offX) > 0.2 || Math.abs(pushY - s.offY) > 0.2) busy = true;

      marks.rect(x + s.offX - squareSize / 2, y + s.offY - squareSize / 2, squareSize, squareSize);
    }
    ctx!.fillStyle = MARK_COLOR;
    ctx!.fill(marks);

    if (busy) requestDraw();
  }

  function requestDraw() {
    if (!frame && alive && squares.length) frame = requestAnimationFrame(draw);
  }

  function start() {
    if (!alive) return;
    if (build()) requestDraw();
    else requestAnimationFrame(start);
  }

  const onMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    requestDraw();
  };
  const onLeave = () => {
    pointer = { x: -9999, y: -9999 };
    requestDraw();
  };
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", onLeave);

  let lastWidth = 0;
  const resizeObserver =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(([entry]) => {
          const w = Math.round(entry.contentRect.width);
          if (lastWidth && Math.abs(w - lastWidth) > 40) start();
          lastWidth = w;
        })
      : null;
  resizeObserver?.observe(canvas);

  start();

  return {
    destroy() {
      alive = false;
      if (frame) cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      resizeObserver?.disconnect();
    },
  };
}
