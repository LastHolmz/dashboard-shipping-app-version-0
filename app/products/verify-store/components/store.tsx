import { Skeleton } from "@/components/ui/skeleton";
import { cutString } from "@/lib/cut";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { MdVerified } from "react-icons/md";

interface Props {
  img: string;
  name: string;
  id: string;
  verified: boolean;
}
const Store: React.FC<Props> = async ({ img, name, id, verified }) => {
  revalidateTag("stores");
  console.log(verified);
  return (
    <Link
      className="flex items-center space-x-4 my-1 p-1 hover:bg-secondary cursor-pointer"
      href={`/products/verify-store/${id}`}
    >
      <Suspense fallback={<Skeleton className="h-12 w-12 rounded-full" />}>
        <div className=" rounded-full overflow-hidden">
          <Image
            src={img}
            width={1000}
            height={1000}
            alt={name}
            className=" object-cover h-12 w-12"
          />
        </div>
      </Suspense>
      <div className="space-y-4 w-full h-full p-1">
        <Suspense fallback={<Skeleton className="h-4 w-[100%]" />}>
          <p className="h-4 w-full font-semibold px-2 flex justify-between items-center">
            <span>{cutString(name, 50)}</span>
            <MdVerified
              className={`${verified ? "text-green-500" : "text-gray-500"}`}
            />
          </p>
        </Suspense>
      </div>
    </Link>
  );
};

export default Store;
