import { useEffect, useState } from "react";
import {
  Activity, ArrowDown, ArrowRight, ArrowUpRight, Award, Check,
  ClipboardCheck, Dumbbell, HeartPulse, MapPin, Menu,
  MessageCircle, ShieldCheck, Target, Users, X,
} from "lucide-react";
import Depoimentos from "./components/Depoimentos.jsx";
import InstagramIcon from "./components/InstagramIcon.jsx";

// Atualize as informações de contato somente aqui.
const WHATSAPP_NUMBER = "5521975340558";
const DEFAULT_MESSAGE = "Olá, Tony! Vim pelo site e gostaria de agendar uma avaliação.";
const whatsappUrl = (message = DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
const instagramUrl = "https://instagram.com/personaltonydiniz";

const container = "mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12";
const sectionSpace = "py-20 sm:py-24 lg:py-32";
const headline = "font-display text-[clamp(3.5rem,6vw,6.25rem)] leading-[0.9] font-bold tracking-[-0.025em] uppercase text-balance";
const buttonBase = "inline-flex min-h-13 items-center justify-center gap-3 rounded-lg px-5 py-3 text-center text-[12px] font-extrabold tracking-[0.01em] transition-all duration-200 motion-safe:hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-orange";
const primaryButton = `${buttonBase} bg-orange text-ink-deep shadow-[0_10px_32px_rgba(246,139,42,0.19)] hover:bg-orange-soft`;

const navigation = [
  { id: "inicio", label: "Início" },
  { id: "jornada", label: "Sobre" },
  { id: "metodo", label: "Método" },
  { id: "servicos", label: "Especialidades" },
  { id: "depoimentos", label: "Alunos" },
];

const highlights = [
  { icon: ShieldCheck, title: "Atenção individual", description: "Cada treino respeita seu momento." },
  { icon: Activity, title: "Evolução com método", description: "Planejamento, técnica e consistência." },
  { icon: MapPin, title: "Perto de você", description: "Atendimento em Maricá e região." },
];

const milestones = [
  { year: "1974", label: "Início da trajetória" },
  { year: "1992", label: "Campeão de fisiculturismo" },
  { year: "1994", label: "Vice-campeão do RJ" },
  { year: "Hoje", label: "Experiência a serviço de cada aluno" },
];

const steps = [
  { number: "01", title: "Escuta e avaliação", description: "Conheço sua rotina, seu histórico e aquilo que você deseja alcançar." },
  { number: "02", title: "Plano sob medida", description: "Definimos uma estratégia de treinamento adequada à sua realidade." },
  { number: "03", title: "Treino com orientação", description: "Técnica, postura e progressão acompanhadas em cada etapa." },
  { number: "04", title: "Evolução contínua", description: "O plano se adapta ao seu desenvolvimento e aos novos desafios." },
];

const services = [
  { icon: Dumbbell, number: "01", title: "Força e hipertrofia", description: "Desenvolvimento de força, ganho de massa e melhora da capacidade física com orientação individual.", message: "Olá, Tony! Quero saber mais sobre o acompanhamento para força e hipertrofia." },
  { icon: HeartPulse, number: "02", title: "Saúde e condicionamento", description: "Uma rotina de movimento pensada para melhorar seu condicionamento e sua disposição.", message: "Olá, Tony! Quero saber mais sobre os treinos para saúde e condicionamento." },
  { icon: Users, number: "03", title: "Mobilidade e longevidade", description: "Trabalho de mobilidade, postura e autonomia, sempre considerando seus limites.", message: "Olá, Tony! Quero saber mais sobre mobilidade e longevidade." },
  { icon: Target, number: "04", title: "Preparação para TAF", description: "Treinamento direcionado às exigências físicas e aos objetivos de cada avaliação.", message: "Olá, Tony! Quero saber mais sobre a preparação para TAF." },
  { icon: ClipboardCheck, number: "05", title: "Avaliação e planejamento", description: "Um ponto de partida para organizar metas, avaliar necessidades e acompanhar sua evolução.", message: "Olá, Tony! Quero agendar uma avaliação individual." },
];

function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/5">
        <img src="/logo-icon.png" alt="" width="35" height="35" className="size-8 object-contain brightness-0 invert" />
      </span>
      <span className="flex flex-col gap-0.5 leading-none">
        <strong className="font-display text-[23px] font-bold tracking-[0.045em]">TONY DINIZ</strong>
        <small className="text-[9px] font-extrabold tracking-[0.22em] text-orange">PERSONAL TRAINER</small>
      </span>
    </span>
  );
}

