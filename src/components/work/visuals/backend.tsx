import { Canvas, Chip, chipWidth, Flow, Node, Skel, softTone, Txt, Window, type Tone, type VisualProps } from "./kit";

/* ShiftKerja: live map with a radius search around a worker. */

const NEAR: [number, number][] = [
  [150, 150],
  [262, 168],
  [236, 262],
  [142, 236],
];
const FAR: [number, number][] = [
  [58, 78],
  [346, 86],
  [352, 296],
  [60, 300],
];
const SHIFTS = [
  { km: "2.1", w: 90 },
  { km: "3.4", w: 70 },
  { km: "4.8", w: 100 },
  { km: "6.2", w: 80 },
];

export function ShiftKerjaVisual(props: VisualProps) {
  return (
    <Canvas {...props}>
      <Window x={24} y={24} w={592} h={352} title="shiftkerja · live map">
        <rect x={8} y={36} width={384} height={308} rx={8} className="fill-surface stroke-line" />
        {[92, 152, 216, 282].map((y) => (
          <line key={`h${y}`} x1={8} x2={392} y1={y} y2={y} className="stroke-raised" strokeWidth={9} />
        ))}
        {[70, 142, 232, 312].map((x) => (
          <line key={`v${x}`} x1={x} x2={x} y1={36} y2={344} className="stroke-raised" strokeWidth={9} />
        ))}

        <circle cx={200} cy={190} r={112} className="viz-flow fill-accent/5 stroke-accent-text/50" strokeWidth={1.5} />
        <circle cx={200} cy={190} r={64} className="fill-none stroke-accent-text/20" />

        {FAR.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={5} className="fill-line-strong stroke-surface" strokeWidth={2} />
        ))}
        {NEAR.map(([x, y], i) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={6} className="fill-accent stroke-canvas" strokeWidth={2} />
            {i === 1 ? <circle cx={x} cy={y} r={6} className="viz-ring fill-none stroke-accent" strokeWidth={1.5} /> : null}
          </g>
        ))}

        <circle cx={200} cy={190} r={8} className="fill-sky stroke-canvas" strokeWidth={2} />
        <circle cx={200} cy={190} r={8} className="viz-ring fill-none stroke-sky" strokeWidth={1.5} />
        <Txt x={200} y={212} anchor="middle" size={9} tone="sky">
          worker
        </Txt>

        <path d="M268 164 276 156" className="stroke-accent-text/60" />
        <rect x={274} y={134} width={108} height={36} rx={7} className="fill-canvas stroke-accent-text/60" />
        <Txt x={283} y={149} size={9} tone="ink">
          Barista · today
        </Txt>
        <Txt x={283} y={162} size={9} tone="accent">
          2.1 km · OPEN
        </Txt>

        <Txt x={412} y={52} size={10}>
          Nearby shifts
        </Txt>
        {SHIFTS.map((shift, i) => {
          const y = 62 + i * 58;
          return (
            <g key={shift.km}>
              <rect
                x={404}
                y={y}
                width={180}
                height={50}
                rx={8}
                className={i === 0 ? "fill-accent/5 stroke-accent-text/60" : "fill-surface stroke-line"}
              />
              <Skel x={414} y={y + 11} w={shift.w} h={7} />
              <Txt x={414} y={y + 38} size={9}>
                {shift.km} km
              </Txt>
              <Chip x={576 - chipWidth("OPEN")} y={y + 24} label="OPEN" tone={i === 0 ? "accent" : "muted"} />
            </g>
          );
        })}

        <rect x={404} y={298} width={180} height={46} rx={8} className="fill-raised stroke-line" />
        <Txt x={414} y={317} size={9} tone="accent">
          GEORADIUS · 10 km
        </Txt>
        <Txt x={414} y={331} size={8}>
          Redis geo index, ms lookup
        </Txt>
      </Window>
    </Canvas>
  );
}

/* IkpiFlow: Kanban case board with deadline badges. */

