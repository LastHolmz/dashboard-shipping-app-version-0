import { assemble, getAssembleRequestById } from "@/prisma/seed";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { Fragment, Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import formatDate from "@/lib/date";
import { StatusInfo } from "../page";
import { Skeleton } from "@/components/ui/skeleton";
import {
  $Enums,
  AssembleProduct,
  AssembleRequest,
  PrismaClient,
} from "@prisma/client";
import { Button } from "@/components/ui/button";
import ResponiseDialog from "@/app/components/responsive-dialog";
const prisma = new PrismaClient();
type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const request = await getAssembleRequestById(id);
  if (typeof request === "undefined" || request === null) {
    return { title: "هذا الطلب غير متاح | 404" };
  }
  // optionally access and extend (rather than replace) parent metadata
  return {
    title: `${request.id} | 'طلب تجميع' `,
  };
}

export default async function Page({ params }: Props) {
  const id = params.id;
  const request = await getAssembleRequestById(id);
  if (!request) {
    return notFound();
  }
  let sum: number = request.assemble.reduce((acc, val) => acc + val.qty, 0);

  return (
    <section dir="rtl" className=" px-4 py-1">
      <div className="flex justify-between items-center w-full px-2">
        <h1 className="font-bold text-xl my-1">طلب تجميع</h1>
        {request.status === "Pending" && (
          <div className="flex items-center">
            <ResponiseDialog
              trigger={<Button>إتمام الطلب</Button>}
              dialogTitle="تأكيد طلب التجميع"
              dialogDescription="هل انت متاكد من وجود جميع القطع"
            >
              <form
                action={async () => {
                  "use server";
                  await assemble(request.status, request);
                  redirect("/requests/assemble");
                }}
              >
                <Button type={"submit"}>تأكيد</Button>
              </form>
            </ResponiseDialog>
          </div>
        )}
      </div>
      <Separator className="my-2" />
      <div className="flex w-full gap-2 flex-col sm:flex-row">
        <div className="flex flex-col gap-2">
          <div> الايدي : {request.id}</div>
          <div> الوقت : {formatDate(request.createdAt, "DD-MM-YYYY")}</div>
          <div className=" flex items-center gap-1">
            الحالة : <StatusInfo status={request.status} />
          </div>
          <div> عدد القطع : {sum}</div>
        </div>
        <div className="flex-col flex flex-1 gap-2">
          {request.assemble?.map((product, index) => {
            // const selected: boolean = checkSelected(product, selectedItems);

            return (
              <Fragment key={index}>
                <div className="flex gap-2 items-start px-2 py-2">
                  <Suspense
                    fallback={<Skeleton className="h-12 w-12 rounded-full" />}
                  >
                    <div className="rounded-full overflow-hidden h-12 w-12">
                      <Image
                        src={product.img}
                        width={100}
                        height={100}
                        alt={product.productName}
                        className=" object-cover h-full w-full"
                      />
                    </div>
                  </Suspense>
                  <div className="flex-col flex w-full ">
                    <div className="flex justify-between gap-4 items-start">
                      <div> {product.productName}</div>
                      <div>{product.barcode}</div>
                    </div>
                    <div className="flex gap-2 items-start">
                      <div> {product.nameOfColor}</div>
                      <div>{"|"}</div>
                      <div>{product.qty}</div>
                    </div>
                    <div className="flex gap-2 items-start">
                      <div>{"الباركود"}</div>
                      <div>{"|"}</div>
                      <div> {product.barcode && product.barcode}</div>
                    </div>
                  </div>
                  {/* <Checkbox
                  checked={selected}
                  //   onChange={() => toggleSelect(product, selectedItems)}
                /> */}
                </div>
                <Separator />
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const createSizesWithSKU = async (sizesData: [], productId: string) => {
  try {
    const createdSizes = await Promise.all(
      sizesData.map(async (sizeData) => {
        const { name, sku } = sizeData;
        const size = await prisma.size.create({
          data: {
            name: name,
            productId: productId,
            sku: {
              createMany: {
                data: [
                  //   ...sku.map((s) => ({
                  //     color: s.color,
                  //     nameOfColor: s.nameOfColor,
                  //     newQty: s.newQty,
                  //     qty: 0,
                  //   })),
                ],
              },
            },
          },
          include: {
            sku: true,
          },
        });
        return size;
      })
    );

    return createdSizes;
  } catch (error) {
    console.error("Error creating sizes with SKU:", error);
    return { message: "Error creating sizes with SKU" };
  }
};

/* function checkSelected(
  product: AssembleProduct,
  selectedItems: AssembleProduct[]
): boolean {
  let _selected = false;
  for (let index = 0; index < selectedItems.length; index++) {
    if (selectedItems[index].id === product.id) {
      _selected = true;
      break;
    }
  }

  return _selected;
}
function toggleSelect(
  product: AssembleProduct,
  selectedItems: AssembleProduct[]
) {
  for (let index = 0; index < selectedItems.length; index++) {
    if (selectedItems[index].id === product.id) {
      selectedItems = selectedItems.filter((item) => item.id !== product.id);
      break;
    }
    selectedItems.push(product);
  }
  console.log(selectedItems);
} */
// "use client";

/* export function CheckboxWithText() {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <p className="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
} */
