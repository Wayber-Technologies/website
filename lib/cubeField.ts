/**
 * Draws the Wayber mark as a field of small carets (">" marks), and on the
 * homepage flies them through a series of scenes as you scroll: the mark, a
 * browser and phone by the statement, then a ring around each "What we build"
 * card in turn. The carets are called dots below.
 *
 * - The mark is three identical slabs, each one step down and to the right of
 *   the one before (a little closer together than in the logo). Each dot is a
 *   brand colour, mostly Wayber Blue. A slab in front hides the dots of the
 *   slab behind it.
 * - The canvas is fixed over the whole window. Each scene is laid out inside
 *   an element in the page: the hero's mark box, the [data-field-stage] box,
 *   and each [data-field-ring] card. The dots follow those elements as the
 *   page scrolls.
 * - Scrolling from one scene to the next moves each dot from its place in one
 *   to its place in the other. Dots leave in a stream and swing out on the
 *   way, so a shape breaks apart and then re-forms. Each scene needs fewer
 *   dots than the one before; the rest fade out on the way.
 * - Each caret points one of four ways. Carets on an outline or ring point
 *   along it, clockwise. In flight, they turn to face where they're going.
 * - They're never quite still: each one wobbles a little, and now and then a
 *   caret turns to point another way (outline carets keep their direction).
 * - On load, the mark fades in while each dot settles from a few pixels away.
 * - Dots move away from the pointer.
 * - Drawing runs only while the dots are on screen.
 *
 * Users with "prefers-reduced-motion" see no entrance, no wobble and no
 * flight: the dots switch from one scene to the next halfway through the
 * scroll between them.
 */

// The front slab of the icon (public/logoBlackFull.svg), in the icon's own
// units. It is a convex hexagon. The other two slabs are the same shape moved
// by SLAB_STEP once and twice.
const SLAB: [number, number][] = [
  [0.08, 203.19],
  [359.75, 0.15],
  [404.82, 25.36],
  [404.82, 316.9],
  [45.6, 519.68],
  [0.08, 494.02],
];
const SLAB_STEP = { x: 269.52, y: 86.85 };
// How far apart the slabs sit, as a share of the logo's spacing (1 = as in the logo).
const SPACING = 0.8;
// The mark's size with that spacing: one slab plus two steps.
const MARK_BOX = { w: 404.82 + 2 * SLAB_STEP.x * SPACING, h: 519.68 + 2 * SLAB_STEP.y * SPACING };

// Each dot takes a colour from the brand palette, weighted so blue leads.
// (Light Blue #BFFDFF is left out: it disappears on the white page.)
const PALETTE: { color: string; weight: number }[] = [
  { color: "#1462FF", weight: 55 }, // Wayber Blue
  { color: "#09182F", weight: 20 }, // Dark Blue
  { color: "#6E9BFF", weight: 15 }, // a lighter Wayber Blue
  { color: "#EFD54D", weight: 10 }, // Yellow
];
const PALETTE_TOTAL = PALETTE.reduce((sum, p) => sum + p.weight, 0);

// From this width up, the hero is two columns and the mark sits in the right one.
const SPLIT_MIN_WIDTH = 900;
// Matches .container in site.module.css.
const CONTAINER_MAX = 1320;
// How much of its available area the mark fills (1 = as large as fits).
const MARK_SCALE = 0.85;

const REPEL_RADIUS = 140;
// Entrance: each dot settles over INTRO_MS, starting up to INTRO_DRIFT px away;
// the wave across the mark adds up to INTRO_WAVE_MS of delay.
const INTRO_MS = 900;
const INTRO_DRIFT = 14;
const INTRO_WAVE_MS = 450;

// Flight: the share of the scroll over which dots set off one after another
// (left of the mark first), and how far (px) a dot swings out mid-flight.
const FLIGHT_STAGGER = 0.35;
const SWING_MIN = 30;
const SWING_MAX = 150;
// Each flight runs over this part of the scroll between two scenes (0 = the
// scene before is centred in the window, 1 = this one is). Into the shape it
// ends right as the shape is centred; from card to card the ring rests a while
// at each card.
const FLIGHT_TO_SHAPE: [number, number] = [0.2, 1];
const FLIGHT_TO_RING: [number, number] = [0.3, 0.85];

