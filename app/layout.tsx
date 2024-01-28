import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./provider";
import SideBar from "./components/side-bar";
import Header from "./components/header";
import { Separator } from "@/components/ui/separator";
import Breadcrumbs from "./components/bread-crumbs";
import { Cairo } from "next/font/google";
const cairo = Cairo({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "لوحة تحكم",
  description: "لوحة تحكم ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body className={cairo.className}>
        <Providers>
          <div className=" flex justify-start">
            <main className=" flex-1">
              <Header />
              <Separator />
              <Breadcrumbs />
              {children}
            </main>
            <SideBar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
