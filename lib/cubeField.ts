/**
 * Draws the Wayber mark as a field of small round dots, as the hero background.
 *
 * - On load, the dots fly in and form the mark (the three-slab icon).
 * - Slow loop: hold the mark, morph into the "wayber" wordmark, hold, morph
 *   back. The same dots and colours are rearranged, sweeping left to right.
 * - Dots move away from the pointer. The pointer is tracked on the canvas's
 *   parent element, so text and buttons on top don't block it.
 * - Nothing is drawn while a shape is holding still. The loop pauses while
 *   the hero is off screen.
 *
 * Users with "prefers-reduced-motion" see the mark with no fly-in and no morph.
 */

// The icon, from public/logoBlackFull.svg (also the brand guide).
const MARK_PATH =
  "M898.796 173.928L674.342 300.432V112.251L629.271 87.0405L404.817 213.545V25.3641L359.746 0.15332L0.0791016 203.19V494.015L45.6009 519.676L269.604 393.172V580.902L315.126 606.563L539.129 480.059V667.789L584.651 693L943.417 490.863V199.139L898.796 173.928Z";
const MARK_BOX = { x: 0, y: 0, w: 944, h: 693 };

// The six letters of the wordmark, from public/logoBlackFull.svg.
const WORDMARK_PATHS = [
  "M240.952 102.519L218.03 25.207H243.066L256.683 72.3219L269.201 25.207H290.854L304.133 72.3219L319.357 25.207H344.393L320.119 102.519H295.421L280.197 59.9722L265.057 102.519H240.952Z",
  "M342.617 64.2025C342.617 38.4035 358.349 23.3471 378.902 23.6008C390.997 23.77 403.938 30.1986 407.405 42.9712V25.1234H432.441V102.436H407.575V84.4188C404.191 96.1764 392.181 103.789 380.255 103.958C358.264 104.297 342.617 86.4489 342.617 64.1179V64.2025ZM406.306 64.0334C406.306 51.6837 397.763 44.24 386.937 43.9017C375.942 43.7325 367.399 51.3453 367.399 64.0334C367.399 75.7909 376.111 83.5729 386.937 83.4037C397.594 83.0654 406.306 75.4526 406.306 64.0334Z",
  "M453.333 105.394C456.716 109.2 464.751 110.3 467.796 104.041L471.433 95.9203L441.492 25.1211H466.527L483.782 76.8037L503.743 25.1211H528.779L488.18 109.031C477.015 132.208 454.348 132.969 439.546 119.689L453.248 105.394H453.333Z",
  "M560.836 84.5017V102.519H535.969V1.86035H561.005V43.0542C564.388 30.2815 577.498 23.8529 589.34 23.6838C609.893 23.3454 625.794 38.4865 625.794 64.2855C625.794 86.5318 609.893 104.38 587.986 104.126C576.061 103.957 564.219 96.3439 560.836 84.5863V84.5017ZM600.843 64.0317C600.843 51.3437 592.469 43.7309 581.474 43.9C570.647 44.2384 561.936 51.5129 561.936 64.0317C561.936 75.4509 570.817 83.0638 581.305 83.4021C592.131 83.5713 600.843 75.7893 600.843 64.0317Z",
  "M633.066 64.0302C633.066 37.047 653.534 23.5977 675.187 23.5977C696.839 23.5977 713.502 37.2161 715.87 59.7163C716.208 62.5922 716.208 66.1449 715.87 69.0208H656.579C658.271 77.987 666.475 83.4852 675.187 83.6544C682.545 83.8235 689.058 80.9476 692.441 75.4494L710.711 84.754C703.69 96.6808 690.581 103.955 675.187 103.955C653.534 103.955 633.066 88.8142 633.066 63.9456V64.0302ZM692.357 55.4869C690.242 48.1279 682.884 43.4756 675.102 43.4756C667.321 43.4756 660.47 48.2124 658.44 55.4869H692.272H692.357Z",
  "M723.312 102.522V25.1249H748.348V43.9031C752.493 26.6474 773.807 19.6267 789.877 28.5083L776.598 48.64C767.463 40.858 749.617 48.4708 749.617 63.8657V102.437H723.397L723.312 102.522Z",
];
const WORDMARK_BOX = { x: 218, y: 1.8, w: 572, h: 130.4 };

