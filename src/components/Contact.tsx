"use client";

import { useState } from "react";
import { SectionHead } from "./SectionHead";

export function Contact() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    subject: "",
    body: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "Message captured locally — wire this up to a backend or Formspree."
    );
  };

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-[1200px] px-6 py-[100px]"
    >
      <SectionHead
        soft="Get"
        bold="in touch"
        eyebrow="VIA EMAIL OR ON MY SOCIAL CHANNELS."
      />

      <form
        onSubmit={onSubmit}
        className="mx-auto max-w-[760px] overflow-hidden rounded-[18px] bg-white/70 shadow-[0_24px_60px_rgba(17,18,19,0.10),0_4px_12px_rgba(17,18,19,0.05)] backdrop-blur-[18px] [border:1px_solid_rgba(255,255,255,0.7)]"
      >
        <div className="relative flex items-center border-b border-line bg-white/50 px-[18px] py-[14px]">
          <div className="flex gap-[6px]">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 text-center text-[13px] text-ink-soft">
            New message
          </div>
        </div>

        <div className="border-b border-line px-[26px] py-[22px]">
          <Field
            label="Email"
            type="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />
          <Field
            label="Name"
            placeholder="Enter your name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />
          <Field
            label="Subject"
            placeholder="Enter the subject of your message"
            value={form.subject}
            onChange={(v) => setForm({ ...form, subject: v })}
            last
          />
        </div>

        <div className="min-h-[180px] p-[26px]">
          <textarea
            className="min-h-[140px] w-full resize-y border-0 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-mute"
            placeholder="Enter your message..."
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
        </div>

        <div className="flex justify-end px-[26px] pb-[22px] pt-[16px]">
          <button
            type="submit"
            className="cursor-pointer rounded-[12px] border-0 bg-[#131416] px-7 py-3 text-[14px] font-medium text-white shadow-[0_4px_12px_rgba(17,18,19,0.18)] transition-all duration-150 hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(17,18,19,0.22)]"
          >
            Send
          </button>
        </div>
      </form>

      <div className="relative mt-6 flex items-center justify-center gap-[22px] text-ink-soft">
        <SocialIcon
          href="https://www.linkedin.com/in/arthurchequer"
          label="LinkedIn"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </SocialIcon>
        <SocialIcon href="https://github.com/0x4rthur" label="GitHub">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </SocialIcon>
        <SocialIcon href="#" label="X">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </SocialIcon>
        <SocialIcon
          href="mailto:arthur.chequer@gmail.com"
          label="Email"
          external={false}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </SocialIcon>
        <span className="ml-2 rounded-full bg-[rgba(17,18,19,0.85)] px-[14px] py-[6px] font-mono text-[12px] text-white">
          arthur.chequer@gmail.com
        </span>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  last,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  last?: boolean;
}) {
  return (
    <div
      className={
        "grid grid-cols-[80px_1fr] items-center py-[10px] " +
        (last ? "" : "border-b border-line")
      }
    >
      <label className="text-[13px] text-ink-soft">{label} :</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-0 bg-transparent py-[6px] text-[14px] text-ink outline-none placeholder:text-ink-mute"
      />
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
  external = true,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="inline-flex text-ink-soft transition-all duration-200 hover:-translate-y-[2px] hover:text-ink"
    >
      {children}
    </a>
  );
}
