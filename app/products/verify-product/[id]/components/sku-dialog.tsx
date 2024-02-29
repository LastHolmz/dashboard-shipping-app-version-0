import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { UpdateSkuQtyForm } from "./forms";

export default function SkuDialog({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <Pencil1Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تعديل الكمية</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <UpdateSkuQtyForm id={id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
