const jobs = [
  {
    role: "Cybersecurity Analyst Junior",
    company: "RHI Magnesita",
    type: "Full-time",
    location: "Remote",
    period: "FEB 2025 — PRESENT",
    current: true,
    bullets: [
      <>Owning <strong>GRC</strong> KPIs, KRIs, KCIs &amp; key factors across the security program.</>,
      <>Mapping controls and maturity against <strong>NIST CSF v2.0</strong> and <strong>NIST 800-53</strong>.</>,
      <>Operating <strong>CrowdStrike</strong> for endpoint telemetry and <strong>Eramba</strong> for risk &amp; compliance management.</>,
      <>Building lightweight AI tooling on the side to automate evidence collection and control mapping.</>,
    ],
    tags: ["NIST CSF v2.0", "NIST 800-53", "CrowdStrike", "Eramba", "KPI / KRI / KCI"],
  },
  {
    role: "Information Security Intern",
    company: "RHI Magnesita",
    type: "Internship",
    location: "Hybrid",
    period: "AUG 2023 — FEB 2025",
    current: false,
    bullets: [
      <>Hands-on Governance, Risk Management &amp; Compliance (GRC).</>,
      <>Coordinated <strong>Blue &amp; Red Team</strong> exercises and incident exchanges.</>,
      <>Designed and ran <strong>phishing simulations</strong> with full reporting cycles.</>,
      <>Led <strong>PoCs for secure file transfer</strong> solutions.</>,
      <>Defined and instrumented <strong>security KPIs</strong> for executive reporting.</>,
    ],
    tags: ["GRC", "Blue Team", "Red Team", "Phishing", "KPIs"],
  },
  {
    role: "Firewall Engineering Intern",
    company: "LogicNet Tecnologia",
    type: "Internship",
    location: "Belo Horizonte, BR",
    period: "APR 2023 — JUL 2023",
    current: false,
    bullets: [
      <>Monitoring, incident resolution and on-call response on the <strong>SOPHOS</strong> firewall stack.</>,
      <>Triaged tickets and customer escalations across multiple tenants.</>,
    ],
    tags: ["SOPHOS", "SOC", "Network Security"],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="max-w-[1200px] mx-auto px-6 py-[100px] relative max-[880px]:py-[70px] max-[880px]:px-5"
    >
      {/* Heading */}
      <div className="mb-14">
        <h2 className="text-[clamp(40px,5vw,64px)] leading-[1.02] tracking-[-0.035em] font-extrabold text-ink m-0">
          <span className="text-ink-mute font-semibold">Where</span> I worked
        </h2>
        <div className="mt-2 font-mono text-[11.5px] tracking-[0.14em] uppercase text-ink-mute">
          2.9 YEARS · BLUE TEAM, GRC, AI ENGINEERING.
        </div>
      </div>

      {/* Timeline */}
      <div className="timeline">
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className={`timeline-node glass rounded-[18px] mb-9 last:mb-0 shadow-sm transition-[transform,box-shadow] duration-200 hover:translate-x-1 hover:shadow-md${job.current ? " current" : ""}`}
            style={{ padding: "24px 28px" }}
          >
            {/* Header */}
            <div className="flex justify-between items-start gap-4 flex-wrap mb-1.5">
              <h3
                className="text-[18px] font-bold text-ink m-0"
                style={{ letterSpacing: "-0.01em" }}
              >
                {job.role}
              </h3>
              <div className="font-mono text-[11px] tracking-[0.08em] text-ink-mute uppercase whitespace-nowrap pt-1">
                {job.period}
              </div>
            </div>

            {/* Sub-line */}
            <div className="text-ink-soft text-[14px] mb-3">
              {job.company}
              <span className="mx-2 text-ink-mute">·</span>
              {job.type}
              <span className="mx-2 text-ink-mute">·</span>
              {job.location}
            </div>

            {/* Bullets */}
            <ul className="m-0 p-0 list-none flex flex-col gap-1.5 mt-3">
              {job.bullets.map((b, i) => (
                <li key={i} className="exp-bullet">
                  {b}
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="flex gap-1.5 flex-wrap mt-[14px]">
              {job.tags.map((tag) => (
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
          </div>
        ))}
      </div>
    </section>
  );
}
