import {
  Canvas,
  Chip,
  chipWidth,
  Flow,
  Phone,
  seeded,
  Skel,
  softTone,
  Txt,
  Window,
  type Tone,
  type VisualProps,
} from "./kit";

/* MoodRoot: monthly heatmap and a weekly summary, on two phones. Mood values are synthetic. */

const MOOD_FILL = ["fill-amber/70", "fill-amber/30", "fill-line-strong", "fill-sky/60", "fill-accent/75"];

function buildMonth() {
  const rnd = seeded(11);
  return Array.from({ length: 31 }, (_, i) => {
    if (i >= 24) return null;
    const r = rnd();
    return r < 0.08 ? 0 : r < 0.22 ? 1 : r < 0.48 ? 2 : r < 0.78 ? 3 : 4;
  });
}
const MONTH = buildMonth();

export function MoodRootVisual(props: VisualProps) {
  return (
    <Canvas {...props}>
      <Chip x={8} y={150} label="on-device · Isar" tone="accent" size={8} />
      <Chip x={8} y={176} label="Riverpod" size={8} />
      <Chip x={640 - 8 - chipWidth("Claude analysis", 8)} y={206} label="Claude analysis" tone="sky" size={8} />

      <Phone x={118} y={34} w={168} h={332}>
        <Txt x={14} y={42} size={12} tone="ink" mono={false} weight={600}>
          October
        </Txt>
        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
          <Txt key={i} x={20 + i * 21} y={66} size={8} anchor="middle">
            {day}
          </Txt>
        ))}
        {MONTH.map((mood, i) => {
          const slot = i + 3;
          const x = 12 + (slot % 7) * 21;
          const y = 74 + Math.floor(slot / 7) * 21;
          return mood === null ? (
            <rect key={i} x={x} y={y} width={17} height={17} rx={4} className="fill-none stroke-line" />
          ) : (
            <rect key={i} x={x} y={y} width={17} height={17} rx={4} className={MOOD_FILL[mood]} />
          );
        })}
        {MOOD_FILL.map((fill, i) => (
          <rect key={fill} x={14 + i * 16} y={198} width={12} height={6} rx={3} className={fill} />
        ))}
        <Txt x={14} y={218} size={8}>
          low → high
        </Txt>

        <rect x={12} y={232} width={144} height={84} rx={10} className="fill-surface stroke-line" />
        <Txt x={22} y={250} size={9} tone="ink">
          Today
        </Txt>
        {MOOD_FILL.map((fill, i) => (
          <circle key={fill} cx={30 + i * 22} cy={270} r={8} className={fill} />
        ))}
        <circle cx={30 + 3 * 22} cy={270} r={11} className="fill-none stroke-sky" strokeWidth={1.5} />
        <Chip x={22} y={288} label="sleep" size={8} />
        <Chip x={22 + chipWidth("sleep", 8) + 5} y={288} label="work" size={8} />
      </Phone>

      <Phone x={326} y={52} w={168} h={316} rotate={4}>
        <Txt x={14} y={42} size={12} tone="ink" mono={false} weight={600}>
          Weekly summary
        </Txt>
        <path d="M14 112 C 46 70, 84 134, 154 84 L154 134 L14 134Z" className="fill-accent/10" />
        <path d="M14 112 C 46 70, 84 134, 154 84" fill="none" className="stroke-accent-text" strokeWidth={2} strokeLinecap="round" />
        <Txt x={14} y={152} size={8}>
          trend
        </Txt>
        {[
          [14, 164, 52],
          [72, 164, 36],
          [114, 164, 40],
          [14, 182, 38],
          [58, 182, 60],
          [124, 182, 30],
        ].map(([x, y, w]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={11} rx={5.5} className="fill-sky/25" />
        ))}
        <rect x={12} y={212} width={144} height={86} rx={10} className="fill-accent/8 stroke-accent-text/40" />
        <Txt x={22} y={230} size={9} tone="accent">
          One insight
        </Txt>
        <Skel x={22} y={242} w={118} />
        <Skel x={22} y={256} w={104} />
        <Skel x={22} y={270} w={72} />
      </Phone>
    </Canvas>
  );
}

