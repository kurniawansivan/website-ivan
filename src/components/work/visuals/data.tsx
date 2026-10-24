import { Canvas, Chip, chipWidth, Flow, seeded, Txt, Window, type VisualProps } from "./kit";

/* RoboTrade: candlesticks, moving averages and a bracket order. All values are synthetic. */

interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
}

function buildCandles(): Candle[] {
  const rnd = seeded(7);
  const candles: Candle[] = [];
  let price = 100;
  for (let i = 0; i < 40; i++) {
    const drift = i < 14 ? -0.3 : 0.32;
    const open = price;
    const close = open + drift + (rnd() - 0.5) * 5;
    candles.push({
      open,
      close,
      high: Math.max(open, close) + rnd() * 2.5,
      low: Math.min(open, close) - rnd() * 2.5,
    });
    price = close;
  }
  return candles;
}

function ema(values: number[], alpha: number): number[] {
  const out: number[] = [];
  values.forEach((value, i) => out.push(i === 0 ? value : out[i - 1] + alpha * (value - out[i - 1])));
  return out;
}

const CANDLES = buildCandles();
const CLOSES = CANDLES.map((c) => c.close);
const FAST = ema(CLOSES, 2 / 21);
const SLOW = ema(CLOSES, 0.05);
const PRICE_MIN = Math.min(...CANDLES.map((c) => c.low)) - 2;
const PRICE_MAX = Math.max(...CANDLES.map((c) => c.high)) + 14;
const PLOT = { x: 20, top: 82, h: 216, step: 9.2 };
const toY = (price: number) => PLOT.top + PLOT.h - ((price - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * PLOT.h;
const toX = (i: number) => PLOT.x + i * PLOT.step;
const ENTRY = 24;
const ENTRY_PRICE = CANDLES[ENTRY].close;
const SL_PRICE = ENTRY_PRICE - 4.5;
const TP_PRICE = ENTRY_PRICE + 13.5;
const line = (values: number[]) => values.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");

const FILTERS = ["EMA 20 / 200", "1h trend filter", "MACD confirm", "RSI", "Volume"];

export function RoboTradeVisual(props: VisualProps) {
  const tabs = ["BTC", "ETH", "SOL", "BNB", "XRP"];
  let cursor = 8;
  return (
    <Canvas {...props}>
      <Window x={24} y={24} w={592} h={352} title="robotrade · dashboard">
        {tabs.map((tab, i) => {
          const x = cursor;
          cursor += chipWidth(tab) + 6;
          return <Chip key={tab} x={x} y={36} label={tab} tone={i === 0 ? "accent" : "muted"} />;
        })}
        <Chip x={584 - chipWidth("PAPER")} y={36} label="PAPER" tone="amber" />

        <rect x={8} y={62} width={384} height={282} rx={8} className="fill-surface stroke-line" />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={14} x2={386} y1={92 + i * 62} y2={92 + i * 62} className="stroke-line" />
        ))}

        <polyline points={line(SLOW)} fill="none" className="stroke-sky" strokeWidth={1.6} />
        {CANDLES.map((candle, i) => {
          const up = candle.close >= candle.open;
          const top = toY(Math.max(candle.open, candle.close));
          const bottom = toY(Math.min(candle.open, candle.close));
          return (
            <g key={i} className={up ? "fill-accent stroke-accent" : "fill-amber stroke-amber"}>
              <line x1={toX(i)} x2={toX(i)} y1={toY(candle.high)} y2={toY(candle.low)} strokeWidth={1} />
              <rect x={toX(i) - 2.6} y={top} width={5.2} height={Math.max(2, bottom - top)} rx={0.8} stroke="none" />
            </g>
          );
        })}
        <polyline points={line(FAST)} fill="none" className="stroke-ink/80" strokeWidth={1.4} />

        <line x1={toX(ENTRY)} x2={384} y1={toY(TP_PRICE)} y2={toY(TP_PRICE)} className="stroke-accent-text" strokeDasharray="4 3" />
        <line x1={toX(ENTRY)} x2={384} y1={toY(SL_PRICE)} y2={toY(SL_PRICE)} className="stroke-amber" strokeDasharray="4 3" />
        <Txt x={384} y={toY(TP_PRICE) - 5} size={8} tone="accent" anchor="end">
          TP 3x SL
        </Txt>
        <Txt x={384} y={toY(SL_PRICE) + 12} size={8} tone="amber" anchor="end">
          SL 1.5x ATR
        </Txt>
        <path
          d={`M${toX(ENTRY)} ${toY(CANDLES[ENTRY].low) + 6} l-5 9 h10 z`}
          className="fill-accent stroke-canvas"
          strokeWidth={1}
        />
        <Txt x={toX(ENTRY)} y={toY(CANDLES[ENTRY].low) + 28} size={8} tone="accent" anchor="middle">
          BUY
        </Txt>

        <Txt x={14} y={336} size={8}>
          <tspan className="fill-ink">— EMA 20</tspan>
          <tspan dx={10} className="fill-sky">
            — EMA 200
          </tspan>
          <tspan dx={10}>5m candles · WebSocket</tspan>
        </Txt>

        <rect x={404} y={62} width={180} height={168} rx={8} className="fill-surface stroke-line" />
        <Txt x={414} y={80} size={9} tone="ink">
          Signal filters
        </Txt>
        {FILTERS.map((name, i) => (
          <g key={name}>
            <Txt x={414} y={103 + i * 24} size={9}>
              {name}
            </Txt>
            <path
              d={`M566 ${99 + i * 24} l4 4 l8 -9`}
              fill="none"
              className="stroke-accent-text"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ))}

        <rect x={404} y={240} width={180} height={104} rx={8} className="fill-surface stroke-line" />
        <Txt x={414} y={258} size={9} tone="ink">
          Risk manager
        </Txt>
        <Chip x={414} y={268} label="1% per trade" tone="accent" size={8} />
        <Chip x={414 + chipWidth("1% per trade", 8) + 6} y={268} label="5x cap" tone="sky" size={8} />
        <Chip x={414} y={292} label="4% daily drawdown gate" tone="amber" size={8} />
        <Txt x={414} y={330} size={8}>
          kill switch · Telegram alerts
        </Txt>
      </Window>
    </Canvas>
  );
}

