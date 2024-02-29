import { Skeleton } from "@/components/ui/skeleton";
import { cutString } from "@/lib/cut";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
interface Props {
  img: string;
  name: string;
  description: string;
  id: string;
}
const Product: React.FC<Props> = async ({ img, name, description, id }) => {
  return (
    <Link
      className="flex items-center space-x-4 my-1 hover:bg-secondary cursor-pointer"
      href={`/products/verify-product/${id}`}
    >
      {/* <Skeleton/> */}
      <Suspense fallback={<Skeleton className="h-12 w-12 rounded-full" />}>
        <Image
          src={img}
          width={100}
          height={100}
          alt={name}
          className="h-12 w-12 rounded-full"
        />
      </Suspense>
      <div className="space-y-2 w-full h-full p-1">
        <Suspense fallback={<Skeleton className="h-4 w-[100%]" />}>
          <p className="h-4 w-full">{cutString(name, 50)}</p>
        </Suspense>
        <Suspense fallback={<Skeleton className="h-4 w-[80%]" />}>
          <p className="h-4 w-[80%]">{cutString(description, 50)}</p>
        </Suspense>
      </div>
    </Link>
  );
};

export default Product;
