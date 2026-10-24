import type { Locale } from "@/lib/i18n";

const en = {
  meta: {
    title: "Ivan Kurniawan Sentosa — Backend Engineer",
    description:
      "Ivan Kurniawan Sentosa is a backend engineer who builds APIs, data pipelines and mobile apps: recommendation systems, real-time marketplaces and trading tools. Based in Bali, Indonesia.",
    workTitle: "Selected work",
    workDescription:
      "Case studies by Ivan Kurniawan Sentosa: backend systems, mobile apps, recommendation engines and crypto trading tools.",
  },
  nav: {
    work: "Work",
    services: "Services",
    about: "About",
    experience: "Experience",
    connect: "Connect",
    home: "Home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skip: "Skip to content",
    switchLanguage: "Switch language",
    toggleTheme: "Toggle theme",
    primary: "Primary",
  },
  hero: {
    available: "Open to new projects",
    eyebrow: "backend · fullstack · data",
    roles: ["Backend Engineer", "Fullstack Developer", "Data & Recsys Builder", "Crypto Tooling"],
    lead: "I design APIs, data pipelines and mobile apps that stay fast, traceable and easy to hand over, from recommendation engines for retail to real-time marketplaces and trading tools.",
    ctaWork: "View work",
    ctaTalk: "Let's talk",
    showcase: {
      title: "production builds",
      note: "case studies inside",
      delivered: "Delivered",
      open: "Open repo",
      footer: "Client builds are private. The open repo runs on CI with e2e tests.",
      viewAll: "All work",
    },
  },
  proof: {
    years: "years building backends",
    repos: "public repositories",
    languages: "languages in use",
    cases: "case studies",
  },
  work: {
    eyebrow: "Selected work",
    title: "Blocks I've shipped.",
    intro:
      "A mix of client work, side builds and research. Every card is a block: open one for the details.",
    viewAll: "All work",
    filterLabel: "Filter projects by category",
    filters: { all: "All", backend: "Backend", mobile: "Mobile", data: "Data", crypto: "Crypto", ai: "AI" },
    kind: { work: "Work", personal: "Personal", research: "Research" },
    index: {
      eyebrow: "Work",
      title: "Every block, in order.",
      intro:
        "Client work, personal builds and research. Filter by discipline, or open a block for the full write-up.",
    },
  },
  services: {
    eyebrow: "Services",
    title: "What I can build for you.",
    intro:
      "One engineer, a direct line, no hand-offs. You talk to the person writing the code.",
    items: [
      {
        title: "Backend & APIs",
        body: "Services in Python, Go or NestJS with clean boundaries, solid auth and tests. Written so the next engineer can read them.",
        points: ["REST & WebSocket APIs", "Auth, roles & multi-tenancy", "Queues, cron & integrations"],
      },
      {
        title: "Fullstack web",
        body: "Next.js or Vue front ends wired to those APIs: dashboards, internal tools and marketplaces that feel quick on any device.",
        points: ["Dashboards & admin tools", "Marketplaces & booking flows", "SEO-ready, responsive UIs"],
      },
      {
        title: "Mobile apps",
        body: "Flutter apps for iOS and Android with offline-friendly storage and a backend that fits, from warehouse tools to AI-assisted diaries.",
        points: ["Flutter for iOS & Android", "Local-first storage", "Camera, charts & notifications"],
      },
      {
        title: "Data & AI",
        body: "Recommendation systems, analytics and LLM integrations that turn raw data into something people can act on.",
        points: ["Recommenders & pattern mining", "LLM & vision pipelines", "Exchange-connected trading tools"],
      },
    ],
    processTitle: "How a project runs.",
    steps: [
      { title: "Discover", body: "Pin down the problem, users and constraints in a short written brief." },
      { title: "Design", body: "Data model, API contract and key decisions written down before code." },
      { title: "Build", body: "Small, tested increments you can try every week." },
      { title: "Hand over", body: "Docs, deploy scripts and a walkthrough, so you're never locked in." },
    ],
  },
  about: {
    eyebrow: "About",
    title: "Backend first. The whole product in mind.",
    paragraphs: [
      "I'm Ivan, a backend engineer based in Bali. Since 2021 I've worked across web, data and mobile: Shopify systems, microservices, recommendation logic for a smart retail shelf and Flutter apps for real businesses.",
      "My path started in data analysis, mining jewelry sales with FP-Growth, and the habit stuck: I like systems that measure themselves, explain their decisions and keep a trail.",
      "Outside client work I build in public on GitHub: a geo-spatial shift marketplace, a multi-tenant case board, a crypto trading bot and a few AI-assisted apps.",
    ],
    principlesTitle: "Working principles",
    principles: [
      {
        title: "Write decisions down",
        body: "ADRs, high-level designs and tickets live next to the code, so the why never gets lost.",
      },
      {
        title: "Type the boundaries",
        body: "Strict typing and shared schemas where services meet: Pydantic, Zod, strict mypy.",
      },
      {
        title: "Keep an audit trail",
        body: "Append-only logs, cached decisions and reproducible backtests. If it happened, you can replay it.",
      },
    ],
    toolbeltTitle: "Toolbelt",
    toolbelt: [
      { title: "Backend", items: ["Python", "FastAPI", "Go", "NestJS", "Node.js", "SQLAlchemy", "Prisma", "JWT / OAuth2"] },
      { title: "Data stores", items: ["PostgreSQL", "PostGIS", "TimescaleDB", "Redis", "SQLite", "Azure Blob Storage"] },
      { title: "Frontend", items: ["TypeScript", "Next.js", "React", "Vue", "Svelte", "Tailwind CSS"] },
      { title: "Mobile", items: ["Flutter", "Dart", "Riverpod", "Isar"] },
      { title: "Data & AI", items: ["Pandas", "NumPy", "Matplotlib", "FP-Growth", "Collaborative filtering", "OpenAI API", "Claude API"] },
      { title: "Delivery", items: ["Docker", "CI/CD", "Azure", "Vercel", "Git"] },
    ],
  },
  experience: {
    eyebrow: "Experience",
    title: "The chain so far.",
    intro: "Newest block on top. Every role builds on the one before it.",
    blockLabel: "block",
    parentLabel: "parent",
    items: [
      {
        role: "Backend Engineer",
        org: "Wolkk",
        period: "Jan 2025 — Present",
        type: "Full-time",
        points: [
          "Engineer and maintain microservices for scalable applications.",
          "Design and implement robust API endpoints.",
          "Work with frontend teams to integrate backend services.",
        ],
      },
      {
        role: "Backend Engineer",
        org: "Wolkk",
        period: "Jul 2024 — Dec 2024",
        type: "Contract",
        points: [
          "Developed new API endpoints for several client projects.",
          "Optimised database queries for better performance.",
          "Joined code reviews and architectural discussions.",
        ],
      },
      {
        role: "Web Technical",
        org: "PT Praijing Sinar Abadi",
        period: "Aug 2021 — Present",
        type: "",
        points: [
          "Built and maintained internal web systems, including Shopify-based work.",
          "Provided technical support and troubleshooting for web applications.",
          "Shipped new features from business requirements.",
        ],
      },
      {
        role: "Data Analyst",
        org: "CV Samapura Jewelry",
        period: "Dec 2021 — Dec 2022",
        type: "",
        points: [
          "Identified trends, patterns and correlations in transactional data.",
          "Cleaned and preprocessed raw purchase-order data.",
          "Built visualisations and reports to inform business decisions.",
        ],
      },
      {
        role: "B.Sc. Informatics Engineering",
        org: "Universitas Primakara",
        period: "2019 — 2023",
        type: "Education",
        points: [] as string[],
      },
    ],
  },
  contact: {
    eyebrow: "Connect",
    title: "Let's build something that holds up.",
    body: "Tell me what you're building, the rough timeline and where it hurts today. I read every message.",
    email: "Email me",
    copy: "Copy email address",
    copied: "Email address copied",
    linkedin: "LinkedIn",
    github: "GitHub",
    location: "Based in",
  },
  footer: {
    built: "Built with Next.js, deployed on Vercel.",
    rights: "All rights reserved.",
    top: "Back to top",
  },
  project: {
    back: "All work",
    overview: "Overview",
    built: "What I built",
    stack: "Stack",
    role: "Role",
    year: "Year",
    kind: "Type",
    hash: "Block hash",
    links: "Links",
    source: "View source on GitHub",
    live: "Open live site",
    privateRepo: "Private or employer work. Details are available on request.",
    figure: {
      architecture: "Architecture diagram, simplified from the project's own documentation.",
      interface: "Interface illustration with sample data. Not a real screenshot.",
      schematic: "Schematic with sample data. Not real results.",
    },
    prev: "Previous block",
    next: "Next block",
    discuss: "Have a similar problem?",
    discussCta: "Let's talk",
  },
  notFound: {
    code: "404",
    title: "Block not found",
    body: "This page isn't on the chain. It may have moved, or the link is wrong.",
    home: "Back to home",
  },
};