/* JB iPhone Warehouse: stock list and profit overview. Items and counts are sample data. */

const STOCK: { name: string; spec: string; qty: string; tone: Tone }[] = [
  { name: "iPhone 13", spec: "128 GB", qty: "4", tone: "accent" },
  { name: "iPhone 14", spec: "256 GB", qty: "2", tone: "amber" },
  { name: "iPhone 12", spec: "64 GB", qty: "7", tone: "accent" },
  { name: "iPhone 15", spec: "128 GB", qty: "1", tone: "amber" },
];

export function WarehouseVisual(props: VisualProps) {
  return (
    <Canvas {...props}>
      <Chip x={10} y={124} label="Flutter" tone="sky" size={8} />
      <Chip x={10} y={150} label="SQLite" size={8} />
      <Chip x={640 - 10 - chipWidth("Python API", 8)} y={134} label="Python API" tone="accent" size={8} />

      <Phone x={130} y={34} w={168} h={332}>
        <Txt x={14} y={42} size={12} tone="ink" mono={false} weight={600}>
          Stock
        </Txt>
        <rect x={12} y={54} width={144} height={22} rx={11} className="fill-surface stroke-line" />
        <Skel x={26} y={62} w={50} />
        {STOCK.map((item, i) => {
          const y = 88 + i * 52;
          return (
            <g key={item.name}>
              <rect x={12} y={y} width={144} height={44} rx={8} className="fill-surface stroke-line" />
              <rect x={20} y={y + 8} width={28} height={28} rx={6} className={softTone.sky} />
              <Txt x={56} y={y + 21} size={9} tone="ink">
                {item.name}
              </Txt>
              <Txt x={56} y={y + 34} size={8}>
                {item.spec} · in stock
              </Txt>
              <Chip x={156 - 8 - chipWidth(item.qty, 8)} y={y + 14} label={item.qty} tone={item.tone} size={8} />
            </g>
          );
        })}
        <circle cx={134} cy={312} r={14} className="fill-accent" />
        <path d="M134 305V319M127 312H141" className="stroke-accent-ink" strokeWidth={2} strokeLinecap="round" />
      </Phone>

      <Flow d="M300 200 H350" />

      <Phone x={350} y={52} w={168} h={316} rotate={3}>
        <Txt x={14} y={42} size={12} tone="ink" mono={false} weight={600}>
          Profit
        </Txt>
        <rect x={12} y={54} width={144} height={92} rx={10} className="fill-surface stroke-line" />
        <path d="M22 128 L46 112 L68 120 L92 94 L116 102 L146 72 L146 138 L22 138Z" className="fill-accent/10" />
        <path d="M22 128 L46 112 L68 120 L92 94 L116 102 L146 72" fill="none" className="stroke-accent-text" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        <Txt x={22} y={72} size={8}>
          instant calculation
        </Txt>
        {[0.9, 0.62, 0.78, 0.4].map((share, i) => (
          <g key={i}>
            <Txt x={14} y={176 + i * 28} size={8}>
              item {i + 1}
            </Txt>
            <rect x={56} y={168 + i * 28} width={98} height={8} rx={4} className="fill-line-strong" />
            <rect x={56} y={168 + i * 28} width={98 * share} height={8} rx={4} className={i === 0 ? "fill-accent" : "fill-sky/60"} />
          </g>
        ))}
        <Chip x={14} y={284} label="margin per item" tone="accent" size={8} />
      </Phone>
    </Canvas>
  );
}

/* ReceiptScribe: a receipt being scanned into structured fields. */

function zigzag(width: number, height: number, tooth = 10) {
  let d = `M0 0 H${width} V${height}`;
  for (let x = width; x > 0; x -= tooth) d += ` l${-tooth / 2} 8 l${-tooth / 2} -8`;
  return `${d} Z`;
}

