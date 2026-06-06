import { Suspense } from "react";
import type { Metadata } from "next";
import ProductCatalog from "../components/product-catalog";
import { products } from "../data/products";

export const metadata: Metadata = {
  title: "Coleção Masculina | FashionClo",
  description: "Seleção masculina com básicos premium, streetwear e alfaiataria.",
};

export default function Masculino() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 lg:px-8">
      <section className="rounded-[32px] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300">Coleção masculina</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
          Visual masculino com presença e acabamento premium
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-200 md:text-base">
          Streetwear, básicos e alfaiataria para compor um guarda-roupa completo.
        </p>
      </section>

      <section className="mt-10">
        <Suspense fallback={<div className="text-sm text-slate-600">Carregando catálogo...</div>}>
          <ProductCatalog
            title="Seleção masculina"
            description="Explore peças atuais para montar looks do trabalho ao fim de semana."
            products={products.filter((product) => product.category === "masculino")}
            defaultCategory="masculino"
          />
        </Suspense>
      </section>
    </main>
  );
}