function SectionEyebrow({ number, children, light = false }) {
  return (
    <p className={`mb-6 flex items-center gap-3 text-[11px] font-extrabold tracking-[0.17em] uppercase ${light ? "text-orange-soft" : "text-orange-ink"}`}>
      <span className={`flex size-8 items-center justify-center rounded-md border font-display text-lg tracking-normal ${light ? "border-orange/40 text-orange" : "border-orange/35 text-orange-ink"}`}>{number}</span>
      {children}
    </p>
  );
}

function ExternalCta({ children, className = "", message, icon = true, ...props }) {
  return (
    <a className={className} href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" {...props}>
      {children}{icon && <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />}
    </a>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 90);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["inicio", "jornada", "metodo", "servicos", "depoimentos", "contato"]
      .map((id) => document.getElementById(id)).filter(Boolean);
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
    }, { rootMargin: "-28% 0px -60% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("keydown", onEscape);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onEscape);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="overflow-x-clip bg-ink-deep font-body text-cream antialiased">
      <a href="#conteudo" className="fixed -top-20 left-4 z-[100] rounded-lg bg-orange px-4 py-3 text-sm font-bold text-ink-deep focus:top-4">Pular para o conteúdo</a>

      <header className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 backdrop-blur-xl transition-colors duration-300 ${hasScrolled || menuOpen ? "bg-ink-deep/95 shadow-[0_10px_35px_rgba(0,0,0,0.22)]" : "bg-ink-deep/75"}`}>
        <div className={`${container} relative flex min-h-20 items-center justify-between gap-6 lg:min-h-22`}>
          <a href="#inicio" onClick={closeMenu} aria-label="Tony Diniz — voltar ao início" className="inline-flex shrink-0 rounded-md"><Logo /></a>
          <nav
            className={`${menuOpen ? "flex" : "hidden"} absolute inset-x-5 top-[calc(100%+8px)] flex-col gap-1 rounded-2xl border border-white/15 bg-ink p-3 shadow-2xl sm:inset-x-8 lg:static lg:flex lg:flex-row lg:items-center lg:gap-5 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none xl:gap-8`}
            id="menu-principal"
            aria-label="Navegação principal"
          >
            {navigation.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => { closeMenu(); setActiveSection(id); }}
                aria-current={activeSection === id ? "location" : undefined}
                className={`rounded-lg px-4 py-3 text-sm font-bold transition-colors lg:px-0 lg:text-[12px] ${activeSection === id ? "bg-white/8 text-orange lg:bg-transparent" : "text-white/80 hover:bg-white/8 hover:text-white lg:hover:bg-transparent"}`}
              >{label}</a>
            ))}
            <ExternalCta className={`${buttonBase} mt-1 bg-orange text-ink-deep hover:bg-orange-soft lg:mt-0 lg:min-h-11 lg:px-4`}>Agendar avaliação</ExternalCta>
          </nav>
          <button
            id="menu-toggle"
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white lg:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-controls="menu-principal"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main id="conteudo">
        <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_75%_25%,#273038_0%,transparent_40%),linear-gradient(125deg,#121c21_0%,#0b1215_74%)]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:84px_84px] [mask-image:linear-gradient(90deg,#000,transparent_78%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-50 top-16 size-145 rounded-full bg-orange/8 blur-[140px]" />
          <div className={`${container} relative z-10 grid items-center gap-11 pt-36 pb-24 sm:pt-40 sm:pb-28 lg:min-h-[790px] lg:grid-cols-[1.06fr_0.94fr] lg:gap-16 lg:pt-36 xl:gap-20`}>
            <div className="relative z-20 max-w-2xl">
              <div className="mb-8 flex flex-wrap items-center gap-2.5 text-[10px] font-extrabold tracking-[0.16em] text-white/90 sm:text-[11px]">
                <span className="size-2 rounded-full bg-orange shadow-[0_0_0_5px_rgba(246,139,42,.15)]" /> PERSONAL TRAINER
                <span className="text-orange">/</span> MARICÁ · RJ
              </div>
              <h1 id="hero-title" className="font-display text-[clamp(4.5rem,10vw,8.5rem)] leading-[0.83] font-bold tracking-[-0.03em] uppercase sm:text-[clamp(6rem,10vw,8.5rem)] lg:text-[clamp(5.3rem,8.2vw,8.8rem)]">
                TREINAR<br className="sm:hidden" /> BEM.<br /><span className="text-cream">VIVER</span> <em className="not-italic text-orange">MELHOR.</em>
              </h1>
              <p className="mt-8 max-w-[515px] text-[15px] leading-[1.9] text-slate-300 sm:text-base">Seu objetivo é único. Seu treino também deve ser. Experiência, atenção e planejamento para transformar o movimento em parte da sua vida.</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <ExternalCta className={primaryButton}>Agendar minha avaliação</ExternalCta>
                <a href="#metodo" className={`${buttonBase} px-1 text-cream hover:text-orange-soft`}>Conheça meu método <ArrowRight size={18} aria-hidden="true" /></a>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-5 text-[11px] font-bold text-slate-300">
                <span className="inline-flex items-center gap-2"><Check size={16} className="text-orange" aria-hidden="true" /> Treino individualizado</span>
                <span className="inline-flex items-center gap-2"><Check size={16} className="text-orange" aria-hidden="true" /> CREF 3345P</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-135 lg:justify-self-end">
              <div className="relative isolate h-[420px] overflow-hidden rounded-[10px_10px_70px_10px] bg-panel shadow-[0_30px_80px_rgba(0,0,0,.25)] sm:h-[520px] lg:h-[550px]">
                <img src="/tony-training.webp" alt="Tony Diniz orientando um aluno durante o treino" width="2048" height="1535" fetchPriority="high" className="h-full w-full object-cover object-[46%_center] saturate-[.88] contrast-[1.07]" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />
                <div className="absolute inset-x-5 bottom-7 flex items-center gap-3 text-[10px] font-extrabold tracking-[0.13em] text-white sm:inset-x-7">
                  <span className="h-px w-8 bg-orange" /> MOVIMENTO COM PROPÓSITO
                  <span className="ml-auto text-right text-[9px] tracking-[0.16em] text-white/70">ATENDIMENTO<br className="sm:hidden" /> PERSONALIZADO</span>
                </div>
              </div>
              <div className="absolute left-4 top-4 flex h-28 w-28 flex-col items-center justify-center rounded-xl border border-orange/50 bg-ink/95 text-center shadow-xl backdrop-blur-sm sm:left-6 sm:top-6 sm:h-34 sm:w-34">
                <span className="text-[10px] font-bold tracking-[0.14em] text-orange-soft">DESDE</span>
                <strong className="font-display text-[48px] leading-none text-white sm:text-[58px]">1974</strong>
                <small className="mt-1 max-w-20 text-[8px] font-bold leading-3 tracking-[0.1em] text-slate-300 sm:max-w-24">UMA VIDA EM MOVIMENTO</small>
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute -top-5 -right-5 -z-10 size-30 border-t-2 border-r-2 border-orange/70" />
            </div>
          </div>
          <a href="#jornada" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-bold tracking-[0.07em] text-slate-400 hover:text-orange lg:flex"><ArrowDown size={16} aria-hidden="true" /> Descubra a jornada</a>
        </section>

        <div className="border-y border-white/10 bg-[#19252a]" aria-label="Diferenciais do acompanhamento">
          <div className={`${container} grid gap-0 sm:grid-cols-3`}>
            {highlights.map(({ icon: Icon, title, description }, index) => (
              <div key={title} className="flex items-center gap-4 border-b border-white/10 py-6 last:border-0 sm:border-r sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0 lg:gap-5 lg:py-8">
                <span className="hidden font-display text-xl text-orange/80 lg:block">0{index + 1}</span>
                <Icon size={25} strokeWidth={1.7} className="shrink-0 text-orange" aria-hidden="true" />
                <div className="flex min-w-0 flex-col gap-1"><strong className="text-xs font-extrabold text-white lg:text-sm">{title}</strong><span className="text-[11px] leading-5 text-slate-400 lg:text-xs">{description}</span></div>
              </div>
            ))}
          </div>
        </div>

        <section id="jornada" aria-labelledby="about-title" className={`${sectionSpace} bg-cream text-ink`}>
          <div className={`${container} grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20`}>
            <div className="max-w-145">
              <div className="aspect-[1.1] overflow-hidden rounded-[9px_9px_70px_9px] bg-[#d6d9d5] shadow-[0_24px_55px_rgba(25,35,39,.13)] sm:aspect-[1.12]">
                <img src="/tony-portrait.webp" alt="Tony Diniz, personal trainer, na academia" width="1213" height="1143" loading="lazy" className="h-full w-full object-cover object-[center_35%]" />
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 border-b border-ink/20 pb-3 text-[10px] font-extrabold tracking-[0.13em] text-ink/80">
                <span>TONY DINIZ</span><span className="inline-flex items-center gap-2">EXPERIÊNCIA EM MOVIMENTO <ArrowUpRight size={16} aria-hidden="true" /></span>
              </div>
            </div>
            <div className="max-w-2xl">
              <SectionEyebrow number="01">Minha jornada</SectionEyebrow>
              <h2 id="about-title" className={`${headline} text-ink`}>EXPERIÊNCIA<br />QUE SE TORNA <em className="not-italic text-orange-ink">CUIDADO.</em></h2>
              <p className="mt-7 text-lg font-bold leading-relaxed text-ink sm:text-xl">Mais do que ensinar exercícios, acredito em acompanhar pessoas.</p>
              <p className="mt-5 text-sm leading-[1.95] text-slate-600 sm:text-[15px]">Desde 1974, o movimento faz parte da minha história. Do fisiculturismo competitivo ao treinamento personalizado, cada etapa fortaleceu uma convicção: não existem dois corpos iguais — nem dois caminhos idênticos.</p>
              <p className="mt-4 text-sm leading-[1.95] text-slate-600 sm:text-[15px]">Meu trabalho combina técnica, atenção à postura e planejamento para que o treino faça sentido na sua rotina, hoje e no futuro.</p>
              <a href="#metodo" className="mt-6 inline-flex min-h-11 items-center gap-2 text-xs font-extrabold text-orange-ink transition-colors hover:text-ink">Entenda como trabalho <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
          <div className={`${container} mt-15 lg:mt-20`}>
            <div className="grid gap-7 border-t border-ink/15 pt-9 lg:grid-cols-[195px_1fr] lg:gap-12">
              <div className="flex items-start gap-3 text-orange-ink"><Award size={20} aria-hidden="true" /><span className="text-[10px] font-extrabold leading-relaxed tracking-[0.13em]">UMA HISTÓRIA CONSTRUÍDA<br />COM CONSISTÊNCIA</span></div>
              <div className="grid grid-cols-2 gap-7 sm:grid-cols-4 sm:gap-5">
                {milestones.map(({ year, label }) => <div key={year} className="flex flex-col gap-2"><strong className="font-display text-[40px] leading-none font-bold text-ink sm:text-[43px]">{year}</strong><span className="max-w-36 text-[11px] leading-[1.6] text-slate-600">{label}</span></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="metodo" aria-labelledby="method-title" className={`${sectionSpace} relative isolate overflow-hidden bg-ink`}>
          <div aria-hidden="true" className="pointer-events-none absolute -top-6 right-0 font-display text-[clamp(10rem,26vw,24rem)] leading-none font-bold text-white/[0.018]">MÉTODO</div>
          <div className={`${container} relative`}>
            <div className="mb-11 grid items-end gap-6 lg:grid-cols-[1fr_340px] lg:gap-15">
              <div><SectionEyebrow number="02" light>Meu método</SectionEyebrow><h2 id="method-title" className={headline}>NÃO É SÓ TREINAR.<br /><em className="not-italic text-orange">É SABER POR QUÊ.</em></h2></div>
              <p className="max-w-lg text-sm leading-[1.9] text-slate-300">Acompanhamento de verdade começa antes do primeiro exercício e continua a cada evolução. Um processo simples, atento e feito para você.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {steps.map(({ number, title, description }) => (
                <article key={number} className="group flex min-h-70 flex-col rounded-lg border border-white/12 border-t-[3px] border-t-orange bg-[#1b292e] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-orange/50 hover:bg-[#25343a]">
                  <div className="flex items-start justify-between text-orange"><span className="font-display text-5xl leading-none font-bold">{number}</span><ArrowUpRight size={21} strokeWidth={1.6} aria-hidden="true" className="text-slate-400 transition-colors group-hover:text-orange" /></div>
                  <div className="mt-auto pt-12"><h3 className="font-display text-[29px] leading-[1.03] font-bold uppercase text-white">{title}</h3><p className="mt-3 text-xs leading-[1.8] text-slate-300">{description}</p></div>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-start gap-3 text-xs leading-[1.7] text-slate-300 sm:items-center"><span className="mt-1.5 size-2 shrink-0 rounded-full bg-orange sm:mt-0" /><span>O foco não é apenas o resultado. É construir um caminho sustentável até ele.</span><a href="#contato" className="inline-flex min-h-10 items-center gap-2 font-extrabold text-orange-soft hover:text-white sm:ml-auto">Vamos conversar <ArrowRight size={17} aria-hidden="true" /></a></div>
          </div>
        </section>

        <section id="servicos" aria-labelledby="services-title" className={`${sectionSpace} bg-[#eceae3] text-ink`}>
          <div className={container}>
            <div className="mb-11 grid items-end gap-6 lg:grid-cols-[1fr_330px] lg:gap-15">
              <div><SectionEyebrow number="03">Especialidades</SectionEyebrow><h2 id="services-title" className={`${headline} text-ink`}>SEU OBJETIVO.<br /><em className="not-italic text-orange-ink">SEU CAMINHO.</em></h2></div>
              <p className="max-w-lg text-sm leading-[1.9] text-slate-600">Seja qual for seu ponto de partida, o acompanhamento é estruturado para respeitar suas necessidades e o que você quer conquistar.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
              {services.map(({ icon: Icon, number, title, description, message }, index) => (
                <article key={number} className={`group flex min-h-76 flex-col rounded-xl border border-[#d6d9d3] bg-[#faf9f5] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-orange/65 hover:shadow-[0_20px_40px_rgba(22,32,33,.09)] sm:p-7 ${index < 3 ? "xl:col-span-2" : "xl:col-span-3"}`}>
                  <div className="flex items-start justify-between gap-4"><span className="grid size-13 place-items-center rounded-xl bg-[#f9e6d7] text-orange-ink"><Icon size={25} strokeWidth={1.7} aria-hidden="true" /></span><span className="font-display text-lg tracking-wide text-slate-500">{number} / 05</span></div>
                  <div className="mt-11 flex-1"><h3 className="max-w-sm font-display text-[32px] leading-[1.03] font-bold uppercase text-ink">{title}</h3><p className="mt-3 max-w-md text-xs leading-[1.8] text-slate-600">{description}</p></div>
                  <ExternalCta message={message} className="mt-4 inline-flex min-h-11 items-center gap-2 self-start text-xs font-extrabold text-orange-ink transition-colors hover:text-ink">Saiba mais</ExternalCta>
                </article>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-ink/15 pt-6 text-xs leading-[1.7] text-slate-600"><MapPin size={19} className="shrink-0 text-orange-ink" aria-hidden="true" /><span>Atendimento no Centro de Maricá, em domicílio, condomínios e empresas.</span><a href="#contato" className="inline-flex items-center gap-2 font-extrabold text-orange-ink hover:text-ink sm:ml-auto">Como começar <ArrowRight size={16} aria-hidden="true" /></a></div>
          </div>
        </section>

        <Depoimentos />

        <section id="contato" aria-labelledby="contact-title" className={`${sectionSpace} bg-[#f4a04e] text-ink`}>
          <div className={`${container} grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20`}>
            <div className="max-w-2xl">
              <SectionEyebrow number="05">O próximo passo</SectionEyebrow>
              <h2 id="contact-title" className={`${headline} text-ink`}>SEU MELHOR MOMENTO<br />PODE <em className="not-italic text-[#74370a]">COMEÇAR AGORA.</em></h2>
              <p className="mt-7 max-w-[480px] text-[15px] leading-[1.9] text-[#4b2e19]">Não precisa saber por onde começar. Me conte seu objetivo e vamos conversar sobre o acompanhamento ideal para você.</p>
              <div className="mt-9 flex items-start gap-3 text-[#44250d]"><MapPin size={20} className="mt-0.5 shrink-0" aria-hidden="true" /><div className="flex flex-col gap-1"><strong className="text-xs">Maricá · Rio de Janeiro</strong><span className="text-xs">Atendimento presencial e em domicílio</span></div></div>
            </div>
            <div className="rounded-xl border border-white/10 bg-ink p-6 text-white shadow-[0_30px_65px_rgba(63,31,6,.2)] sm:p-9">
              <div className="flex items-center justify-between text-[11px] font-extrabold tracking-[0.15em] text-orange-soft"><span>VAMOS CONVERSAR?</span><MessageCircle size={24} aria-hidden="true" /></div>
              <h3 className="mt-11 font-display text-[clamp(3.4rem,5vw,4.7rem)] leading-[0.89] font-bold uppercase">PRONTO PARA<br /><em className="not-italic text-orange">COMEÇAR?</em></h3>
              <p className="mt-5 max-w-sm text-sm leading-[1.85] text-slate-300">O primeiro contato é simples e sem complicação. Escolha como prefere falar comigo.</p>
              <div className="mt-7 grid gap-3">
                <ExternalCta className={`${primaryButton} w-full justify-between`} icon={false}><MessageCircle size={19} aria-hidden="true" /> Conversar no WhatsApp <ArrowUpRight size={18} aria-hidden="true" /></ExternalCta>
                <a href={instagramUrl} className={`${buttonBase} w-full justify-between border border-white/25 bg-transparent text-white hover:border-orange hover:text-orange-soft`} target="_blank" rel="noopener noreferrer"><InstagramIcon size={19} aria-hidden="true" /> Ver meu Instagram <ArrowUpRight size={18} aria-hidden="true" /></a>
              </div>
              <span className="mt-5 flex items-center justify-center gap-2 text-center text-[10px] text-slate-300"><Check size={14} className="text-orange" aria-hidden="true" /> WhatsApp abre com uma mensagem pronta</span>
            </div>
          </div>
        </section>
      </main>

      <ExternalCta aria-hidden={!hasScrolled} tabIndex={hasScrolled ? 0 : -1} className={`${hasScrolled ? "visible translate-y-0 opacity-100" : "invisible pointer-events-none translate-y-8 opacity-0"} ${primaryButton} fixed inset-x-4 bottom-4 z-40 flex justify-between shadow-2xl transition-all duration-300 sm:inset-x-auto sm:right-6 sm:bottom-6 lg:hidden`} icon={false}><MessageCircle size={19} aria-hidden="true" /> Agendar avaliação <ArrowUpRight size={18} aria-hidden="true" /></ExternalCta>

      <footer className="bg-[#0a1115] pt-12 pb-22 sm:pb-0">
        <div className={`${container} flex flex-wrap items-center gap-6 pb-10 md:gap-12`}>
          <a href="#inicio" aria-label="Tony Diniz — voltar ao início" className="inline-flex shrink-0 rounded-md"><Logo /></a>
          <p className="text-xs leading-[1.9] text-slate-400">Treinamento com experiência, atenção e propósito.<br />Maricá / RJ · CREF 3345P</p>
          <div className="ml-auto flex items-center gap-2">
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Tony Diniz" className="grid size-11 place-items-center rounded-lg border border-white/20 text-white transition-colors hover:border-orange hover:bg-orange hover:text-ink"><InstagramIcon size={19} aria-hidden="true" /></a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de Tony Diniz" className="grid size-11 place-items-center rounded-lg border border-white/20 text-white transition-colors hover:border-orange hover:bg-orange hover:text-ink"><MessageCircle size={19} aria-hidden="true" /></a>
          </div>
        </div>
        <div className={`${container} flex min-h-17 flex-wrap items-center justify-between gap-3 border-t border-white/10 py-4 text-[10px] text-slate-400`}><span>© {new Date().getFullYear()} Tony Diniz. Todos os direitos reservados.</span><a href="#inicio" className="font-extrabold hover:text-orange">Voltar ao topo ↑</a></div>
      </footer>
    </div>
  );
}