export type Dictionary = typeof en;

const id: Dictionary = {
  meta: {
    title: "Ivan Kurniawan Sentosa — Backend Engineer",
    description:
      "Ivan Kurniawan Sentosa adalah backend engineer yang membangun API, pipeline data, dan aplikasi mobile: sistem rekomendasi, marketplace real-time, dan tool trading. Berbasis di Bali, Indonesia.",
    workTitle: "Karya pilihan",
    workDescription:
      "Studi kasus karya Ivan Kurniawan Sentosa: sistem backend, aplikasi mobile, mesin rekomendasi, dan tool trading kripto.",
  },
  nav: {
    work: "Karya",
    services: "Layanan",
    about: "Tentang",
    experience: "Pengalaman",
    connect: "Hubungi",
    home: "Beranda",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    skip: "Lewati ke konten",
    switchLanguage: "Ganti bahasa",
    toggleTheme: "Ganti tema",
    primary: "Utama",
  },
  hero: {
    available: "Terbuka untuk proyek baru",
    eyebrow: "backend · fullstack · data",
    roles: ["Backend Engineer", "Fullstack Developer", "Builder Data & Recsys", "Tooling Kripto"],
    lead: "Saya merancang API, pipeline data, dan aplikasi mobile yang tetap cepat, mudah dilacak, dan mudah diserahterimakan, dari mesin rekomendasi untuk retail sampai marketplace real-time dan tool trading.",
    ctaWork: "Lihat karya",
    ctaTalk: "Ayo ngobrol",
    showcase: {
      title: "karya level produksi",
      note: "ada studi kasusnya",
      delivered: "Terkirim",
      open: "Repo terbuka",
      footer: "Proyek klien bersifat privat. Repo terbuka berjalan di CI dengan tes e2e.",
      viewAll: "Semua karya",
    },
  },
  proof: {
    years: "tahun membangun backend",
    repos: "repositori publik",
    languages: "bahasa dipakai",
    cases: "studi kasus",
  },
  work: {
    eyebrow: "Karya pilihan",
    title: "Blok yang sudah saya rilis.",
    intro:
      "Campuran proyek kerja, proyek sampingan, dan riset. Setiap kartu adalah satu blok: buka untuk melihat detailnya.",
    viewAll: "Semua karya",
    filterLabel: "Saring proyek menurut kategori",
    filters: { all: "Semua", backend: "Backend", mobile: "Mobile", data: "Data", crypto: "Kripto", ai: "AI" },
    kind: { work: "Kerja", personal: "Pribadi", research: "Riset" },
    index: {
      eyebrow: "Karya",
      title: "Setiap blok, berurutan.",
      intro:
        "Proyek kerja, proyek pribadi, dan riset. Saring menurut bidang, atau buka satu blok untuk tulisan lengkapnya.",
    },
  },
  services: {
    eyebrow: "Layanan",
    title: "Yang bisa saya bangun untuk Anda.",
    intro:
      "Satu engineer, komunikasi langsung, tanpa estafet. Anda bicara dengan orang yang menulis kodenya.",
    items: [
      {
        title: "Backend & API",
        body: "Layanan dengan Python, Go, atau NestJS dengan batas modul yang jelas, auth yang kuat, dan test. Ditulis supaya mudah dibaca engineer berikutnya.",
        points: ["API REST & WebSocket", "Auth, peran & multi-tenancy", "Antrean, cron & integrasi"],
      },
      {
        title: "Web fullstack",
        body: "Frontend Next.js atau Vue yang terhubung ke API tersebut: dashboard, tool internal, dan marketplace yang terasa cepat di perangkat apa pun.",
        points: ["Dashboard & tool admin", "Marketplace & alur booking", "UI responsif dan siap SEO"],
      },
      {
        title: "Aplikasi mobile",
        body: "Aplikasi Flutter untuk iOS dan Android dengan penyimpanan yang ramah offline dan backend yang pas, dari tool gudang sampai buku harian berbantuan AI.",
        points: ["Flutter untuk iOS & Android", "Penyimpanan local-first", "Kamera, grafik & notifikasi"],
      },
      {
        title: "Data & AI",
        body: "Sistem rekomendasi, analitik, dan integrasi LLM yang mengubah data mentah menjadi sesuatu yang bisa ditindaklanjuti.",
        points: ["Recommender & pattern mining", "Pipeline LLM & vision", "Tool trading terhubung exchange"],
      },
    ],
    processTitle: "Alur sebuah proyek.",
    steps: [
      { title: "Temukan", body: "Menentukan masalah, pengguna, dan batasan lewat brief tertulis singkat." },
      { title: "Rancang", body: "Model data, kontrak API, dan keputusan penting ditulis sebelum kode." },
      { title: "Bangun", body: "Increment kecil yang sudah dites dan bisa Anda coba tiap minggu." },
      { title: "Serahkan", body: "Dokumentasi, skrip deploy, dan walkthrough, supaya Anda tidak terkunci." },
    ],
  },
  about: {
    eyebrow: "Tentang",
    title: "Backend dulu. Satu produk utuh di kepala.",
    paragraphs: [
      "Saya Ivan, backend engineer di Bali. Sejak 2021 saya mengerjakan web, data, dan mobile: sistem berbasis Shopify, microservices, logika rekomendasi untuk rak retail pintar, dan aplikasi Flutter untuk bisnis nyata.",
      "Perjalanan saya mulai dari analisis data, menambang data penjualan perhiasan dengan FP-Growth, dan kebiasaan itu menetap: saya suka sistem yang mengukur dirinya sendiri, menjelaskan keputusannya, dan meninggalkan jejak.",
      "Di luar proyek klien, saya membangun secara terbuka di GitHub: marketplace shift berbasis geo-spasial, papan kasus multi-tenant, bot trading kripto, dan beberapa aplikasi berbantuan AI.",
    ],
    principlesTitle: "Prinsip kerja",
    principles: [
      {
        title: "Tulis setiap keputusan",
        body: "ADR, desain high-level, dan tiket disimpan bersama kode, jadi alasan di balik keputusan tidak hilang.",
      },
      {
        title: "Beri tipe di setiap batas",
        body: "Typing ketat dan skema bersama di titik pertemuan antar layanan: Pydantic, Zod, mypy strict.",
      },
      {
        title: "Sisakan jejak audit",
        body: "Log append-only, keputusan yang di-cache, dan backtest yang bisa diulang. Kalau sudah terjadi, bisa diputar ulang.",
      },
    ],
    toolbeltTitle: "Perkakas",
    toolbelt: [
      { title: "Backend", items: ["Python", "FastAPI", "Go", "NestJS", "Node.js", "SQLAlchemy", "Prisma", "JWT / OAuth2"] },
      { title: "Penyimpanan data", items: ["PostgreSQL", "PostGIS", "TimescaleDB", "Redis", "SQLite", "Azure Blob Storage"] },
      { title: "Frontend", items: ["TypeScript", "Next.js", "React", "Vue", "Svelte", "Tailwind CSS"] },
      { title: "Mobile", items: ["Flutter", "Dart", "Riverpod", "Isar"] },
      { title: "Data & AI", items: ["Pandas", "NumPy", "Matplotlib", "FP-Growth", "Collaborative filtering", "OpenAI API", "Claude API"] },
      { title: "Delivery", items: ["Docker", "CI/CD", "Azure", "Vercel", "Git"] },
    ],
  },
  experience: {
    eyebrow: "Pengalaman",
    title: "Rantai sejauh ini.",
    intro: "Blok terbaru di atas. Setiap peran dibangun di atas peran sebelumnya.",
    blockLabel: "blok",
    parentLabel: "induk",
    items: [
      {
        role: "Backend Engineer",
        org: "Wolkk",
        period: "Jan 2025 — Sekarang",
        type: "Penuh waktu",
        points: [
          "Membangun dan merawat microservices untuk aplikasi yang skalabel.",
          "Merancang dan mengimplementasikan endpoint API yang kokoh.",
          "Bekerja dengan tim frontend untuk mengintegrasikan layanan backend.",
        ],
      },
      {
        role: "Backend Engineer",
        org: "Wolkk",
        period: "Jul 2024 — Des 2024",
        type: "Kontrak",
        points: [
          "Mengembangkan endpoint API baru untuk beberapa proyek klien.",
          "Mengoptimalkan query database untuk performa yang lebih baik.",
          "Ikut code review dan diskusi arsitektur.",
        ],
      },
      {
        role: "Web Technical",
        org: "PT Praijing Sinar Abadi",
        period: "Agu 2021 — Sekarang",
        type: "",
        points: [
          "Membangun dan merawat sistem web internal, termasuk pekerjaan berbasis Shopify.",
          "Memberi dukungan teknis dan troubleshooting untuk aplikasi web.",
          "Merilis fitur baru berdasarkan kebutuhan bisnis.",
        ],
      },
      {
        role: "Data Analyst",
        org: "CV Samapura Jewelry",
        period: "Des 2021 — Des 2022",
        type: "",
        points: [
          "Mengidentifikasi tren, pola, dan korelasi pada data transaksi.",
          "Membersihkan dan memproses awal data purchase order mentah.",
          "Membuat visualisasi dan laporan untuk mendukung keputusan bisnis.",
        ],
      },
      {
        role: "S.Kom. Teknik Informatika",
        org: "Universitas Primakara",
        period: "2019 — 2023",
        type: "Pendidikan",
        points: [] as string[],
      },
    ],
  },
  contact: {
    eyebrow: "Hubungi",
    title: "Mari bangun sesuatu yang kokoh.",
    body: "Ceritakan apa yang sedang Anda bangun, perkiraan waktunya, dan bagian yang paling bermasalah saat ini. Setiap pesan saya baca.",
    email: "Kirim email",
    copy: "Salin alamat email",
    copied: "Alamat email tersalin",
    linkedin: "LinkedIn",
    github: "GitHub",
    location: "Berbasis di",
  },
  footer: {
    built: "Dibangun dengan Next.js, di-deploy di Vercel.",
    rights: "Hak cipta dilindungi.",
    top: "Kembali ke atas",
  },
  project: {
    back: "Semua karya",
    overview: "Ringkasan",
    built: "Yang saya bangun",
    stack: "Teknologi",
    role: "Peran",
    year: "Tahun",
    kind: "Jenis",
    hash: "Hash blok",
    links: "Tautan",
    source: "Lihat kode di GitHub",
    live: "Buka situs live",
    privateRepo: "Pekerjaan privat atau milik perusahaan. Detail tersedia sesuai permintaan.",
    figure: {
      architecture: "Diagram arsitektur, disederhanakan dari dokumentasi proyek.",
      interface: "Ilustrasi antarmuka dengan data contoh. Bukan tangkapan layar asli.",
      schematic: "Skema dengan data contoh. Bukan hasil nyata.",
    },
    prev: "Blok sebelumnya",
    next: "Blok berikutnya",
    discuss: "Punya masalah serupa?",
    discussCta: "Ayo ngobrol",
  },
  notFound: {
    code: "404",
    title: "Blok tidak ditemukan",
    body: "Halaman ini tidak ada di rantai. Mungkin sudah pindah, atau tautannya keliru.",
    home: "Kembali ke beranda",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, id };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