type Due = { label: string; tone: Tone };
const STAGES = ["Intake", "In progress", "Filing", "Invoice"];
const BOARD: { tag: string; due: Due }[][] = [
  [
    { tag: "PPh 21 · Jun", due: { label: "H-7", tone: "sky" } },
    { tag: "PPN · Jun", due: { label: "H-3", tone: "amber" } },
  ],
  [
    { tag: "PPh 23 · Jun", due: { label: "H-3", tone: "amber" } },
    { tag: "SPT · 2025", due: { label: "H-7", tone: "sky" } },
    { tag: "PPh 21 · May", due: { label: "done", tone: "accent" } },
  ],
  [
    { tag: "PPN · May", due: { label: "done", tone: "accent" } },
    { tag: "PPh 25 · Jun", due: { label: "H-1", tone: "amber" } },
  ],
  [{ tag: "SPT · 2024", due: { label: "done", tone: "accent" } }],
];
const KPIS = [
  { label: "Active", value: "12", tone: "ink" as const },
  { label: "Overdue", value: "2", tone: "amber" as const },
  { label: "Due this week", value: "5", tone: "ink" as const },
];

export function IkpiFlowVisual(props: VisualProps) {
  const colX = (i: number) => 9 + i * 146;
  return (
    <Canvas {...props}>
      <Window x={24} y={24} w={592} h={352} title="ikpiflow · case board">
        {KPIS.map((kpi, i) => (
          <g key={kpi.label} transform={`translate(${colX(i)} 38)`}>
            <rect width={136} height={44} rx={8} className="fill-surface stroke-line" />
            <Txt x={10} y={17} size={9}>
              {kpi.label}
            </Txt>
            <Txt x={10} y={36} size={17} tone={kpi.tone} mono={false} weight={600}>
              {kpi.value}
            </Txt>
          </g>
        ))}
        <Chip x={584 - chipWidth("10-stage board")} y={52} label="10-stage board" tone="accent" />

        {STAGES.map((stage, col) => (
          <g key={stage}>
            <Txt x={colX(col) + 4} y={108} size={10} tone="ink">
              {stage}
            </Txt>
            <Txt x={colX(col) + 132} y={108} size={10} anchor="end">
              {BOARD[col].length}
            </Txt>
            <rect x={colX(col)} y={116} width={136} height={222} rx={8} className="fill-surface/60 stroke-line" />
            {BOARD[col].map((card, row) => {
              const y = 126 + row * 68;
              return (
                <g key={card.tag}>
                  <rect x={colX(col) + 8} y={y} width={120} height={60} rx={6} className="fill-canvas stroke-line" />
                  <Skel x={colX(col) + 16} y={y + 10} w={64} h={6} />
                  <Txt x={colX(col) + 16} y={y + 31} size={9} tone="ink">
                    {card.tag}
                  </Txt>
                  <Chip x={colX(col) + 16} y={y + 37} label={card.due.label} tone={card.due.tone} size={8} />
                </g>
              );
            })}
          </g>
        ))}

        <g className="viz-float">
          <g transform="translate(112 172) rotate(-5 60 30)">
            <rect x={3} y={5} width={120} height={60} rx={6} className="fill-black/20" />
            <rect width={120} height={60} rx={6} className="fill-canvas stroke-accent" strokeWidth={1.5} />
            <Skel x={8} y={10} w={64} h={6} tone="accent" />
            <Txt x={8} y={31} size={9} tone="ink">
              PPh 21 · Jun
            </Txt>
            <Chip x={8} y={37} label="H-7" tone="sky" size={8} />
          </g>
          <path d="M214 230 224 250 228 242 237 241Z" className="fill-ink stroke-canvas" strokeWidth={1} />
        </g>
      </Window>
    </Canvas>
  );
}

/* Gallery management: schedule, roles, upload and finance. */