// Brand palette, weighted so the mark still reads as Wayber Blue. Light Blue
// (#BFFDFF) disappears on white, so a deeper cyan stands in for it.
const PALETTE: { color: string; weight: number }[] = [
  { color: "#1462FF", weight: 55 }, // Wayber Blue
  { color: "#09182F", weight: 20 }, // Dark Blue
  { color: "#2FC4D6", weight: 13 }, // Light Blue, deepened
  { color: "#EFD54D", weight: 12 }, // Yellow
];
const PALETTE_TOTAL = PALETTE.reduce((sum, p) => sum + p.weight, 0);
const GRID_COLOR = "#E1E6EE";

// From this width up, the hero is two columns and the shape sits in the right one.
const SPLIT_MIN_WIDTH = 900;
// Matches .container in site.module.css.
const CONTAINER_MAX = 1320;

const REPEL_RADIUS = 140;
const INTRO_MS = 1100;
const HOLD_MARK_MS = 5000;
const HOLD_WORD_MS = 4000;
const MORPH_MS = 1700;
// Share of the morph used to stagger dots from left to right.
const SWEEP = 0.35;

type Point = { x: number; y: number };

type Dot = {
  mark: Point;
  word: Point;
  startX: number;
  startY: number;
  introDelay: number;
  /** 0..1 position across the shape, used to stagger the morph. */
  sweep: number;
  /** Small vertical drift mid-morph, so the motion looks fluid. */
  lift: number;
  offX: number;
  offY: number;
  color: number;
};

/** `underMark`: hidden while the mark sits on top of it, faded in while the wordmark shows. */
type GridDot = { homeX: number; homeY: number; x: number; y: number; underMark: boolean };

export type CubeField = { destroy: () => void };

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

