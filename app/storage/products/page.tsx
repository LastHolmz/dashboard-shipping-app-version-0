import { findPrdocuts } from "@/prisma/seed";
import { cutString } from "@/lib/cut";
import { ProductTabel } from "./tabel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "storage | products",
};

const productsPage = async () => {
  const products = await findPrdocuts();
  if (!products) return undefined;
  const data = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      qty: product.sku.reduce((acc, current) => acc + current.qty, 0),
      barcode: product.barcode,
      storeName: cutString(product.store?.name || "غير موجود", 20),
      price: product.price,
    };
  });
  return (
    <div>
      <ProductTabel data={data} />
    </div>
  );
};

export default productsPage;
