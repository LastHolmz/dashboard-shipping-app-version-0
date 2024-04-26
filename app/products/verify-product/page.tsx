import { findProductsByName } from "@/prisma/seed";
import SearchForm from "./components/search";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Product from "./components/product";
import { Fragment } from "react";

const page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const products = await findProductsByName(searchParams?.query);
  // console.log(searchParams?.query);
  return (
    <section dir="rtl">
      <SearchForm placeholder="بحث في المنتجات" />
      <ScrollArea
        className="h-[500px] w-full rounded-md border p-4"
        dir="rtl"
        lang="ar"
      >
        {products?.map((product, index) => {
          return (
            <Fragment key={index}>
              <Product
                id={product.id}
                img={product.imgs[0]! as string}
                name={product.name}
                description={product.description || ""}
              />
              <Separator className="my-1" />
            </Fragment>
          );
        })}
      </ScrollArea>
    </section>
  );
};

export default page;
