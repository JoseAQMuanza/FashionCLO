"use client";

import Image from "next/image";
import type { Product } from "@/app/data/products";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/app/context/cart-context";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-80">
        {product.badge ? (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-black px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
            {product.badge}
          </span>
        ) : null}
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">
            {product.category}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{product.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
        </div>

        <div className="space-y-4">
          <div>
            <span className="block text-lg font-bold text-slate-900">{formatCurrency(product.price)}</span>
            <p className="mt-1 text-sm text-slate-500">Tamanhos: {product.sizes.join(" · ")}</p>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            aria-label={`Adicionar ${product.name} ao carrinho`}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-black px-4 py-3 font-medium text-white transition hover:bg-slate-800"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </article>
  );
}
