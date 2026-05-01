import { SectionHead } from "./SectionHead";

const projects = [
  {
    num: "/ 01",
    title: "GRC Copilot",
    grad: "linear-gradient(135deg, #ffd6b3, #c8b8ff)",
    body: "A LangGraph multi-agent that maps unstructured policies to NIST CSF v2.0 controls, drafts evidence requests, and exports to Eramba — built from real GRC pain points.",
    tags: ["LangGraph", "RAG", "NIST CSF"],
    icon: (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="rgba(17,18,19,.85)"
        strokeWidth="1.6"
      >
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
    title: "HybridRAG Lab",
    grad: "linear-gradient(135deg, #b6d6ff, #d4c4ff)",
    body: "A reproducible playground combining BM25, dense embeddings, and a cross-encoder reranker, with eval harnesses to A/B retrieval strategies on internal corpora.",
    tags: ["LangChain", "FAISS", "Reranking"],
    icon: (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="rgba(17,18,19,.85)"
        strokeWidth="1.6"
      >
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
    title: "Phish-Eval Agent",
    grad: "linear-gradient(135deg, #ffe7a8, #ffd6e0)",
    body: "An LLM-driven analyzer that scores phishing simulation outcomes, clusters user-failure patterns, and writes targeted training prompts — born out of real campaigns.",
    tags: ["Python", "LangChain", "Clustering"],
    icon: (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="rgba(17,18,19,.85)"
        strokeWidth="1.6"
      >
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
    title: "DocuChain",
    grad: "linear-gradient(135deg, #c8b8ff, #b6d6ff)",
    body: "A LangChain pipeline that ingests SOC 2 / ISO 27001 documentation, extracts control statements, and turns them into queryable, citation-backed knowledge.",
    tags: ["LangChain", "Pydantic", "PostgreSQL"],
    icon: (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="rgba(17,18,19,.85)"
        strokeWidth="1.6"
      >
        <rect x="20" y="22" width="60" height="40" rx="4" />
        <line x1="30" y1="34" x2="70" y2="34" />
        <line x1="30" y1="42" x2="60" y2="42" />
        <line x1="30" y1="50" x2="65" y2="50" />
        <path d="M50 62 L50 78 M42 72 L50 80 L58 72" />
      </svg>
    ),
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-[1200px] px-6 py-[100px]"
    >
      <div className="bloom-2" style={{ right: "-200px", bottom: 0 }} />
      <SectionHead
        soft="Selected"
        bold="projects"
        eyebrow="AGENTS, RAG, AND APPLIED LLM SYSTEMS."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.title}
            className="glass relative flex min-h-[320px] flex-col overflow-hidden rounded-[28px] p-8 shadow-[0_1px_2px_rgba(17,18,19,0.04),0_4px_12px_rgba(17,18,19,0.04)] transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(17,18,19,0.10),0_4px_12px_rgba(17,18,19,0.05)]"
          >
            <div className="absolute right-5 top-4 z-[1] font-mono text-[11px] tracking-[0.14em] text-[rgba(17,18,19,0.5)]">
              {p.num}
            </div>

            <div
              className="relative z-[1] mb-6 grid h-[140px] place-items-center overflow-hidden rounded-[18px]"
              style={{ background: p.grad }}
            >
              <div className="h-[60%] w-[60%]">{p.icon}</div>
            </div>

            <h3 className="relative z-[1] m-0 mb-[10px] text-[22px] font-bold tracking-[-0.02em]">
              {p.title}
            </h3>
            <p className="relative z-[1] m-0 mb-[18px] flex-1 text-[14px] leading-[1.6] text-ink-soft">
              {p.body}
            </p>
            <div className="relative z-[1] flex flex-wrap gap-[6px]">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-white/70 px-[10px] py-[4px] font-mono text-[10.5px] text-ink-soft"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
