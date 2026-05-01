export function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-[80vh] max-w-[1200px] items-center px-6 pt-[120px] pb-20"
    >
      <div className="grid w-full items-center gap-12 md:grid-cols-[1.3fr_0.9fr]">
        <div>
          <h1 className="m-0 mb-7 font-sans text-[clamp(44px,6.2vw,78px)] font-extrabold leading-none tracking-[-0.04em]">
            <span className="font-semibold text-ink-mute">I am</span>
            <br />
            Arthur Chequer
          </h1>
          <p className="m-0 mb-9 max-w-[540px] text-[15.5px] leading-[1.65] text-ink-soft">
            An <strong>AI Engineer</strong> specialized in{" "}
            <strong>LangChain</strong>, building production-grade agents,
            retrieval pipelines, and reasoning workflows. I bridge applied LLM
            engineering with my background in cybersecurity &amp; risk —
            shipping systems that are intelligent, observable, and secure by
            design.
          </p>

          <div className="flex flex-wrap gap-[14px]">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-[10px] rounded-[14px] bg-[#131416] px-[22px] py-[14px] text-[14.5px] font-medium text-white shadow-[0_8px_22px_rgba(17,18,19,0.18)] transition-all duration-150 hover:-translate-y-[1px] hover:shadow-[0_12px_28px_rgba(17,18,19,0.24)]"
            >
              Download Resume
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-[10px] rounded-[14px] px-[22px] py-[14px] text-[14.5px] font-medium text-ink shadow-[0_1px_2px_rgba(17,18,19,0.04),0_4px_12px_rgba(17,18,19,0.04)] transition-all duration-150 hover:-translate-y-[1px] hover:bg-white/80"
            >
              Contact me
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </a>
          </div>
        </div>

        <AiOrb />
      </div>
    </section>
  );
}

function AiOrb() {
  return (
    <div className="relative ml-auto grid aspect-square w-full max-w-[360px] place-items-center">
      <div
        className="absolute inset-0 rounded-full border border-dashed border-[rgba(17,18,19,0.14)]"
        style={{ animation: "spin 40s linear infinite" }}
      />
      <div
        className="absolute inset-[12%] rounded-full border border-[rgba(17,18,19,0.06)]"
        style={{ animation: "spin 28s linear infinite reverse" }}
      />
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd6b3" />
            <stop offset="50%" stopColor="#c8b8ff" />
            <stop offset="100%" stopColor="#b6d6ff" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a1c1f" />
            <stop offset="100%" stopColor="#3a3d42" />
          </linearGradient>
          <radialGradient id="orb" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="68" fill="url(#grad1)" opacity="0.35" />
        <circle cx="100" cy="100" r="56" fill="url(#grad1)" opacity="0.55" />
        <circle cx="100" cy="100" r="24" fill="url(#grad2)" />
        <circle cx="100" cy="100" r="24" fill="url(#orb)" />
        <g fill="#1a1c1f">
          <circle cx="100" cy="40" r="6" />
          <circle cx="152" cy="70" r="6" />
          <circle cx="152" cy="130" r="6" />
          <circle cx="100" cy="160" r="6" />
          <circle cx="48" cy="130" r="6" />
          <circle cx="48" cy="70" r="6" />
        </g>
        <g stroke="#1a1c1f" strokeWidth="1.4" fill="none" opacity="0.55">
          <line x1="100" y1="76" x2="100" y2="46" />
          <line x1="121" y1="88" x2="146" y2="73" />
          <line x1="121" y1="112" x2="146" y2="127" />
          <line x1="100" y1="124" x2="100" y2="154" />
          <line x1="79" y1="112" x2="54" y2="127" />
          <line x1="79" y1="88" x2="54" y2="73" />
        </g>
        <g fill="#8b9098">
          <circle cx="100" cy="20" r="2.5" />
          <circle cx="180" cy="60" r="2.5" />
          <circle cx="180" cy="140" r="2.5" />
          <circle cx="100" cy="180" r="2.5" />
          <circle cx="20" cy="140" r="2.5" />
          <circle cx="20" cy="60" r="2.5" />
        </g>
      </svg>
    </div>
  );
}
