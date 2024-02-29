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

const data = [
  {
    id: "1",
    img: "صورة 1",
    video: null,
    color: "#FF0000", // Red color in RGB hex format
    product: null,
    productId: null,
    verified: "Pending",
    Size: null,
    sizeId: null,
    qty: 0,
    name: "تلقائي",
  },
  {
    id: "2",
    img: "صورة 2",
    video: null,
    color: "#00FF00", // Green color in RGB hex format
    product: null,
    productId: null,
    verified: "Pending",
    Size: null,
    sizeId: null,
    qty: 0,
    name: "تلقائي",
  },
  {
    id: "3",
    img: "صورة 3",
    video: null,
    color: "#0000FF", // Blue color in RGB hex format
    product: null,
    productId: null,
    verified: "Pending",
    Size: null,
    sizeId: null,
    qty: 0,
    name: "تلقائي",
  },
  {
    id: "4",
    img: "صورة 4",
    video: null,
    color: "#FFFF00", // Yellow color in RGB hex format
    product: null,
    productId: null,
    verified: "Pending",
    Size: null,
    sizeId: null,
    qty: 0,
    name: "تلقائي",
  },
  {
    id: "5",
    img: "صورة 5",
    video: null,
    color: "#FF00FF", // Magenta color in RGB hex format
    product: null,
    productId: null,
    verified: "Pending",
    Size: null,
    sizeId: null,
    qty: 0,
    name: "تلقائي",
  },
];


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
        {data.map((sku, index) => {
          return (
            <Sku
              state={sku.verified}
              colorName={sku.name}
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
