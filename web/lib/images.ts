// X-MAS product photography. Files live in web/public/products/<handle>.jpg
// (real store shots). Medusa also carries each product's thumbnail; these
// constants power the homepage hero / editorial sections.

export const productImg = (handleOrId: string) => `/products/${handleOrId}.jpg`;

// Hero + editorial feature imagery (pick strong colourways).
export const HERO_IMG  = productImg("converse-chuck70-hi-navy");
export const GROUP_IMG = productImg("nb-1906a-silver");
export const FILM_IMG  = productImg("converse-one-star-mustard");

// A few named slots kept for backwards-compat with older sections.
export const PRODUCT_IMG: Record<string, string> = {
  p1: productImg("converse-chuck70-hi-navy"),
  p2: productImg("converse-one-star-mustard"),
  p3: productImg("nb-1906a-silver"),
  p4: productImg("converse-chuck-platform-pink"),
  p5: productImg("converse-suede-low-red"),
  p6: productImg("converse-retro-trainer-green"),
};
