/**
 * Draws the Wayber mark as a field of small round dots, as the hero background.
 *
 * - On load, the dots fly in and form the mark (the stack of three slabs).
 * - Slow loop, with the same dots rearranging each time:
 *     the stack → 1 cube → 2 cubes → 3 cubes → the stack
 *   The cubes are isometric, at the same angle as the slabs, and step down
 *   to the right like the slabs do, so the layers build up and then become
 *   the stack again.
 * - Dots move away from the pointer. The pointer is tracked on the canvas's
 *   parent element, so text and buttons on top don't block it.
 * - Nothing is drawn while a shape holds still. The loop pauses while the
 *   hero is off screen.
 *
 * Users with "prefers-reduced-motion" see the mark with no fly-in and no morph.
 */

// The icon, from public/logoBlackFull.svg (also the brand guide).
const MARK_PATH =
  "M898.796 173.928L674.342 300.432V112.251L629.271 87.0405L404.817 213.545V25.3641L359.746 0.15332L0.0791016 203.19V494.015L45.6009 519.676L269.604 393.172V580.902L315.126 606.563L539.129 480.059V667.789L584.651 693L943.417 490.863V199.139L898.796 173.928Z";
const MARK_BOX = { w: 944, h: 693 };

// The dots are a single colour: Wayber Blue. (Kept as a list so a mix can come back easily.)
const PALETTE: { color: string; weight: number }[] = [{ color: "#1462FF", weight: 1 }];
const PALETTE_TOTAL = PALETTE.reduce((sum, p) => sum + p.weight, 0);

// From this width up, the hero is two columns and the shape sits in the right one.
const SPLIT_MIN_WIDTH = 900;
// Matches .container in site.module.css.
const CONTAINER_MAX = 1320;

const REPEL_RADIUS = 140;
const INTRO_MS = 1100;
const MORPH_MS = 1400;
// How long each shape holds before morphing on. Index matches SEQUENCE.
const SEQUENCE = ["mark", "cube1", "cube2", "cube3"] as const;
const HOLD_MS: Record<(typeof SEQUENCE)[number], number> = { mark: 5000, cube1: 1300, cube2: 1300, cube3: 1600 };
// Share of the morph used to stagger dots from left to right.
const SWEEP = 0.3;

// Isometric cube: the slabs in the mark slope at about 30°, so the cubes use the same angle.
const COS30 = Math.cos(Math.PI / 6);
// Cube faces have no gaps; they are told apart by shade instead, as if lit from above.
// Opacity per face: top, left, right. The mark itself is drawn at full strength.
const FACE_SHADE = [1, 0.72, 0.45];
const SHADE_STEPS = 20;
// Next cube: one cube-width to the right and a little lower, like the slabs.
const CUBE_STEP_X = 2 * COS30 * 1.08;
const CUBE_STEP_Y = 0.62;

type Shape = (typeof SEQUENCE)[number];
/** `shade`: opacity for this spot (1 on the mark, by face on the cubes). */
type Point = { x: number; y: number; shade: number };
type Area = { x: number; y: number; w: number; h: number };

type Dot = {
  targets: Record<Shape, Point>;
  /** True where another dot already owns the same spot in that shape: drawn only while moving. */
  repeat: Record<Shape, boolean>;
  startX: number;
  startY: number;
  introDelay: number;
  /** 0..1 left-to-right position, used to stagger each morph. */
  sweep: number;
  /** Small vertical drift mid-morph, so the motion looks fluid. */
  lift: number;
  offX: number;
  offY: number;
  color: number;
  /** This frame's position, opacity and visibility, worked out once and then drawn in batches. */
  drawX: number;
  drawY: number;
  drawShade: number;
  hidden: boolean;
};

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

/** Adds the three faces of an isometric cube centred on (cx, cy), with half-height `s`, to `faces` [top, left, right]. */
function addCube(faces: Path2D[], cx: number, cy: number, s: number) {
  const top = { x: cx, y: cy - s };
  const ur = { x: cx + COS30 * s, y: cy - s / 2 };
  const lr = { x: cx + COS30 * s, y: cy + s / 2 };
  const bottom = { x: cx, y: cy + s };
  const ll = { x: cx - COS30 * s, y: cy + s / 2 };
  const ul = { x: cx - COS30 * s, y: cy - s / 2 };
  const centre = { x: cx, y: cy };
  [
    [top, ur, centre, ul],
    [ul, centre, bottom, ll],
    [centre, ur, lr, bottom],
  ].forEach((face, i) => {
    face.forEach((p, k) => (k === 0 ? faces[i].moveTo(p.x, p.y) : faces[i].lineTo(p.x, p.y)));
    faces[i].closePath();
  });
}

