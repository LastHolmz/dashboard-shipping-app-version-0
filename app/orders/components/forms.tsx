"use client";

import { useFormState, useFormStatus } from "react-dom";
import { redirectOrderToStorageAction } from "../action";
import { ReloadIcon } from "@radix-ui/react-icons";
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

export function RedirectToStorageForm({ id }: { id: string }) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(
    redirectOrderToStorageAction,
    initialState
  );
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
      <SubmitButton
        Icon="تحويل"
        className="w-full mt-1"
        icon={false}
        variant={false}
      />
    </form>
  );
}
