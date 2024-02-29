import { findStoressByName } from "@/prisma/seed";
import SearchForm from "./components/search";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Store from "./components/store";
import { Fragment } from "react";

const page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const stores = await findStoressByName(searchParams?.query);
  return (
    <section dir="rtl">
      <SearchForm placeholder="بحث في المتاجر" />
      <ScrollArea
        className="h-[500px] w-full rounded-md border p-4"
        dir="rtl"
        lang="ar"
      >
        {stores?.map((store, index) => {
          return (
            <Fragment key={index}>
              <Store
                id={store.id}
                verified={store.verified}
                img={store?.logo || null}
                name={store.name}
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