/**
 * Grid points within `bounds` that fall inside any of `regions` (paths already in
 * screen coordinates). Each point takes the shade of the first region it falls in.
 */
function sample(regions: Path2D[], shades: number[], bounds: Area, gap: number): Point[] {
  const probe = document.createElement("canvas").getContext("2d")!;
  const points: Point[] = [];
  for (let y = bounds.y + gap / 2; y < bounds.y + bounds.h; y += gap) {
    for (let x = bounds.x + gap / 2; x < bounds.x + bounds.w; x += gap) {
      const i = regions.findIndex((r) => probe.isPointInPath(r, x, y));
      if (i >= 0) points.push({ x, y, shade: shades[i] });
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

  let width = 0;
  let height = 0;
  let dotSize = 3.4;
  let dots: Dot[] = [];
  let pointer = { x: -9999, y: -9999 };
  let frame = 0;
  let alive = true;
  let visible = true;
  let startedAt = 0;

  // Shape loop state.
  let showing = 0; // index into SEQUENCE
  let morph: { from: number; to: number; startedAt: number } | null = null;
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
    // Desktop: from just left of the container's midpoint to the screen's right
    // edge (past the container margin), so the mark can be as large as possible
    // without crowding the copy.
    const areaX = split ? containerX + containerW * 0.47 : 0;
    const areaW = split ? width - areaX - 16 : width;
    const narrow = width < 700;
    const gap = narrow ? 7 : 9;
    dotSize = narrow ? 2.8 : 3.4;
    const area: Area = {
      x: areaX + areaW * 0.01,
      y: height * (split ? 0.08 : 0.04),
      w: areaW * 0.98,
      h: height * (split ? 0.84 : 0.92),
    };

    // The stack (the mark), fitted into the area.
    const markScale = Math.min(area.w / MARK_BOX.w, area.h / MARK_BOX.h);
    const markLeft = area.x + (area.w - MARK_BOX.w * markScale) / 2;
    const markTop = area.y + (area.h - MARK_BOX.h * markScale) / 2;
    const markPath = new Path2D();
    markPath.addPath(new Path2D(MARK_PATH), new DOMMatrix([markScale, 0, 0, markScale, markLeft, markTop]));

    // Cubes: each arrangement (1, 2 or 3 cubes) is sized to use about as many
    // dots as the stack, so it is as big as the stack and the same dots move
    // across almost one-to-one. It is capped so it never leaves the stack's area.
    const groupW = (n: number) => 2 * COS30 + (n - 1) * CUBE_STEP_X;
    const groupH = (n: number) => 2 + (n - 1) * CUBE_STEP_Y;
    /** Face paths [top, left, right] for `n` cubes of half-height `s`. */
    const cubeFaces = (n: number, s: number) => {
      const faces = [new Path2D(), new Path2D(), new Path2D()];
      const left = area.x + (area.w - groupW(n) * s) / 2;
      const top = area.y + (area.h - groupH(n) * s) / 2;
      for (let k = 0; k < n; k++) addCube(faces, left + COS30 * s + k * CUBE_STEP_X * s, top + s + k * CUBE_STEP_Y * s, s);
      return faces;
    };
    const markPoints = sample([markPath], [1], area, gap);
    const cubesMatchingStack = (n: number) => {
      const maxS = Math.min(area.w / groupW(n), area.h / groupH(n));
      let s = maxS * 0.6;
      let points = sample(cubeFaces(n, s), FACE_SHADE, area, gap);
      // Dot count grows with the square of the size, so two corrections land close.
      for (let i = 0; i < 2 && points.length; i++) {
        s = Math.min(maxS, s * Math.sqrt(markPoints.length / points.length));
        points = sample(cubeFaces(n, s), FACE_SHADE, area, gap);
      }
      return points;
    };

    const shapes: Record<Shape, Point[]> = {
      mark: markPoints,
      cube1: cubesMatchingStack(1),
      cube2: cubesMatchingStack(2),
      cube3: cubesMatchingStack(3),
    };
    if (SEQUENCE.some((k) => !shapes[k].length)) return false;

    const n = Math.max(...SEQUENCE.map((k) => shapes[k].length));
    const resampled = Object.fromEntries(SEQUENCE.map((k) => [k, toLength(shapes[k], n)])) as Record<Shape, Point[]>;
    const minX = Math.min(...SEQUENCE.map((k) => resampled[k][0].x));
    const spanX = Math.max(...SEQUENCE.map((k) => resampled[k][n - 1].x)) - minX || 1;

    dots = resampled.mark.map((mark, k) => {
      const targets = Object.fromEntries(SEQUENCE.map((key) => [key, resampled[key][k]])) as Record<Shape, Point>;
      const repeat = Object.fromEntries(
        SEQUENCE.map((key) => [key, k > 0 && resampled[key][k - 1] === resampled[key][k]])
      ) as Record<Shape, boolean>;
      const avgX = SEQUENCE.reduce((a, key) => a + targets[key].x, 0) / SEQUENCE.length;
      return {
        targets,
        repeat,
        startX: reduceMotion ? mark.x : mark.x + (Math.random() - 0.5) * width * 0.9,
        startY: reduceMotion ? mark.y : mark.y + (Math.random() - 0.5) * height * 1.4,
        introDelay: reduceMotion ? 0 : Math.random() * 400,
        sweep: (avgX - minX) / spanX,
        lift: (noise(k, 13) - 0.5) * 36,
        offX: 0,
        offY: 0,
        color: pickColor(k),
        drawX: mark.x,
        drawY: mark.y,
        drawShade: 1,
        hidden: false,
      };
    });

    startedAt = performance.now();
    showing = 0;
    morph = null;
    scheduleNext(INTRO_MS + 400 + HOLD_MS.mark);
    return true;
  }

  function scheduleNext(delay: number) {
    if (timer) clearTimeout(timer);
    timer = null;
    if (reduceMotion || !alive) return;
    timer = setTimeout(() => {
      timer = null;
      if (!visible) return; // resumed by the visibility observer
      morph = { from: showing, to: (showing + 1) % SEQUENCE.length, startedAt: performance.now() };
      requestDraw();
    }, delay);
  }

  function draw() {
    frame = 0;
    if (!alive) return;
    const now = performance.now();
    let busy = false;
    ctx!.clearRect(0, 0, width, height);

    // Drawing uses the context's own path (beginPath/arc/fill), never new Path2D
    // objects per frame: their memory lives outside the JS heap, so garbage
    // collection doesn't keep up and the tab can run out of memory.
    // The background grid lines are CSS on the hero (site.module.css), not drawn here.
    const radius = dotSize / 2;
    let morphing = false;

    for (const d of dots) {
      const current = d.targets[SEQUENCE[showing]];
      let x = current.x, y = current.y, shade = current.shade;
      // A dot sharing its spot with another is hidden while it sits still, so each
      // spot shows one dot in its own colour; it still travels during a morph.
      let hidden = !morph && d.repeat[SEQUENCE[showing]];
      if (morph) {
        const from = d.targets[SEQUENCE[morph.from]];
        const to = d.targets[SEQUENCE[morph.to]];
        const local = clamp01(((now - morph.startedAt) / MORPH_MS - d.sweep * SWEEP) / (1 - SWEEP));
        if (local < 1) morphing = true;
        hidden = (local <= 0 && d.repeat[SEQUENCE[morph.from]]) || (local >= 1 && d.repeat[SEQUENCE[morph.to]]);
        const e = easeInOutCubic(local);
        x = from.x + (to.x - from.x) * e;
        y = from.y + (to.y - from.y) * e + Math.sin(Math.PI * e) * d.lift;
        shade = from.shade + (to.shade - from.shade) * e;
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

      d.hidden = hidden;
      d.drawX = x + d.offX;
      d.drawY = y + d.offY;
      // Opacity in steps of 0.05, so dots can be drawn in a handful of batches.
      d.drawShade = Math.round(shade * SHADE_STEPS) / SHADE_STEPS;
    }
    // One fill per colour and opacity step.
    PALETTE.forEach((p, k) => {
      ctx!.fillStyle = p.color;
      // Shades never go below 0.4 (the lightest face is 0.45), so only the upper steps are checked.
      for (let level = SHADE_STEPS; level >= SHADE_STEPS * 0.4; level--) {
        const shade = level / SHADE_STEPS;
        let any = false;
        ctx!.beginPath();
        for (const d of dots) {
          if (d.color !== k || d.hidden || d.drawShade !== shade) continue;
          ctx!.moveTo(d.drawX + radius, d.drawY);
          ctx!.arc(d.drawX, d.drawY, radius, 0, Math.PI * 2);
          any = true;
        }
        if (!any) continue;
        ctx!.globalAlpha = shade;
        ctx!.fill();
      }
    });
    ctx!.globalAlpha = 1;

    if (morph && !morphing) {
      showing = morph.to;
      morph = null;
      scheduleNext(HOLD_MS[SEQUENCE[showing]]);
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
