import { findOrderByBarcode } from "@/prisma/seed";
import { Metadata } from "next";
import { notFound } from "next/navigation";
// import InfoDialog from "./components/info-dialog";
import { MdVerified } from "react-icons/md";
// import { PendDialog, ContinueDialog } from "./components/pend-dialog";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";

type Props = {
  params: { barcode: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const barcode = params.barcode;

  // fetch data
  const order = await findOrderByBarcode(barcode);
  if (typeof order === "undefined" || order === undefined) {
    return { title: "هذا الباركود غير موجود | 404" };
  }
  // optionally access and extend (rather than replace) parent metadata
  return {
    title: `${order.barcode} |  فحص  الفاتورة`,
  };
}

export default async function page({ params }: Props) {
  const barcode = params.barcode;
  console.log(barcode);
  const order = await findOrderByBarcode(barcode);
  if (order === undefined) {
    return notFound();
  }
  console.log(order);
  //   const isVerified = await isStoreVerified(barcode);
  return (
    <section dir="rtl">
      <h1 className="font-bold text-xl m-2">رقم الفاتورة {order.barcode} </h1>
      {order.OrderItems[0].skuId}
    </section>
  );
}
