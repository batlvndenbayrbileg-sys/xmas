import { ExecArgs } from "@medusajs/framework/types";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import { MN_TO_HANDLE } from "./seed-categories";

// Product photos live in web/public/products/<handle>.jpg (X-MAS store shots).
const IMG = (handle: string) => `/products/${handle}.jpg`;

type Seed = {
  title: string; handle: string; price: number; cat: string;
  sizes: string[]; desc: string;
};

// Converse canvas sizing (unisex) and New Balance sizing.
const CV = ["36", "37", "38", "39", "40", "41", "42", "43", "44"];
const NB = ["40", "41", "42", "43", "44", "45"];

// «X-MAS» — бодит каталог (Converse + New Balance). Үнэ шууд төгрөгөөр (mnt).
const CATALOG: Seed[] = [
  // ── Converse — Chuck 70 / Chuck Taylor ──
  { title: "Converse Chuck 70 Hi Navy", handle: "converse-chuck70-hi-navy", price: 349000, cat: "Converse", sizes: CV, desc: "Chuck 70 өндөр хийц, navy даавуун гадаргуу, vintage тал улавчтай." },
  { title: "Converse Chuck 70 Hi Daisy Blue", handle: "converse-chuck70-hi-daisy-blue", price: 349000, cat: "Converse", sizes: CV, desc: "Цэнхэр даавуун Chuck 70, хатгамал цагаан цэцэгтэй өндөр хийц." },
  { title: "Converse Chuck 70 Hi Natural", handle: "converse-chuck70-hi-natural", price: 349000, cat: "Converse", sizes: CV, desc: "Parchment/natural өнгийн сонгодог Chuck 70 өндөр хийц." },
  { title: "Converse Chuck 70 Hi White Star", handle: "converse-chuck70-hi-white-star", price: 349000, cat: "Converse", sizes: CV, desc: "Цагаан даавуун Chuck 70, хажуугийн од хээтэй өндөр хийц." },
  { title: "Converse Chuck 70 Hi Grey Denim", handle: "converse-chuck70-hi-grey-denim", price: 349000, cat: "Converse", sizes: CV, desc: "Саарал жинсэн Chuck 70, distressed фрэй хээтэй өндөр хийц." },
  { title: "Converse Chuck 70 Hi Daisy White", handle: "converse-chuck70-hi-daisy-white", price: 349000, cat: "Converse", sizes: CV, desc: "Цагаан Chuck 70, хатгамал цэцэгтэй өндөр хийц." },
  { title: "Converse Chuck 70 Hi Black", handle: "converse-chuck70-hi-black", price: 349000, cat: "Converse", sizes: CV, desc: "Сонгодог хар Chuck 70, All Star patch-тай өндөр хийц." },
  { title: "Converse Chuck 70 Hi Blue", handle: "converse-chuck70-hi-blue", price: 349000, cat: "Converse", sizes: CV, desc: "Navy blue сонгодог Chuck 70 өндөр хийц." },
  { title: "Converse Chuck 70 Hi Black Star", handle: "converse-chuck70-hi-black-star", price: 349000, cat: "Converse", sizes: CV, desc: "Хар даавуун Chuck 70, хажуугийн цагаан од хээтэй." },
  { title: "Converse Chuck Low Zip Cream", handle: "converse-chuck-low-zip-cream", price: 349000, cat: "Converse", sizes: CV, desc: "Cream өнгийн намхан Chuck, урд талын цахилгаантай." },
  { title: "Converse Chuck Low Zip Black", handle: "converse-chuck-low-zip-black", price: 349000, cat: "Converse", sizes: CV, desc: "Хар намхан Chuck, урд талын цахилгаантай." },
  { title: "Converse Chuck Low Blue Check", handle: "converse-chuck-low-blue-check", price: 349000, cat: "Converse", sizes: CV, desc: "Цэнхэр намхан Chuck, шатрын хээтэй онцгой хувилбар." },
  { title: "Converse Chuck Low Pink Stars", handle: "converse-chuck-low-pink-stars", price: 349000, cat: "Converse", sizes: CV, desc: "Ягаан намхан Chuck, цэнхэр од хээтэй." },
  { title: "Converse Chuck Low Grey Stars", handle: "converse-chuck-low-grey-stars", price: 349000, cat: "Converse", sizes: CV, desc: "Саарал намхан Chuck, од хээтэй." },
  { title: "Converse Chuck Low Cream Stars", handle: "converse-chuck-low-cream-stars", price: 349000, cat: "Converse", sizes: CV, desc: "Cream намхан Chuck, мөнгөлөг од хээтэй." },
  { title: "Converse Chuck Platform Pink", handle: "converse-chuck-platform-pink", price: 349000, cat: "Converse", sizes: CV, desc: "Ягаан patent өндөр platform Chuck — өндөрсгөсөн тал улавчтай." },
  { title: "Converse Chuck Low Platform Black Stars", handle: "converse-chuck-low-black-stars", price: 349000, cat: "Converse", sizes: CV, desc: "Хар namhan platform Chuck, мөнгөлөг од хээтэй." },

  // ── Converse — One Star / Star Player ──
  { title: "Converse One Star Mustard Suede", handle: "converse-one-star-mustard", price: 349000, cat: "Converse", sizes: CV, desc: "Гичийн шар suede One Star, IRAK Gore-Tex, хар тал улавчтай." },
  { title: "Converse One Star Navy Suede", handle: "converse-one-star-navy", price: 349000, cat: "Converse", sizes: CV, desc: "Navy suede One Star, IRAK Gore-Tex, моно хар тал улавчтай." },
  { title: "Converse One Star Black Suede", handle: "converse-one-star-black", price: 349000, cat: "Converse", sizes: CV, desc: "Моно хар suede One Star, цагаан одтой." },
  { title: "Converse Star Player 76 Burgundy", handle: "converse-star-player-burgundy", price: 299000, cat: "Converse", sizes: CV, desc: "Burgundy suede Star Player 76, cream тал улавч, chevron логотой." },

  // ── Converse — Suede low / retro trainer ──
  { title: "Converse Suede Retro Pink", handle: "converse-suede-retro-pink", price: 349000, cat: "Converse", sizes: CV, desc: "Ягаан suede намхан retro, цэнхэр үдээстэй." },
  { title: "Converse Suede Low Red", handle: "converse-suede-low-red", price: 349000, cat: "Converse", sizes: CV, desc: "Улаан suede намхан, ягаан үдээстэй, cream тал улавчтай." },
  { title: "Converse Suede Low Black", handle: "converse-suede-low-black", price: 349000, cat: "Converse", sizes: CV, desc: "Хар suede намхан, хос өнгийн үдээстэй, cream хамартай." },
  { title: "Converse Futsal Black Gum", handle: "converse-futsal-black", price: 299000, cat: "Converse", sizes: CV, desc: "Хар futsal силуэт, gum тал улавч, chevron логотой." },
  { title: "Converse Retro Trainer Burgundy", handle: "converse-retro-trainer-burgundy", price: 299000, cat: "Converse", sizes: CV, desc: "Burgundy retro гүйлтийн силуэт, gum тал улавчтай." },
  { title: "Converse Retro Trainer Green", handle: "converse-retro-trainer-green", price: 299000, cat: "Converse", sizes: CV, desc: "Ногоон retro гүйлтийн силуэт, gum тал улавчтай." },

  // ── New Balance 1906A (хямдралтай) ──
  { title: "New Balance 1906A Silver", handle: "nb-1906a-silver", price: 250000, cat: "New Balance", sizes: NB, desc: "Мөнгөлөг/цагаан 1906A, N-ergy дэрлэгтэй Y2K силуэт. Хямдралтай." },
  { title: "New Balance 1906A Black", handle: "nb-1906a-black", price: 250000, cat: "New Balance", sizes: NB, desc: "Моно хар 1906A, N-ergy дэрлэгтэй Y2K силуэт. Хямдралтай." },
  { title: "New Balance 1906A Grey", handle: "nb-1906a-grey", price: 250000, cat: "New Balance", sizes: NB, desc: "Саарал 1906A, N-ergy дэрлэгтэй Y2K силуэт. Хямдралтай." },
];

