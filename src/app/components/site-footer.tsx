export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <div>
          <strong className="block text-sm font-semibold text-slate-900">FashionClo</strong>
          <p className="mt-1">Moda curada para uma loja digital com presença premium.</p>
        </div>

        <p>2026 FashionClo. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
