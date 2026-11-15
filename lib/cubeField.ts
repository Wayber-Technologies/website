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

// Brand palette, weighted so the mark still reads as Wayber Blue. Light Blue
// (#BFFDFF) disappears on white, so a deeper cyan stands in for it.
const PALETTE: { color: string; weight: number }[] = [
  { color: "#1462FF", weight: 55 }, // Wayber Blue
  { color: "#09182F", weight: 20 }, // Dark Blue
  { color: "#2FC4D6", weight: 13 }, // Light Blue, deepened
  { color: "#EFD54D", weight: 12 }, // Yellow
];
const PALETTE_TOTAL = PALETTE.reduce((sum, p) => sum + p.weight, 0);

// Stable pseudo-random value per grid cell, so the colour pattern is the same on every load.
function cellNoise(i: number, j: number) {
  let h = (i * 374761393 + j * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function pickColor(i: number, j: number) {
  let r = cellNoise(i, j) * PALETTE_TOTAL;
  for (let k = 0; k < PALETTE.length; k++) {
    r -= PALETTE[k].weight;
    if (r < 0) return k;
  }
  return 0;
}
// From this width up, the hero is two columns and the mark sits in the right one.
const SPLIT_MIN_WIDTH = 900;
// Matches .container in site.module.css.
const CONTAINER_MAX = 1320;
const CONTAINER_PAD = 24;
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
  /** Index into PALETTE. */
  color: number;
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
    // Two-column hero: centre the mark in the right half of the page container.
    // Narrow screens: the canvas sits below the text, so centre it in the canvas.
    const split = width >= SPLIT_MIN_WIDTH;
    const containerW = Math.min(width, CONTAINER_MAX);
    const containerX = (width - containerW) / 2;
    const areaX = split ? containerX + containerW * 0.5 : 0;
    const areaW = split ? containerW * 0.5 : width;
    const scale = Math.min((height * (split ? 0.74 : 0.86)) / MARK_H, (areaW * (split ? 0.98 : 0.92)) / MARK_W);
    const originX = areaX + (areaW - MARK_W * scale) / 2;
    const originY = (height - MARK_H * scale) / 2;

    const narrow = width < 700;
    const gap = narrow ? 7 : 9;
    squareSize = narrow ? 2.8 : 3.4;
    squares = [];
    dots = [];

    for (let y = gap / 2; y < height; y += gap) {
      for (let x = gap / 2; x < width; x += gap) {
        if (probe.isPointInPath(mark, (x - originX) / scale, (y - originY) / scale)) {
          squares.push({
            x, y, offX: 0, offY: 0,
            color: pickColor(Math.round(x / gap), Math.round(y / gap)),
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
        const push = (1 - dist / REPEL_RADIUS) * 12;
        tx += (dx / dist) * push;
        ty += (dy / dist) * push;
      }
      d.x += (tx - d.x) * 0.1;
      d.y += (ty - d.y) * 0.1;
      if (Math.abs(tx - d.x) > 0.2 || Math.abs(ty - d.y) > 0.2) busy = true;
      grid.moveTo(d.x + 0.8, d.y);
      grid.arc(d.x, d.y, 0.8, 0, Math.PI * 2);
    }
    ctx!.fillStyle = GRID_COLOR;
    ctx!.fill(grid);

    const marks = PALETTE.map(() => new Path2D());
    const radius = squareSize / 2;
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

      const cx = x + s.offX, cy = y + s.offY;
      marks[s.color].moveTo(cx + radius, cy);
      marks[s.color].arc(cx, cy, radius, 0, Math.PI * 2);
    }
    PALETTE.forEach((p, k) => {
      ctx!.fillStyle = p.color;
      ctx!.fill(marks[k]);
    });

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
