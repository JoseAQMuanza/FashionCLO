"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Product, ProductCategory } from "@/app/data/products";
import ProductCard from "./product-card";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

const categoryOptions: Array<{ label: string; value: ProductCategory | "all" }> = [
  { label: "Todos", value: "all" },
  { label: "Feminino", value: "feminino" },
  { label: "Masculino", value: "masculino" },
  { label: "Inverno", value: "inverno" },
];

const sortOptions: Array<{ label: string; value: SortOption }> = [
  { label: "Em destaque", value: "featured" },
  { label: "Menor preço", value: "price-asc" },
  { label: "Maior preço", value: "price-desc" },
  { label: "Nome", value: "name" },
];

export default function ProductCatalog({
  title,
  description,
  products,
  defaultCategory = "all",
}: {
  title: string;
  description: string;
  products: Product[];
  defaultCategory?: ProductCategory | "all";
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");

  const urlCategory = searchParams.get("category");
  const activeCategory: ProductCategory | "all" =
    urlCategory === "feminino" || urlCategory === "masculino" || urlCategory === "inverno"
      ? urlCategory
      : defaultCategory;

  const goToCategory = (category: ProductCategory | "all") => {
    router.push(category === "all" ? "/" : `/?category=${category}`);
  };

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const categoryMatch = activeCategory === "all" || product.category === activeCategory;
      const searchMatch =
        term.length === 0 ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);

      return categoryMatch && searchMatch;
    });

    return [...result].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);

      const aScore = Number(Boolean(a.featured)) + Number(Boolean(a.badge));
      const bScore = Number(Boolean(b.featured)) + Number(Boolean(b.badge));
      return bScore - aScore;
    });
  }, [activeCategory, products, search, sort]);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Catálogo</p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{title}</h2>
        <p className="max-w-3xl text-sm leading-6 text-slate-600 md:text-base">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Coleção</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {categoryOptions.map((option) => {
                const active = activeCategory === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => goToCategory(option.value)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "border-black bg-black text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <label htmlFor="catalog-search" className="text-base font-semibold text-slate-900">
              Buscar peças
            </label>
            <input
              id="catalog-search"
              aria-label="Buscar peças no catálogo"
              className="mt-4 w-full rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-black"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Procure por peça, estilo ou ocasião"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <label htmlFor="catalog-sort" className="text-base font-semibold text-slate-900">
              Ordenar
            </label>
            <select
              id="catalog-sort"
              aria-label="Ordenar resultados do catálogo"
              className="mt-4 w-full rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-black"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <div className="space-y-4">
          <div className="text-sm text-slate-600">{filteredProducts.length} peças encontradas</div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
