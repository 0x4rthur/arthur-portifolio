const navLinks = ["About", "Skills", "Experience", "Projects", "Contact"];
const networks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arthurchequer" },
  { label: "GitHub",   href: "https://github.com/0x4rthur" },
  { label: "X",        href: "#" },
  { label: "Threads",  href: "#" },
  { label: "Mail",     href: "mailto:arthur.chequer@gmail.com" },
];

export default function Footer() {
  return (
    <footer
      className="mt-20 relative overflow-hidden"
      style={{
        padding: "60px 24px 80px",
        background: "linear-gradient(180deg, transparent, rgba(255,255,255,.4))",
        borderTop: "1px solid rgba(17,18,19,.08)",
      }}
    >
      {/* Footer bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(circle at 70% 80%, #c4b8ff 0%, transparent 50%),
            radial-gradient(circle at 90% 60%, #ffd6b3 0%, transparent 50%)
          `,
          filter: "blur(60px)",
          opacity: 0.5,
        }}
      />

      {/* Main columns */}
      <div
        className="max-w-[1200px] mx-auto relative z-[1] max-[880px]:grid-cols-2 max-[880px]:gap-10"
        style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "80px", alignItems: "start" }}
      >
        {/* Big wordmark */}
        <div
          className="font-mono font-bold text-ink leading-none max-[880px]:col-span-2"
          style={{ fontSize: "84px", letterSpacing: "-0.04em" }}
        >
          [<span className="text-ink-mute font-normal">a</span>c
          <span className="text-ink-mute font-normal">q</span>]
        </div>

        {/* Links */}
        <div>
          <h4 className="text-[14px] text-ink-soft font-medium m-0 mb-[22px] lowercase">links</h4>
          <ul className="list-none m-0 p-0 flex flex-col gap-[14px]">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-ink text-[14px] font-medium no-underline transition-colors duration-200 hover:text-ink-mute"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Networks */}
        <div>
          <h4 className="text-[14px] text-ink-soft font-medium m-0 mb-[22px] lowercase">networks</h4>
          <ul className="list-none m-0 p-0 flex flex-col gap-[14px]">
            {networks.map((n) => (
              <li key={n.label}>
                <a
                  href={n.href}
                  target={n.href.startsWith("http") ? "_blank" : undefined}
                  rel={n.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-ink text-[14px] font-medium no-underline transition-colors duration-200 hover:text-ink-mute"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="max-w-[1200px] mx-auto mt-[60px] pt-6 flex justify-between items-center font-mono text-[12.5px] text-ink-mute relative z-[1] flex-wrap gap-4"
        style={{ borderTop: "1px solid rgba(17,18,19,.08)" }}
      >
        <span>© 2026 ARTHUR CHEQUER · MADE WITH LANGCHAIN &amp; CAFFEINE</span>
        <span>v1.0 · BUILT IN NEXT.JS</span>
      </div>
    </footer>
  );
}
