import type { Product, Shape } from "@/lib/types";

function shade(hex: string, factor: number) {
  if (!hex.startsWith("#") || hex.length < 7) return hex;
  const f = (v: number) => Math.max(0, Math.min(255, Math.floor(v * factor))).toString(16).padStart(2, "0");
  return `#${f(parseInt(hex.slice(1,3),16))}${f(parseInt(hex.slice(3,5),16))}${f(parseInt(hex.slice(5,7),16))}`;
}
const isPale = (c: string) => {
  if (!c.startsWith("#") || c.length < 7) return false;
  const lum = 0.299*parseInt(c.slice(1,3),16) + 0.587*parseInt(c.slice(3,5),16) + 0.114*parseInt(c.slice(5,7),16);
  return lum > 175;
};

type V = { product: Pick<Product, "shape" | "accent">; size?: "sm" | "md" | "lg" | "xl" };

export function ProductVisual({ product, size = "md" }: V) {
  const dim = { sm: 150, md: 250, lg: 380, xl: 520 }[size];
  // Guard against a missing accent (e.g. a stale/partial cart item) so the
  // fallback visual never crashes the page.
  const c = product.accent || "#C7B8A8";
  const u = c.replace("#", "") + "-" + size + "-" + product.shape;
  const id = (k: string) => `${k}-${u}`;
  const seam = isPale(c) ? "rgba(14,15,16,.16)" : "rgba(255,255,255,.22)";
  const stitch = isPale(c) ? "rgba(14,15,16,.26)" : "rgba(255,255,255,.32)";

  const Defs = (
    <defs>
      <linearGradient id={id("fab")} x1=".2" x2=".8" y1="0" y2="1">
        <stop offset="0" stopColor={shade(c, 1.18)}/>
        <stop offset=".5" stopColor={c}/>
        <stop offset="1" stopColor={shade(c, .78)}/>
      </linearGradient>
      <linearGradient id={id("dark")} x1=".2" x2=".8" y1="0" y2="1">
        <stop offset="0" stopColor={shade(c, .9)}/>
        <stop offset="1" stopColor={shade(c, .58)}/>
      </linearGradient>
      <radialGradient id={id("sh")} cx=".5" cy=".5" r=".5">
        <stop offset="0" stopColor="rgba(14,15,16,.28)"/>
        <stop offset="1" stopColor="rgba(14,15,16,0)"/>
      </radialGradient>
      <filter id={id("soft")} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
    </defs>
  );
  const Shadow = <ellipse cx="205" cy="332" rx="150" ry="16" fill={`url(#${id("sh")})`} filter={`url(#${id("soft")})`}/>;
  const hi = "rgba(255,255,255,.5)";
  const sole = shade(c, 0.62);
  const wrap = (children: React.ReactNode) => (
    <svg viewBox="0 0 400 400" width={dim} height={dim} aria-hidden>{Defs}{Shadow}{children}</svg>
  );

  // Side-profile sneaker fallback (shown only if a product image fails to load).
  // The silhouette adapts to the product shape: hightop adds an ankle collar,
  // chunky thickens the sole, runner adds a midsole line.
  const chunky = product.shape === "chunky";
  const hightop = product.shape === "hightop";
  const runner = product.shape === "runner";
  const soleY = 288;
  const soleH = chunky ? 46 : 30;
  const collar = hightop
    ? <path d="M250 210 C250 168 300 160 300 200 L300 250 L262 250 Z" fill={`url(#${id("fab")})`} stroke={seam} strokeWidth="2"/>
    : null;

  return wrap(<>
    {/* upper — toe box → vamp → heel */}
    <path d="M64 250
             C60 214 120 206 158 202
             C196 198 236 196 268 214
             C300 232 336 240 342 250
             L342 262 L64 262 Z"
          fill={`url(#${id("fab")})`} stroke={seam} strokeWidth="2"/>
    {collar}
    {/* toe cap seam */}
    <path d="M64 250 C76 232 104 224 128 224 L128 262 L64 262 Z" fill={`url(#${id("dark")})`} opacity=".45"/>
    {/* laces panel */}
    <path d="M168 210 L232 224 L226 250 L176 250 Z" fill="rgba(255,255,255,.14)"/>
    {[0,1,2,3].map(i => (
      <line key={i} x1={180 + i*15} y1={216 + i*7} x2={196 + i*15} y2={220 + i*7}
            stroke={hi} strokeWidth="3.5" strokeLinecap="round"/>
    ))}
    {/* side accent swoosh/panel */}
    <path d="M150 250 C190 232 236 236 262 252 L250 258 C224 246 190 244 160 256 Z"
          fill="rgba(255,255,255,.55)"/>
    {/* midsole */}
    <rect x="60" y={soleY} width="290" height={soleH} rx={soleH/2} fill="#F4F4F5" stroke={seam} strokeWidth="2"/>
    {runner && <line x1="72" y1={soleY + soleH/2} x2="338" y2={soleY + soleH/2} stroke={sole} strokeWidth="2" opacity=".5"/>}
    {/* outsole */}
    <rect x="60" y={soleY + soleH - 8} width="290" height="12" rx="6" fill={sole}/>
    {/* heel highlight */}
    <path d="M300 214 C316 220 332 236 340 250" stroke={hi} strokeWidth="4" fill="none" opacity=".7"/>
  </>);
}
