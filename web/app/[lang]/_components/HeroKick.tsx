"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { Photo } from "@/components/Photo";
import { ArrowUpRight } from "@/components/Icons";
import { useT } from "@/components/LangProvider";
import type { Product } from "@/lib/types";

const ease: [number, number, number, number] = [0.22, 0.61, 0.36, 1];
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const rise = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };

export function HeroKick({ products }: { products: Product[] }) {
  const t = useT();
  const items = products.slice(0, 4);
  const [active, setActive] = useState(0);
  const hero = items[active] ?? products[0];
  if (!hero) return null;

  const pills = [t("home.f1"), t("home.f2"), t("home.f3"), t("home.f4")];

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-white border border-line shadow-[0_30px_80px_-50px_rgba(22,21,21,.5)]">
      <div className="grain absolute inset-0 opacity-40 pointer-events-none" />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-4 p-5 sm:p-8 lg:p-10">
        {/* Left — copy (staggered entrance) */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col justify-center order-2 lg:order-1">
          <motion.span variants={rise} className="eyebrow text-accent-deep">{t("home.newSeason")}</motion.span>
          <motion.h1 variants={rise} className="h-display leading-[.82] mt-3">
            {t("home.heroA")}<br />
            <span className="ghost-strong">{t("home.heroB")}</span>
          </motion.h1>
          <motion.p variants={rise} className="text-muted text-[15px] mt-5 max-w-[420px] leading-relaxed">{t("home.heroDesc")}</motion.p>

          <motion.div variants={rise} className="flex flex-wrap gap-2 mt-6">
            {pills.map(p => (
              <span key={p} className="inline-flex items-center gap-2 bg-mist border border-line rounded-pill pl-2.5 pr-3.5 h-8 text-[12px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />{p}
              </span>
            ))}
          </motion.div>

          <motion.div variants={rise} className="flex items-center gap-4 mt-7">
            <Link href="/shop" className="btn btn-primary">
              {t("home.shopNow")}
              <span className="arrow-cap bg-white/25 text-white"><ArrowUpRight width={14} height={14} /></span>
            </Link>
            <div className="font-display text-[22px] tracking-[.06em] uppercase leading-none"><span className="text-accent">X</span>-MAS</div>
          </motion.div>
        </motion.div>

        {/* Right — framed hero card + thumbnails */}
        <motion.div initial={{ opacity: 0, scale: 0.94, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.15 }} className="order-1 lg:order-2">
          <div className="relative rounded-[1.5rem] overflow-hidden bg-mist aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
            {/* floating accent glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[86%] h-[86%] rounded-full bg-accent/10 blur-3xl animate-floaty" />
            <motion.div
              key={hero.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease }}
              className="absolute inset-0"
            >
              <Photo
                src={hero.image}
                alt={hero.name}
                priority
                sizes="(max-width:1024px) 90vw, 45vw"
                imgClassName="object-cover"
              />
            </motion.div>
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-ink text-[11px] uppercase tracking-[.12em] font-semibold px-3 h-7 rounded-pill inline-grid place-items-center z-10">{hero.category}</span>
          </div>

          {/* thumbnails */}
          <div className="flex items-center gap-2.5 mt-3">
            {items.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                aria-label={p.name}
                aria-pressed={i === active}
                className={`relative w-16 h-16 rounded-2xl overflow-hidden bg-mist transition-all duration-300 ease-spring hover:-translate-y-0.5 ${
                  i === active ? "ring-2 ring-accent scale-105" : "ring-1 ring-line hover:ring-ink/30"
                }`}
              >
                <Photo src={p.image} alt="" imgClassName="object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
