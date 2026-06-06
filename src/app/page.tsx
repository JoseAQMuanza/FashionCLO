import { Suspense } from "react";
import Link from "next/link";
import ProductCatalog from "./components/product-catalog";
import CollectionCard from "./components/collection-card";
import { collectionLinks, products } from "./data/products";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-950 px-6 py-16 text-white shadow-sm md:px-10 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)]" />
        <div className="relative z-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300">
            Nova coleção 2026
          </p>
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

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <strong className="block text-sm font-semibold text-slate-900">Frete grátis</strong>
          <p className="mt-2 text-sm text-slate-600">Envio gratuito para toda Angola em compras selecionadas.</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <strong className="block text-sm font-semibold text-slate-900">Lançamentos exclusivos</strong>
          <p className="mt-2 text-sm text-slate-600">Novas peças da coleção com curadoria e disponibilidade limitada.</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <strong className="block text-sm font-semibold text-slate-900">Parcele em até 10x</strong>
          <p className="mt-2 text-sm text-slate-600">Facilidades de pagamento para comprar com mais tranquilidade.</p>
        </article>
      </section>

      <section className="mt-12 space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Coleções</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Escolha a coleção que combina com o seu próximo look
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {collectionLinks.map((collection) => (
            <CollectionCard key={collection.title} {...collection} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Suspense fallback={<div className="text-sm text-slate-600">Carregando catálogo...</div>}>
          <ProductCatalog
            title="Catálogo da temporada"
            description="Explore toda a seleção da loja, com peças em destaque e novidades da coleção."
            products={products}
          />
        </Suspense>
      </section>
    </main>
  );
}
