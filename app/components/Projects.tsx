import BorderGlow from "./BorderGlow";

const projects = [
  {
    num: "/ 01",
    grad: "linear-gradient(135deg, #ffd6b3, #c8b8ff)",
    title: "GRC Copilot",
    desc: "A LangGraph multi-agent that maps unstructured policies to NIST CSF v2.0 controls, drafts evidence requests, and exports to Eramba — built from real GRC pain points.",
    tags: ["LangGraph", "RAG", "NIST CSF"],
    icon: (
      <svg viewBox="0 0 100 100" fill="none" stroke="rgba(17,18,19,.85)" strokeWidth="1.6">
        <circle cx="50" cy="20" r="8" />
        <circle cx="20" cy="60" r="8" />
        <circle cx="50" cy="60" r="8" />
        <circle cx="80" cy="60" r="8" />
        <circle cx="35" cy="85" r="6" />
        <circle cx="65" cy="85" r="6" />
        <line x1="50" y1="28" x2="20" y2="52" />
        <line x1="50" y1="28" x2="50" y2="52" />
        <line x1="50" y1="28" x2="80" y2="52" />
        <line x1="50" y1="68" x2="35" y2="79" />
        <line x1="50" y1="68" x2="65" y2="79" />
      </svg>
    ),
  },
  {
    num: "/ 02",
    grad: "linear-gradient(135deg, #b6d6ff, #d4c4ff)",
    title: "HybridRAG Lab",
    desc: "A reproducible playground combining BM25, dense embeddings, and a cross-encoder reranker, with eval harnesses to A/B retrieval strategies on internal corpora.",
    tags: ["LangChain", "FAISS", "Reranking"],
    icon: (
      <svg viewBox="0 0 100 100" fill="none" stroke="rgba(17,18,19,.85)" strokeWidth="1.6">
        <rect x="14" y="20" width="72" height="14" rx="3" />
        <rect x="14" y="42" width="72" height="14" rx="3" />
        <rect x="14" y="64" width="72" height="14" rx="3" />
        <circle cx="22" cy="27" r="2.5" fill="rgba(17,18,19,.85)" />
        <circle cx="22" cy="49" r="2.5" fill="rgba(17,18,19,.85)" />
        <circle cx="22" cy="71" r="2.5" fill="rgba(17,18,19,.85)" />
        <line x1="32" y1="27" x2="78" y2="27" />
        <line x1="32" y1="49" x2="60" y2="49" />
        <line x1="32" y1="71" x2="70" y2="71" />
      </svg>
    ),
  },
  {
    num: "/ 03",
    grad: "linear-gradient(135deg, #ffe7a8, #ffd6e0)",
    title: "Phish-Eval Agent",
    desc: "An LLM-driven analyzer that scores phishing simulation outcomes, clusters user-failure patterns, and writes targeted training prompts — born out of real campaigns.",
    tags: ["Python", "LangChain", "Clustering"],
    icon: (
      <svg viewBox="0 0 100 100" fill="none" stroke="rgba(17,18,19,.85)" strokeWidth="1.6">
        <path d="M20 80 L20 50 L40 50 L40 30 L60 30 L60 60 L80 60 L80 80 Z" />
        <line x1="20" y1="80" x2="80" y2="80" />
        <circle cx="30" cy="65" r="2" fill="rgba(17,18,19,.85)" />
        <circle cx="50" cy="45" r="2" fill="rgba(17,18,19,.85)" />
        <circle cx="70" cy="70" r="2" fill="rgba(17,18,19,.85)" />
      </svg>
    ),
  },
  {
    num: "/ 04",
    grad: "linear-gradient(135deg, #c8b8ff, #b6d6ff)",
    title: "DocuChain",
    desc: "A LangChain pipeline that ingests SOC 2 / ISO 27001 documentation, extracts control statements, and turns them into queryable, citation-backed knowledge.",
    tags: ["LangChain", "Pydantic", "PostgreSQL"],
    icon: (
      <svg viewBox="0 0 100 100" fill="none" stroke="rgba(17,18,19,.85)" strokeWidth="1.6">
        <rect x="20" y="22" width="60" height="40" rx="4" />
        <line x1="30" y1="34" x2="70" y2="34" />
        <line x1="30" y1="42" x2="60" y2="42" />
        <line x1="30" y1="50" x2="65" y2="50" />
        <path d="M50 62 L50 78 M42 72 L50 80 L58 72" />
      </svg>
    ),
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="max-w-[1200px] mx-auto px-6 py-[100px] relative max-[880px]:py-[70px] max-[880px]:px-5"
    >
      {/* Accent bloom blob */}
      <div className="bloom-2" style={{ right: "-200px", bottom: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Heading */}
        <div className="mb-14">
          <h2 className="text-[clamp(40px,5vw,64px)] leading-[1.02] tracking-[-0.035em] font-extrabold text-ink m-0">
            <span className="text-ink-mute font-semibold">Selected</span> projects
          </h2>
          <div className="mt-2 font-mono text-[11.5px] tracking-[0.14em] uppercase text-ink-mute">
            AGENTS, RAG, AND APPLIED LLM SYSTEMS.
          </div>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-2 gap-6 max-[880px]:grid-cols-1">
          {projects.map((p) => (
            <BorderGlow
              key={p.num}
              edgeSensitivity={21}
              glowColor="260 80 80"
              backgroundColor="rgba(255,255,255,0.6)"
              borderRadius={28}
              glowRadius={45}
              glowIntensity={0.6}
              coneSpread={40}
              fillOpacity={0}
              colors={['#c8b8ff', '#ffd6b3', '#b6d6ff']}
              className="transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] backdrop-blur-[20px]"
            >
              <article
                className="p-8 flex flex-col min-h-[320px] relative overflow-hidden h-full rounded-[28px]"
                style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)' }}
              >
                {/* Card number */}
                <div className="absolute top-4 right-5 font-mono text-[11px] text-ink-mute tracking-[0.14em]">
                  {p.num}
                </div>

                {/* Visual block */}
                <div
                  className="h-[140px] rounded-[18px] mb-6 grid place-items-center relative overflow-hidden"
                  style={{ background: p.grad }}
                >
                  <div className="w-[60%] h-[60%]">{p.icon}</div>
                </div>

                {/* Text */}
                <h3
                  className="text-[22px] font-bold text-ink m-0 mb-2.5"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {p.title}
                </h3>
                <p className="text-ink-soft text-[14px] leading-[1.6] m-0 mb-[18px] flex-1">
                  {p.desc}
                </p>

                {/* Tags */}
                <div className="flex gap-1.5 flex-wrap">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10.5px] px-[10px] py-1 rounded-full text-ink-soft"
                      style={{
                        background: "rgba(255,255,255,.7)",
                        border: "1px solid rgba(17,18,19,.08)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
