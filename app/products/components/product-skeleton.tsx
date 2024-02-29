import { Skeleton } from "@/components/ui/skeleton";
const ProductSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 my-1">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-[100%]" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
