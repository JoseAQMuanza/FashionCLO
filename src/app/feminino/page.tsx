import { Suspense } from "react";
import type { Metadata } from "next";
import ProductCatalog from "../components/product-catalog";
import { products } from "../data/products";

export const metadata: Metadata = {
  title: "Coleção Feminina | FashionClo",
  description: "Seleção feminina com peças elegantes, modernas e versáteis.",
};

export default function Feminino() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 lg:px-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Coleção feminina</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Peças femininas com elegância e versatilidade
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
          Vestidos, alfaiataria e básicos premium para looks que impressionam.
        </p>
      </section>

      <section className="mt-10">
        <Suspense fallback={<div className="text-sm text-slate-600">Carregando catálogo...</div>}>
          <ProductCatalog
            title="Seleção feminina"
            description="Filtre por peça e descubra novidades pensadas para valorizar seu estilo."
            products={products.filter((product) => product.category === "feminino")}
            defaultCategory="feminino"
          />
        </Suspense>
      </section>
    </main>
  );
}
