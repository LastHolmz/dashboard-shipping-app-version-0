import Form from "@/app/components/form";
import ResponiseDialog from "@/app/components/responsive-dialog";
import { Input } from "@/components/ui/input";
import { getCategories } from "@/prisma/seed";
import { PlusIcon } from "lucide-react";
import React from "react";
import {
  DeleteCategoryAction,
  EditCategoryAction,
  newCategoryAction,
} from "./action";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/app/components/custom-submit-btn";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { btnVariants } from "@/app/components/variants";

const page = async () => {
  const categories = await getCategories();
  console.log(categories);
  return (
    <section className=" h-3/4 relative" dir="rtl">
      {categories &&
        categories.map((category, index) => {
          return (
            <Popover key={index}>
              <PopoverTrigger
                className={`${btnVariants.variant.secondary} rounded-md mx-2 my-1 px-2 py-1`}
              >
                {category.name}
              </PopoverTrigger>
              <PopoverContent>
                <ResponiseDialog
                  trigger={
                    <Button className=" group" variant={"ghost"} size={"icon"}>
                      <TrashIcon className=" group-hover:text-red-500" />
                    </Button>
                  }
                  dialogTitle="حذف صنف"
                >
                  <Form action={DeleteCategoryAction}>
                    <Input type="hidden" name="id" value={category.id} />
                    <SubmitButton>حذف</SubmitButton>
                  </Form>
                </ResponiseDialog>
                <ResponiseDialog
                  trigger={
                    <Button size={"icon"}>
                      <Pencil1Icon />
                    </Button>
                  }
                  dialogTitle="تعديل صنف"
                >
                  <Form action={EditCategoryAction}>
                    <div>
                      <Label htmlFor="name">اسم الصنف</Label>
                      <Input
                        type="text"
                        name="name"
                        id="name
          "
                        defaultValue={category.name}
                      />
                    </div>
                    <div>
                      <Label htmlFor="img">الصورة</Label>
                      <Input
                        type="text"
                        name="img"
                        id="img
                        
          "
                        defaultValue={category.img ?? ""}
                      />
                    </div>
                    <SubmitButton>تعديل</SubmitButton>
                  </Form>
                </ResponiseDialog>
              </PopoverContent>
            </Popover>
          );
        })}
      <ResponiseDialog
        trigger={
          <Button className=" absolute left-2 top-2" size={"icon"}>
            <PlusIcon />
          </Button>
        }
        dialogTitle="انشاء صنف جديد"
      >
        <Form action={newCategoryAction}>
          <div>
            <Label htmlFor="name">اسم الصنف</Label>
            <Input
              type="text"
              name="name"
              id="name
          "
              defaultValue={"الصنف"}
            />
          </div>
          <div>
            <Label htmlFor="img">الصورة</Label>
            <Input
              type="text"
              name="img"
              id="img
          "
            />
          </div>
          <SubmitButton>انشاء</SubmitButton>
        </Form>
      </ResponiseDialog>
    </section>
  );
};

export default page;
