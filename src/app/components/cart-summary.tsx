"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/cart-context";
import { formatCurrency } from "@/lib/format";

export default function CartSummary({ compact = false }: { compact?: boolean }) {
  const { items, subtotal, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-xl font-semibold tracking-tight text-slate-900">Seu carrinho está vazio</h3>
        <p className="mt-2 text-sm text-slate-600">
          Escolha suas peças favoritas para visualizar o resumo e concluir a compra.
        </p>
        <Link
          href="/produtos"
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Explorar catálogo
        </Link>
      </section>
    );
  }

  return (
    <div className={`space-y-4 ${compact ? "" : ""}`}>
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-xl font-semibold tracking-tight text-slate-900">Resumo do pedido</h3>

        <div className="space-y-4">
          {items.map((item) => (
            <article key={item.id} className="flex gap-4 rounded-2xl border border-slate-100 p-3">
              <div className="relative h-24 w-20 overflow-hidden rounded-xl">
                <Image src={item.imageSrc} alt={item.imageAlt} fill className="object-cover" sizes="80px" />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-slate-900">{item.name}</h4>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center overflow-hidden rounded-full border border-slate-200 bg-white">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label={`Diminuir quantidade de ${item.name}`}
                      className="h-9 w-9 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span
                      aria-live="polite"
                      className="min-w-9 px-3 text-center text-sm font-medium text-slate-900"
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label={`Aumentar quantidade de ${item.name}`}
                      className="h-9 w-9 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-sm font-semibold text-slate-900">
                    {formatCurrency(item.price * item.quantity)}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remover ${item.name} do carrinho`}
                    className="text-sm font-medium text-rose-600 transition hover:text-rose-700"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="space-y-3 border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <strong className="text-slate-900">{formatCurrency(subtotal)}</strong>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Frete</span>
            <strong className="text-emerald-600">Grátis</strong>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href="/produtos"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
          >
            Continuar comprando
          </Link>
          <button
            type="button"
            onClick={clearCart}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Limpar carrinho
          </button>
        </div>
      </section>
    </div>
  );
}
