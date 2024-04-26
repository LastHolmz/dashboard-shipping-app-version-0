import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SkuDialog from "./sku-dialog";
import { VerifySkuForm } from "./forms";

interface Props {
  id: string;
  state: string;
  qty: number;
  color: string;
  colorName: string;
}
const Sku: React.FC<Props> = async ({ id, state, qty, color, colorName }) => {
  const roleMap = new Map<string, string>([
    ["Pending", "bg-orange-600"],
    ["Sent", "bg-blue-600"],
    ["Working", "bg-green-600"],
  ]);

  function colorToRole(): string {
    return roleMap.get(state) || "";
  }

  return (
    <Card className="hover:bg-secondary">
      <CardHeader>
        <CardTitle className=" flex items-center justify-between w-full">
          <div className={cn("rounded-full w-6 h-6", colorToRole())} />
          <div className="flex justify-center items-center gap-1">
            {state !== "Working" ? <VerifySkuForm id={id} qty={qty} /> : <></>}
            <SkuDialog maxNumber={qty} id={id} />
          </div>
        </CardTitle>
        <CardDescription>{colorName}</CardDescription>
      </CardHeader>
      <CardContent>{qty}X</CardContent>
      <CardFooter
        className="w-full h-3"
        style={{ backgroundColor: color }}
      ></CardFooter>
    </Card>
  );
};

export default Sku;
