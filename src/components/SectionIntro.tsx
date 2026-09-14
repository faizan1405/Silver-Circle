import { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionIntro({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: ReactNode; light?: boolean }) {
  return (
    <Reveal className="max-w-3xl">
      <p className={`label-eyebrow ${light ? "text-gold" : "text-navy"}`}>{eyebrow}</p>
      <h2 className={`mt-4 ${light ? "text-white" : ""}`}>{title}</h2>
      {copy ? <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${light ? "text-white/75" : "text-muted-foreground"}`}>{copy}</p> : null}
    </Reveal>
  );
}