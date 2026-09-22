export type Category = "Nike" | "Adidas" | "New Balance" | "Puma" | "Converse";
export type Shape =
  | "runner" | "lowtop" | "hightop" | "chunky" | "skate" | "slide";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  shape: Shape;
  gender: "Men" | "Women" | "Unisex";
  season: "Winter" | "Summer" | "All-Season";
  price: number;
  was?: number;
  rating: number;
  reviews: number;
  badge?: "Sale" | "New" | null;
  colors: string[];
  sizes: string[];
  fabric: string; // sneaker silhouette type (Lifestyle, Running, Skate…)
  shortDesc: string;
  description: string;
  bullets: string[];
  specs: Record<string, string>;
  stock: number;
  accent: string;
};

const EU = ["39", "40", "41", "42", "43", "44", "45"];
const EU_S = ["38", "39", "40", "41", "42", "43"];

// X-MAS fallback catalog (used when Medusa is disabled). Prices in MNT.
export const products: Product[] = [
  // ── Nike ──
  {
    id: "nike-air-max-90", slug: "nike-air-max-90", name: "Nike Air Max 90", category: "Nike", shape: "runner",
    gender: "Unisex", season: "All-Season", price: 389000, rating: 4.9, reviews: 128, badge: "New",
    colors: ["#C8102E", "#111111", "#F2F2F2"], sizes: EU, fabric: "Lifestyle",
    shortDesc: "Visible Air-Max cushioning in the classic 90 silhouette.",
    description: "Visible Air-Max хийн дэртэй классик 90 силуэт. Өдөр тутмын өмсгөлд төгс тохирох lifestyle пүүз.",
    bullets: ["Visible Air-Max хийн дэр", "Классик 90 силуэт", "Өдөр тутмын өмсгөлд тохиромжтой"],
    specs: { "Брэнд": "Nike", "Загвар": "Air Max 90", "Төрөл": "Lifestyle", "Дэрлэг": "Air Max", "Гадна": "Арьс / тор" },
    stock: 60, accent: "#C8102E",
  },
  {
    id: "nike-air-force-1", slug: "nike-air-force-1", name: "Nike Air Force 1 '07", category: "Nike", shape: "lowtop",
    gender: "Unisex", season: "All-Season", price: 329000, rating: 5.0, reviews: 214, badge: null,
    colors: ["#F2F2F2", "#111111"], sizes: EU, fabric: "Lifestyle",
    shortDesc: "All-leather icon on a Nike Air sole.",
    description: "Бүтэн арьсан гадаргуу, Nike Air дэрлэгтэй тал улавч. Хэзээ ч моодноос гардаггүй икон пар.",
    bullets: ["Бүтэн арьсан гадаргуу", "Air дэрлэгтэй тал улавч", "Хэзээ ч моодноос гардаггүй"],
    specs: { "Брэнд": "Nike", "Загвар": "Air Force 1 '07", "Төрөл": "Lifestyle", "Дэрлэг": "Nike Air", "Гадна": "Арьс" },
    stock: 80, accent: "#F2F2F2",
  },
  {
    id: "nike-dunk-low", slug: "nike-dunk-low", name: "Nike Dunk Low Retro", category: "Nike", shape: "lowtop",
    gender: "Unisex", season: "All-Season", price: 349000, was: 426000, rating: 4.8, reviews: 96, badge: "Sale",
    colors: ["#1E5AA8", "#F2F2F2", "#C8102E"], sizes: EU, fabric: "Skate",
    shortDesc: "Two-tone retro colourway with a skate-born silhouette.",
    description: "Скейтээс гаралтай силуэт, хос өнгийн retro colorway. Street loox-д зайлшгүй.",
    bullets: ["Хос өнгийн retro colorway", "Скейтээс гаралтай силуэт", "Намхан налуу хэлбэр"],
    specs: { "Брэнд": "Nike", "Загвар": "Dunk Low Retro", "Төрөл": "Skate / Lifestyle", "Гадна": "Арьс", "Тал улавч": "Резин" },
    stock: 45, accent: "#1E5AA8",
  },

  // ── Adidas ──
  {
    id: "adidas-samba-og", slug: "adidas-samba-og", name: "Adidas Samba OG", category: "Adidas", shape: "lowtop",
    gender: "Unisex", season: "All-Season", price: 299000, rating: 5.0, reviews: 302, badge: "New",
    colors: ["#111111", "#F2F2F2"], sizes: EU, fabric: "Lifestyle",
    shortDesc: "Terrace classic with a gum sole and T-toe.",
    description: "T-toe арьсан хамар, gum резин тал улавчтай terrace культурын классик силуэт.",
    bullets: ["T-toe арьсан хамар", "Gum резин тал улавч", "Terrace культурын классик"],
    specs: { "Брэнд": "Adidas", "Загвар": "Samba OG", "Төрөл": "Lifestyle", "Гадна": "Арьс / suede", "Тал улавч": "Gum резин" },
    stock: 90, accent: "#111111",
  },
  {
    id: "adidas-ultraboost", slug: "adidas-ultraboost", name: "Adidas Ultraboost Light", category: "Adidas", shape: "runner",
    gender: "Unisex", season: "All-Season", price: 459000, rating: 4.8, reviews: 141, badge: null,
    colors: ["#2B2B2B", "#F2F2F2"], sizes: EU, fabric: "Running",
    shortDesc: "BOOST cushioning with a Primeknit upper.",
    description: "BOOST дэрлэг, Primeknit сунадаг гадаргуутай урт зайн гүйлтийн пүүз.",
    bullets: ["BOOST эрчим хугаралгүй дэрлэг", "Primeknit сунадаг гадаргуу", "Урт зайн гүйлтэд"],
    specs: { "Брэнд": "Adidas", "Загвар": "Ultraboost Light", "Төрөл": "Running", "Дэрлэг": "BOOST", "Гадна": "Primeknit" },
    stock: 50, accent: "#2B2B2B",
  },
  {
    id: "adidas-gazelle", slug: "adidas-gazelle", name: "Adidas Gazelle Indoor", category: "Adidas", shape: "lowtop",
    gender: "Unisex", season: "All-Season", price: 289000, rating: 4.7, reviews: 118, badge: null,
    colors: ["#1D6FB8", "#F2F2F2", "#C8102E"], sizes: EU_S, fabric: "Lifestyle",
    shortDesc: "Slim suede retro silhouette in bold colourways.",
    description: "Suede гадаргуутай нарийхан retro силуэт. Тод colorway сонголттой.",
    bullets: ["Suede гадаргуу", "Нарийхан retro силуэт", "Тод colorway сонголт"],
    specs: { "Брэнд": "Adidas", "Загвар": "Gazelle Indoor", "Төрөл": "Lifestyle", "Гадна": "Suede", "Тал улавч": "Gum резин" },
    stock: 70, accent: "#1D6FB8",
  },

  // ── New Balance ──
  {
    id: "nb-550", slug: "nb-550", name: "New Balance 550", category: "New Balance", shape: "lowtop",
    gender: "Unisex", season: "All-Season", price: 319000, rating: 4.9, reviews: 173, badge: null,
    colors: ["#16833E", "#F2F2F2"], sizes: EU, fabric: "Basketball",
    shortDesc: "'80s basketball retro in clean leather.",
    description: "80-аад оны сагсны retro-оос санаа авсан арьсан силуэт. Цэвэрхэн өдөр тутмын пар.",
    bullets: ["80-аад оны сагсны retro", "Арьсан гадаргуу", "Цэвэрхэн өдөр тутмын пар"],
    specs: { "Брэнд": "New Balance", "Загвар": "550", "Төрөл": "Basketball / Lifestyle", "Гадна": "Арьс", "Тал улавч": "Резин" },
    stock: 65, accent: "#16833E",
  },
  {
    id: "nb-9060", slug: "nb-9060", name: "New Balance 9060", category: "New Balance", shape: "chunky",
    gender: "Unisex", season: "All-Season", price: 429000, rating: 4.8, reviews: 87, badge: "New",
    colors: ["#8A8D91", "#F2F2F2"], sizes: EU, fabric: "Lifestyle",
    shortDesc: "Chunky 99X-inspired silhouette on ABZORB.",
    description: "99X-аас санаа авсан chunky силуэт. ABZORB + SBS дэрлэгтэй давхарласан гадаргуу.",
    bullets: ["99X-аас санаа авсан chunky силуэт", "ABZORB + SBS дэрлэг", "Давхарласан гадаргуу"],
    specs: { "Брэнд": "New Balance", "Загвар": "9060", "Төрөл": "Lifestyle", "Дэрлэг": "ABZORB / SBS", "Гадна": "Mesh / suede" },
    stock: 40, accent: "#8A8D91",
  },
  {
    id: "nb-1906r", slug: "nb-1906r", name: "New Balance 1906R", category: "New Balance", shape: "chunky",
    gender: "Unisex", season: "All-Season", price: 449000, rating: 4.7, reviews: 64, badge: null,
    colors: ["#B0B4B8", "#111111"], sizes: EU, fabric: "Running",
    shortDesc: "Y2K running silhouette with N-ergy cushioning.",
    description: "Y2K гүйлтийн силуэт, N-ergy + ABZORB дэрлэгтэй металл мөнгөлөг өнгө.",
    bullets: ["Y2K гүйлтийн силуэт", "N-ergy + ABZORB дэрлэг", "Металл мөнгөлөг өнгө"],
    specs: { "Брэнд": "New Balance", "Загвар": "1906R", "Төрөл": "Running / Lifestyle", "Дэрлэг": "N-ergy", "Гадна": "Mesh" },
    stock: 38, accent: "#B0B4B8",
  },

  // ── Puma ──
  {
    id: "puma-suede-classic", slug: "puma-suede-classic", name: "Puma Suede Classic XXI", category: "Puma", shape: "lowtop",
    gender: "Unisex", season: "All-Season", price: 219000, was: 274000, rating: 4.6, reviews: 152, badge: "Sale",
    colors: ["#C0392B", "#F2F2F2"], sizes: EU, fabric: "Lifestyle",
    shortDesc: "Iconic suede upper with the Formstrip.",
    description: "Икон suede гадаргуу, formstrip хажуугийн зурвастай street культурын классик.",
    bullets: ["Икон suede гадаргуу", "Formstrip хажуугийн зурвас", "Street культурын классик"],
    specs: { "Брэнд": "Puma", "Загвар": "Suede Classic XXI", "Төрөл": "Lifestyle", "Гадна": "Suede", "Тал улавч": "Резин" },
    stock: 75, accent: "#C0392B",
  },
  {
    id: "puma-rs-x", slug: "puma-rs-x", name: "Puma RS-X", category: "Puma", shape: "chunky",
    gender: "Unisex", season: "All-Season", price: 339000, rating: 4.5, reviews: 71, badge: null,
    colors: ["#2D6CDF", "#F2F2F2", "#C8102E"], sizes: EU, fabric: "Lifestyle",
    shortDesc: "Chunky RS-cushioned silhouette in bold colour.",
    description: "RS дэрлэгтэй chunky силуэт. Олон давхаргат гадаргуу, тод спорт colorway.",
    bullets: ["RS дэрлэгтэй chunky силуэт", "Олон давхаргат гадаргуу", "Тод спорт colorway"],
    specs: { "Брэнд": "Puma", "Загвар": "RS-X", "Төрөл": "Lifestyle", "Дэрлэг": "RS", "Гадна": "Mesh / нийлэг" },
    stock: 42, accent: "#2D6CDF",
  },
  {
    id: "puma-palermo", slug: "puma-palermo", name: "Puma Palermo", category: "Puma", shape: "lowtop",
    gender: "Unisex", season: "All-Season", price: 249000, rating: 4.7, reviews: 58, badge: "New",
    colors: ["#2E7D4F", "#F2F2F2"], sizes: EU_S, fabric: "Lifestyle",
    shortDesc: "Terrace-style retro with a gum sole.",
    description: "Terrace загварын retro пүүз. Suede хамар, gum тал улавчтай.",
    bullets: ["Terrace загварын retro", "Suede хамар", "Gum тал улавч"],
    specs: { "Брэнд": "Puma", "Загвар": "Palermo", "Төрөл": "Lifestyle", "Гадна": "Suede", "Тал улавч": "Gum резин" },
    stock: 55, accent: "#2E7D4F",
  },

  // ── Converse ──
  {
    id: "converse-chuck-70-hi", slug: "converse-chuck-70-hi", name: "Converse Chuck 70 High", category: "Converse", shape: "hightop",
    gender: "Unisex", season: "All-Season", price: 199000, rating: 4.9, reviews: 261, badge: null,
    colors: ["#111111", "#F2F2F2"], sizes: EU, fabric: "Canvas",
    shortDesc: "Elevated Chuck 70 build with vintage details.",
    description: "Дээшилсэн Chuck 70 чанар, даавуун гадаргуу, vintage тал улавчтай өндөр хийц.",
    bullets: ["Дээшилсэн Chuck 70 чанар", "Даавуун гадаргуу", "Vintage тал улавч"],
    specs: { "Брэнд": "Converse", "Загвар": "Chuck 70 High", "Төрөл": "Canvas / Lifestyle", "Гадна": "Даавуу", "Тал улавч": "Резин" },
    stock: 100, accent: "#111111",
  },
  {
    id: "converse-chuck-low", slug: "converse-chuck-low", name: "Converse Chuck Taylor All Star Low", category: "Converse", shape: "lowtop",
    gender: "Unisex", season: "All-Season", price: 169000, rating: 4.7, reviews: 189, badge: null,
    colors: ["#C8102E", "#111111", "#F2F2F2"], sizes: EU, fabric: "Canvas",
    shortDesc: "The classic All Star low in lightweight canvas.",
    description: "Классик All Star силуэт. Хөнгөн даавуун гадаргуутай өдөр тутмын пар.",
    bullets: ["Классик All Star силуэт", "Хөнгөн даавуун гадаргуу", "Өдөр тутмын хэрэглээнд"],
    specs: { "Брэнд": "Converse", "Загвар": "Chuck Taylor All Star Low", "Төрөл": "Canvas / Lifestyle", "Гадна": "Даавуу", "Тал улавч": "Резин" },
    stock: 120, accent: "#C8102E",
  },
  {
    id: "converse-run-star", slug: "converse-run-star", name: "Converse Run Star Hike", category: "Converse", shape: "chunky",
    gender: "Unisex", season: "All-Season", price: 289000, rating: 4.6, reviews: 44, badge: null,
    colors: ["#F2F2F2", "#111111"], sizes: EU_S, fabric: "Platform",
    shortDesc: "Bold platform silhouette inspired by the Chuck.",
    description: "Өндөрсгөсөн platform тал улавчтай bold street силуэт. Chuck-аас санаа авсан.",
    bullets: ["Өндөрсгөсөн platform тал улавч", "Chuck-аас санаа авсан", "Bold street силуэт"],
    specs: { "Брэнд": "Converse", "Загвар": "Run Star Hike", "Төрөл": "Platform / Lifestyle", "Гадна": "Даавуу", "Тал улавч": "Platform резин" },
    stock: 30, accent: "#F2F2F2",
  },
];
