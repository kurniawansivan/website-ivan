import type { JSX } from "react";
import type { Locale, Localized } from "@/lib/i18n";
import { ArchForgeVisual, MoodRootVisual, ReceiptVisual, SmartSellerVisual, WarehouseVisual } from "./apps";
import { ApiGatewayVisual, AssetOnboardingVisual, GalleryVisual, IkpiFlowVisual, ShiftKerjaVisual } from "./backend";
import { FpGrowthVisual, PeopleAnalyticsVisual, RecommendationVisual, RoboTradeVisual } from "./data";
import type { VisualProps } from "./kit";

/** How honest the caption must be: architecture comes from the project's docs; the rest is illustrative. */
export type FigureKind = "architecture" | "interface" | "schematic";

interface VisualEntry {
  Component: (props: VisualProps) => JSX.Element;
  figure: FigureKind;
  alt: Localized<string>;
}

const registry: Record<string, VisualEntry> = {
  shiftkerja: {
    Component: ShiftKerjaVisual,
    figure: "interface",
    alt: {
      en: "Map showing a 10 km search radius around a worker, with nearby open shifts listed beside it.",
      id: "Peta dengan radius pencarian 10 km di sekitar pekerja, dan daftar shift terbuka di sampingnya.",
    },
  },
  ikpiflow: {
    Component: IkpiFlowVisual,
    figure: "interface",
    alt: {
      en: "Kanban case board with tax obligations moving between stages and deadline badges.",
      id: "Papan kasus Kanban dengan kewajiban pajak berpindah antar tahap dan lencana tenggat.",
    },
  },
  "smart-seller": {
    Component: SmartSellerVisual,
    figure: "interface",
    alt: {
      en: "A retail shelf with a display suggesting three products, backed by a recommendation API.",
      id: "Rak retail dengan layar yang menyarankan tiga produk, didukung API rekomendasi.",
    },
  },
  robotrade: {
    Component: RoboTradeVisual,
    figure: "interface",
    alt: {
      en: "Trading dashboard with candlesticks, moving averages, a bracket order and risk limits.",
      id: "Dashboard trading dengan candlestick, moving average, bracket order, dan batas risiko.",
    },
  },
  "recommendation-engine": {
    Component: RecommendationVisual,
    figure: "schematic",
    alt: {
      en: "Item graph where cart items link to the top recommended items, with a cold-start fallback and evaluation bars.",
      id: "Grafik item tempat item di keranjang terhubung ke item rekomendasi teratas, dengan fallback cold-start dan batang evaluasi.",
    },
  },
  moodroot: {
    Component: MoodRootVisual,
    figure: "interface",
    alt: {
      en: "Two phone screens: a monthly mood heatmap and a weekly summary.",
      id: "Dua layar ponsel: heatmap suasana hati bulanan dan ringkasan mingguan.",
    },
  },
  "jb-warehouse": {
    Component: WarehouseVisual,
    figure: "interface",
    alt: {
      en: "Two phone screens: a stock list and a profit overview.",
      id: "Dua layar ponsel: daftar stok dan ringkasan profit.",
    },
  },
  "gallery-management": {
    Component: GalleryVisual,
    figure: "interface",
    alt: {
      en: "Weekly artist schedule with a role legend, an image upload and a financial report.",
      id: "Jadwal seniman mingguan dengan legenda peran, unggah gambar, dan laporan keuangan.",
    },
  },
  "api-gateway": {
    Component: ApiGatewayVisual,
    figure: "architecture",
    alt: {
      en: "Diagram of clients passing through authentication, rate limiting and routing to backend services.",
      id: "Diagram klien melewati autentikasi, rate limiting, dan routing ke layanan backend.",
    },
  },
  "asset-onboarding": {
    Component: AssetOnboardingVisual,
    figure: "architecture",
    alt: {
      en: "Pipeline from OneDrive through a worker to Azure Blob Storage and two retail APIs.",
      id: "Pipeline dari OneDrive lewat worker ke Azure Blob Storage dan dua API retail.",
    },
  },
  "fp-growth-analysis": {
    Component: FpGrowthVisual,
    figure: "schematic",
    alt: {
      en: "An FP-tree beside a list of association rules.",
      id: "Pohon FP di samping daftar association rule.",
    },
  },
  "people-analytics": {
    Component: PeopleAnalyticsVisual,
    figure: "schematic",
    alt: {
      en: "Three charts: attendance trend with an anomaly, productivity bars and a sentiment split.",
      id: "Tiga grafik: tren kehadiran dengan anomali, batang produktivitas, dan pembagian sentimen.",
    },
  },
  receiptscribe: {
    Component: ReceiptVisual,
    figure: "interface",
    alt: {
      en: "A receipt being scanned and converted into structured expense fields.",
      id: "Struk yang dipindai dan diubah menjadi kolom pengeluaran terstruktur.",
    },
  },
  archforge: {
    Component: ArchForgeVisual,
    figure: "interface",
    alt: {
      en: "A 2D floor plan next to an isometric 3D view, with export format badges.",
      id: "Denah 2D di samping tampilan 3D isometrik, dengan lencana format ekspor.",
    },
  },
};

export function ProjectVisual({ slug, compact, label }: VisualProps & { slug: string }) {
  const entry = registry[slug];
  if (!entry) return null;
  const { Component } = entry;
  return <Component compact={compact} label={label} />;
}

export function getVisualMeta(slug: string, locale: Locale): { figure: FigureKind; alt: string } | null {
  const entry = registry[slug];
  return entry ? { figure: entry.figure, alt: entry.alt[locale] } : null;
}
