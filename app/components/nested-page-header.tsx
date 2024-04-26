import { cn } from "@/lib/utils";

interface Props {
  content: string;
  className?: string;
}

const NestedPageHeader = ({ content, className }: Props) => {
  return (
    <h1
      className={cn("my-2 font-bold text-xl mx-1", className ? className : "")}
    >
      {content}
    </h1>
  );
};

export default NestedPageHeader;
