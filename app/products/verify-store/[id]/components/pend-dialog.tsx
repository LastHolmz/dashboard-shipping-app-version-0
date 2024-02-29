import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegTimesCircle } from "react-icons/fa";
import { PendStoreForm, ContinueStoreForm } from "./forms";
import { VscDebugContinue } from "react-icons/vsc";

export function PendDialog({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="mx-1">
          <FaRegTimesCircle className="text-rose-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تعليق متجر</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <PendStoreForm id={id} />
        </div>
        <DialogFooter>سيتم تعليق المتجر</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ContinueDialog({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="mx-1">
          <VscDebugContinue className="text-sky-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>استكمال عمل المتجر</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <ContinueStoreForm id={id} />
        </div>
        <DialogFooter>سيتم استكمال عمل المتجر</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
