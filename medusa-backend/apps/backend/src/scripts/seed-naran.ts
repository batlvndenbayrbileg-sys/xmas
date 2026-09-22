import { ExecArgs } from "@medusajs/framework/types";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import { MN_TO_HANDLE } from "./seed-categories";

// Relative path — resolved against the storefront's own origin (port-independent).
// Files live in web/public/products/*. In production these move to Cloudflare R2 (F5).
const IMG = (n: number) => `/products/p${n}.avif`;

type Seed = {
  title: string; handle: string; price: number; cat: string;
  sizes: string[]; img: number; desc: string;
};

// EU shoe-size run shared by most silhouettes.
const EU = ["39", "40", "41", "42", "43", "44", "45"];
const EU_S = ["38", "39", "40", "41", "42", "43"]; // smaller run (women's / retro)

// «X-MAS» — олон брэндийн пүүзний каталог. Үнэ шууд төгрөгөөр (mnt).
const CATALOG: Seed[] = [
  // Nike
  { title: "Nike Air Max 90", handle: "nike-air-max-90", price: 389000, cat: "Nike", sizes: EU, img: 1, desc: "Visible Air-Max хийн дэртэй классик 90 силуэт. Өдөр тутмын өмсгөлд төгс тохирох lifestyle пүүз." },
  { title: "Nike Air Force 1 '07", handle: "nike-air-force-1", price: 329000, cat: "Nike", sizes: EU, img: 2, desc: "Бүтэн арьсан гадаргуу, Nike Air дэрлэгтэй тал улавч. Хэзээ ч моодноос гардаггүй икон пар." },
  { title: "Nike Dunk Low Retro", handle: "nike-dunk-low", price: 349000, cat: "Nike", sizes: EU, img: 3, desc: "Скейтээс гаралтай силуэт, хос өнгийн retro colorway. Street loox-д зайлшгүй." },

  // Adidas
  { title: "Adidas Samba OG", handle: "adidas-samba-og", price: 299000, cat: "Adidas", sizes: EU, img: 4, desc: "T-toe арьсан хамар, gum резин тал улавчтай terrace культурын классик силуэт." },
  { title: "Adidas Ultraboost Light", handle: "adidas-ultraboost", price: 459000, cat: "Adidas", sizes: EU, img: 5, desc: "BOOST дэрлэг, Primeknit сунадаг гадаргуутай урт зайн гүйлтийн пүүз." },
  { title: "Adidas Gazelle Indoor", handle: "adidas-gazelle", price: 289000, cat: "Adidas", sizes: EU_S, img: 6, desc: "Suede гадаргуутай нарийхан retro силуэт. Тод colorway сонголттой." },

  // New Balance
  { title: "New Balance 550", handle: "nb-550", price: 319000, cat: "New Balance", sizes: EU, img: 1, desc: "80-аад оны сагсны retro-оос санаа авсан арьсан силуэт. Цэвэрхэн өдөр тутмын пар." },
  { title: "New Balance 9060", handle: "nb-9060", price: 429000, cat: "New Balance", sizes: EU, img: 3, desc: "99X-аас санаа авсан chunky силуэт. ABZORB + SBS дэрлэгтэй давхарласан гадаргуу." },
  { title: "New Balance 1906R", handle: "nb-1906r", price: 449000, cat: "New Balance", sizes: EU, img: 5, desc: "Y2K гүйлтийн силуэт, N-ergy + ABZORB дэрлэгтэй металл мөнгөлөг өнгө." },

  // Puma
  { title: "Puma Suede Classic XXI", handle: "puma-suede-classic", price: 219000, cat: "Puma", sizes: EU, img: 2, desc: "Икон suede гадаргуу, formstrip хажуугийн зурвастай street культурын классик." },
  { title: "Puma RS-X", handle: "puma-rs-x", price: 339000, cat: "Puma", sizes: EU, img: 4, desc: "RS дэрлэгтэй chunky силуэт. Олон давхаргат гадаргуу, тод спорт colorway." },
  { title: "Puma Palermo", handle: "puma-palermo", price: 249000, cat: "Puma", sizes: EU_S, img: 6, desc: "Terrace загварын retro пүүз. Suede хамар, gum тал улавчтай." },

  // Converse
  { title: "Converse Chuck 70 High", handle: "converse-chuck-70-hi", price: 199000, cat: "Converse", sizes: EU, img: 3, desc: "Дээшилсэн Chuck 70 чанар, даавуун гадаргуу, vintage тал улавчтай өндөр хийц." },
  { title: "Converse Chuck Taylor All Star Low", handle: "converse-chuck-low", price: 169000, cat: "Converse", sizes: EU, img: 2, desc: "Классик All Star силуэт. Хөнгөн даавуун гадаргуутай өдөр тутмын пар." },
  { title: "Converse Run Star Hike", handle: "converse-run-star", price: 289000, cat: "Converse", sizes: EU_S, img: 5, desc: "Өндөрсгөсөн platform тал улавчтай bold street силуэт. Chuck-аас санаа авсан." },
];

