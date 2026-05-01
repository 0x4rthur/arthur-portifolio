import { SectionHead } from "./SectionHead";

type Exp = {
  role: string;
  date: string;
  company: string;
  meta: string;
  bullets: React.ReactNode[];
  tags: string[];
  current?: boolean;
};

const items: Exp[] = [
  {
    role: "Cybersecurity Analyst Junior",
    date: "FEB 2025 — PRESENT",
    company: "RHI Magnesita",
    meta: "Full-time · Remote",
    current: true,
    bullets: [
      <>
        Owning <strong>GRC</strong> KPIs, KRIs, KCIs &amp; key factors across
        the security program.
      </>,
      <>
        Mapping controls and maturity against <strong>NIST CSF v2.0</strong> and{" "}
        <strong>NIST 800-53</strong>.
      </>,
      <>
        Operating <strong>CrowdStrike</strong> for endpoint telemetry and{" "}
        <strong>Eramba</strong> for risk &amp; compliance management.
      </>,
      <>
        Building lightweight AI tooling on the side to automate evidence
        collection and control mapping.
      </>,
    ],
    tags: ["NIST CSF v2.0", "NIST 800-53", "CrowdStrike", "Eramba", "KPI / KRI / KCI"],
  },
  {
    role: "Information Security Intern",
    date: "AUG 2023 — FEB 2025",
    company: "RHI Magnesita",
    meta: "Internship · Hybrid",
    bullets: [
      <>Hands-on Governance, Risk Management &amp; Compliance (GRC).</>,
      <>
        Coordinated <strong>Blue &amp; Red Team</strong> exercises and incident
        exchanges.
      </>,
      <>
        Designed and ran <strong>phishing simulations</strong> with full
        reporting cycles.
      </>,
      <>
        Led <strong>PoCs for secure file transfer</strong> solutions.
      </>,
      <>
        Defined and instrumented <strong>security KPIs</strong> for executive
        reporting.
      </>,
    ],
    tags: ["GRC", "Blue Team", "Red Team", "Phishing", "KPIs"],
  },
  {
    role: "Firewall Engineering Intern",
    date: "APR 2023 — JUL 2023",
    company: "LogicNet Tecnologia",
    meta: "Internship · Belo Horizonte, BR",
    bullets: [
      <>
        Monitoring, incident resolution and on-call response on the{" "}
        <strong>SOPHOS</strong> firewall stack.
      </>,
      <>Triaged tickets and customer escalations across multiple tenants.</>,
    ],
    tags: ["SOPHOS", "SOC", "Network Security"],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="relative mx-auto max-w-[1200px] px-6 py-[100px]"
    >
      <SectionHead
        soft="Where"
        bold="I worked"
        eyebrow="2.9 YEARS · BLUE TEAM, GRC, AI ENGINEERING."
      />

      <div className="relative pl-8">
        <div
          className="absolute left-[7px] top-2 bottom-2 w-[2px] opacity-60"
          style={{
            background:
              "linear-gradient(180deg, #ffd6b3, #c8b8ff, #b6d6ff)",
          }}
        />

        {items.map((it, i) => (
          <article
            key={i}
            className="group glass relative mb-9 rounded-[18px] px-7 py-6 shadow-[0_1px_2px_rgba(17,18,19,0.04),0_4px_12px_rgba(17,18,19,0.04)] transition-all duration-200 hover:translate-x-1 hover:shadow-[0_8px_24px_rgba(17,18,19,0.06),0_2px_6px_rgba(17,18,19,0.04)]"
          >
            <span
              className={
                "absolute left-[-33px] top-7 h-4 w-4 rounded-full border-[3px] border-ink shadow-[0_0_0_4px_rgba(255,255,255,0.6)] " +
                (it.current
                  ? "bg-ink animate-[pulseNode_2s_ease-in-out_infinite]"
                  : "bg-white")
              }
            />

            <div className="mb-1 flex flex-wrap items-start justify-between gap-4">
              <h3 className="m-0 text-[18px] font-bold tracking-[-0.01em]">
                {it.role}
              </h3>
              <div className="whitespace-nowrap pt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-mute">
                {it.date}
              </div>
            </div>
            <div className="mb-3 text-[14px] text-ink-soft">
              {it.company}{" "}
              <span className="mx-2 text-ink-mute">·</span>
              {it.meta}
            </div>

            <ul className="m-0 mt-3 flex list-none flex-col gap-[6px] p-0">
              {it.bullets.map((b, j) => (
                <li
                  key={j}
                  className="relative pl-[18px] text-[14px] leading-[1.55] text-ink-soft before:absolute before:left-0 before:top-[9px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-[linear-gradient(135deg,#c8b8ff,#ffd6b3)] before:content-['']"
                >
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-[14px] flex flex-wrap gap-[6px]">
              {it.tags.map((t) => (
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
