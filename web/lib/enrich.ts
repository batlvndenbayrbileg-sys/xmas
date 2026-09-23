import type { Category, Shape } from "./types";

/**
 * Presentation metadata keyed by Medusa product handle.
 * Medusa is the source of truth for catalog, price, image and availability;
 * these fields enrich the storefront UX (accent, rating, badge, specs).
 */
export type Enrich = {
  category: Category;
  shape: Shape;
  gender: "Men" | "Women" | "Unisex";
  season: "Winter" | "Summer" | "All-Season";
  accent: string;
  fabric: string; // sneaker type: Canvas, Suede, Retro, Platform, Running
  colors: string[];
  bullets: string[];
  specs: Record<string, string>;
  rating: number;
  reviews: number;
  badge?: "Sale" | "New" | null;
  wasMultiplier?: number; // original price = price * multiplier
};

// Generic copy keyed by sneaker type — keeps 30 entries concise.
const BULLETS: Record<string, string[]> = {
  Canvas: ["Оригинал Converse", "Даавуун гадаргуу", "Сонгодог силуэт"],
  Suede: ["Оригинал Converse", "Suede гадаргуу", "Street силуэт"],
  Retro: ["Оригинал Converse", "Retro гүйлтийн силуэт", "Gum тал улавчтай"],
  Platform: ["Оригинал Converse", "Өндөрсгөсөн platform тал улавч", "Bold силуэт"],
  Running: ["Оригинал New Balance", "N-ergy дэрлэг", "Y2K гүйлтийн силуэт"],
};
const SPECS: Record<string, Record<string, string>> = {
  Canvas: { "Брэнд": "Converse", "Гадна": "Даавуу", "Тал улавч": "Резин" },
  Suede: { "Брэнд": "Converse", "Гадна": "Suede", "Тал улавч": "Резин" },
  Retro: { "Брэнд": "Converse", "Төрөл": "Retro trainer", "Тал улавч": "Gum резин" },
  Platform: { "Брэнд": "Converse", "Гадна": "Даавуу", "Тал улавч": "Platform резин" },
  Running: { "Брэнд": "New Balance", "Загвар": "1906A", "Дэрлэг": "N-ergy" },
};

const e = (
  category: Category, shape: Shape, accent: string, fabric: string,
  rating: number, reviews: number, extra: Partial<Enrich> = {},
): Enrich => ({
  category, shape, gender: "Unisex", season: "All-Season", accent, fabric,
  colors: [accent], rating, reviews, badge: null,
  bullets: BULLETS[fabric], specs: SPECS[fabric], ...extra,
});

const CV = "Converse" as const;
const NBB = "New Balance" as const;

export const ENRICH: Record<string, Enrich> = {
  // Converse — Chuck 70 Hi
  "converse-chuck70-hi-navy": e(CV, "hightop", "#2E3A59", "Canvas", 4.9, 128),
  "converse-chuck70-hi-daisy-blue": e(CV, "hightop", "#AEC6E8", "Canvas", 4.8, 74, { badge: "New" }),
  "converse-chuck70-hi-natural": e(CV, "hightop", "#E8E0CE", "Canvas", 4.9, 96),
  "converse-chuck70-hi-white-star": e(CV, "hightop", "#F2F2F2", "Canvas", 4.8, 112),
  "converse-chuck70-hi-grey-denim": e(CV, "hightop", "#9AA0A6", "Canvas", 4.7, 63),
  "converse-chuck70-hi-daisy-white": e(CV, "hightop", "#F4F4F4", "Canvas", 4.8, 81, { badge: "New" }),
  "converse-chuck70-hi-black": e(CV, "hightop", "#111111", "Canvas", 5.0, 261),
  "converse-chuck70-hi-blue": e(CV, "hightop", "#244A8A", "Canvas", 4.8, 88),
  "converse-chuck70-hi-black-star": e(CV, "hightop", "#151515", "Canvas", 4.9, 140),
  // Converse — Chuck Low
  "converse-chuck-low-zip-cream": e(CV, "lowtop", "#E8E0CE", "Canvas", 4.7, 54),
  "converse-chuck-low-zip-black": e(CV, "lowtop", "#111111", "Canvas", 4.7, 69),
  "converse-chuck-low-blue-check": e(CV, "lowtop", "#2233AA", "Canvas", 4.6, 47, { badge: "New" }),
  "converse-chuck-low-pink-stars": e(CV, "lowtop", "#E7C4D0", "Canvas", 4.7, 58),
  "converse-chuck-low-grey-stars": e(CV, "lowtop", "#8A8078", "Canvas", 4.6, 41),
  "converse-chuck-low-cream-stars": e(CV, "lowtop", "#E7E0D0", "Canvas", 4.7, 52),
  // Converse — Platform
  "converse-chuck-platform-pink": e(CV, "chunky", "#E9C2CE", "Platform", 4.6, 44, { badge: "New" }),
  "converse-chuck-low-black-stars": e(CV, "chunky", "#141414", "Platform", 4.7, 60),
  // Converse — One Star / Star Player (suede)
  "converse-one-star-mustard": e(CV, "lowtop", "#C58A1A", "Suede", 4.8, 97),
  "converse-one-star-navy": e(CV, "lowtop", "#1E2A44", "Suede", 4.8, 83),
  "converse-one-star-black": e(CV, "lowtop", "#151515", "Suede", 4.7, 76),
  "converse-star-player-burgundy": e(CV, "lowtop", "#6B2233", "Suede", 4.8, 65),
  // Converse — Suede low / futsal
  "converse-suede-retro-pink": e(CV, "lowtop", "#E3B7C4", "Suede", 4.6, 38),
  "converse-suede-low-red": e(CV, "lowtop", "#C8102E", "Suede", 4.7, 49),
  "converse-suede-low-black": e(CV, "lowtop", "#151515", "Suede", 4.7, 55),
  "converse-futsal-black": e(CV, "lowtop", "#141414", "Canvas", 4.7, 72),
  // Converse — Retro trainer
  "converse-retro-trainer-burgundy": e(CV, "runner", "#6B2233", "Retro", 4.7, 51),
  "converse-retro-trainer-green": e(CV, "runner", "#1E5A3C", "Retro", 4.7, 46),
  // New Balance 1906A (on sale: 359,000 → 250,000)
  "nb-1906a-silver": e(NBB, "chunky", "#C7CAD0", "Running", 4.9, 118, { badge: "Sale", wasMultiplier: 1.436 }),
  "nb-1906a-black": e(NBB, "chunky", "#1A1A1A", "Running", 4.9, 104, { badge: "Sale", wasMultiplier: 1.436 }),
  "nb-1906a-grey": e(NBB, "chunky", "#8A8D91", "Running", 4.8, 92, { badge: "Sale", wasMultiplier: 1.436 }),
};

export const DEFAULT_ENRICH: Enrich = {
  category: "Converse", shape: "lowtop", gender: "Unisex", season: "All-Season", accent: "#151515",
  fabric: "Canvas", colors: ["#151515"], rating: 4.7, reviews: 40, badge: null,
  bullets: BULLETS.Canvas, specs: SPECS.Canvas,
};
