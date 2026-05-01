"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHead } from "./SectionHead";

type Cat = "ai" | "lang" | "sec";

const SKILLS: Record<
  Cat,
  { title: React.ReactNode; sub: string; bars: { name: string; pct: number }[] }
> = {
  ai: {
    title: (
      <>
        Mastered
        <br />
        frameworks
      </>
    ),
    sub: "AI & LLM ENGINEERING",
    bars: [
      { name: "LANGCHAIN", pct: 95 },
      { name: "LANGGRAPH", pct: 88 },
      { name: "RAG", pct: 92 },
      { name: "PROMPT ENG.", pct: 85 },
      { name: "OPENAI / LLM API", pct: 82 },
      { name: "VECTOR DBS", pct: 78 },
      { name: "AGENTS", pct: 80 },
    ],
  },
  lang: {
    title: (
      <>
        Languages
        <br />I speak
      </>
    ),
    sub: "PROGRAMMING LANGUAGES",
    bars: [
      { name: "PYTHON", pct: 92 },
      { name: "SQL", pct: 75 },
      { name: "BASH", pct: 70 },
      { name: "YAML", pct: 80 },
      { name: "JAVASCRIPT", pct: 60 },
      { name: "MARKDOWN", pct: 90 },
    ],
  },
  sec: {
    title: (
      <>
        Security
        <br />
        &amp; tooling
      </>
    ),
    sub: "GRC, BLUE TEAM, OPS",
    bars: [
      { name: "NIST CSF v2.0", pct: 90 },
      { name: "NIST 800-53", pct: 80 },
      { name: "CROWDSTRIKE", pct: 78 },
      { name: "ERAMBA", pct: 82 },
      { name: "SOPHOS", pct: 70 },
      { name: "PHISHING / SOC", pct: 75 },
    ],
  },
};

const TABS: { key: Cat; label: string }[] = [
  { key: "ai", label: "AI / LLM" },
  { key: "lang", label: "Languages" },
  { key: "sec", label: "Security & Ops" },
];

export function Skills() {
  const [active, setActive] = useState<Cat>("ai");
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setInView(true);
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Force re-mount of bar fills on tab change so the width animates from 0 → pct.
  const data = SKILLS[active];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative mx-auto max-w-[1200px] px-6 py-[100px]"
    >
      <SectionHead
        soft="My"
        bold="skills"
        eyebrow="FRAMEWORKS, LANGUAGES, TOOLING."
      />

      <div className="mb-7 flex flex-wrap gap-[10px]">
        {TABS.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className={
                "cursor-pointer rounded-full border px-4 py-2 text-[12.5px] font-medium transition-colors " +
                (isActive
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white/60 text-ink-soft hover:bg-white/90 hover:text-ink")
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="glass-strong relative overflow-hidden rounded-[28px] p-8 shadow-[0_8px_24px_rgba(17,18,19,0.06),0_2px_6px_rgba(17,18,19,0.04)] md:p-14">
        <div className="grid items-center gap-14 md:grid-cols-[1.3fr_0.8fr]">
          <div>
            {data.bars.map((b) => (
              <BarRow
                key={`${active}-${b.name}`}
                name={b.name}
                pct={b.pct}
                animate={inView}
              />
            ))}
          </div>
          <div>
            <h3 className="m-0 text-left text-[36px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-right">
              {data.title}
              <small className="mt-3 block font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-ink-mute">
                {data.sub}
              </small>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

function BarRow({
  name,
  pct,
  animate,
}: {
  name: string;
  pct: number;
  animate: boolean;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!animate) return;
    const id = requestAnimationFrame(() => setWidth(pct));
    return () => cancelAnimationFrame(id);
  }, [animate, pct]);

  return (
    <div className="mb-[18px] grid grid-cols-[1fr_auto] items-center gap-4 last:mb-0">
      <div className="relative h-[14px] overflow-hidden rounded-full bg-[rgba(17,18,19,0.04)]">
        <div
          className="bar-fill h-full rounded-full"
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="min-w-[90px] text-right font-mono text-[11px] tracking-[0.1em] text-ink-soft whitespace-nowrap">
        {name}
      </div>
    </div>
  );
}
