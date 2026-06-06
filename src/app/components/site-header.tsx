"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/cart-context";

const links = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/colecoes", label: "Coleções" },
  { href: "/checkout", label: "Checkout" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-black focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-baseline gap-1 text-lg font-black uppercase tracking-[0.24em] text-slate-950"
        >
          <span>Fashion</span>
          <span className="text-amber-700">Clo</span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Principal">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-black text-white"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/checkout"
          className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          aria-label={`Ir para o checkout, ${count} itens`}
        >
          <span aria-hidden="true">🛒</span>
          <span>Carrinho</span>
          <strong className="inline-flex min-w-6 items-center justify-center rounded-full bg-white/15 px-2 py-0.5 text-xs">
            {count}
          </strong>
        </Link>
      </div>
    </header>
  );
}
