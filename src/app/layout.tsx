import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { SkipLink } from "@/components/layout/SkipLink";
import { themeScript } from "@/components/layout/ThemeProvider";

export const metadata: Metadata = {
  title: { default: "Conectados pelo Mundo", template: "%s · Conectados pelo Mundo" },
  description: "Planejamento, trabalho remoto, moradia e comunidade para a sua primeira jornada como nômade digital.",
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon.svg` },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F6F2" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1219" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">
        <Providers>
          <SkipLink />
          <DemoBanner />
          <Header />
          <main id="conteudo" tabIndex={-1} className="min-h-[60vh] focus:outline-none">
            {children}
          </main>
          <Footer />
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}
