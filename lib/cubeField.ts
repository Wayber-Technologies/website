/**
 * Draws the Wayber mark as a field of small squares on a canvas.
 *
 * - On load, the squares fly in and form the mark.
 * - The squares move away from the pointer.
 * - Every few seconds the mark is scrambled like a 3x3 Rubik's cube: one
 *   third of the mark slides by one third of its width or height, and squares
 *   that leave one edge come back in on the other. The same twists are then
 *   played back in reverse, so the mark ends solved again.
 * - A square that is out of place shows a "sticker" colour. Once it is home
 *   it turns Wayber Blue again.
 *
 * Users with "prefers-reduced-motion" see the finished mark with no animation.
 */

const MARK_PATH =
  "M898.796 173.928L674.342 300.432V112.251L629.271 87.0405L404.817 213.545V25.3641L359.746 0.15332L0.0791016 203.19V494.015L45.6009 519.676L269.604 393.172V580.902L315.126 606.563L539.129 480.059V667.789L584.651 693L943.417 490.863V199.139L898.796 173.928Z";
const MARK_W = 944;
const MARK_H = 693;

const HOME_COLOR = "#1462FF";
const STICKER_COLORS = ["#09182F", "#EFD54D", "#2FC4D6"];
const GRID_COLOR = "#D6DDE7";

const REPEL_RADIUS = 120;
const MOVE_MS = 640;
const BETWEEN_MOVES_MS = 120;
const HOLD_SCRAMBLED_MS = 900;
const HOLD_SOLVED_MS = 3400;
const INTRO_MS = 1000;
const FIRST_SCRAMBLE_MS = 2400;
const MOVES_PER_SCRAMBLE = 7;

type Axis = "row" | "col";
type Twist = { axis: Axis; layer: number; dir: 1 | -1 };

type MarkSquare = {
  homeI: number;
  homeJ: number;
  i: number;
  j: number;
  cubieRow: number;
  cubieCol: number;
  startX: number;
  startY: number;
  delay: number;
  offX: number;
  offY: number;
};

type GridDot = { homeX: number; homeY: number; x: number; y: number };

export type CubeField = {
  pointer: (clientX: number, clientY: number) => void;
  leave: () => void;
  destroy: () => void;
};