/* Recommendation engine: item graph, cold-start fallback and a schematic evaluation. */

interface GraphNode {
  id: string;
  x: number;
  y: number;
  kind: "cart" | "rec" | "other";
  rank?: number;
}

const NODES: GraphNode[] = [
  { id: "c1", x: 120, y: 190, kind: "cart" },
  { id: "c2", x: 150, y: 296, kind: "cart" },
  { id: "r1", x: 280, y: 112, kind: "rec", rank: 1 },
  { id: "r2", x: 336, y: 222, kind: "rec", rank: 2 },
  { id: "r3", x: 276, y: 318, kind: "rec", rank: 3 },
  { id: "o1", x: 56, y: 96, kind: "other" },
  { id: "o2", x: 188, y: 58, kind: "other" },
  { id: "o3", x: 372, y: 80, kind: "other" },
  { id: "o4", x: 52, y: 318, kind: "other" },
  { id: "o5", x: 220, y: 204, kind: "other" },
];
const EDGES: [string, string, number][] = [
  ["c1", "r1", 4],
  ["c1", "o5", 3],
  ["c1", "c2", 2],
  ["c2", "r3", 4],
  ["c2", "r2", 2],
  ["o5", "r2", 3],
  ["o5", "r1", 2],
  ["c1", "o1", 1],
  ["o2", "r1", 1],
  ["o3", "r2", 1],
  ["c2", "o4", 1],
  ["o2", "c1", 1],
];
const node = (id: string) => NODES.find((n) => n.id === id)!;

