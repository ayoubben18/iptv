import { PaypalProvider } from "@/providers/PaypalProvider";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "E-Commerce App",
  description: "Test UI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/login");
  }
  return (
    <div
      style={{
        colorScheme: "none",
      }}
    >
      <PaypalProvider>{children}</PaypalProvider>
    </div>
  );
}
