import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cutString } from "@/lib/cut";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
const CardBox = ({
  link,
  info,
  className,
  content,
}: {
  link: string;
  info: string;
  content: string;
  className?: string;
}) => {
  return (
    <Link
      className={`${className} transition-all md:basis-1/2 lg:basis-1/3 `}
      href={link}
    >
      <Card className="transition-all min-h-[200px] max-h-[200px] text-center py-4">
        <CardContent>
          <CardHeader>
            <h2>{cutString(info, 20)}</h2>
          </CardHeader>
          <CardDescription>
            <p className="my-2">{cutString(content, 50)}</p>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button className=" w-full" variant={"ghost"}>
            <ArrowLeftIcon />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
export default CardBox;
