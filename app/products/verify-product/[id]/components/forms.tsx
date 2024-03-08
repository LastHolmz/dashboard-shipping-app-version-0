"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateSkuQtyAction, verifySkuAction } from "../actions";
import { ReloadIcon } from "@radix-ui/react-icons";
import { MdOutlineVerified } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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

export function UpdateSkuQtyForm({
  id,
  maxNumber,
}: {
  id: string;
  maxNumber: number;
}) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(updateSkuQtyAction, initialState);
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
      <Input type={"hidden"} id="todo" name="id" value={id} />
      <Label htmlFor="qty">الكمية</Label>
      <Input
        type={"number"}
        id="qty"
        name="qty"
        min={0}
        defaultValue={maxNumber || 0}
      />
      <SubmitButton
        Icon="حفظ"
        className="w-full mt-1"
        icon={false}
        variant={false}
      />
    </form>
  );
}
export function VerifySkuForm({ id }: { id: string }) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(verifySkuAction, initialState);
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
      <Input type={"hidden"} id="todo" name="id" value={id} />
      <SubmitButton Icon={<MdOutlineVerified />} icon={true} />
    </form>
  );
}
