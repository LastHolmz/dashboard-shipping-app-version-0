import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { CreateEmployeeForm } from "./forms";
export function CreateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="m-2" variant={"default"} size={"icon"}>
          <PlusCircledIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle>إنشاء موظف جديد</DialogTitle>
          <DialogDescription>
            إنشاء موظف جديد مع جميع صلاحيات وغيرها{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <CreateEmployeeForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