export function ReceiptVisual(props: VisualProps) {
  return (
    <Canvas {...props}>
      <g transform="translate(48 40)">
        <path d={zigzag(150, 296)} className="fill-canvas stroke-line-strong" strokeWidth={1.4} strokeLinejoin="round" />
        <Skel x={34} y={20} w={82} h={8} />
        <Skel x={50} y={36} w={50} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <Skel x={14} y={68 + i * 26} w={[70, 56, 82, 48, 64, 76][i]} />
            <Skel x={112} y={68 + i * 26} w={22} />
          </g>
        ))}
        <line x1={14} x2={136} y1={236} y2={236} className="stroke-line-strong" strokeDasharray="3 3" />
        <Txt x={14} y={258} size={9} tone="ink">
          TOTAL
        </Txt>
        <Skel x={104} y={252} w={30} h={8} tone="accent" />
        <g className="viz-scan">
          <rect x={-6} y={22} width={162} height={46} fill="url(#viz-beam)" />
          <line x1={-6} x2={156} y1={68} y2={68} className="stroke-accent" strokeWidth={1.5} />
        </g>
      </g>

      <Chip x={242} y={166} label="GPT-4 Vision" tone="accent" size={8} />
      <Flow d="M222 196 H340" />
      <path d="M334 190 342 196 334 202" fill="none" className="stroke-accent" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />

      <g transform="translate(350 50)">
        <rect width={252} height={292} rx={14} className="fill-canvas stroke-line-strong" strokeWidth={1.2} />
        <Txt x={16} y={28} size={11} tone="ink" mono={false} weight={600}>
          Extracted
        </Txt>
        <Chip x={252 - 14 - chipWidth("structured", 8)} y={14} label="structured" tone="accent" size={8} />
        {["vendor", "date", "total"].map((key, i) => (
          <g key={key}>
            <Txt x={16} y={62 + i * 30} size={9}>
              {key}
            </Txt>
            <rect x={84} y={50 + i * 30} width={150} height={20} rx={6} className="fill-accent/10 stroke-accent-text/40" />
            <Skel x={94} y={57 + i * 30} w={[84, 62, 44][i]} tone="accent" />
          </g>
        ))}
        <line x1={16} x2={236} y1={146} y2={146} className="stroke-line" />
        <Txt x={16} y={166} size={9}>
          items
        </Txt>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={16} y={176 + i * 28} width={220} height={22} rx={6} className="fill-surface stroke-line" />
            <Skel x={26} y={184 + i * 28} w={[92, 74, 108][i]} />
            <Skel x={200} y={184 + i * 28} w={24} />
          </g>
        ))}
        <Chip x={16} y={266} label="FastAPI" size={8} />
        <Chip x={16 + chipWidth("FastAPI", 8) + 5} y={266} label="SQLite" size={8} />
      </g>
    </Canvas>
  );
}

/* Smart seller: a shelf display suggesting products, backed by a recommendation API. Concept illustration. */

const SHELF_ITEMS = [
  { w: 34, h: 58, tone: "sky" as const },
  { w: 28, h: 70, tone: "amber" as const },
  { w: 40, h: 50, tone: "muted" as const },
  { w: 30, h: 64, tone: "accent" as const },
  { w: 36, h: 56, tone: "sky" as const },
  { w: 30, h: 72, tone: "muted" as const },
  { w: 34, h: 48, tone: "amber" as const },
];

