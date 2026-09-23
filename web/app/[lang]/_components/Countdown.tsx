"use client";
import { useEffect, useState } from "react";
import { useT } from "@/components/LangProvider";

// Counts down to a rolling deadline (~3 days out) so the drop always feels live.
// Renders nothing time-sensitive until mounted to avoid hydration mismatch.
export function Countdown() {
  const t = useT();
  const [left, setLeft] = useState<{ d: number; h: number; m: number } | null>(null);

  useEffect(() => {
    // Deadline: end of the day, 3 days from now (stable within a session).
    const target = new Date();
    target.setDate(target.getDate() + 3);
    target.setHours(23, 59, 59, 0);
    const tick = () => {
      const ms = Math.max(0, target.getTime() - Date.now());
      setLeft({
        d: Math.floor(ms / 86400000),
        h: Math.floor((ms % 86400000) / 3600000),
        m: Math.floor((ms % 3600000) / 60000),
      });
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const cell = (v: number | null, label: string) => (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 grid place-items-center font-display text-[28px] num-tabular text-white">
        {v == null ? "--" : String(v).padStart(2, "0")}
      </div>
      <span className="text-[11px] uppercase tracking-[.14em] text-white/60 mt-2">{label}</span>
    </div>
  );

  return (
    <div>
      <div className="text-[11px] uppercase tracking-[.2em] text-accent font-semibold mb-3">{t("home.dropEnds")}</div>
      <div className="flex items-center gap-3">
        {cell(left?.d ?? null, t("home.day"))}
        {cell(left?.h ?? null, t("home.hour"))}
        {cell(left?.m ?? null, t("home.min"))}
      </div>
    </div>
  );
}