// Idle motion: how far (px) and how much (radians) a caret wobbles, how often
// (ms, a range) a caret picks a new direction, and how long the turn takes.
const WOBBLE_PX = 0.7;
const WOBBLE_TURN = 0.18;
const FLIP_EVERY_MIN = 7000;
const FLIP_EVERY_MAX = 18000;
const FLIP_MS = 380;

type Area = { x: number; y: number; w: number; h: number };
type Point = { x: number; y: number };
/** A place in the shape, with the way its caret points (radians, 0 = ">"). */
type Place = Point & { angle: number; along: boolean };

type Dot = {
  /** Index into PALETTE. */
  color: number;
  /** The dot's place in each scene, relative to that scene's element; null when it sits that scene out. */
  places: (Place | null)[];
  /** Idle motion: seed, phase, speed, and how often it changes direction. */
  seed: number;
  phase: number;
  speed: number;
  flipEvery: number;
  /** Entrance offset and delay. */
  introX: number;
  introY: number;
  introDelay: number;
  /** When this dot sets off, as a share of a flight (0..FLIGHT_STAGGER). */
  delay: number;
  /** Mid-flight swing. */
  swingX: number;
  swingY: number;
  /** Current push away from the pointer. */
  offX: number;
  offY: number;
  /** This frame's position and direction, worked out once and then drawn in batches. */
  drawX: number;
  drawY: number;
  drawAngle: number;
  /** This frame's group: 0 staying in the picture, 1 leaving, 2 arriving, -1 hidden. */
  group: number;
};

/**
 * A place the dots gather: the hero mark, the shape by the statement, then a
 * ring around each "What we build" card. `from`/`to` are the page scroll
 * positions over which the dots fly here from the scene before.
 */
type Scene = { el: HTMLElement; from: number; to: number };

export type CubeField = { destroy: () => void };

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
/** Turns from angle a towards b by share t, the short way round. */
function turn(a: number, b: number, t: number) {
  let d = (b - a) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}
/** One of the four caret directions, picked from a seed. */
const quarterTurn = (seed: number) => Math.floor(seed * 4) * (Math.PI / 2);

