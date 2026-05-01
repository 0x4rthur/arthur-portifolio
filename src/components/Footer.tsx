import Link from "next/link";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const networks = [
  { href: "https://www.linkedin.com/in/arthurchequer", label: "LinkedIn", external: true },
  { href: "https://github.com/0x4rthur", label: "GitHub", external: true },
  { href: "#", label: "X", external: true },
  { href: "#", label: "Threads", external: true },
  { href: "mailto:arthur.chequer@gmail.com", label: "Mail" },
];

export function Footer() {
  return (
    <footer className="foot-bloom relative mt-20 overflow-hidden border-t border-line bg-gradient-to-b from-transparent to-white/40 px-6 pb-20 pt-[60px]">
      <div className="relative z-[1] mx-auto grid max-w-[1200px] grid-cols-2 items-start gap-10 md:grid-cols-[1fr_auto_auto] md:gap-20">
        <div className="col-span-2 font-mono text-[64px] font-bold leading-none tracking-[-0.04em] text-ink md:col-span-1 md:text-[84px]">
          [<span className="font-normal text-ink-mute">a</span>c
          <span className="font-normal text-ink-mute">q</span>]
        </div>

        <div>
          <h4 className="m-0 mb-[22px] text-[14px] font-medium normal-case text-ink-soft">
            links
          </h4>
          <ul className="m-0 flex list-none flex-col gap-[14px] p-0">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[14px] font-medium text-ink no-underline transition-colors hover:text-ink-mute"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="m-0 mb-[22px] text-[14px] font-medium normal-case text-ink-soft">
            networks
          </h4>
          <ul className="m-0 flex list-none flex-col gap-[14px] p-0">
            {networks.map((n) => (
              <li key={n.label}>
                <a
                  href={n.href}
                  {...(n.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="text-[14px] font-medium text-ink no-underline transition-colors hover:text-ink-mute"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-[1] mx-auto mt-[60px] flex max-w-[1200px] items-center justify-between border-t border-line pt-6 font-mono text-[12.5px] text-ink-mute">
        <span>© 2026 ARTHUR CHEQUER · MADE WITH LANGCHAIN &amp; CAFFEINE</span>
        <span>v1.0 · BUILT IN NEXT.JS</span>
      </div>
    </footer>
  );
}
