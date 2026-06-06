import { Suspense } from "react";
import type { Metadata } from "next";
import ProductCatalog from "../components/product-catalog";
import { products } from "../data/products";

export const metadata: Metadata = {
  title: "Coleção Inverno | FashionClo",
  description: "Peças de inverno com mais textura, volume e sofisticação.",
};

export default function Inverno() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 lg:px-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Coleção inverno</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Peças de inverno para looks quentes e sofisticados
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
          Casacos, malhas e camadas pensadas para elevar o estilo nos dias frios.
        </p>
      </section>

      <section className="mt-10">
        <Suspense fallback={<div className="text-sm text-slate-600">Carregando catálogo...</div>}>
          <ProductCatalog
            title="Seleção de inverno"
            description="Camadas elegantes para manter conforto sem abrir mão de estilo."
            products={products.filter((product) => product.category === "inverno")}
            defaultCategory="inverno"
          />
        </Suspense>
      </section>
    </main>
  );
}
