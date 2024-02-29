"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createEmloyeeAction } from "../action";
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
import { EmployeeRole, Gender } from "@prisma/client";
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

export function CreateEmployeeForm() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(createEmloyeeAction, initialState);
  const [role, setRole] = useState<EmployeeRole>("Employee");
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
      <Input type={"hidden"} name="role" value={role} />
      <div>
        <Label htmlFor="phoneNumber">رقم الهاتف</Label>
        <Input type={"text"} id="phoneNumber" name="phoneNumber" />
      </div>
      <div>
        <Label htmlFor="salaryAmount">الراتب</Label>
        <Input type={"number"} id="salaryAmount" name="salaryAmount" />
      </div>
      <div>
        <Label htmlFor="fullName">الاسم الكامل</Label>
        <Input type={"text"} id="fullName" name="fullName" />
      </div>
      <Select onValueChange={(e: EmployeeRole) => setRole(e)}>
        <SelectTrigger className="w-[180px] my-2">
          <SelectValue placeholder="الدور" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Manger">مدير</SelectItem>
          <SelectItem value="Admin">مشرف</SelectItem>
          <SelectItem value="Employee">موظف</SelectItem>
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
