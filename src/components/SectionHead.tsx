type Props = {
  soft: string;
  bold: string;
  eyebrow: string;
};

export function SectionHead({ soft, bold, eyebrow }: Props) {
  return (
    <div className="mb-14">
      <h2 className="m-0 font-sans text-[clamp(40px,5vw,64px)] font-extrabold leading-[1.02] tracking-[-0.035em]">
        <span className="font-semibold text-ink-mute">{soft}</span> {bold}
      </h2>
      <div className="mt-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-mute">
        {eyebrow}
      </div>
    </div>
  );
}