const ROLES: { name: string; tone: Tone }[] = [
  { name: "Admin", tone: "accent" },
  { name: "Staff", tone: "sky" },
  { name: "Artist", tone: "amber" },
  { name: "Finance", tone: "muted" },
];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const BLOCKS: { d: number; r: number; span: number; tone: Tone }[] = [
  { d: 0, r: 0, span: 1, tone: "accent" },
  { d: 1, r: 1, span: 2, tone: "sky" },
  { d: 2, r: 0, span: 1, tone: "amber" },
  { d: 3, r: 2, span: 1, tone: "accent" },
  { d: 4, r: 1, span: 1, tone: "sky" },
  { d: 5, r: 0, span: 2, tone: "accent" },
  { d: 6, r: 2, span: 1, tone: "muted" },
];

export function GalleryVisual(props: VisualProps) {
  return (
    <Canvas {...props}>
      <Window x={24} y={24} w={592} h={352} title="gallery · schedule">
        <Txt x={12} y={52} size={9}>
          Roles
        </Txt>
        {ROLES.map((role, i) => (
          <g key={role.name} transform={`translate(8 ${62 + i * 32})`}>
            <rect width={92} height={24} rx={6} className="fill-surface stroke-line" />
            <circle cx={12} cy={12} r={4} className={softTone[role.tone]} strokeWidth={1.5} />
            <Txt x={24} y={16} size={9} tone="ink">
              {role.name}
            </Txt>
          </g>
        ))}

        {DAYS.map((day, i) => (
          <Txt key={day} x={112 + i * 66 + 33} y={52} size={9} anchor="middle">
            {day}
          </Txt>
        ))}
        {[0, 1, 2, 3].map((r) => (
          <line key={r} x1={112} x2={574} y1={62 + r * 40} y2={62 + r * 40} className="stroke-line" />
        ))}
        {BLOCKS.map((block) => (
          <rect
            key={`${block.d}-${block.r}`}
            x={112 + block.d * 66 + 3}
            y={62 + block.r * 40 + 3}
            width={60}
            height={block.span * 40 - 6}
            rx={5}
            className={softTone[block.tone]}
          />
        ))}

        <rect x={112} y={236} width={226} height={100} rx={8} className="fill-surface stroke-line" />
        <rect x={122} y={248} width={76} height={56} rx={5} className="fill-raised stroke-line-strong" />
        <path d="M122 296 144 272 160 288 174 276 198 300 198 304 122 304Z" className="fill-line-strong/70" />
        <circle cx={182} cy={262} r={5} className="fill-amber/60" />
        <Txt x={208} y={264} size={9} tone="ink">
          High-res upload
        </Txt>
        <rect x={208} y={276} width={120} height={6} rx={3} className="fill-line-strong" />
        <rect x={208} y={276} width={78} height={6} rx={3} className="fill-accent" />
        <Txt x={122} y={322} size={8}>
          Image upload in progress
        </Txt>

        <rect x={348} y={236} width={226} height={100} rx={8} className="fill-surface stroke-line" />
        <Txt x={360} y={254} size={9} tone="ink">
          Financial report
        </Txt>
        {[26, 40, 34, 52, 46, 62, 56].map((h, i) => (
          <rect
            key={i}
            x={362 + i * 30}
            y={326 - h}
            width={18}
            height={h}
            rx={3}
            className={i === 5 ? "fill-accent" : "fill-sky/40"}
          />
        ))}
      </Window>
    </Canvas>
  );
}

/* API gateway: clients, the gate, backend services. */

const CLIENTS = ["Web", "Mobile", "Partner"];
const STAGES_GW: { label: string; chips: string[] }[] = [
  { label: "Authentication", chips: ["JWT", "OAuth2"] },
  { label: "Rate limiting", chips: ["429"] },
  { label: "Dynamic routing", chips: ["rules"] },
];
const SERVICES = ["Service A", "Service B", "Service C"];