// Remove any prior catalog on reseed (placeholders, beauty, VEXO, Medusa demo).
const OLD_HANDLES = [
  "nike-air-max-90","nike-air-force-1","nike-dunk-low","adidas-samba-og","adidas-ultraboost",
  "adidas-gazelle","nb-550","nb-9060","nb-1906r","puma-suede-classic","puma-rs-x","puma-palermo",
  "converse-chuck-70-hi","converse-chuck-low","converse-run-star",
  "edp-bloom","edp-signature","rose-elixir","citrus-cologne","glow-serum","vitc-serum","hydra-cream",
  "cleansing-foam","lip-velvet-nude","lip-matte-ruby","silk-foundation","volume-mascara",
  "body-lotion-silk","shower-gel-vanilla","premium-gift-set","skincare-starter-kit",
  "tech-fleece-hoodie","performance-tank","training-joggers","compression-longsleeve",
  "windbreaker-jacket","lined-training-shorts","seamless-leggings","womens-cropped-tee",
  "tactical-sling-bag","performance-cap","thermal-hooded-base","cargo-tech-pants",
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
  const categoryIdsFor = (brand: string): string[] => {
    const id = catIdByHandle.get(MN_TO_HANDLE[brand]);
    return id ? [id] : [];
  };

  // Remove old catalog + any previous X-MAS products (fresh data each run)
  const stale = await productModule.listProducts({ handle: [...OLD_HANDLES, ...CATALOG.map(c => c.handle)] });
  if (stale.length) {
    await productModule.deleteProducts(stale.map(p => p.id));
    logger.info(`Removed ${stale.length} existing products`);
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
          thumbnail: IMG(p.handle),
          images: [{ url: IMG(p.handle) }],
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
    logger.info(`Seeded ${toCreate.length} X-MAS products`);
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
  logger.info(`X-MAS catalog ready — ${all.length} products (Converse + New Balance).`);
}