export function RecommendationVisual(props: VisualProps) {
  const evaluation = [
    { k: "k=1", p: 70, r: 26 },
    { k: "k=3", p: 52, r: 48 },
    { k: "k=5", p: 40, r: 64 },
  ];
  return (
    <Canvas {...props}>
      {EDGES.map(([a, b, weight]) => {
        const from = node(a);
        const to = node(b);
        const toRec = to.kind === "rec" || from.kind === "rec";
        return (
          <line
            key={`${a}-${b}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            className={toRec ? "stroke-accent-text/60" : "stroke-line-strong"}
            strokeWidth={0.8 + weight * 0.7}
            strokeLinecap="round"
          />
        );
      })}
      {NODES.map((n) =>
        n.kind === "cart" ? (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={15} className="fill-sky stroke-canvas" strokeWidth={2} />
            <Chip x={n.x - 18} y={n.y + 20} label="cart" tone="sky" size={8} />
          </g>
        ) : n.kind === "rec" ? (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={16} className="viz-ring fill-none stroke-accent" strokeWidth={1.5} />
            <circle cx={n.x} cy={n.y} r={16} className="fill-canvas stroke-accent" strokeWidth={2} />
            <Txt x={n.x} y={n.y + 4} anchor="middle" size={12} tone="accent" weight={700}>
              {n.rank}
            </Txt>
          </g>
        ) : (
          <circle key={n.id} cx={n.x} cy={n.y} r={9} className="fill-line-strong stroke-surface" strokeWidth={2} />
        ),
      )}
      <Txt x={30} y={40} size={9}>
        co-purchase graph · item-based CF
      </Txt>

      <rect x={420} y={34} width={192} height={150} rx={12} className="fill-canvas stroke-line-strong" />
      <Txt x={434} y={56} size={10} tone="ink">
        Hybrid fallback
      </Txt>
      <rect x={434} y={68} width={164} height={30} rx={8} className="fill-accent/10 stroke-accent-text/50" />
      <Txt x={446} y={87} size={9} tone="accent">
        known item: CF
      </Txt>
      <rect x={434} y={122} width={164} height={50} rx={8} className="fill-surface stroke-line-strong" />
      <Txt x={446} y={142} size={9} tone="ink">
        cold start
      </Txt>
      <Txt x={446} y={158} size={8}>
        most purchased + category
      </Txt>
      <Flow d="M516 98 V122" tone="amber" dim />
      <Txt x={524} y={114} size={8} tone="amber">
        new item
      </Txt>

      <rect x={420} y={200} width={192} height={166} rx={12} className="fill-canvas stroke-line-strong" />
      <Txt x={434} y={222} size={10} tone="ink">
        Evaluation
      </Txt>
      {evaluation.map((group, i) => {
        const x = 440 + i * 56;
        return (
          <g key={group.k}>
            <rect x={x} y={340 - group.p} width={18} height={group.p} rx={3} className="fill-accent" />
            <rect x={x + 22} y={340 - group.r} width={18} height={group.r} rx={3} className="fill-sky" />
            <Txt x={x + 20} y={355} size={8} anchor="middle">
              {group.k}
            </Txt>
          </g>
        );
      })}
      <Chip x={500} y={209} label="P@k" tone="accent" size={8} />
      <Chip x={548} y={209} label="R@k" tone="sky" size={8} />
    </Canvas>
  );
}

/* FP-Growth: a prefix tree and the association rules mined from it. Labels and counts are synthetic. */

const TREE = [
  { label: "null", count: "", x: 190, y: 64, parent: -1, hot: true },
  { label: "A", count: "8", x: 110, y: 140, parent: 0, hot: true },
  { label: "B", count: "2", x: 270, y: 140, parent: 0, hot: false },
  { label: "B", count: "5", x: 66, y: 216, parent: 1, hot: true },
  { label: "C", count: "3", x: 154, y: 216, parent: 1, hot: false },
  { label: "C", count: "2", x: 270, y: 216, parent: 2, hot: false },
  { label: "C", count: "3", x: 66, y: 292, parent: 3, hot: true },
  { label: "D", count: "2", x: 154, y: 292, parent: 4, hot: false },
];
const RULES = [
  { rule: "{A, B} → C", support: 0.62, confidence: 0.9 },
  { rule: "{A} → B", support: 0.8, confidence: 0.62 },
  { rule: "{C} → D", support: 0.35, confidence: 0.74 },
];

export function FpGrowthVisual(props: VisualProps) {
  let cursor = 30;
  const steps = ["clean", "itemsets", "rules", "report"];
  return (
    <Canvas {...props}>
      <Txt x={30} y={36} size={9}>
        FP-tree · frequent itemsets
      </Txt>
      {TREE.map((n, i) =>
        n.parent >= 0 ? (
          <line
            key={`e${i}`}
            x1={TREE[n.parent].x}
            y1={TREE[n.parent].y}
            x2={n.x}
            y2={n.y}
            className={n.hot ? "stroke-accent-text" : "stroke-line-strong"}
            strokeWidth={n.hot ? 2 : 1.2}
          />
        ) : null,
      )}
      {TREE.map((n, i) => (
        <g key={`n${i}`}>
          <circle cx={n.x} cy={n.y} r={n.label === "null" ? 18 : 20} className={n.hot ? "fill-canvas stroke-accent" : "fill-surface stroke-line-strong"} strokeWidth={2} />
          {n.label === "null" ? (
            <Txt x={n.x} y={n.y + 3} anchor="middle" size={9}>
              null
            </Txt>
          ) : (
            <>
              <Txt x={n.x} y={n.y - 1} anchor="middle" size={13} tone="ink" weight={700} mono={false}>
                {n.label}
              </Txt>
              <Txt x={n.x} y={n.y + 11} anchor="middle" size={8} tone={n.hot ? "accent" : "muted"}>
                {n.count}
              </Txt>
            </>
          )}
        </g>
      ))}

      <rect x={372} y={30} width={244} height={254} rx={12} className="fill-canvas stroke-line-strong" />
      <Txt x={386} y={52} size={10} tone="ink">
        Association rules
      </Txt>
      {RULES.map((rule, i) => {
        const y = 66 + i * 72;
        return (
          <g key={rule.rule}>
            <rect x={384} y={y} width={220} height={62} rx={8} className="fill-surface stroke-line" />
            <Txt x={394} y={y + 20} size={11} tone="ink">
              {rule.rule}
            </Txt>
            <Txt x={394} y={y + 38} size={8}>
              support
            </Txt>
            <rect x={446} y={y + 33} width={100} height={5} rx={2.5} className="fill-line-strong" />
            <rect x={446} y={y + 33} width={100 * rule.support} height={5} rx={2.5} className="fill-sky" />
            <Txt x={394} y={y + 52} size={8}>
              confidence
            </Txt>
            <rect x={446} y={y + 47} width={100} height={5} rx={2.5} className="fill-line-strong" />
            <rect x={446} y={y + 47} width={100 * rule.confidence} height={5} rx={2.5} className="fill-accent" />
            <Chip x={604 - 10 - chipWidth("lift", 8)} y={y + 8} label="lift" tone="accent" size={8} />
          </g>
        );
      })}

      {steps.map((step, i) => {
        const x = cursor;
        cursor += chipWidth(step) + 26;
        return (
          <g key={step}>
            <Chip x={x} y={330} label={step} tone={i === steps.length - 1 ? "accent" : "muted"} />
            {i < steps.length - 1 ? (
              <Txt x={x + chipWidth(step) + 4} y={343} size={10}>
                →
              </Txt>
            ) : null}
          </g>
        );
      })}
      <Txt x={612} y={343} size={8} anchor="end">
        sample data
      </Txt>
    </Canvas>
  );
}

/* People analytics: three small charts. All values are synthetic. */

const ATTENDANCE = [0.4, 0.5, 0.45, 0.6, 0.55, 0.22, 0.62, 0.58, 0.66, 0.6];
const PRODUCTIVITY = [0.5, 0.7, 0.6, 0.85, 0.55, 0.9, 0.75];
const SENTIMENT = [
  [0.55, 0.3, 0.15],
  [0.5, 0.32, 0.18],
  [0.62, 0.28, 0.1],
  [0.48, 0.3, 0.22],
];

export function PeopleAnalyticsVisual(props: VisualProps) {
  const panels = [24, 225, 426];
  const chart = { x: 14, top: 44, w: 162, h: 150 };
  const points = ATTENDANCE.map((v, i) => [chart.x + (i / (ATTENDANCE.length - 1)) * chart.w, chart.top + chart.h - v * chart.h]);
  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  let cursor = 24;
  return (
    <Canvas {...props}>
      {["behavior", "performance", "engagement"].map((label, i) => {
        const x = cursor;
        cursor += chipWidth(label) + 8;
        return <Chip key={label} x={x} y={26} label={label} tone={i === 0 ? "accent" : i === 1 ? "sky" : "amber"} />;
      })}

      {panels.map((x) => (
        <rect key={x} x={x} y={62} width={190} height={236} rx={12} className="fill-canvas stroke-line-strong" />
      ))}

      <g transform={`translate(${panels[0]} 62)`}>
        <Txt x={14} y={24} size={10} tone="ink">
          Attendance
        </Txt>
        <path d={`${path} L${chart.x + chart.w} ${chart.top + chart.h} L${chart.x} ${chart.top + chart.h}Z`} className="fill-accent/10" />
        <path d={path} fill="none" className="stroke-accent-text" strokeWidth={2} strokeLinejoin="round" />
        <circle cx={points[5][0]} cy={points[5][1]} r={8} className="viz-ring fill-none stroke-amber" strokeWidth={1.5} />
        <circle cx={points[5][0]} cy={points[5][1]} r={4.5} className="fill-amber stroke-canvas" strokeWidth={1.5} />
        <Chip x={points[5][0] + 10} y={points[5][1] - 8} label="anomaly" tone="amber" size={8} />
        <Txt x={14} y={222} size={8}>
          trend + anomaly detection
        </Txt>
      </g>

      <g transform={`translate(${panels[1]} 62)`}>
        <Txt x={14} y={24} size={10} tone="ink">
          Productivity
        </Txt>
        {PRODUCTIVITY.map((v, i) => (
          <rect
            key={i}
            x={16 + i * 24}
            y={194 - v * 150}
            width={16}
            height={v * 150}
            rx={3}
            className={i === 5 ? "fill-accent" : "fill-sky/40"}
          />
        ))}
        <Txt x={14} y={222} size={8}>
          output per period
        </Txt>
      </g>

      <g transform={`translate(${panels[2]} 62)`}>
        <Txt x={14} y={24} size={10} tone="ink">
          Sentiment
        </Txt>
        {SENTIMENT.map((row, i) => {
          const y = 48 + i * 36;
          let offset = 36;
          const tones = ["fill-accent", "fill-line-strong", "fill-amber"];
          return (
            <g key={i}>
              <Txt x={14} y={y + 11} size={8}>
                W{i + 1}
              </Txt>
              {row.map((share, j) => {
                const w = share * 140;
                const x = offset;
                offset += w;
                return <rect key={j} x={x} y={y} width={Math.max(0, w - 2)} height={16} rx={3} className={tones[j]} />;
              })}
            </g>
          );
        })}
        <Chip x={14} y={204} label="pos" tone="accent" size={8} />
        <Chip x={14 + chipWidth("pos", 8) + 5} y={204} label="neu" size={8} />
        <Chip x={14 + chipWidth("pos", 8) + chipWidth("neu", 8) + 10} y={204} label="neg" tone="amber" size={8} />
      </g>

      <Txt x={320} y={330} size={9} anchor="middle">
        structured + unstructured data → insights
      </Txt>
      <Txt x={320} y={348} size={8} anchor="middle">
        sample data
      </Txt>
    </Canvas>
  );
}