export function ApiGatewayVisual(props: VisualProps) {
  return (
    <Canvas {...props}>
      {CLIENTS.map((client, i) => (
        <Node key={client} x={30} y={112 + i * 68} w={92} h={44} label={client} />
      ))}

      <rect x={170} y={70} width={272} height={264} rx={16} className="fill-accent/5 stroke-accent-text/50" strokeWidth={1.2} />
      <Txt x={188} y={92} size={10} tone="accent">
        API GATEWAY
      </Txt>
      {STAGES_GW.map((stage, i) => {
        const y = 112 + i * 68;
        let cursor = 204;
        return (
          <g key={stage.label}>
            <rect x={188} y={y} width={236} height={52} rx={10} className="fill-canvas stroke-line-strong" />
            <Txt x={204} y={y + 22} size={11} tone="ink" mono={false} weight={600}>
              {stage.label}
            </Txt>
            {stage.chips.map((chip) => {
              const x = cursor;
              cursor += chipWidth(chip, 8) + 6;
              return <Chip key={chip} x={x} y={y + 28} label={chip} tone={chip === "429" ? "amber" : "accent"} size={8} />;
            })}
          </g>
        );
      })}

      {[0, 1, 2].map((i) => {
        const cy = 134 + i * 68;
        return <Flow key={i} d={`M122 ${cy} C 154 ${cy}, 160 138, 188 138`} tone="sky" />;
      })}
      <Flow d="M306 164 V180" />
      <Flow d="M306 232 V248" />

      {SERVICES.map((service, i) => {
        const y = 96 + i * 68;
        return (
          <g key={service}>
            <Node x={502} y={y} w={108} h={44} label={service} icon="box" />
            <Flow d={`M424 274 C 464 274, 464 ${y + 22}, 502 ${y + 22}`} />
          </g>
        );
      })}
      <rect x={502} y={300} width={108} height={40} rx={10} className="fill-none stroke-sky/60" strokeDasharray="4 4" />
      <Txt x={556} y={324} size={9} tone="sky" anchor="middle">
        + new service
      </Txt>
      <Flow d="M424 274 C 464 274, 464 320, 502 320" tone="sky" dim />

      <Chip x={190} y={348} label="401" tone="amber" />
      <Txt x={226} y={359} size={9}>
        rejected at the gate, never reaches a service
      </Txt>
    </Canvas>
  );
}

/* Asset onboarding: OneDrive to Azure Blob to retail APIs, inside one container. */

export function AssetOnboardingVisual(props: VisualProps) {
  return (
    <Canvas {...props}>
      <Node x={28} y={168} w={136} h={60} label="OneDrive" sub="source files" icon="cloud" />

      <rect x={196} y={86} width={176} height={228} rx={14} className="fill-none stroke-line-strong" strokeDasharray="5 5" />
      <Txt x={210} y={106} size={9}>
        docker
      </Txt>
      <Node x={212} y={120} w={144} h={44} label="Pull files" icon="bolt" />
      <Node x={212} y={176} w={144} h={44} label="Upload" icon="bolt" />
      <Node x={212} y={232} w={144} h={44} label="Publish + tag" icon="bolt" tone="accent" />

      <Node x={430} y={50} w={186} h={60} label="Azure Blob Storage" sub="asset storage" icon="db" tone="sky" />
      <Node x={430} y={170} w={186} h={60} label="Vusion Rail API" sub="publish and tag" icon="api" tone="accent" />
      <Node x={430} y={270} w={186} h={60} label="Korona Cloud API" sub="publish and tag" icon="api" tone="accent" />

      <Flow d="M164 198 C 184 198, 192 142, 212 142" tone="sky" />
      <Flow d="M284 164 V176" dim />
      <Flow d="M284 220 V232" dim />
      <Flow d="M356 198 C 394 198, 398 80, 430 80" tone="sky" />
      <Flow d="M356 254 C 394 254, 398 200, 430 200" />
      <Flow d="M356 254 C 394 254, 398 300, 430 300" />
      <Txt x={376} y={186} size={8}>
        upload
      </Txt>
      <Txt x={376} y={276} size={8}>
        dynamic
      </Txt>
    </Canvas>
  );
}
