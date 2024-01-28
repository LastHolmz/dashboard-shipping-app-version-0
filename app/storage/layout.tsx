import { Metadata } from "next";
import Tab, { TabItem } from "../components/tabs";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "لوحة تحكم",
  description: "لوحة تحكم ",
};

export default function StorageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="px-2 h-screen">
      <Tab>
        <TabItem href="storage" content="تلقائي" />
        <TabItem href="storage/users" content="المستخدمين" />
        <TabItem href="storage/products" content="المنتجات" />
        <TabItem href="storage/stores" content="المتاجر" />
        <TabItem href="storage/invoiceses" content="الفواتير" />
      </Tab>
      <Separator/>
      {children}
    </main>
  );
}
