"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      className="max-w-[1200px] mx-auto px-6 pt-[120px] pb-20 min-h-[80vh] flex items-center max-[880px]:pt-[60px] max-[880px]:px-5"
    >
      <div
        className="grid w-full items-center gap-12 max-[880px]:grid-cols-1"
        style={{ gridTemplateColumns: "1.3fr 0.9fr" }}
      >
        {/* Left column */}
        <div>
          <h1
            className="text-[clamp(44px,6.2vw,78px)] leading-none font-extrabold text-ink mb-7"
            style={{ letterSpacing: "-0.04em" }}
          >
            <span className="text-ink-mute font-semibold">I am</span>
            <br />
            Arthur Chequer
          </h1>

          <p className="text-ink-soft text-[15.5px] leading-[1.65] max-w-[540px] mb-9">
            An <strong>AI Engineer</strong> specialized in{" "}
            <strong>LangChain</strong>, building production-grade agents,
            retrieval pipelines, and reasoning workflows. I bridge applied LLM
            engineering with my background in cybersecurity &amp; risk —
            shipping systems that are intelligent, observable, and secure by
            design.
          </p>

          <div className="flex gap-[14px] flex-wrap">
            {/* Primary CTA */}
            <a
              href="#"
              className="inline-flex items-center gap-[10px] py-[14px] px-[22px] rounded-[14px] text-[14.5px] font-medium bg-primary text-white no-underline cursor-pointer transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-px hover:shadow-[0_12px_28px_rgba(17,18,19,.24)]"
              style={{ boxShadow: "0 8px 22px rgba(17,18,19,.18)" }}
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
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>

            {/* Ghost CTA */}
            <a
              href="#contact"
              className="btn-ghost inline-flex items-center gap-[10px] py-[14px] px-[22px] rounded-[14px] text-[14.5px] font-medium text-ink no-underline cursor-pointer transition-[transform,background] duration-150 ease-out hover:-translate-y-px"
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
                aria-hidden="true"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right column — Neural orb */}
        <div className="relative w-full aspect-square max-w-[360px] ml-auto grid place-items-center max-[880px]:max-w-[280px] max-[880px]:mx-auto">
          <div className="orb-ring" />
          <div className="orb-ring-inner" />
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="var(--color-peach)" />
                <stop offset="50%"  stopColor="var(--color-lavender)" />
                <stop offset="100%" stopColor="var(--color-sky)" />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#1a1c1f" />
                <stop offset="100%" stopColor="#3a3d42" />
              </linearGradient>
              <radialGradient id="orb" cx="50%" cy="40%">
                <stop offset="0%"  stopColor="#ffffff" stopOpacity=".9" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="68" fill="url(#grad1)" opacity=".35" />
            <circle cx="100" cy="100" r="56" fill="url(#grad1)" opacity=".55" />
            <circle cx="100" cy="100" r="24" fill="url(#grad2)" />
            <circle cx="100" cy="100" r="24" fill="url(#orb)" />
            <g fill="var(--color-ink)">
              <circle cx="100" cy="40"  r="6" />
              <circle cx="152" cy="70"  r="6" />
              <circle cx="152" cy="130" r="6" />
              <circle cx="100" cy="160" r="6" />
              <circle cx="48"  cy="130" r="6" />
              <circle cx="48"  cy="70"  r="6" />
            </g>
            <g stroke="var(--color-ink)" strokeWidth="1.4" fill="none" opacity=".55">
              <line x1="100" y1="76"  x2="100" y2="46"  />
              <line x1="121" y1="88"  x2="146" y2="73"  />
              <line x1="121" y1="112" x2="146" y2="127" />
              <line x1="100" y1="124" x2="100" y2="154" />
              <line x1="79"  y1="112" x2="54"  y2="127" />
              <line x1="79"  y1="88"  x2="54"  y2="73"  />
            </g>
            <g fill="var(--color-ink-mute)">
              <circle cx="100" cy="20"  r="2.5" />
              <circle cx="180" cy="60"  r="2.5" />
              <circle cx="180" cy="140" r="2.5" />
              <circle cx="100" cy="180" r="2.5" />
              <circle cx="20"  cy="140" r="2.5" />
              <circle cx="20"  cy="60"  r="2.5" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
