import { findProductById } from "@/prisma/seed";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Sku from "./components/sku-verify";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const product = await findProductById(id);
  if (typeof product === "undefined" || product === null) {
    return { title: "هذا العنصر غير موجود | 404" };
  }
  // optionally access and extend (rather than replace) parent metadata
  return {
    title: `${product.name} | توثيق `,
  };
}

export default async function Page({ params }: Props) {
  const id = params.id;
  const product = await findProductById(id);

  if (!product) {
    return notFound();
  }
  // console.log(product);
  return (
    <section dir="rtl">
      <h1>{product.name}</h1>
      <div className="grid gap-2 my-2 md:grid-cols-2 lg:grid-cols-4">
        {product.sku.map((sku, index) => {
          return (
            <Sku
              state={sku.verified}
              colorName={sku.name || "#000"}
              qty={sku.qty}
              color={sku.color}
              key={index}
              id={sku.id}
            />
          );
        })}
      </div>
    </section>
  );
}
