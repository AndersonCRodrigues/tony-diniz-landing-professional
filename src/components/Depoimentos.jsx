import { useState } from "react";
import { Quote } from "lucide-react";
import { depoimentos } from "../data/depoimentos.js";

const container = "mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12";

function StudentPhoto({ name, src }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (!src || failed) {
    return (
      <span className="font-display text-3xl text-orange-soft" aria-hidden="true">
        {initials}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={`Foto de ${name}`}
      width="480"
      height="600"
      loading="lazy"
      className="h-full w-full object-cover object-center"
      onError={() => setFailed(true)}
    />
  );
}

export default function Depoimentos() {
  const items = depoimentos.filter((item) => item.nome?.trim() && item.texto?.trim());
  if (items.length === 0) return null;

  return (
    <section id="depoimentos" aria-labelledby="testimonials-title" className="bg-[#141e23] py-20 sm:py-24 lg:py-32">
      <div className={container}>
        <div className="mb-11 grid items-end gap-6 lg:grid-cols-[1fr_350px] lg:gap-15">
          <div>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-extrabold tracking-[0.17em] text-orange-soft uppercase"><span className="flex size-8 items-center justify-center rounded-md border border-orange/40 font-display text-lg tracking-normal text-orange">04</span> Quem treina, conta</p>
            <h2 id="testimonials-title" className="font-display text-[clamp(3.5rem,6vw,6.25rem)] leading-[0.9] font-bold tracking-[-0.025em] uppercase text-balance">HISTÓRIAS REAIS.<br /><em className="not-italic text-orange">EVOLUÇÕES ÚNICAS.</em></h2>
          </div>
          <p className="max-w-lg text-sm leading-[1.9] text-slate-300">Cada pessoa chega com uma história e um objetivo. Veja como alguns alunos descrevem a experiência do acompanhamento.</p>
        </div>
        <ul className="grid gap-5 md:grid-cols-2">
          {items.map((item) => (
            <li key={item.nome} className="min-w-0">
              <figure className="flex h-full min-h-78 flex-col rounded-2xl border border-white/12 bg-[linear-gradient(180deg,rgba(36,48,54,.96)_0%,rgba(24,35,40,.96)_100%)] p-6 shadow-[0_18px_45px_rgba(0,0,0,.12)] transition-all duration-200 hover:-translate-y-1 hover:border-orange/35 hover:shadow-[0_26px_52px_rgba(0,0,0,.18)] sm:p-8">
                <div className="grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-5">
                  <span className="relative block h-30 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#314347] ring-1 ring-white/12 shadow-[0_12px_26px_rgba(0,0,0,.18)] sm:h-40 sm:w-32">
                    <StudentPhoto name={item.nome} src={item.foto} />
                  </span>
                  <span className="flex min-w-0 min-h-30 flex-col justify-center gap-1 sm:min-h-40">
                    <strong className="text-base leading-tight font-bold text-white sm:text-lg">{item.nome}</strong>
                    <small className="text-[11px] leading-5 text-slate-400 sm:text-xs">Aluno(a) de Tony Diniz</small>
                    <span className="mt-2 inline-flex max-w-full w-fit items-center justify-center rounded-full border border-white/12 bg-white/4 px-2.5 py-1 text-center text-[9px] leading-4 font-extrabold tracking-[0.08em] text-orange-soft uppercase sm:px-3 sm:text-[10px]">Treino acompanhado</span>
                  </span>
                </div>

                <div className="mt-6 h-px w-full bg-white/10" aria-hidden="true" />

                <blockquote className="relative mt-6 flex-1">
                  <Quote size={26} strokeWidth={1.7} className="mb-4 text-orange" aria-hidden="true" />
                  <p className="max-w-[60ch] text-sm leading-[1.95] text-slate-100 sm:text-[15px]">“{item.texto}”</p>
                </blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
