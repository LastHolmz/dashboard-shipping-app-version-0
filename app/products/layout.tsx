import { Metadata } from "next";
import Tab, { TabItem } from "../components/tabs";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "لوحة تحكم | كل المنتجات",
  description: "إدارة كل المنتجات",
};

export default function StorageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="px-2 h-screen">
      <Tab>
        <TabItem href="products" content="تلقائي" />
        <TabItem href="products/products" content="المنتجات" />
        <TabItem href="products/categories" content="الأصناف" />
        <TabItem href="products/stores" content="المتاجر" />
        <TabItem href="products/verify-product" content="توثيق منتج" />
        <TabItem href="products/verify-store" content="توثيق متجر" />
      </Tab>
      <Separator />
      {children}
    </main>
  );
}
