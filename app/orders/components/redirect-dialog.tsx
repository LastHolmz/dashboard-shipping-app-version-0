import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RedirectToStorageForm } from "./forms";

export default function RedirectDialog({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>تحويل إلى المخزن </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تحويل الطلب إلى المخزن</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <RedirectToStorageForm id={id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