// Stable pseudo-random value, so colours and drift are the same on every load.
function noise(a: number, b: number) {
  let h = (a * 374761393 + b * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function pickColor(seed: number) {
  let r = noise(seed, 7) * PALETTE_TOTAL;
  for (let k = 0; k < PALETTE.length; k++) {
    r -= PALETTE[k].weight;
    if (r < 0) return k;
  }
  return 0;
}

/** Points on a regular grid that fall inside `paths`, fitted into the target area. */
function sampleShape(
  paths: Path2D[],
  box: { x: number; y: number; w: number; h: number },
  area: { x: number; y: number; w: number; h: number },
  gap: number
): Point[] {
  const probe = document.createElement("canvas").getContext("2d")!;
  const scale = Math.min(area.w / box.w, area.h / box.h);
  const left = area.x + (area.w - box.w * scale) / 2;
  const top = area.y + (area.h - box.h * scale) / 2;
  const points: Point[] = [];
  for (let y = top + gap / 2; y < top + box.h * scale; y += gap) {
    for (let x = left + gap / 2; x < left + box.w * scale; x += gap) {
      const sx = box.x + (x - left) / scale;
      const sy = box.y + (y - top) / scale;
      if (paths.some((p) => probe.isPointInPath(p, sx, sy))) points.push({ x, y });
    }
  }
  return points;
}

/** Sort left to right, then stretch to `n` points by repeating evenly. Order is kept. */
function toLength(points: Point[], n: number): Point[] {
  const sorted = points.slice().sort((a, b) => a.x - b.x || a.y - b.y);
  if (sorted.length === n) return sorted;
  return Array.from({ length: n }, (_, k) => sorted[Math.floor((k * sorted.length) / n)]);
}

export function createCubeField(canvas: HTMLCanvasElement): CubeField {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { destroy() {} };

  const host = canvas.parentElement ?? canvas;
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const markPath = [new Path2D(MARK_PATH)];
  const wordPaths = WORDMARK_PATHS.map((d) => new Path2D(d));

  let width = 0;
  let height = 0;
  let dotSize = 3.4;
  let dots: Dot[] = [];
  let grid: GridDot[] = [];
  let pointer = { x: -9999, y: -9999 };
  let frame = 0;
  let alive = true;
  let visible = true;
  let startedAt = 0;

  // Shape loop state.
  let showing: "mark" | "word" = "mark";
  let morph: { to: "mark" | "word"; startedAt: number } | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;

  function build(): boolean {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    if (!width || !height) return false;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Two-column hero: the right half of the page container. Narrow screens: the whole canvas.
    const split = width >= SPLIT_MIN_WIDTH;
    const containerW = Math.min(width, CONTAINER_MAX);
    const containerX = (width - containerW) / 2;
    const areaX = split ? containerX + containerW * 0.5 : 0;
    const areaW = split ? containerW * 0.5 : width;
    const narrow = width < 700;
    const gap = narrow ? 7 : 9;
    dotSize = narrow ? 2.8 : 3.4;

    const markArea = {
      x: areaX + areaW * (split ? 0.01 : 0.04),
      y: height * (split ? 0.13 : 0.07),
      w: areaW * (split ? 0.98 : 0.92),
      h: height * (split ? 0.74 : 0.86),
    };
    const wordArea = { x: areaX + areaW * 0.04, y: height * 0.2, w: areaW * 0.92, h: height * 0.6 };

    const markPoints = sampleShape(markPath, MARK_BOX, markArea, gap);
    // The wordmark's strokes are thin, so sample it on a finer grid to keep the letters legible.
    const wordPoints = sampleShape(wordPaths, WORDMARK_BOX, wordArea, gap * 0.62);
    if (!markPoints.length || !wordPoints.length) return false;

    const n = Math.max(markPoints.length, wordPoints.length);
    const marks = toLength(markPoints, n);
    const words = toLength(wordPoints, n);
    const minX = Math.min(marks[0].x, words[0].x);
    const spanX = Math.max(marks[n - 1].x, words[n - 1].x) - minX || 1;

    dots = marks.map((mark, k) => ({
      mark,
      word: words[k],
      startX: reduceMotion ? mark.x : mark.x + (Math.random() - 0.5) * width * 0.9,
      startY: reduceMotion ? mark.y : mark.y + (Math.random() - 0.5) * height * 1.4,
      introDelay: reduceMotion ? 0 : Math.random() * 400,
      sweep: ((mark.x + words[k].x) / 2 - minX) / spanX,
      lift: (noise(k, 13) - 0.5) * 60,
      offX: 0,
      offY: 0,
      color: pickColor(k),
    }));

    // Faint background grid across the whole hero.
    grid = [];
    const probe = document.createElement("canvas").getContext("2d")!;
    const markScale = Math.min(markArea.w / MARK_BOX.w, markArea.h / MARK_BOX.h);
    const markLeft = markArea.x + (markArea.w - MARK_BOX.w * markScale) / 2;
    const markTop = markArea.y + (markArea.h - MARK_BOX.h * markScale) / 2;
    for (let y = gap / 2; y < height; y += gap) {
      for (let x = gap / 2; x < width; x += gap) {
        const underMark = probe.isPointInPath(markPath[0], (x - markLeft) / markScale, (y - markTop) / markScale);
        grid.push({ homeX: x, homeY: y, x, y, underMark });
      }
    }

    startedAt = performance.now();
    showing = "mark";
    morph = null;
    scheduleNext(INTRO_MS + 400 + HOLD_MARK_MS);
    return true;
  }

  function scheduleNext(delay: number) {
    if (timer) clearTimeout(timer);
    timer = null;
    if (reduceMotion || !alive) return;
    timer = setTimeout(() => {
      timer = null;
      if (!visible) return; // resumed by the visibility observer
      morph = { to: showing === "mark" ? "word" : "mark", startedAt: performance.now() };
      requestDraw();
    }, delay);
  }

  /** 0 = mark, 1 = wordmark, in between while morphing. */
  function wordAmount(now: number) {
    if (!morph) return showing === "word" ? 1 : 0;
    const t = easeInOutCubic(clamp01((now - morph.startedAt) / MORPH_MS));
    return morph.to === "word" ? t : 1 - t;
  }

  function draw() {
    frame = 0;
    if (!alive) return;
    const now = performance.now();
    let busy = false;
    ctx!.clearRect(0, 0, width, height);

    const gridOpen = new Path2D();
    const gridUnder = new Path2D();
    for (const g of grid) {
      let tx = g.homeX, ty = g.homeY;
      const dx = g.homeX - pointer.x, dy = g.homeY - pointer.y;
      const dist = Math.hypot(dx, dy);
      if (dist < REPEL_RADIUS && dist > 0.01) {
        const push = (1 - dist / REPEL_RADIUS) * 12;
        tx += (dx / dist) * push;
        ty += (dy / dist) * push;
      }
      g.x += (tx - g.x) * 0.1;
      g.y += (ty - g.y) * 0.1;
      if (Math.abs(tx - g.x) > 0.2 || Math.abs(ty - g.y) > 0.2) busy = true;
      const path = g.underMark ? gridUnder : gridOpen;
      path.moveTo(g.x + 0.8, g.y);
      path.arc(g.x, g.y, 0.8, 0, Math.PI * 2);
    }
    // While the wordmark shows, the grid fades back (so the letters read cleanly)
    // and the dots the mark was covering fade in, so no mark-shaped hole is left.
    const w = wordAmount(now);
    ctx!.fillStyle = GRID_COLOR;
    ctx!.globalAlpha = 1 - w * 0.6;
    ctx!.fill(gridOpen);
    ctx!.globalAlpha = w * 0.4;
    ctx!.fill(gridUnder);
    ctx!.globalAlpha = 1;

    const paths = PALETTE.map(() => new Path2D());
    const radius = dotSize / 2;
    let morphing = false;

    for (const d of dots) {
      // Where this dot sits in the current shape (mid-morph: between the two).
      const current = showing === "mark" ? d.mark : d.word;
      let x = current.x, y = current.y;
      if (morph) {
        const from = morph.to === "word" ? d.mark : d.word;
        const to = morph.to === "word" ? d.word : d.mark;
        const local = clamp01(((now - morph.startedAt) / MORPH_MS - d.sweep * SWEEP) / (1 - SWEEP));
        if (local < 1) morphing = true;
        const e = easeInOutCubic(local);
        x = from.x + (to.x - from.x) * e;
        y = from.y + (to.y - from.y) * e + Math.sin(Math.PI * e) * d.lift;
      }

      const intro = clamp01((now - startedAt - d.introDelay) / INTRO_MS);
      if (intro < 1) busy = true;
      const ei = easeOutCubic(intro);
      x = d.startX + (x - d.startX) * ei;
      y = d.startY + (y - d.startY) * ei;

      let pushX = 0, pushY = 0;
      const dx = x - pointer.x, dy = y - pointer.y;
      const dist = Math.hypot(dx, dy);
      if (dist < REPEL_RADIUS && dist > 0.01) {
        const push = (1 - dist / REPEL_RADIUS) * 24;
        pushX = (dx / dist) * push;
        pushY = (dy / dist) * push;
      }
      d.offX += (pushX - d.offX) * 0.15;
      d.offY += (pushY - d.offY) * 0.15;
      if (Math.abs(pushX - d.offX) > 0.2 || Math.abs(pushY - d.offY) > 0.2) busy = true;

      const cx = x + d.offX, cy = y + d.offY;
      paths[d.color].moveTo(cx + radius, cy);
      paths[d.color].arc(cx, cy, radius, 0, Math.PI * 2);
    }
    PALETTE.forEach((p, k) => {
      ctx!.fillStyle = p.color;
      ctx!.fill(paths[k]);
    });

    if (morph && !morphing) {
      showing = morph.to;
      morph = null;
      scheduleNext(showing === "word" ? HOLD_WORD_MS : HOLD_MARK_MS);
    }
    if (busy || morph) requestDraw();
  }

  function requestDraw() {
    if (!frame && alive && dots.length) frame = requestAnimationFrame(draw);
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

  // Pause the loop off screen; when the hero comes back, continue after a short hold.
  const visibilityObserver =
    typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(([entry]) => {
          const wasVisible = visible;
          visible = entry.isIntersecting;
          if (visible && !wasVisible && !morph && !timer) scheduleNext(1500);
        })
      : null;
  visibilityObserver?.observe(canvas);

  start();

  return {
    destroy() {
      alive = false;
      if (frame) cancelAnimationFrame(frame);
      if (timer) clearTimeout(timer);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
    },
  };
}
