export default function About() {
  const pills = ["LangChain", "LangGraph", "RAG", "Python", "NIST CSF", "GRC"];

  const stats = [
    {
      num: (
        <>
          2.9<span style={{ color: "var(--color-ink-mute)", fontSize: "24px" }}>y</span>
        </>
      ),
      label: "in security & risk engineering",
    },
    { num: "15+", label: "LangChain / LangGraph experiments shipped" },
    { num: "∞", label: "cups of coffee debugging chains" },
    { num: "4", label: "core stacks: LangChain · LangGraph · RAG · Python" },
  ];

  return (
    <section
      id="about"
      className="max-w-[1200px] mx-auto px-6 py-[100px] relative max-[880px]:py-[70px] max-[880px]:px-5"
    >
      <div className="bloom-2" style={{ left: "-200px", top: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="mb-14">
          <h2 className="text-[clamp(40px,5vw,64px)] leading-[1.02] tracking-[-0.035em] font-extrabold text-ink m-0">
            <span className="text-ink-mute font-semibold">About</span> me
          </h2>
          <div className="mt-2 font-mono text-[11.5px] tracking-[0.14em] uppercase text-ink-mute">
            WHO, WHAT, WHY.
          </div>
        </div>

        <div className="grid grid-cols-2 gap-14 items-start max-[880px]:grid-cols-1">
          <div className="glass rounded-[28px] p-9 shadow-md">
            <p className="text-ink-soft text-[15.5px] leading-[1.7] m-0 mb-4">
              I&rsquo;m an <strong>AI Engineer</strong> focused on building real-world
              applications with <strong>LangChain</strong> and{" "}
              <strong>LangGraph</strong> — agentic systems, RAG pipelines, and
              tool-using LLMs that go beyond demos.
            </p>
            <p className="text-ink-soft text-[15.5px] leading-[1.7] m-0 mb-4">
              My day-job background in{" "}
              <strong>Cybersecurity &amp; GRC</strong> at RHI Magnesita gives me
              a useful lens on AI: I think a lot about prompt-injection surfaces,
              data lineage, KPIs/KRIs for model behavior, and how to make agents
              observable and auditable.
            </p>
            <p className="text-ink-soft text-[15.5px] leading-[1.7] m-0">
              Currently I&rsquo;m exploring <em>graph-of-thought</em>{" "}
              orchestration, hybrid retrieval (BM25 + dense + rerank), and
              lightweight evaluation harnesses for agent reliability.
            </p>
            <div className="flex flex-wrap gap-2 mt-[22px]">
              {pills.map((p) => (
                <span
                  key={p}
                  className="font-mono text-[11.5px] px-3 py-1.5 text-ink-soft rounded-full"
                  style={{
                    background: "rgba(255,255,255,.7)",
                    border: "1px solid rgba(17,18,19,.08)",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="glass rounded-[18px] p-[22px] shadow-sm">
                <div
                  className="text-[36px] font-extrabold leading-none"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {s.num}
                </div>
                <div className="mt-2 text-[12.5px] text-ink-soft leading-[1.4]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