export function SmartSellerVisual(props: VisualProps) {
  let cursor = 52;
  const placed = SHELF_ITEMS.map((item) => {
    const x = cursor;
    cursor += item.w + 8;
    return { ...item, x };
  });
  const bottom = 214;
  const picked = placed[0];
  const suggested = [placed[3], placed[5], placed[6]];
  return (
    <Canvas {...props}>
      <rect x={36} y={130} width={330} height={232} rx={12} className="fill-canvas stroke-line-strong" strokeWidth={1.2} />
      <rect x={36} y={bottom} width={330} height={6} className="fill-line-strong" />
      <rect x={36} y={300} width={330} height={6} className="fill-line-strong" />
      {placed.map((item, i) => (
        <g key={`a${i}`}>
          <rect x={item.x} y={bottom - item.h} width={item.w} height={item.h} rx={4} className={softTone[item.tone]} />
          <rect x={item.x + 5} y={bottom - item.h + 10} width={item.w - 10} height={8} rx={2} className="fill-canvas/60" />
        </g>
      ))}
      {placed.map((item, i) => (
        <rect
          key={`b${i}`}
          x={item.x}
          y={300 - item.h * 0.8}
          width={item.w}
          height={item.h * 0.8}
          rx={4}
          className={softTone[SHELF_ITEMS[(i + 3) % SHELF_ITEMS.length].tone]}
        />
      ))}

      <rect x={96} y={36} width={210} height={72} rx={10} className="fill-canvas stroke-accent" strokeWidth={1.5} />
      <Txt x={108} y={56} size={9} tone="ink">
        You may also like
      </Txt>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={108 + i * 64} y={64} width={54} height={32} rx={6} className="fill-accent/15 stroke-accent-text/40" />
          <Txt x={108 + i * 64 + 27} y={85} size={11} tone="accent" anchor="middle" weight={700}>
            {i + 1}
          </Txt>
        </g>
      ))}

      <rect
        x={picked.x - 4}
        y={bottom - picked.h - 4}
        width={picked.w + 8}
        height={picked.h + 8}
        rx={6}
        className="fill-none stroke-sky"
        strokeWidth={2}
      />
      <Chip x={picked.x - 6} y={bottom - picked.h - 28} label="picked" tone="sky" size={8} />
      {suggested.map((pick, i) => {
        const top = bottom - pick.h;
        const slotX = 135 + i * 64;
        const targetX = pick.x + pick.w / 2;
        return (
          <g key={i}>
            <rect
              x={pick.x - 4}
              y={top - 4}
              width={pick.w + 8}
              height={pick.h + 8}
              rx={6}
              className="viz-pulse fill-none stroke-accent"
              strokeWidth={2}
            />
            <Flow d={`M${slotX} 108 C ${slotX} 150, ${targetX} 150, ${targetX} ${top - 4}`} />
          </g>
        );
      })}

      <rect x={392} y={130} width={224} height={232} rx={12} className="fill-canvas stroke-line-strong" strokeWidth={1.2} />
      <Chip x={404} y={142} label="POST /recommend" tone="accent" />
      <Txt x={404} y={184} size={9}>
        context
      </Txt>
      <Txt x={404} y={198} size={9} tone="ink">
        [ picked_item ]
      </Txt>
      <Txt x={404} y={226} size={9}>
        suggest
      </Txt>
      {[0.9, 0.74, 0.6].map((score, i) => (
        <g key={i}>
          <circle cx={412} cy={246 + i * 26} r={8} className="fill-accent/15 stroke-accent-text/50" />
          <Txt x={412} y={249.5 + i * 26} size={9} tone="accent" anchor="middle">
            {i + 1}
          </Txt>
          <rect x={430} y={243 + i * 26} width={170} height={6} rx={3} className="fill-line-strong" />
          <rect x={430} y={243 + i * 26} width={170 * score} height={6} rx={3} className="fill-accent" />
        </g>
      ))}
      <Chip x={404} y={334} label="FastAPI" size={8} />
      <Chip x={404 + chipWidth("FastAPI", 8) + 5} y={334} label="Azure Blob" size={8} />
    </Canvas>
  );
}

/* ArchForge: one set of rooms drawn as a 2D plan and an isometric cutaway. */

const PLAN_W = 252;
const PLAN_D = 190;
const ROOMS: { name: string; box: [number, number, number, number]; tone: Tone }[] = [
  { name: "Living", box: [0, 0, 122, 110], tone: "accent" },
  { name: "Bed", box: [0, 110, 122, 190], tone: "sky" },
  { name: "Kitchen", box: [122, 0, 252, 90], tone: "amber" },
  { name: "Bath", box: [122, 90, 187, 190], tone: "sky" },
  { name: "Dining", box: [187, 90, 252, 190], tone: "accent" },
];
const PARTITIONS: [number, number, number, number][] = [
  [122, 0, 122, 190],
  [0, 110, 122, 110],
  [122, 90, 252, 90],
  [187, 90, 187, 190],
];
const WALL_H = 40;
const ISO = { cx: 446, cy: 112, scale: 0.55 };

