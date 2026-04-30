"use client";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ email: "", name: "", subject: "", body: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message captured locally — wire this up to a backend or Formspree.");
  };

  return (
    <section
      id="contact"
      className="max-w-[1200px] mx-auto px-6 py-[100px] relative max-[880px]:py-[70px] max-[880px]:px-5"
    >
      <div className="mb-14">
        <h2 className="text-[clamp(40px,5vw,64px)] leading-[1.02] tracking-[-0.035em] font-extrabold text-ink m-0">
          <span className="text-ink-mute font-semibold">Get</span> in touch
        </h2>
        <div className="mt-2 font-mono text-[11.5px] tracking-[0.14em] uppercase text-ink-mute">
          VIA EMAIL OR ON MY SOCIAL CHANNELS.
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-[760px] mx-auto rounded-[18px] overflow-hidden shadow-lg"
        style={{
          background: "rgba(255,255,255,.7)",
          backdropFilter: "blur(18px) saturate(140%)",
          WebkitBackdropFilter: "blur(18px) saturate(140%)",
          border: "1px solid rgba(255,255,255,.7)",
        }}
      >
        <div
          className="relative flex items-center px-[18px] py-[14px]"
          style={{ borderBottom: "1px solid rgba(17,18,19,.08)", background: "rgba(255,255,255,.5)" }}
        >
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <div className="absolute left-0 right-0 text-center text-[13px] text-ink-soft pointer-events-none">
            New message
          </div>
        </div>

        <div className="px-[26px] py-[22px]" style={{ borderBottom: "1px solid rgba(17,18,19,.08)" }}>
          {(["email", "name", "subject"] as const).map((field) => (
            <div
              key={field}
              className="grid items-center py-[10px]"
              style={{
                gridTemplateColumns: "80px 1fr",
                borderBottom: field !== "subject" ? "1px solid rgba(17,18,19,.08)" : "none",
              }}
            >
              <label className="text-[13px] text-ink-soft capitalize">{field} :</label>
              <input
                type={field === "email" ? "email" : "text"}
                placeholder={
                  field === "email"
                    ? "Enter your email address"
                    : field === "name"
                    ? "Enter your name"
                    : "Enter the subject of your message"
                }
                value={form[field]}
                onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                className="border-none bg-transparent text-[14px] text-ink py-1.5 outline-none w-full placeholder:text-ink-mute"
              />
            </div>
          ))}
        </div>

        <div className="p-[26px] min-h-[180px]">
          <textarea
            placeholder="Enter your message..."
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            className="w-full min-h-[140px] border-none bg-transparent text-[14px] text-ink outline-none resize-y placeholder:text-ink-mute"
          />
        </div>

        <div className="flex justify-end px-[26px] pb-[22px] pt-4">
          <button
            type="submit"
            className="bg-primary text-white border-none px-7 py-3 rounded-[12px] text-[14px] font-medium cursor-pointer transition-[transform,box-shadow] duration-[150ms] hover:-translate-y-px"
            style={{ boxShadow: "0 4px 12px rgba(17,18,19,.18)" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 18px rgba(17,18,19,.22)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(17,18,19,.18)")}
          >
            Send
          </button>
        </div>
      </form>

      <div className="mt-6 flex justify-center items-center gap-[22px] text-ink-soft flex-wrap">
        <a
          href="https://www.linkedin.com/in/arthurchequer"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="inline-flex text-ink-soft transition-[color,transform] duration-200 hover:text-ink hover:-translate-y-0.5"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a
          href="https://github.com/0x4rthur"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="inline-flex text-ink-soft transition-[color,transform] duration-200 hover:text-ink hover:-translate-y-0.5"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
          className="inline-flex text-ink-soft transition-[color,transform] duration-200 hover:text-ink hover:-translate-y-0.5"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href="mailto:arthur.chequer@gmail.com"
          aria-label="Email"
          className="inline-flex text-ink-soft transition-[color,transform] duration-200 hover:text-ink hover:-translate-y-0.5"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </a>
        <span
          className="text-white font-mono text-[12px] px-[14px] py-1.5 rounded-full ml-2"
          style={{ background: "rgba(17,18,19,.85)" }}
        >
          arthur.chequer@gmail.com
        </span>
      </div>
    </section>
  );
}
