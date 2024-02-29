"use client";

import { useFormState, useFormStatus } from "react-dom";
import { verifyInfoAction, pendStoreAction, continueStoreAction } from "../actions";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DatePicker } from "./date-pick";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
  message: "",
};

interface SubmitButtonProps {
  Icon: React.ReactNode;
  icon?: boolean;
  variant?: boolean;
  className?: string;
}
function SubmitButton({ Icon, icon, variant, className }: SubmitButtonProps) {
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

export function VerifyStoreForm({ id }: { id: string }) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(verifyInfoAction, initialState);
  const [date, setDate] = useState<Date | undefined>(undefined);
  // const [dateStr, setDateStr] = useState<string>("undefined");

  // useEffect(() => setDateStr(date?.toString() || ""), [date]);
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
    <form action={formAction} dir={"rtl"}>
      <Input type={"hidden"} name="id" value={id} />
      <Input
        type={"hidden"}
        name="date"
        value={date ? date.toISOString() : ""}
      />
      <div>
        <Label htmlFor="password">كلمة سر الحساب</Label>
        <Input
          placeholder="ادخل كلمة سر الحساب هنا"
          id="password"
          name="password"
          type="password"
        />
      </div>
      <div>
        <Label htmlFor="info">معلومات اكثر</Label>
        <Textarea
          placeholder="ادخل اي معلومات مهمة هنا"
          id="info"
          name="info"
        />
      </div>
      <Separator className="my-2" />
      <div>
        <Label htmlFor="city">المدينة</Label>
        <Input type={"text"} id="city" name="city" defaultValue={"طرابلس"} />
      </div>

      <div>
        <Label htmlFor="region">المنطقة</Label>
        <Input type={"text"} id="region" name="region" />
      </div>

      <div>
        <Label htmlFor="street">اسم الشارع</Label>
        <Input type={"text"} id="street" name="street" />
      </div>

      <div>
        <Label htmlFor="location_info">معلومات اكثر حول الموقع</Label>
        <Textarea
          placeholder="ادخل تفاصيل الموقع هنا"
          id="location_info"
          name="location_info"
        />
      </div>

      <DatePicker date={date} setDate={setDate} />
      <SubmitButton
        Icon="حفظ"
        className="w-full mt-1"
        icon={false}
        variant={false}
      />
    </form>
  );
}
export function PendStoreForm({ id }: { id: string }) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(pendStoreAction, initialState);
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
    <form action={formAction} dir={"rtl"}>
      <Input type={"hidden"} name="id" value={id} />
      <SubmitButton
        Icon="تعليق"
        className="w-full mt-1"
        icon={false}
        variant={false}
      />
    </form>
  );
}
export function ContinueStoreForm({ id }: { id: string }) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(continueStoreAction, initialState);
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
    <form action={formAction} dir={"rtl"}>
      <Input type={"hidden"} name="id" value={id} />
      <SubmitButton
        Icon="رفع التعليق"
        className="w-full mt-1"
        icon={false}
        variant={false}
      />
    </form>
  );
}