function iso(x: number, y: number, z = 0): [number, number] {
  const u = x * ISO.scale;
  const v = y * ISO.scale;
  return [ISO.cx + (u - v) * 0.866, ISO.cy + (u + v) * 0.5 - z];
}
const pts = (points: [number, number][]) => points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

export function ArchForgeVisual(props: VisualProps) {
  const exports = ["IFC", "Blender", "FreeCAD", "anastruct"];
  let cursor = 12;
  return (
    <Canvas {...props}>
      <Window x={24} y={24} w={592} h={352} title="archforge · project.json">
        <rect x={8} y={38} width={292} height={254} rx={8} className="fill-surface stroke-line" />
        <g transform="translate(26 68)">
          {ROOMS.map((room) => {
            const [x0, y0, x1, y1] = room.box;
            return (
              <g key={room.name}>
                <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} className={softTone[room.tone]} strokeWidth={0} />
                <Txt x={(x0 + x1) / 2} y={(y0 + y1) / 2 + 3} size={9} anchor="middle" tone="ink">
                  {room.name}
                </Txt>
              </g>
            );
          })}
          {PARTITIONS.map(([x1, y1, x2, y2]) => (
            <line key={`${x1}${y1}${x2}${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-ink/55" strokeWidth={2} />
          ))}
          <rect x={0} y={0} width={PLAN_W} height={PLAN_D} fill="none" className="stroke-ink/80" strokeWidth={3.5} />
          <rect x={122 - 2} y={36} width={4} height={22} className="fill-canvas" />
          <path d="M122 36 A22 22 0 0 0 100 58" fill="none" className="stroke-ink/50" />
          <rect x={46} y={PLAN_D - 2} width={30} height={4} className="fill-canvas" />
          <line x1={0} x2={PLAN_W} y1={PLAN_D + 14} y2={PLAN_D + 14} className="stroke-muted" />
          <line x1={0} x2={0} y1={PLAN_D + 9} y2={PLAN_D + 19} className="stroke-muted" />
          <line x1={PLAN_W} x2={PLAN_W} y1={PLAN_D + 9} y2={PLAN_D + 19} className="stroke-muted" />
        </g>

        <rect x={312} y={38} width={272} height={254} rx={8} className="fill-surface stroke-line" />
        <g transform="translate(0 0)">
          <polygon
            points={pts([iso(0, 0), iso(0, PLAN_D), iso(0, PLAN_D, WALL_H), iso(0, 0, WALL_H)])}
            className="fill-line-strong/25 stroke-line-strong"
          />
          <polygon
            points={pts([iso(0, 0), iso(PLAN_W, 0), iso(PLAN_W, 0, WALL_H), iso(0, 0, WALL_H)])}
            className="fill-line-strong/40 stroke-line-strong"
          />
          {ROOMS.map((room) => {
            const [x0, y0, x1, y1] = room.box;
            return (
              <polygon
                key={room.name}
                points={pts([iso(x0, y0), iso(x1, y0), iso(x1, y1), iso(x0, y1)])}
                className={softTone[room.tone]}
              />
            );
          })}
          {PARTITIONS.map(([x1, y1, x2, y2]) => (
            <polygon
              key={`${x1}${y1}${x2}${y2}`}
              points={pts([iso(x1, y1), iso(x2, y2), iso(x2, y2, 16), iso(x1, y1, 16)])}
              className="fill-ink/15 stroke-ink/50"
            />
          ))}
          <polygon
            points={pts([iso(0, 0), iso(PLAN_W, 0), iso(PLAN_W, PLAN_D), iso(0, PLAN_D)])}
            fill="none"
            className="stroke-ink/80"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </g>
        <Txt x={324} y={56} size={8}>
          3D · live from the same JSON
        </Txt>
        <Txt x={20} y={56} size={8}>
          2D plan
        </Txt>

        {exports.map((name) => {
          const x = cursor;
          cursor += chipWidth(name) + 6;
          return <Chip key={name} x={x} y={304} label={name} tone="accent" />;
        })}
        <Txt x={580} y={317} size={8} anchor="end">
          export workers · subprocess
        </Txt>
      </Window>
    </Canvas>
  );
}
