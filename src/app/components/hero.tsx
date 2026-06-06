import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-950 px-6 py-16 text-white shadow-sm md:px-10 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)]" />
      <div className="relative z-10 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300">Nova coleção 2026</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
          Lançamentos exclusivos para renovar o seu estilo.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200 md:text-base">
          Frete grátis para toda Angola, peças selecionadas com acabamento premium e opções que
          combinam com o seu dia a dia.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/produtos"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-5 py-3 font-medium text-slate-950 transition hover:bg-slate-100"
          >
            Ver lançamentos
          </Link>
          <Link
            href="/checkout"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/20 px-5 py-3 font-medium text-white transition hover:bg-white/10"
          >
            Finalizar compra
          </Link>
        </div>
      </div>
    </section>
  );
}