// Хуучин NARAN гоо сайхны бараануудыг устгах (X-MAS пүүзний дэлгүүр болгох)
const OLD_HANDLES = [
  "edp-bloom","edp-signature","rose-elixir","citrus-cologne",
  "glow-serum","vitc-serum","hydra-cream","cleansing-foam",
  "lip-velvet-nude","lip-matte-ruby","silk-foundation","volume-mascara",
  "body-lotion-silk","shower-gel-vanilla","premium-gift-set","skincare-starter-kit",
  // legacy VEXO apparel
  "tech-fleece-hoodie","performance-tank","training-joggers","compression-longsleeve",
  "windbreaker-jacket","lined-training-shorts","seamless-leggings","womens-cropped-tee",
  "tactical-sling-bag","performance-cap","thermal-hooded-base","cargo-tech-pants",
  // Medusa default demo products (from initial-data-seed migration)
  "sweatshirt","sweatpants","shorts","t-shirt",
];

export default async function seedNaran({ container }: ExecArgs) {
  const logger = container.resolve("logger");
  const productModule = container.resolve(Modules.PRODUCT);
  const salesChannelModule = container.resolve(Modules.SALES_CHANNEL);
  const fulfillmentModule = container.resolve(Modules.FULFILLMENT);

  const [channel] = await salesChannelModule.listSalesChannels({ name: "Default Sales Channel" });
  const [profile] = await fulfillmentModule.listShippingProfiles({});
  if (!channel || !profile) throw new Error("Missing default sales channel or shipping profile");

  // Resolve category ids by handle (categories seeded by seed-categories.ts).
  const cats = await productModule.listProductCategories(
    { handle: Object.values(MN_TO_HANDLE) },
    { select: ["id", "handle"] as any },
  );
  const catIdByHandle = new Map(cats.map(c => [c.handle, c.id]));
  if (!cats.length) logger.warn("No product categories found — run seed-categories.ts first.");
  const categoryIdsFor = (mnName: string): string[] => {
    const id = catIdByHandle.get(MN_TO_HANDLE[mnName]);
    return id ? [id] : [];
  };

  // Remove old VEXO catalog + any previous Naran products (fresh, correct data each run)
  const stale = await productModule.listProducts({ handle: [...OLD_HANDLES, ...CATALOG.map(c => c.handle)] });
  if (stale.length) {
    await productModule.deleteProducts(stale.map(p => p.id));
    logger.info(`Removed ${stale.length} existing products (NARAN/VEXO/old X-MAS)`);
  }

  const toCreate = CATALOG;
  if (toCreate.length) {
    await createProductsWorkflow(container).run({
      input: {
        products: toCreate.map(p => ({
          title: p.title,
          handle: p.handle,
          description: p.desc,
          status: "published" as const,
          category_ids: categoryIdsFor(p.cat),
          // No photo yet → storefront renders the on-brand sneaker SVG silhouette.
          // Add real sneaker images here (thumbnail/images) once available.
          shipping_profile_id: profile.id,
          options: [{ title: "Хэмжээ", values: p.sizes }],
          variants: p.sizes.map(s => ({
            title: s,
            sku: `${p.handle}-${s}`.toLowerCase().replace(/\s+/g, "-"),
            manage_inventory: false,
            options: { "Хэмжээ": s },
            prices: [{ amount: p.price, currency_code: "mnt" }],
          })),
          sales_channels: [{ id: channel.id }],
        })),
      },
    });
    logger.info(`Seeded ${toCreate.length} X-MAS sneaker products`);
  } else {
    logger.info("X-MAS catalog already seeded");
  }

  // Ensure every catalog product is linked to the sales channel (Store API visibility)
  const all = await productModule.listProducts({ handle: CATALOG.map(c => c.handle) });
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  let linked = 0;
  for (const p of all) {
    try {
      await link.create({
        [Modules.PRODUCT]: { product_id: p.id },
        [Modules.SALES_CHANNEL]: { sales_channel_id: channel.id },
      });
      linked++;
    } catch { /* already linked */ }
  }
  logger.info(`Sales-channel links: ${linked} created, ${all.length - linked} already present`);
  logger.info(`X-MAS catalog ready — ${all.length} products across 5 brands.`);
}