/** Stable pseudo-random 0..1 from two numbers, so colours are the same on every load. */
function noise(a: number, b: number) {
  let h = (Math.round(a * 10) * 374761393 + Math.round(b * 10) * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/** Index into PALETTE for a dot, picked by weight. */
function pickColor(seed1: number, seed2: number) {
  let r = noise(seed1, seed2) * PALETTE_TOTAL;
  for (let k = 0; k < PALETTE.length; k++) {
    r -= PALETTE[k].weight;
    if (r < 0) return k;
  }
  return 0;
}

/** True if (x, y) is inside the convex polygon `poly` (vertices in order). */
function insideConvex(poly: Point[], x: number, y: number) {
  let sign = 0;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const cross = (b.x - a.x) * (y - a.y) - (b.y - a.y) * (x - a.x);
    if (cross !== 0) {
      const s = cross > 0 ? 1 : -1;
      if (sign && s !== sign) return false;
      sign = s;
    }
  }
  return true;
}

/** The dot grid for the mark, relative to a box of size w x h (the hero's mark element). */
function markPoints(w: number, h: number, gap: number): { points: Point[]; seeds: [number, number][] } {
  // Two-column hero: the right half of the page container. Narrow screens: the whole box.
  const split = w >= SPLIT_MIN_WIDTH;
  const containerW = Math.min(w, CONTAINER_MAX);
  const containerX = (w - containerW) / 2;
  // Desktop: from just left of the container's midpoint to the screen's right
  // edge (past the container margin), so the mark can be as large as possible
  // without crowding the copy.
  const areaX = split ? containerX + containerW * 0.47 : 0;
  const areaW = split ? w - areaX - 16 : w;
  const full: Area = {
    x: areaX + areaW * 0.01,
    y: h * (split ? 0.08 : 0.04),
    w: areaW * 0.98,
    h: h * (split ? 0.84 : 0.92),
  };
  // Shrink the drawing area around its centre so the mark sits a little smaller.
  const area: Area = {
    x: full.x + (full.w * (1 - MARK_SCALE)) / 2,
    y: full.y + (full.h * (1 - MARK_SCALE)) / 2,
    w: full.w * MARK_SCALE,
    h: full.h * MARK_SCALE,
  };

  const scale = Math.min(area.w / MARK_BOX.w, area.h / MARK_BOX.h);
  const left = area.x + (area.w - MARK_BOX.w * scale) / 2;
  const top = area.y + (area.h - MARK_BOX.h * scale) / 2;
  const slabPoly = SLAB.map(([x, y]) => ({ x: left + x * scale, y: top + y * scale }));
  // Steps are rounded to whole grid cells, so all three slabs share one dot
  // grid and line up where they meet.
  const step = {
    x: Math.round((SLAB_STEP.x * SPACING * scale) / gap) * gap,
    y: Math.round((SLAB_STEP.y * SPACING * scale) / gap) * gap,
  };

  // Dots on a grid filling the front slab. The other two slabs use the same
  // pattern, moved one and two steps; dots covered by a slab in front are dropped.
  const xs = slabPoly.map((p) => p.x);
  const ys = slabPoly.map((p) => p.y);
  const pattern: Point[] = [];
  for (let y = Math.min(...ys) + gap / 2; y < Math.max(...ys); y += gap) {
    for (let x = Math.min(...xs) + gap / 2; x < Math.max(...xs); x += gap) {
      if (insideConvex(slabPoly, x, y)) pattern.push({ x, y });
    }
  }

  const points: Point[] = [];
  const seeds: [number, number][] = [];
  for (let slab = 0; slab < 3; slab++) {
    for (let i = 0; i < pattern.length; i++) {
      const x = pattern[i].x + slab * step.x;
      const y = pattern[i].y + slab * step.y;
      let covered = false;
      for (let front = 0; front < slab && !covered; front++) {
        covered = insideConvex(slabPoly, x - front * step.x, y - front * step.y);
      }
      if (covered) continue;
      points.push({ x, y });
      // Seeded by the dot's place in the slab pattern, so colours are stable across resizes.
      seeds.push([i, slab]);
    }
  }
  return { points, seeds };
}

// The stage shape: a browser window with a phone in front of it (web platforms
// and mobile apps), drawn in its own units and scaled to fit the stage.
const SHAPE_BOX = { w: 560, h: 340 };
type Rect = { x: number; y: number; w: number; h: number; r?: number };
const BROWSER: Rect = { x: 0, y: 0, w: 440, h: 300, r: 14 };
const PHONE: Rect = { x: 380, y: 60, w: 160, h: 280, r: 26 };
// Filled blocks inside each, standing in for page content.
const BROWSER_FILL: Rect[] = [
  { x: 0, y: 0, w: 440, h: 30 }, // title bar
  { x: 26, y: 56, w: 210, h: 84, r: 8 }, // headline block
  { x: 26, y: 156, w: 190, h: 8 }, // lines of text
  { x: 26, y: 174, w: 160, h: 8 },
  { x: 26, y: 192, w: 110, h: 8 },
  { x: 260, y: 56, w: 150, h: 144, r: 8 }, // image
  { x: 26, y: 224, w: 96, h: 50, r: 8 }, // cards
  { x: 136, y: 224, w: 96, h: 50, r: 8 },
  { x: 246, y: 224, w: 96, h: 50, r: 8 },
];
const PHONE_FILL: Rect[] = [
  { x: 435, y: 76, w: 50, h: 8, r: 4 }, // speaker notch
  { x: 398, y: 104, w: 124, h: 76, r: 8 }, // header image
  { x: 398, y: 196, w: 110, h: 8 },
  { x: 398, y: 214, w: 80, h: 8 },
  { x: 398, y: 286, w: 124, h: 28, r: 14 }, // button
];

/** True if (x, y) is in the rectangle, with rounded corners when it has `r`. */
function inRect(rect: Rect, x: number, y: number, grow = 0) {
  const left = rect.x - grow;
  const top = rect.y - grow;
  const right = rect.x + rect.w + grow;
  const bottom = rect.y + rect.h + grow;
  if (x < left || x > right || y < top || y > bottom) return false;
  const r = (rect.r ?? 0) + grow;
  if (r <= 0) return true;
  const cx = Math.max(left + r, Math.min(x, right - r));
  const cy = Math.max(top + r, Math.min(y, bottom - r));
  return (x - cx) ** 2 + (y - cy) ** 2 <= r * r;
}

/** True if (x, y) is in the rectangle's outline of width `t`. */
function onOutline(rect: Rect, x: number, y: number, t: number) {
  if (!inRect(rect, x, y)) return false;
  const inner = { x: rect.x + t, y: rect.y + t, w: rect.w - 2 * t, h: rect.h - 2 * t, r: Math.max(0, (rect.r ?? 0) - t) };
  return !inRect(inner, x, y);
}

/** For a point on the rectangle's outline: the clockwise direction along its nearest edge. */
function alongOutline(rect: Rect, x: number, y: number) {
  const edges = [
    { d: y - rect.y, angle: 0 }, // top: pointing right
    { d: rect.x + rect.w - x, angle: Math.PI / 2 }, // right: pointing down
    { d: rect.y + rect.h - y, angle: Math.PI }, // bottom: pointing left
    { d: x - rect.x, angle: -Math.PI / 2 }, // left: pointing up
  ];
  return edges.reduce((a, b) => (b.d < a.d ? b : a)).angle;
}

/** The rectangle made at least `min` tall, so a thin line still catches a row of the grid. */
const thick = (r: Rect, min: number): Rect => (r.h >= min ? r : { ...r, y: r.y + r.h / 2 - min / 2, h: min });

/** The dot grid for the stage shape, relative to a box of size w x h. */
function shapePoints(w: number, h: number, gap: number): Place[] {
  const scale = Math.min(w / SHAPE_BOX.w, h / SHAPE_BOX.h);
  const left = (w - SHAPE_BOX.w * scale) / 2;
  const top = (h - SHAPE_BOX.h * scale) / 2;
  // Outlines are two dots wide, whatever the scale.
  const line = (gap * 1.9) / scale;
  const minLine = (gap * 1.05) / scale;
  const browserFill = BROWSER_FILL.map((r) => thick(r, minLine));
  const phoneFill = PHONE_FILL.map((r) => thick(r, minLine));
  const points: Place[] = [];
  for (let y = top + gap / 2; y < top + SHAPE_BOX.h * scale; y += gap) {
    for (let x = left + gap / 2; x < left + SHAPE_BOX.w * scale; x += gap) {
      const u = (x - left) / scale;
      const v = (y - top) / scale;
      // Carets on an outline point along it; the rest point any of four ways.
      const loose = quarterTurn(noise(x, y + 0.5));
      if (inRect(PHONE, u, v)) {
        if (onOutline(PHONE, u, v, line)) points.push({ x, y, angle: alongOutline(PHONE, u, v), along: true });
        else if (phoneFill.some((r) => inRect(r, u, v))) points.push({ x, y, angle: loose, along: false });
      } else if (!inRect(PHONE, u, v, line)) {
        // The phone sits in front: the window doesn't show through it or right around it.
        if (onOutline(BROWSER, u, v, line)) points.push({ x, y, angle: alongOutline(BROWSER, u, v), along: true });
        else if (browserFill.some((r) => inRect(r, u, v))) points.push({ x, y, angle: loose, along: false });
      }
    }
  }
  return points;
}

/**
 * `count` places evenly around the outside of a box of size w x h with corner
 * radius `radius`, `offset` px out from its edge, relative to the box. Carets
 * point clockwise along the ring.
 */
function ringPoints(w: number, h: number, radius: number, offset: number, count: number): Place[] {
  const x0 = -offset;
  const y0 = -offset;
  const x1 = w + offset;
  const y1 = h + offset;
  const r = Math.min(radius + offset, (x1 - x0) / 2, (y1 - y0) / 2);
  const straightW = x1 - x0 - 2 * r;
  const straightH = y1 - y0 - 2 * r;
  const corner = (Math.PI / 2) * r;
  // Clockwise from the top-left, after its corner: four straight edges, each followed by a corner.
  const edges = [
    { len: straightW, x: x0 + r, y: y0, angle: 0, cx: x1 - r, cy: y0 + r, from: -Math.PI / 2 },
    { len: straightH, x: x1, y: y0 + r, angle: Math.PI / 2, cx: x1 - r, cy: y1 - r, from: 0 },
    { len: straightW, x: x1 - r, y: y1, angle: Math.PI, cx: x0 + r, cy: y1 - r, from: Math.PI / 2 },
    { len: straightH, x: x0, y: y1 - r, angle: -Math.PI / 2, cx: x0 + r, cy: y0 + r, from: Math.PI },
  ];
  const total = 2 * straightW + 2 * straightH + 4 * corner;
  const points: Place[] = [];
  for (let i = 0; i < count; i++) {
    let s = ((i + 0.5) / count) * total;
    for (const e of edges) {
      if (s <= e.len) {
        points.push({
          x: e.x + Math.cos(e.angle) * s,
          y: e.y + Math.sin(e.angle) * s,
          angle: e.angle,
          along: true,
        });
        break;
      }
      s -= e.len;
      if (s <= corner) {
        const a = e.from + s / r;
        points.push({ x: e.cx + Math.cos(a) * r, y: e.cy + Math.sin(a) * r, angle: a + Math.PI / 2, along: true });
        break;
      }
      s -= corner;
    }
  }
  return points;
}

/** How many ring places fit around a box at one per `gap` px. */
function ringCount(w: number, h: number, radius: number, offset: number, gap: number) {
  const r = radius + offset;
  const total = 2 * (w + 2 * offset) + 2 * (h + 2 * offset) - (8 - 2 * Math.PI) * r;
  return Math.max(0, Math.floor(total / gap));
}

/** Indices of `points` sorted by angle around their centre, so shapes map onto rings without crossing. */
function byAngle(points: Point[]) {
  let cx = 0;
  let cy = 0;
  for (const p of points) {
    cx += p.x;
    cy += p.y;
  }
  cx /= points.length || 1;
  cy /= points.length || 1;
  return points.map((_, i) => i).sort((a, b) => Math.atan2(points[a].y - cy, points[a].x - cx) - Math.atan2(points[b].y - cy, points[b].x - cx));
}

export function createCubeField(canvas: HTMLCanvasElement, mark: HTMLElement): CubeField {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { destroy() {} };

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  let width = 0;
  let height = 0;
  /** Half the width of a caret, in CSS px. */
  let caretSize = 2.9;
  let dots: Dot[] = [];
  let scenes: Scene[] = [];
  let pointer = { x: -9999, y: -9999 };
  let frame = 0;
  let alive = true;
  let startedAt = 0;
  let introDone = false;
  let drewNothing = false;

  /** Lays out the dots for the current sizes. `intro`: play the entrance. */
  function build(intro: boolean): boolean {
    width = window.innerWidth;
    height = window.innerHeight;
    const markRect = mark.getBoundingClientRect();
    if (!width || !height || !markRect.width || !markRect.height) return false;

    // Draw at least 2x (and up to 3x) the CSS size, so the carets stay
    // smooth on standard screens too, not only on retina ones.
    const ratio = Math.min(3, Math.max(2, window.devicePixelRatio || 1));
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx!.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    ctx!.imageSmoothingEnabled = true;
    const animate = intro && !reduceMotion;

    // Carets need room to read as carets.
    const narrow = width < 700;
    const gap = narrow ? 8 : 9.5;
    caretSize = narrow ? 2.4 : 2.9;

    // Scene 0: the mark.
    const { points, seeds } = markPoints(markRect.width, markRect.height, gap);
    if (!points.length) return false;
    let markLeft = Infinity;
    let markRight = -Infinity;
    for (const p of points) {
      markLeft = Math.min(markLeft, p.x);
      markRight = Math.max(markRight, p.x);
    }
    const markW = markRight - markLeft || 1;
    const places: (Place | null)[][] = points.map((p, i) => [
      { x: p.x, y: p.y, angle: quarterTurn(noise(seeds[i][0] + 0.3, seeds[i][1] + 0.7)), along: false },
    ]);
    scenes = [{ el: mark, from: 0, to: 0 }];

    // Scene 1: the browser and phone by the statement. Mark dots pair with
    // shape dots in reading order, so the left of the mark becomes the left of
    // the shape and paths don't all cross. When the shape needs fewer dots,
    // every k-th mark dot gets a place and the rest fade out.
    const stage = document.querySelector<HTMLElement>("[data-field-stage]");
    const stageRect = stage?.getBoundingClientRect();
    const shape = stage && stageRect?.width && stageRect.height ? shapePoints(stageRect.width, stageRect.height, gap) : [];
    if (stage && shape.length) {
      const order = (p: Point) => p.x + p.y * 0.35;
      const markOrder = points.map((_, i) => i).sort((a, b) => order(points[a]) - order(points[b]));
      const shapeOrder = [...shape].sort((a, b) => order(a) - order(b));
      const pairs = Math.min(shapeOrder.length, markOrder.length);
      for (const row of places) row.push(null);
      for (let j = 0; j < pairs; j++) {
        places[markOrder[Math.floor((j * markOrder.length) / pairs)]][1] = shapeOrder[Math.floor((j * shapeOrder.length) / pairs)];
      }
      scenes.push({ el: stage, from: 0, to: 0 });

      // Scenes 2+: a ring around each card. Every ring has as many places as
      // the first one, and the same dots, so the ring slides from card to card.
      const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-field-ring]"));
      const offset = narrow ? 9 : 14;
      if (cards.length) {
        const first = cards[0].getBoundingClientRect();
        const radiusOf = (el: HTMLElement) => parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
        const count = Math.min(pairs, ringCount(first.width, first.height, radiusOf(cards[0]), offset, gap));
        // Which of the shape's dots go on to the rings: evenly around the shape.
        const inShape = places.map((row, i) => (row[1] ? i : -1)).filter((i) => i >= 0);
        const shapeAround = byAngle(inShape.map((i) => places[i][1]!));
        const ringDots: number[] = [];
        for (let j = 0; j < count; j++) ringDots.push(inShape[shapeAround[Math.floor((j * shapeAround.length) / count)]]);
        for (const card of cards) {
          const rect = card.getBoundingClientRect();
          const ring = ringPoints(rect.width, rect.height, radiusOf(card), offset, count);
          const around = byAngle(ring);
          for (const row of places) row.push(null);
          const scene = scenes.length;
          for (let j = 0; j < count; j++) places[ringDots[j]][scene] = ring[around[j]];
          scenes.push({ el: card, from: 0, to: 0 });
        }
      }
    }

    dots = points.map((p, i) => {
      const angle = noise(i, 7) * Math.PI * 2;
      const swing = SWING_MIN + noise(i, 11) * (SWING_MAX - SWING_MIN);
      return {
        color: pickColor(seeds[i][0], seeds[i][1]),
        places: places[i],
        seed: i + 0.5,
        phase: noise(i, 13) * Math.PI * 2,
        speed: 0.7 + noise(i, 17) * 0.6,
        flipEvery: FLIP_EVERY_MIN + noise(i, 19) * (FLIP_EVERY_MAX - FLIP_EVERY_MIN),
        // A small nudge, mostly from below, so the mark settles into place.
        introX: animate ? (Math.random() - 0.5) * INTRO_DRIFT : 0,
        introY: animate ? Math.random() * INTRO_DRIFT : 0,
        introDelay: animate ? ((p.x - markLeft) / markW) * INTRO_WAVE_MS + Math.random() * 120 : 0,
        // Left of the mark leaves first, with a little randomness so it streams.
        delay: clamp01(((p.x - markLeft) / markW) * 0.8 + noise(i, 3) * 0.2) * FLIGHT_STAGGER,
        swingX: Math.cos(angle) * swing,
        swingY: Math.sin(angle) * swing * 0.6,
        offX: 0,
        offY: 0,
        drawX: p.x,
        drawY: p.y,
        drawAngle: 0,
        group: 0,
      };
    });

    // Each scene is complete when its element is centred in the window. The
    // flight into it takes up part of the scroll from the scene before.
    let previous = 0;
    scenes.forEach((scene, k) => {
      if (k === 0) return;
      const rect = scene.el.getBoundingClientRect();
      const centred = rect.top + window.scrollY + rect.height / 2 - height / 2;
      const distance = Math.max(0, centred - previous);
      const [start, end] = k === 1 ? FLIGHT_TO_SHAPE : FLIGHT_TO_RING;
      scene.from = previous + distance * start;
      scene.to = previous + distance * end;
      previous = centred;
    });

    startedAt = performance.now();
    return true;
  }

  /** Where the scroll is: flying from scene `from` to `from + 1` with progress p (0 while resting at `from`). */
  function position() {
    const y = window.scrollY;
    for (let k = 1; k < scenes.length; k++) {
      const scene = scenes[k];
      if (y < scene.from) return { from: k - 1, p: 0 };
      if (y < scene.to) {
        const p = clamp01((y - scene.from) / (scene.to - scene.from || 1));
        return reduceMotion ? { from: p < 0.5 ? k - 1 : k, p: 0 } : { from: k - 1, p };
      }
    }
    return { from: scenes.length - 1, p: 0 };
  }

  const near = (r: DOMRect) => r.bottom > -SWING_MAX && r.top < height + SWING_MAX;

  function draw() {
    frame = 0;
    if (!alive || !scenes.length) return;
    const now = performance.now();
    let busy = false;
    const { from: a, p } = position();
    const b = Math.min(a + 1, scenes.length - 1);
    const rectA = scenes[a].el.getBoundingClientRect();
    const rectB = scenes[b].el.getBoundingClientRect();

    // Resting at a scene that's off screen: clear once, then skip drawing.
    if (p === 0 && !near(rectA)) {
      if (!drewNothing) ctx!.clearRect(0, 0, width, height);
      drewNothing = true;
      return;
    }
    drewNothing = false;
    ctx!.clearRect(0, 0, width, height);

    const idle = !reduceMotion;
    if (idle) busy = true;

    for (const d of dots) {
      const A = d.places[a];
      const B = p > 0 ? d.places[b] : null;
      if (!A && !B) {
        d.group = -1;
        continue;
      }

      // Now and then a loose caret turns a quarter or half turn to a new direction.
      let flip = 0;
      if (idle) {
        const k = now / d.flipEvery + d.phase;
        const step = Math.floor(k);
        const turning = easeInOutCubic(clamp01(((k - step) * d.flipEvery) / FLIP_MS));
        flip = turn(quarterTurn(noise(d.seed, step - 1)), quarterTurn(noise(d.seed, step)), turning);
      }
      const restAngle = (place: Place) => place.angle + (place.along ? 0 : flip);

      // The entrance only applies to the mark.
      let settleX = 0;
      let settleY = 0;
      if (a === 0) {
        const intro = clamp01((now - startedAt - d.introDelay) / INTRO_MS);
        if (intro < 1) busy = true;
        const settle = 1 - easeOutCubic(intro);
        settleX = d.introX * settle;
        settleY = d.introY * settle;
      }

      // Where it flies from and to. A dot missing from one end appears from,
      // or drifts off to, a little way out from its place at the other end.
      const fromX = A ? rectA.left + A.x + settleX : rectB.left + B!.x + d.swingX * 1.5;
      const fromY = A ? rectA.top + A.y + settleY : rectB.top + B!.y + d.swingY * 1.5;
      const toX = B ? rectB.left + B.x : fromX + d.swingX * 1.5;
      const toY = B ? rectB.top + B.y : fromY + d.swingY * 1.5;
      d.group = A && B ? 0 : A ? 1 : 2;
      if (!B && p === 0) d.group = 0;

      let x = fromX;
      let y = fromY;
      let angle = A ? restAngle(A) : restAngle(B!);
      if (p > 0) {
        // This dot's own progress, starting after its delay.
        const own = easeInOutCubic(clamp01((p - d.delay) / (1 - FLIGHT_STAGGER)));
        const arc = A && B ? Math.sin(own * Math.PI) : 0;
        x = fromX + (toX - fromX) * own + d.swingX * arc;
        y = fromY + (toY - fromY) * own + d.swingY * arc;
        // Turn from its direction at one end to the other, facing the way
        // it's heading while it's in the air.
        const wave = Math.cos(own * Math.PI) * Math.PI * (arc ? 1 : 0);
        const heading = Math.atan2(toY - fromY + d.swingY * wave, toX - fromX + d.swingX * wave);
        const startAngle = A ? restAngle(A) : heading;
        const endAngle = B ? restAngle(B) : heading;
        angle = turn(turn(startAngle, endAngle, own), heading, A && B ? arc * 0.9 : 0);
      }
      if (idle) {
        const wob = now * 0.0015 * d.speed + d.phase;
        x += Math.sin(wob * 0.8) * WOBBLE_PX;
        y += Math.cos(wob * 0.9 + d.phase) * WOBBLE_PX;
        angle += Math.sin(wob) * WOBBLE_TURN;
      }

      let pushX = 0;
      let pushY = 0;
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const dist = Math.hypot(dx, dy);
      if (dist < REPEL_RADIUS && dist > 0.01) {
        const push = (1 - dist / REPEL_RADIUS) * 24;
        pushX = (dx / dist) * push;
        pushY = (dy / dist) * push;
      }
      d.offX += (pushX - d.offX) * 0.15;
      d.offY += (pushY - d.offY) * 0.15;
      if (Math.abs(pushX - d.offX) > 0.2 || Math.abs(pushY - d.offY) > 0.2) busy = true;

      d.drawX = x + d.offX;
      d.drawY = y + d.offY;
      d.drawAngle = angle;
    }

    // Drawing uses the context's own path (beginPath/lineTo/stroke), never new
    // Path2D objects per frame: their memory lives outside the JS heap, so
    // garbage collection doesn't keep up and the tab can run out of memory.
    const size = caretSize;
    ctx!.lineWidth = width < 700 ? 1.1 : 1.25;
    ctx!.lineCap = "round";
    ctx!.lineJoin = "round";
    // The whole mark fades in over the entrance.
    const fade = reduceMotion ? 1 : clamp01((now - startedAt) / (INTRO_MS * 0.8));
    // One stroke per palette colour and group: staying, leaving (fading out),
    // arriving (fading in).
    const groupAlpha = [fade, fade * (1 - clamp01(p * 1.6)), fade * clamp01((p - 0.35) * 1.6)];
    groupAlpha.forEach((alpha, group) => {
      if (alpha <= 0) return;
      ctx!.globalAlpha = alpha;
      PALETTE.forEach((colour, k) => {
        ctx!.strokeStyle = colour.color;
        ctx!.beginPath();
        for (const d of dots) {
          if (d.color !== k || d.group !== group) continue;
          if (d.drawX < -8 || d.drawX > width + 8 || d.drawY < -8 || d.drawY > height + 8) continue;
          // A ">" around the dot's position, turned to its angle.
          const c = Math.cos(d.drawAngle) * size;
          const s = Math.sin(d.drawAngle) * size;
          // Tip at +0.6 along the angle; arms back at -0.6, spread 1 across.
          ctx!.moveTo(d.drawX - 0.6 * c - s, d.drawY - 0.6 * s + c);
          ctx!.lineTo(d.drawX + 0.6 * c, d.drawY + 0.6 * s);
          ctx!.lineTo(d.drawX - 0.6 * c + s, d.drawY - 0.6 * s - c);
        }
        ctx!.stroke();
      });
    });
    ctx!.globalAlpha = 1;

    if (busy) requestDraw();
  }

  function requestDraw() {
    if (!frame && alive && dots.length) frame = requestAnimationFrame(draw);
  }

  function start() {
    if (!alive) return;
    if (build(!introDone)) {
      introDone = true;
      drewNothing = false;
      requestDraw();
    } else requestAnimationFrame(start);
  }

  const onMove = (e: PointerEvent) => {
    pointer = { x: e.clientX, y: e.clientY };
    requestDraw();
  };
  const onLeave = () => {
    pointer = { x: -9999, y: -9999 };
    requestDraw();
  };
  const onScroll = () => requestDraw();
  window.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);
  window.addEventListener("scroll", onScroll, { passive: true });

  // Re-lay out (without the entrance) when the window, the mark, the stage or
  // the page changes size. Waits for resizing to settle first.
  let resizeTimer: ReturnType<typeof setTimeout> | null = null;
  const relayout = () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeTimer = null;
      if (introDone) start();
    }, 120);
  };
  window.addEventListener("resize", relayout);
  const sizes = new Map<Element, string>();
  const resizeObserver =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver((entries) => {
          for (const entry of entries) {
            const size = `${Math.round(entry.contentRect.width)}x${Math.round(entry.contentRect.height)}`;
            const last = sizes.get(entry.target);
            sizes.set(entry.target, size);
            if (last && size !== last) relayout();
          }
        })
      : null;
  // The body too: images loading above the stage move it down the page.
  resizeObserver?.observe(mark);
  resizeObserver?.observe(document.body);
  document.querySelectorAll("[data-field-stage], [data-field-ring]").forEach((el) => resizeObserver?.observe(el));

  // Browser zoom or moving to another screen changes the pixel ratio.
  let ratioQuery: MediaQueryList | null = null;
  const watchRatio = () => {
    ratioQuery?.removeEventListener("change", onRatioChange);
    ratioQuery = window.matchMedia?.(`(resolution: ${window.devicePixelRatio || 1}dppx)`) ?? null;
    ratioQuery?.addEventListener("change", onRatioChange);
  };
  function onRatioChange() {
    relayout();
    watchRatio();
  }
  watchRatio();

  start();

  return {
    destroy() {
      alive = false;
      if (frame) cancelAnimationFrame(frame);
      if (resizeTimer) clearTimeout(resizeTimer);
      ratioQuery?.removeEventListener("change", onRatioChange);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", relayout);
      resizeObserver?.disconnect();
    },
  };
}
