import { Suspense } from "react";
import CollectionCard from "../components/collection-card";
import ProductCatalog from "../components/product-catalog";
import { collectionLinks, products } from "../data/products";

export default function Colecoes() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 lg:px-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Coleções</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Coleções pensadas para inspirar seu próximo pedido
          </h1>
          <p className="text-sm leading-6 text-slate-600 md:text-base">
            Explore seleções com peças que valorizam o seu estilo do casual ao sofisticado.
          </p>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {collectionLinks.map((collection) => (
          <CollectionCard key={collection.title} {...collection} />
        ))}
      </section>

      <section className="mt-12 space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Destaques</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Favoritos da temporada</h2>
        </div>

        <Suspense fallback={<div className="text-sm text-slate-600">Carregando catálogo...</div>}>
          <ProductCatalog
            title="Peças mais desejadas"
            description="Uma seleção de produtos para quem quer comprar com segurança e estilo."
            products={products.filter((product) => product.featured)}
          />
        </Suspense>
      </section>
    </main>
  );
}
