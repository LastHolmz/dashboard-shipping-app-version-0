"use client";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children: React.ReactNode;
  size?: "default" | "icon" | "sm" | "lg" | null | undefined;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  className?: string;
}

export default function SubmitButton({
  className,
  children,
  size,
  variant,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={className}
      size={size}
      variant={variant}
      type="submit"
      aria-disabled={pending}
    >
      {pending ? <ReloadIcon className="spin-animation" /> : children}
    </Button>
  );
}
