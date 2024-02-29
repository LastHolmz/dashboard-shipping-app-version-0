"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  CreateCityAction,
  deleteCityAction,
  updateCityAction,
} from "../actions";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gender } from "@prisma/client";
import { City } from "@/types";
const initialState = {
  message: "",
};
interface SubmitButtonProps {
  Icon: React.ReactNode;
  icon?: boolean;
  variant?: boolean;
  className?: string;
}

function SubmitButton({
  className,
  Icon,
  icon = true,
  variant = true,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={className}
      size={icon ? "icon" : "default"}
      variant={variant ? "outline" : "default"}
      type="submit"
      aria-disabled={pending}
    >
      {pending ? <ReloadIcon className="spin-animation" /> : Icon}
    </Button>
  );
}

export function CreateCityForm() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(CreateCityAction, initialState);
  const [gender, setGender] = useState<Gender>("Man");
  useEffect(() => {
    if (!state.message || state.message.length === 0) {
      return;
    } else {
      toast({
        title: state.message,
      });
    }
  }, [toast, state]);
  return (
    <form action={formAction}>
      <div>
        <Label htmlFor="min">أقل مدة</Label>
        <Input type={"number"} id="min" name="min" />
      </div>
      <div>
        <Label htmlFor="max">أكثر مدة</Label>
        <Input type={"number"} id="max" name="max" />
      </div>
      <div>
        <Label htmlFor="price">السعر</Label>
        <Input type={"number"} id="price" name="price" />
      </div>
      <div>
        <Label htmlFor="name">اسم المدينة</Label>
        <Input type={"text"} id="name" name="name" />
      </div>
      <Input type={"hidden"} name="gender" value={gender} />
      <Select onValueChange={(e: Gender) => setGender(e)}>
        <SelectTrigger className="w-[180px] my-2">
          <SelectValue placeholder="الجنس" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Man">رجالي</SelectItem>
          <SelectItem value="Woman">نسائي</SelectItem>
        </SelectContent>
      </Select>
      <SubmitButton
        Icon="إنشاء"
        className="w-full mt-1"
        icon={false}
        variant={false}
      />
    </form>
  );
}

export function UpdateCityForm({ id, city }: { id: string; city: City }) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(updateCityAction, initialState);
  const [gender, setGender] = useState<Gender>("Man");
  useEffect(() => {
    if (!state.message || state.message.length === 0) {
      return;
    } else {
      toast({
        title: state.message,
      });
    }
  }, [toast, state]);
  return (
    <form action={formAction}>
      <Input type={"hidden"} name="id" value={id} />
      <div>
        <Label htmlFor="min">أقل مدة</Label>
        <Input type={"number"} id="min" name="min" defaultValue={city.min} />
      </div>
      <div>
        <Label htmlFor="max">أقصى مدة</Label>
        <Input type={"number"} id="max" name="max" defaultValue={city.max} />
      </div>
      <div>
        <Label htmlFor="price">السعر</Label>
        <Input
          type={"number"}
          id="price"
          name="price"
          defaultValue={city.price}
        />
      </div>
      <div>
        <Label htmlFor="name">اسم المدينة</Label>
        <Input type={"text"} id="name" name="name" defaultValue={city.name} />
      </div>
      <Input type={"hidden"} name="gender" value={gender} />
      <Select
        onValueChange={(e: Gender) => setGender(e)}
        defaultValue={city.gender}
      >
        <SelectTrigger className="w-[180px] my-2">
          <SelectValue placeholder="نوع التوصيل" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Man">رجالي</SelectItem>
          <SelectItem value="Woman">نسائي</SelectItem>
        </SelectContent>
      </Select>
      <SubmitButton
        Icon="تحديث"
        className="w-full mt-1"
        icon={false}
        variant={false}
      />
    </form>
  );
}
export function DeleteCityForm({ id }: { id: string }) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(deleteCityAction, initialState);
  useEffect(() => {
    if (!state.message || state.message.length === 0) {
      return;
    } else {
      toast({
        title: state.message,
      });
    }
  }, [toast, state]);
  return (
    <form action={formAction}>
      <Input type={"hidden"} name="id" value={id} />
      <SubmitButton
        Icon="حذف"
        className="w-full mt-1"
        icon={false}
        variant={false}
      />
    </form>
  );
}
