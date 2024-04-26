"use client";

import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useFormState } from "react-dom";

interface Props {
  action: (
    prevState: {
      message: string;
    },
    formData: FormData
  ) => Promise<{
    message: string;
  }>;
  children: React.ReactNode;
}

const initState: { message: string } = {
  message: "",
};
const Form = ({ action, children }: Props) => {
  const [dispatch, formAction] = useFormState(action, initState);

  useEffect(() => {
    if (!dispatch.message || dispatch.message.length === 0) {
      return;
    } else {
      toast({
        title: dispatch.message,
      });
    }
  }, [toast, dispatch]);
  return <form action={formAction}>{children}</form>;
};
export default Form;
