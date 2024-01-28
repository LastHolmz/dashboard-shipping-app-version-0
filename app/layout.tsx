import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
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
          <AppRouterCacheProvider  options={{ enableCssLayer: true }}>
            <div className=" flex justify-start">
              <main className=" flex-1">
                <Header />
                <Separator />
                <Breadcrumbs />
                {children}
              </main>
              <SideBar />
            </div>
          </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  );
}
