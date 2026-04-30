"use client";
import { useState, useEffect, useRef } from "react";

type Tab = "ai" | "lang" | "sec";

const SKILLS: Record<
  Tab,
  { title: [string, string]; sub: string; bars: { name: string; pct: number }[] }
> = {
  ai: {
    title: ["Mastered", "frameworks"],
    sub: "AI & LLM ENGINEERING",
    bars: [
      { name: "LANGCHAIN",        pct: 95 },
      { name: "LANGGRAPH",        pct: 88 },
      { name: "RAG",              pct: 92 },
      { name: "PROMPT ENG.",      pct: 85 },
      { name: "OPENAI / LLM API", pct: 82 },
      { name: "VECTOR DBS",       pct: 78 },
      { name: "AGENTS",           pct: 80 },
    ],
  },
  lang: {
    title: ["Languages", "I speak"],
    sub: "PROGRAMMING LANGUAGES",
    bars: [
      { name: "PYTHON",      pct: 92 },
      { name: "SQL",         pct: 75 },
      { name: "BASH",        pct: 70 },
      { name: "YAML",        pct: 80 },
      { name: "JAVASCRIPT",  pct: 60 },
      { name: "MARKDOWN",    pct: 90 },
    ],
  },
  sec: {
    title: ["Security", "& tooling"],
    sub: "GRC, BLUE TEAM, OPS",
    bars: [
      { name: "NIST CSF v2.0",  pct: 90 },
      { name: "NIST 800-53",    pct: 80 },
      { name: "CROWDSTRIKE",    pct: 78 },
      { name: "ERAMBA",         pct: 82 },
      { name: "SOPHOS",         pct: 70 },
      { name: "PHISHING / SOC", pct: 75 },
    ],
  },
};

const TABS: { key: Tab; label: string }[] = [
  { key: "ai",   label: "AI / LLM" },
  { key: "lang", label: "Languages" },
  { key: "sec",  label: "Security & Ops" },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<Tab>("ai");
  const [barsRevealed, setBarsRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const observed = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observed.current) {
          observed.current = true;
          setBarsRevealed(true);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const changeTab = (tab: Tab) => {
    setBarsRevealed(false);
    setActiveTab(tab);
    requestAnimationFrame(() => requestAnimationFrame(() => setBarsRevealed(true)));
  };

  const data = SKILLS[activeTab];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="max-w-[1200px] mx-auto px-6 py-[100px] relative max-[880px]:py-[70px] max-[880px]:px-5"
    >
      <div className="mb-14">
        <h2 className="text-[clamp(40px,5vw,64px)] leading-[1.02] tracking-[-0.035em] font-extrabold text-ink m-0">
          <span className="text-ink-mute font-semibold">My</span> skills
        </h2>
        <div className="mt-2 font-mono text-[11.5px] tracking-[0.14em] uppercase text-ink-mute">
          FRAMEWORKS, LANGUAGES, TOOLING.
        </div>
      </div>

      <div className="flex gap-[10px] mb-7 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => changeTab(t.key)}
            className={[
              "px-4 py-2 rounded-full text-[12.5px] font-medium cursor-pointer transition-all duration-200",
              activeTab === t.key
                ? "bg-ink text-white"
                : "text-ink-soft hover:text-ink",
            ].join(" ")}
            style={
              activeTab === t.key
                ? { border: "1px solid var(--color-ink)" }
                : {
                    background: "rgba(255,255,255,.6)",
                    border: "1px solid rgba(17,18,19,.08)",
                  }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        className="glass-strong rounded-[28px] shadow-md relative overflow-hidden"
        style={{ padding: "56px 56px 48px" }}
      >
        <div className="grid gap-14 items-center max-[880px]:grid-cols-1" style={{ gridTemplateColumns: "1.3fr 0.8fr" }}>
          <div>
            {data.bars.map((bar) => (
              <div key={bar.name} className="grid items-center gap-4 mb-[18px] last:mb-0" style={{ gridTemplateColumns: "1fr auto" }}>
                <div
                  className="h-[14px] rounded-full overflow-hidden relative"
                  style={{ background: "rgba(17,18,19,.04)" }}
                >
                  <div className="bar-fill" style={{ width: barsRevealed ? `${bar.pct}%` : "0%" }} />
                </div>
                <div className="font-mono text-[11px] tracking-[0.1em] text-ink-soft whitespace-nowrap min-w-[90px] text-right">
                  {bar.name}
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3
              className="text-[36px] leading-[1.05] font-extrabold text-ink m-0 text-right max-[880px]:text-left"
              style={{ letterSpacing: "-0.03em" }}
            >
              {data.title[0]}
              <br />
              {data.title[1]}
              <small
                className="block font-mono font-medium text-ink-mute uppercase mt-3"
                style={{ fontSize: "12px", letterSpacing: "0.14em" }}
              >
                {data.sub}
              </small>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