const wrap = (a: number, n: number) => ((a % n) + n) % n;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function createCubeField(canvas: HTMLCanvasElement): CubeField {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { pointer() {}, leave() {}, destroy() {} };

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  let width = 0;
  let height = 0;
  let gap = 10;
  let box = { iMin: 0, jMin: 0, cols: 1, rows: 1 };
  let squares: MarkSquare[] = [];
  let dots: GridDot[] = [];
  let pointerPos = { x: -9999, y: -9999 };
  let frame = 0;
  let alive = true;
  let startedAt = 0;

  let activeTwist: { axis: Axis; shift: number; members: Set<MarkSquare>; startedAt: number } | null = null;
  let queue: Twist[] = [];
  let solveQueue: Twist[] = [];
  let state: "solved" | "scrambled" = "solved";
  let nextTwistAt = 0;

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
    const scale = Math.min((height * 0.8) / MARK_H, (width * 0.62) / MARK_W);
    const originX = (width - MARK_W * scale) / 2;
    const originY = (height - MARK_H * scale) / 2;

    gap = width < 700 ? 8 : 10;
    const gridCols = Math.floor(width / gap);
    const gridRows = Math.floor(height / gap);
    let iMin = Infinity, iMax = -1, jMin = Infinity, jMax = -1;
    squares = [];
    dots = [];

    for (let j = 0; j < gridRows; j++) {
      for (let i = 0; i < gridCols; i++) {
        const x = gap / 2 + i * gap;
        const y = gap / 2 + j * gap;
        if (probe.isPointInPath(mark, (x - originX) / scale, (y - originY) / scale)) {
          squares.push({
            homeI: i, homeJ: j, i, j, cubieRow: 0, cubieCol: 0, offX: 0, offY: 0,
            startX: reduceMotion ? x : x + (Math.random() - 0.5) * width * 0.9,
            startY: reduceMotion ? y : y + (Math.random() - 0.5) * height * 1.4,
            delay: reduceMotion ? 0 : Math.random() * 350,
          });
          iMin = Math.min(iMin, i); iMax = Math.max(iMax, i);
          jMin = Math.min(jMin, j); jMax = Math.max(jMax, j);
        } else {
          dots.push({ homeX: x, homeY: y, x, y });
        }
      }
    }

    box = { iMin, jMin, cols: iMax - iMin + 1, rows: jMax - jMin + 1 };
    for (const s of squares) {
      s.cubieRow = Math.min(2, Math.floor(((s.homeJ - jMin) * 3) / box.rows));
      s.cubieCol = Math.min(2, Math.floor(((s.homeI - iMin) * 3) / box.cols));
    }

    startedAt = performance.now();
    activeTwist = null;
    queue = [];
    solveQueue = [];
    state = "solved";
    nextTwistAt = startedAt + FIRST_SCRAMBLE_MS;
    return squares.length > 0;
  }

  function layerOf(s: MarkSquare, axis: Axis) {
    return axis === "row"
      ? Math.min(2, Math.floor(((s.j - box.jMin) * 3) / box.rows))
      : Math.min(2, Math.floor(((s.i - box.iMin) * 3) / box.cols));
  }

  function randomTwists(count: number): Twist[] {
    const twists: Twist[] = [];
    let last: Twist | null = null;
    while (twists.length < count) {
      const t: Twist = {
        axis: Math.random() < 0.5 ? "row" : "col",
        layer: Math.floor(Math.random() * 3),
        dir: Math.random() < 0.5 ? 1 : -1,
      };
      if (last && last.axis === t.axis && last.layer === t.layer) continue;
      twists.push(t);
      last = t;
    }
    return twists;
  }

  function startTwist(t: Twist, now: number) {
    const members = new Set(squares.filter((s) => layerOf(s, t.axis) === t.layer));
    const cells = Math.round((t.axis === "row" ? box.cols : box.rows) / 3);
    activeTwist = { axis: t.axis, shift: t.dir * cells, members, startedAt: now };
  }

  function finishTwist(now: number) {
    if (!activeTwist) return;
    const { axis, shift, members } = activeTwist;
    members.forEach((s) => {
      if (axis === "row") s.i = box.iMin + wrap(s.i + shift - box.iMin, box.cols);
      else s.j = box.jMin + wrap(s.j + shift - box.jMin, box.rows);
    });
    activeTwist = null;
    nextTwistAt = now + (queue.length ? BETWEEN_MOVES_MS : state === "scrambled" ? HOLD_SCRAMBLED_MS : HOLD_SOLVED_MS);
  }

  function schedule(now: number) {
    if (reduceMotion) return;
    if (activeTwist) {
      if (now - activeTwist.startedAt >= MOVE_MS) finishTwist(now);
      return;
    }
    if (now < nextTwistAt) return;

    if (!queue.length) {
      if (state === "solved") {
        const twists = randomTwists(MOVES_PER_SCRAMBLE);
        solveQueue = twists
          .slice()
          .reverse()
          .map((t) => ({ ...t, dir: (t.dir === 1 ? -1 : 1) as 1 | -1 }));
        queue = twists;
        state = "scrambled";
      } else {
        queue = solveQueue;
        solveQueue = [];
        state = "solved";
      }
    }
    const next = queue.shift();
    if (next) startTwist(next, now);
  }

  function draw() {
    frame = 0;
    if (!alive) return;
    const now = performance.now();
    schedule(now);
    let busy = false;
    ctx!.clearRect(0, 0, width, height);

    const grid = new Path2D();
    for (const d of dots) {
      let tx = d.homeX, ty = d.homeY;
      const dx = d.homeX - pointerPos.x, dy = d.homeY - pointerPos.y;
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

    const byColor = new Map<string, Path2D>([[HOME_COLOR, new Path2D()], ...STICKER_COLORS.map((c) => [c, new Path2D()] as [string, Path2D])]);
    const twistProgress = activeTwist ? easeInOutCubic(Math.min(1, (now - activeTwist.startedAt) / MOVE_MS)) : 0;

    for (const s of squares) {
      let i = s.i, j = s.j;
      const twisting = !!activeTwist && activeTwist.members.has(s);
      if (twisting) {
        if (activeTwist!.axis === "row") i = box.iMin + wrap(s.i + activeTwist!.shift * twistProgress - box.iMin, box.cols);
        else j = box.jMin + wrap(s.j + activeTwist!.shift * twistProgress - box.jMin, box.rows);
      }
      const gridX = gap / 2 + i * gap;
      const gridY = gap / 2 + j * gap;

      const intro = Math.max(0, Math.min(1, (now - startedAt - s.delay) / INTRO_MS));
      if (intro < 1) busy = true;
      const e = easeOutCubic(intro);
      const x = s.startX + (gridX - s.startX) * e;
      const y = s.startY + (gridY - s.startY) * e;

      let pushX = 0, pushY = 0;
      const dx = x - pointerPos.x, dy = y - pointerPos.y;
      const dist = Math.hypot(dx, dy);
      if (dist < REPEL_RADIUS && dist > 0.01) {
        const push = (1 - dist / REPEL_RADIUS) * 26;
        pushX = (dx / dist) * push;
        pushY = (dy / dist) * push;
      }
      s.offX += (pushX - s.offX) * 0.15;
      s.offY += (pushY - s.offY) * 0.15;
      if (Math.abs(pushX - s.offX) > 0.2 || Math.abs(pushY - s.offY) > 0.2) busy = true;

      const outOfPlace = twisting || s.i !== s.homeI || s.j !== s.homeJ;
      const color = outOfPlace ? STICKER_COLORS[(s.cubieRow * 3 + s.cubieCol) % STICKER_COLORS.length] : HOME_COLOR;
      byColor.get(color)!.rect(x + s.offX - 1.8, y + s.offY - 1.8, 3.6, 3.6);
    }

    byColor.forEach((path, color) => {
      ctx!.fillStyle = color;
      ctx!.fill(path);
    });

    if (!reduceMotion || busy) requestDraw();
  }

  function requestDraw() {
    if (!frame && alive && squares.length) frame = requestAnimationFrame(draw);
  }

  function start() {
    if (!alive) return;
    if (build()) requestDraw();
    else requestAnimationFrame(start);
  }

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
    pointer(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      pointerPos = { x: clientX - rect.left, y: clientY - rect.top };
      requestDraw();
    },
    leave() {
      pointerPos = { x: -9999, y: -9999 };
      requestDraw();
    },
    destroy() {
      alive = false;
      if (frame) cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
    },
  };
}
