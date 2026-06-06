import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";

export const metadata: Metadata = {
  title: "FashionClo | Moda com curadoria premium",
  description: "Ecommerce de moda com catálogo editorial, carrinho e checkout seguros.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <Providers>
          <SiteHeader />
          <main id="conteudo">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
