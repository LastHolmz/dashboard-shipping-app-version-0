import { findStoreById, isStoreVerified } from "@/prisma/seed";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import InfoDialog from "./components/info-dialog";
import { MdVerified } from "react-icons/md";
import { PendDialog, ContinueDialog } from "./components/pend-dialog";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const store = await findStoreById(id);
  if (typeof store === "undefined" || store === null) {
    return { title: "هذا المتجر غير موجود | 404" };
  }
  // optionally access and extend (rather than replace) parent metadata
  return {
    title: `${store.name} | توثيق `,
  };
}

export default async function Page({ params }: Props) {
  const id = params.id;
  const store = await findStoreById(id);
  if (!store) {
    return notFound();
  }
  const isVerified = await isStoreVerified(id);
  return (
    <section dir="rtl">
      <div className="flex justify-between items-center w-full px-2">
        <h1 className="font-bold text-xl my-1">{store.name}</h1>
        <div className="flex items-center">
          {" "}
          {store.verified ? (
            <MdVerified className="text-green-500" />
          ) : !isVerified ? (
            <InfoDialog id={store.id} />
          ) : (
            <></>
          )}
          {store.verified ? (
            <PendDialog id={store.id} />
          ) : (
            <ContinueDialog id={store.id} />
          )}
        </div>
      </div>
      <p>{store?.bio}</p>
      <Separator className="my-2" />
      <div>
        {isVerified && (
          <>
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className=" font-semibold my-1">صور إثبات الهوية</h2>
                <ScrollArea className="h-[500px] w-[400px] rounded-md border">
                  {store.owener?.userInfo?.verfivicationImgs.map(
                    (img, index) => {
                      return (
                        <Fragment key={index}>
                          <Image
                            src={
                              img
                                ? img
                                : "https://m.media-amazon.com/images/I/A14F1QVaPNL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
                            }
                            alt="verification imgs"
                            width={1000}
                            height={1000}
                            loading={index === 0 ? "eager" : "lazy"}
                          />
                          <Separator className="my-1" />
                        </Fragment>
                      );
                    }
                  )}
                </ScrollArea>
              </div>
              <div dir="rtl" className=" mr-auto flex-1">
                <h2 className=" font-semibold my-1">
                  {" "}
                  معلومات حول صاحب الحساب
                </h2>
                <ol>
                  <li> الاسم الأول : {store.owener?.firstName}</li>
                  <Separator />
                  <li> الأسم الأخير : {store.owener?.lastName}</li>
                  <Separator />
                  <li> رقم الهاتف : {store.owener?.phoneNumber}</li>
                  <Separator />
                  <li> تاريخ الميلاد : {store.owener?.userInfo?.birthday?.toString() || ''}</li>
                  <Separator />
                  <li>معلومات أكثر : {store.owener?.userInfo?.info}</li>
                  <Separator />
                </ol>
                <Separator className="h-1" />
                <h2 className=" font-semibold my-1"> معلومات حول الموقع</h2>
                <ol>
                  <li> المدينة : {store.owener?.userInfo?.location?.city}</li>
                  <Separator />
                  <li> المنطقة : {store.owener?.userInfo?.location?.region}</li>
                  <Separator />
                  <li> الشارع : {store.owener?.userInfo?.location?.street}</li>
                  <Separator />
                  <li>
                    معلومات أكثر : {store.owener?.userInfo?.location?.info}
                  </li>
                  <Separator />
                </ol>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
