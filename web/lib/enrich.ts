import type { Category, Shape } from "./types";

/**
 * Presentation metadata keyed by Medusa product handle.
 * Medusa is the source of truth for catalog, price, image and availability;
 * these fields enrich the storefront UX (brand, accent, rating, badge, specs).
 */
export type Enrich = {
  category: Category;
  shape: Shape;
  gender: "Men" | "Women" | "Unisex";
  season: "Winter" | "Summer" | "All-Season";
  accent: string;
  fabric: string; // sneaker: silhouette type (Lifestyle, Running, Skate…)
  colors: string[];
  bullets: string[];
  specs: Record<string, string>;
  rating: number;
  reviews: number;
  badge?: "Sale" | "New" | null;
  wasMultiplier?: number; // original price = price * multiplier
};

const mk = (
  category: Category, shape: Shape, accent: string, fabric: string,
  colors: string[], rating: number, reviews: number,
  bullets: string[], specs: Record<string, string>,
  extra: Partial<Enrich> = {},
): Enrich => ({
  category, shape, gender: "Unisex", season: "All-Season",
  accent, fabric, colors, rating, reviews, bullets, specs, badge: null, ...extra,
});

export const ENRICH: Record<string, Enrich> = {
  // ── Nike ──
  "nike-air-max-90": mk("Nike", "runner", "#C8102E", "Lifestyle", ["#C8102E", "#111111", "#F2F2F2"], 4.9, 128,
    ["Visible Air-Max хийн дэр", "Классик 90 силуэт", "Өдөр тутмын өмсгөлд тохиромжтой"],
    { "Брэнд": "Nike", "Загвар": "Air Max 90", "Төрөл": "Lifestyle", "Дэрлэг": "Air Max", "Гадна": "Арьс / тор" },
    { badge: "New" }),
  "nike-air-force-1": mk("Nike", "lowtop", "#F2F2F2", "Lifestyle", ["#F2F2F2", "#111111"], 5.0, 214,
    ["Бүтэн арьсан гадаргуу", "Air дэрлэгтэй тал улавч", "Хэзээ ч моодноос гардаггүй"],
    { "Брэнд": "Nike", "Загвар": "Air Force 1 '07", "Төрөл": "Lifestyle", "Дэрлэг": "Nike Air", "Гадна": "Арьс" }),
  "nike-dunk-low": mk("Nike", "lowtop", "#1E5AA8", "Skate", ["#1E5AA8", "#F2F2F2", "#C8102E"], 4.8, 96,
    ["Хос өнгийн retro colorway", "Скейтээс гаралтай силуэт", "Namhan налуу хэлбэр"],
    { "Брэнд": "Nike", "Загвар": "Dunk Low Retro", "Төрөл": "Skate / Lifestyle", "Гадна": "Арьс", "Тал улавч": "Резин" },
    { badge: "Sale", wasMultiplier: 1.22 }),

  // ── Adidas ──
  "adidas-samba-og": mk("Adidas", "lowtop", "#111111", "Lifestyle", ["#111111", "#F2F2F2"], 5.0, 302,
    ["T-toe арьсан хамар", "Gum резин тал улавч", "Terrace культурын классик"],
    { "Брэнд": "Adidas", "Загвар": "Samba OG", "Төрөл": "Lifestyle", "Гадна": "Арьс / suede", "Тал улавч": "Gum резин" },
    { badge: "New" }),
  "adidas-ultraboost": mk("Adidas", "runner", "#2B2B2B", "Running", ["#2B2B2B", "#F2F2F2"], 4.8, 141,
    ["BOOST эрчим хугаралгүй дэрлэг", "Primeknit сунадаг гадаргуу", "Урт зайн гүйлтэд"],
    { "Брэнд": "Adidas", "Загвар": "Ultraboost Light", "Төрөл": "Running", "Дэрлэг": "BOOST", "Гадна": "Primeknit" }),
  "adidas-gazelle": mk("Adidas", "lowtop", "#1D6FB8", "Lifestyle", ["#1D6FB8", "#F2F2F2", "#C8102E"], 4.7, 118,
    ["Suede гадаргуу", "Нарийхан retro силуэт", "Тод colorway сонголт"],
    { "Брэнд": "Adidas", "Загвар": "Gazelle Indoor", "Төрөл": "Lifestyle", "Гадна": "Suede", "Тал улавч": "Gum резин" }),

  // ── New Balance ──
  "nb-550": mk("New Balance", "lowtop", "#16833E", "Basketball", ["#16833E", "#F2F2F2"], 4.9, 173,
    ["80-аад оны сагсны retro", "Арьсан гадаргуу", "Цэвэрхэн өдөр тутмын пар"],
    { "Брэнд": "New Balance", "Загвар": "550", "Төрөл": "Basketball / Lifestyle", "Гадна": "Арьс", "Тал улавч": "Резин" }),
  "nb-9060": mk("New Balance", "chunky", "#8A8D91", "Lifestyle", ["#8A8D91", "#F2F2F2"], 4.8, 87,
    ["99X-аас санаа авсан chunky силуэт", "ABZORB + SBS дэрлэг", "Давхарласан гадаргуу"],
    { "Брэнд": "New Balance", "Загвар": "9060", "Төрөл": "Lifestyle", "Дэрлэг": "ABZORB / SBS", "Гадна": "Mesh / suede" },
    { badge: "New" }),
  "nb-1906r": mk("New Balance", "chunky", "#B0B4B8", "Running", ["#B0B4B8", "#111111"], 4.7, 64,
    ["Y2K гүйлтийн силуэт", "N-ergy + ABZORB дэрлэг", "Металл мөнгөлөг өнгө"],
    { "Брэнд": "New Balance", "Загвар": "1906R", "Төрөл": "Running / Lifestyle", "Дэрлэг": "N-ergy", "Гадна": "Mesh" }),

  // ── Puma ──
  "puma-suede-classic": mk("Puma", "lowtop", "#C0392B", "Lifestyle", ["#C0392B", "#F2F2F2"], 4.6, 152,
    ["Икон suede гадаргуу", "Formstrip хажуугийн зурвас", "Street культурын классик"],
    { "Брэнд": "Puma", "Загвар": "Suede Classic XXI", "Төрөл": "Lifestyle", "Гадна": "Suede", "Тал улавч": "Резин" },
    { badge: "Sale", wasMultiplier: 1.25 }),
  "puma-rs-x": mk("Puma", "chunky", "#2D6CDF", "Lifestyle", ["#2D6CDF", "#F2F2F2", "#C8102E"], 4.5, 71,
    ["RS дэрлэгтэй chunky силуэт", "Олон давхаргат гадаргуу", "Тод спорт colorway"],
    { "Брэнд": "Puma", "Загвар": "RS-X", "Төрөл": "Lifestyle", "Дэрлэг": "RS", "Гадна": "Mesh / нийлэг" }),
  "puma-palermo": mk("Puma", "lowtop", "#2E7D4F", "Lifestyle", ["#2E7D4F", "#F2F2F2"], 4.7, 58,
    ["Terrace загварын retro", "Suede хамар", "Gum тал улавч"],
    { "Брэнд": "Puma", "Загвар": "Palermo", "Төрөл": "Lifestyle", "Гадна": "Suede", "Тал улавч": "Gum резин" },
    { badge: "New" }),

  // ── Converse ──
  "converse-chuck-70-hi": mk("Converse", "hightop", "#111111", "Canvas", ["#111111", "#F2F2F2"], 4.9, 261,
    ["Дээшилсэн Chuck 70 чанар", "Даавуун гадаргуу", "Vintage тал улавч"],
    { "Брэнд": "Converse", "Загвар": "Chuck 70 High", "Төрөл": "Canvas / Lifestyle", "Гадна": "Даавуу", "Тал улавч": "Резин" }),
  "converse-chuck-low": mk("Converse", "lowtop", "#C8102E", "Canvas", ["#C8102E", "#111111", "#F2F2F2"], 4.7, 189,
    ["Классик All Star силуэт", "Хөнгөн даавуун гадаргуу", "Өдөр тутмын хэрэглээнд"],
    { "Брэнд": "Converse", "Загвар": "Chuck Taylor All Star Low", "Төрөл": "Canvas / Lifestyle", "Гадна": "Даавуу", "Тал улавч": "Резин" }),
  "converse-run-star": mk("Converse", "chunky", "#F2F2F2", "Platform", ["#F2F2F2", "#111111"], 4.6, 44,
    ["Өндөрсгөсөн platform тал улавч", "Chuck-аас санаа авсан", "Bold street силуэт"],
    { "Брэнд": "Converse", "Загвар": "Run Star Hike", "Төрөл": "Platform / Lifestyle", "Гадна": "Даавуу", "Тал улавч": "Platform резин" }),
};

export const DEFAULT_ENRICH: Enrich = {
  category: "Nike", shape: "lowtop", gender: "Unisex", season: "All-Season", accent: "#111111",
  fabric: "Lifestyle", colors: ["#111111", "#F2F2F2"], rating: 4.7, reviews: 40, badge: null,
  bullets: ["Оригинал баталгаат пүүз", "Өдөр тутмын өмсгөлд"], specs: { "Төрөл": "Lifestyle" },
};
