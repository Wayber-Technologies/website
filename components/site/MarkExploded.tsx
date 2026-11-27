import styles from "@/styles/pages.module.css";

// One slab of the mark, in the icon's own coordinates (from public/logoBlackFull.svg).
// The mark is three copies of this shape, each offset by SLAB_STEP.
const SLAB = "0,203.2 359.7,0.15 404.8,25.4 404.8,316.9 45.6,519.7 0,494";
const SLAB_STEP = { x: 269.5, y: 86.9 };
// The full mark outline, shown as a dashed "where it goes" guide.
const MARK_PATH =
  "M898.796 173.928L674.342 300.432V112.251L629.271 87.0405L404.817 213.545V25.3641L359.746 0.15332L0.0791016 203.19V494.015L45.6009 519.676L269.604 393.172V580.902L315.126 606.563L539.129 480.059V667.789L584.651 693L943.417 490.863V199.139L898.796 173.928Z";
// How far each slab is pulled apart in the exploded view (matches .explode1/.explode2 in CSS).
const SPREAD = { x: 161.7, y: 52.1 };

const LAYERS = ["Interface", "Data", "Infrastructure"];

// The caret fill, as in the hero mark: a tile of ">" marks in brand colours,
// weighted so blue leads, each pointing one of four ways.
const PALETTE = [
  { color: "#1462FF", weight: 55 },
  { color: "#09182F", weight: 20 },
  { color: "#6E9BFF", weight: 15 },
  { color: "#EFD54D", weight: 10 },
];
const CELL = 19;
const TILE_CELLS = 6;
function hash(n: number) {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
}
const CARETS = Array.from({ length: TILE_CELLS * TILE_CELLS }, (_, i) => {
  let pick = hash(i + 1) * 100;
  let color = PALETTE[0].color;
  for (const p of PALETTE) {
    if (pick < p.weight) {
      color = p.color;
      break;
    }
    pick -= p.weight;
  }
  return {
    x: (i % TILE_CELLS) * CELL + CELL / 2,
    y: Math.floor(i / TILE_CELLS) * CELL + CELL / 2,
    angle: Math.floor(hash(i * 7.3 + 2) * 4) * 90,
    color,
  };
});

type Props = {
  /** Slabs slid together into the finished mark. */
  assembled: boolean;
  /** A layer to pick out (0..2); the others dim. */
  active: number | null;
};

/**
 * The Wayber mark as an exploded stack: its three slabs pulled apart along the
 * stacking diagonal and labelled as layers of technology, each filled with
 * Wayber carets like the hero mark. `assembled` slides them together into the
 * finished mark (the slab edges fade so it reads as one shape); `active`
 * picks out one layer.
 */
export default function MarkExploded({ assembled, active }: Props) {
  const explodeClass = [styles.explode0, styles.explode1, styles.explode2];
  return (
    <svg
      className={`${styles.markArt} ${assembled ? styles.markAssembled : ""}`}
      viewBox="-10 -10 1300 880"
      role="img"
      aria-label="The Wayber mark taken apart into three slabs: interface, data and infrastructure, the layers of technology that stack into the mark"
    >
      <defs>
        <pattern
          id="mark-carets"
          width={CELL * TILE_CELLS}
          height={CELL * TILE_CELLS}
          patternUnits="userSpaceOnUse"
        >
          {CARETS.map((c, i) => (
            <path
              key={i}
              d={`M${c.x - 3} ${c.y - 5.5}L${c.x + 3} ${c.y}L${c.x - 3} ${c.y + 5.5}`}
              transform={`rotate(${c.angle} ${c.x} ${c.y})`}
              fill="none"
              stroke={c.color}
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </pattern>
      </defs>

      {/* Where the slabs end up. */}
      <path
        className={styles.markGhost}
        d={MARK_PATH}
        fill="none"
        stroke="#1462FF"
        strokeOpacity="0.45"
        strokeWidth="2.5"
        strokeDasharray="10 10"
      />

      {/* Dashed guides from each pulled-out slab back to its place. */}
      {[1, 2].map((k) =>
        [
          [0, 203.2],
          [404.8, 316.9],
        ].map(([cx, cy]) => {
          const x = cx + SLAB_STEP.x * k;
          const y = cy + SLAB_STEP.y * k;
          return (
            <line
              key={`${k}-${cx}`}
              className={styles.markGuide}
              x1={x}
              y1={y}
              x2={x + SPREAD.x * k}
              y2={y + SPREAD.y * k}
              stroke="#1462FF"
              strokeOpacity="0.4"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
          );
        }),
      )}

      {/* The slabs, back to front, so the nearer layer covers the one behind when stacked. */}
      {LAYERS.map((name, k) => (
        <g
          key={name}
          className={`${styles.explode} ${explodeClass[k]} ${active !== null && active !== k ? styles.slabDim : ""}`}
        >
          <g transform={`translate(${SLAB_STEP.x * k} ${SLAB_STEP.y * k})`}>
            <polygon points={SLAB} fill="#F3F5F8" />
            <polygon
              points={SLAB}
              className={styles.slabEdge}
              fill="url(#mark-carets)"
              stroke="#1462FF"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <text
              className={styles.slabLabel}
              x="45"
              y="580"
              fontSize="34"
              fill="#09182F"
            >
              <tspan fontWeight="600">{name}</tspan>
            </text>
          </g>
        </g>
      ))}
    </svg>
  );
}
