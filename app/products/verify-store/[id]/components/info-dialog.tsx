import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdVerified } from "react-icons/md";
import { VerifyStoreForm } from "./forms";

export default function InfoDialog({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <MdVerified />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إثبات الهوية</DialogTitle>
          <DialogDescription>
            تفعيل التجر و إضافة معلومات الهوية
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <VerifyStoreForm id={id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
