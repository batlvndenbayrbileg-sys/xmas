"use client";
import { Marquee } from "@/components/ui/3d-testimonials";

type Review = { name: string; username: string; body: string; img: string; country: string };

const REVIEWS: Review[] = [
  { name: "Ayaan M.", username: "@ayaan", body: "Best sneakers I've owned. Comfy, stylish and my everyday go-to.", img: "https://cdn.21st.dev/assets/mirror/55/55cf6231499bcdc496f15ff1d28d4170ac9b99e9279495caa44fca70886d8b2e.jpg", country: "🇲🇳 MN" },
  { name: "Tuya B.", username: "@tuya", body: "True to size and box-fresh. I get compliments every time.", img: "https://cdn.21st.dev/assets/mirror/f0/f07b84f12ef125cbb837a7bd64da401992f5f62bd55fee10d01cd3dcc8abae80.jpg", country: "🇲🇳 MN" },
  { name: "Leo R.", username: "@leo", body: "Premium and 100% authentic. X-MAS nailed it — fast delivery too.", img: "https://cdn.21st.dev/assets/mirror/7c/7c0d2aa99715b15c218385f5679347782843c02f939d8eee6f9cb1cad6ba6ed0.jpg", country: "🇲🇳 MN" },
  { name: "Sara K.", username: "@sara", body: "The Chuck 70 fit is perfect. Quality speaks for itself.", img: "https://cdn.21st.dev/assets/mirror/f8/f8f2ddc445b6b2318430260bdebb665c9415865827230565aa42f57c9c794baf.jpg", country: "🇲🇳 MN" },
  { name: "Bilguun", username: "@bilg", body: "Grabbed the 1906A on sale — insane value. Super comfy.", img: "https://cdn.21st.dev/assets/mirror/ae/ae1d49872fdd6f8d9aa933f6ca8bce8cb1ba7e87dfb9d2926661184cb7bfe26d.jpg", country: "🇲🇳 MN" },
  { name: "Maral", username: "@maral", body: "Love the colourways. My One Star suede is unreal.", img: "https://cdn.21st.dev/assets/mirror/9a/9aac54d62e727561f6958213b8a3649230a3bba61ba5ddf63c69d3c6e4aecb0a.jpg", country: "🇲🇳 MN" },
  { name: "Enkh", username: "@enkh", body: "Store staff helped me size right. Legit check passed.", img: "https://cdn.21st.dev/assets/mirror/e5/e55f3cdab57eb4084f7006cfe9f7f047e638e1b257a53498aaed14b83087152a.jpg", country: "🇲🇳 MN" },
  { name: "Nomin", username: "@nomin", body: "Best sneaker spot in UB. Everyday go-to for kicks.", img: "https://cdn.21st.dev/assets/mirror/03/03410c155320ba33ecb8d798807c6c9610f33b2b2acdd4ed961a68185806df79.jpg", country: "🇲🇳 MN" },
];

function Card({ img, name, username, body, country }: Review) {
  return (
    <figure className="w-56 rounded-2xl border border-line bg-frost-deep p-4 shadow-soft">
      <div className="flex items-center gap-2.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={name} className="h-9 w-9 rounded-full object-cover" />
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-ink flex items-center gap-1">{name} <span className="text-[11px]">{country}</span></figcaption>
          <p className="text-[11px] text-muted">{username}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-[13px] leading-relaxed text-ink/75">{body}</blockquote>
    </figure>
  );
}

export function Testimonials3D() {
  return (
    <div className="relative flex h-[420px] w-full flex-row items-center justify-center overflow-hidden gap-2 [perspective:320px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{ transform: "translateX(-40px) translateZ(-90px) rotateX(18deg) rotateY(-8deg) rotateZ(18deg)" }}
      >
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:38s]">
          {REVIEWS.map(r => <Card key={r.username} {...r} />)}
        </Marquee>
        <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:44s]">
          {REVIEWS.map(r => <Card key={r.username} {...r} />)}
        </Marquee>
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s] hidden sm:flex">
          {REVIEWS.map(r => <Card key={r.username} {...r} />)}
        </Marquee>
        <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:46s] hidden lg:flex">
          {REVIEWS.map(r => <Card key={r.username} {...r} />)}
        </Marquee>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-frost to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-frost to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-frost to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-frost to-transparent" />
    </div>
  );
}
