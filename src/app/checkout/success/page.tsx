import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-16 md:px-6 lg:px-8">
      <section className="w-full max-w-3xl rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">
          Pedido confirmado
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
          Obrigado pela sua compra
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          Seu pedido foi processado com sucesso. Em breve você receberá as próximas instruções no
          e-mail informado.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/produtos"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-black px-6 py-3 font-medium text-white transition hover:bg-slate-800"
          >
            Voltar à loja
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-3 font-medium text-slate-900 transition hover:bg-slate-50"
          >
            Explorar coleções
          </Link>
        </div>
      </section>
    </main>
  );
}
