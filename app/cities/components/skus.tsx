import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil1Icon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { CreateCityForm, DeleteCityForm, UpdateCityForm } from "./forms";
import { City } from "@/types";
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
          <DialogTitle>إنشاء سعر للمدينة</DialogTitle>
          <DialogDescription>
            إنشاء سعر و مدينة جديدة مع إمكانية إضافة جنس الموصل و مدة التوصيل
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <CreateCityForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
export function UpdateDialog({ id, city }: { id: string; city: City }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="m-2" variant={"ghost"} size={"icon"}>
          <Pencil1Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle>تعديل سعر للمدينة</DialogTitle>
          <DialogDescription>
            تعديل سعر و مدينة جديدة مع إمكانية إضافة جنس الموصل و مدة التوصيل
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <UpdateCityForm id={id} city={city} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
export function DeleteDialog({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="m-2" variant={"ghost"} size={"icon"}>
          <TrashIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle>حذف سعر للمدينة</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <DeleteCityForm id={id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
