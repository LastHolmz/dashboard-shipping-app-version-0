import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Select onValueChange={(e) => handleSearch(e)}>
      <SelectTrigger className="w-[180px] mx-2">
        <SelectValue placeholder="فلاتر" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>الحالة</SelectLabel>
          <SelectItem value={"Normal"}>تلقائي</SelectItem>
          <SelectItem value="Seller">باـع</SelectItem>
          <SelectItem value="Delivery">توصيل</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
