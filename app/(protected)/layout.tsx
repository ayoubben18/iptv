import { PaypalProvider } from "@/providers/PaypalProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Commerce App",
  description: "Test UI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PaypalProvider>
      <div>{children}</div>
    </PaypalProvider>
  );
}
