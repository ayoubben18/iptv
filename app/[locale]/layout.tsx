import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../[locale]/globals.css";
import QueryProvider from "@/providers/QuerProvider";
import { Toaster } from "sonner";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import WhatsappFloat from "@/components/shared/WhatsappFloat";
import { I18nProvider } from "@/providers/I18Provider";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://ronotv.com"),
  title: {
    default: "RONOTV",
    template: "%s | RONOTV",
  },
  keywords: [
    "Best IPTV service 2024",
    "Top IPTV providers",
    "Affordable IPTV subscriptions",
    "High-quality IPTV channels",
    "Live TV streaming service",
    "IPTV for sports fans",
    "Stream live TV online",
    "IPTV packages comparison",
    "Reliable IPTV service",
    "IPTV for international channels",
  ],
  description: "Best new iptv provider in the world",
  openGraph: {
    title: "RONOTV",
    description: "Best new iptv provider in the world",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <QueryProvider>
      <html lang={params.locale}>
        <head>
          <Script id="microsoft-clarity" strategy="beforeInteractive">
            {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "nutyq2izp3");
          `}
          </Script>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-11019862715"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('set', 'linker', {
                'domains': ['ronotv.com', 'patterncrafteronline.com']
              });
              gtag('config', 'AW-11019862715');
            `}
          </Script>
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <I18nProvider params={{ locale: params.locale }}>
            <ThemeProvider attribute="class" defaultTheme="dark">
              <Toaster richColors position="top-center" theme="dark" />
              <NavBar />
              {children}
              <WhatsappFloat />
              <Footer />
              <SpeedInsights />
              <Analytics />
            </ThemeProvider>
          </I18nProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
