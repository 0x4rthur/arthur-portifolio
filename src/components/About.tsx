import { SectionHead } from "./SectionHead";

const pills = ["LangChain", "LangGraph", "RAG", "Python", "NIST CSF", "GRC"];

const stats = [
  {
    num: "2.9",
    suffix: "y",
    label: "in security & risk engineering",
  },
  {
    num: "15+",
    label: "LangChain / LangGraph experiments shipped",
  },
  {
    num: "∞",
    label: "cups of coffee debugging chains",
  },
  {
    num: "4",
    label: "core stacks: LangChain · LangGraph · RAG · Python",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-[1200px] px-6 py-[100px]"
    >
      <div className="bloom-2" style={{ left: "-200px", top: 0 }} />
      <SectionHead soft="About" bold="me" eyebrow="WHO, WHAT, WHY." />

      <div className="grid items-start gap-14 md:grid-cols-2">
        <div className="glass rounded-[28px] p-9 shadow-[0_8px_24px_rgba(17,18,19,0.06),0_2px_6px_rgba(17,18,19,0.04)]">
          <p className="m-0 mb-4 text-[15.5px] leading-[1.7] text-ink-soft">
            I&apos;m an <strong>AI Engineer</strong> focused on building
            real-world applications with <strong>LangChain</strong> and{" "}
            <strong>LangGraph</strong> — agentic systems, RAG pipelines, and
            tool-using LLMs that go beyond demos.
          </p>
          <p className="m-0 mb-4 text-[15.5px] leading-[1.7] text-ink-soft">
            My day-job background in <strong>Cybersecurity &amp; GRC</strong> at
            RHI Magnesita gives me a useful lens on AI: I think a lot about
            prompt-injection surfaces, data lineage, KPIs/KRIs for model
            behavior, and how to make agents observable and auditable.
          </p>
          <p className="m-0 text-[15.5px] leading-[1.7] text-ink-soft">
            Currently I&apos;m exploring <em>graph-of-thought</em>{" "}
            orchestration, hybrid retrieval (BM25 + dense + rerank), and
            lightweight evaluation harnesses for agent reliability.
          </p>

          <div className="mt-[22px] flex flex-wrap gap-2">
            {pills.map((p) => (
              <span
                key={p}
                className="rounded-full border border-line bg-white/70 px-3 py-[6px] font-mono text-[11.5px] text-ink-soft"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass rounded-[18px] p-[22px] shadow-[0_1px_2px_rgba(17,18,19,0.04),0_4px_12px_rgba(17,18,19,0.04)]"
            >
              <div className="text-[36px] font-extrabold leading-none tracking-[-0.03em]">
                {s.num}
                {s.suffix && (
                  <span className="text-[24px] text-ink-mute">{s.suffix}</span>
                )}
              </div>
              <div className="mt-2 text-[12.5px] leading-[1.4] text-ink-soft">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
