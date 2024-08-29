import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QuerProvider";
import { Toaster } from "sonner";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
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
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <Toaster richColors position="top-center" theme="dark" />
            <NavBar />
            {children}
            <Footer />
            <SpeedInsights />
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
