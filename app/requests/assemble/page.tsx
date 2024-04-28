import { Card, CardHeader } from "@/components/ui/card";
import formatDate from "@/lib/date";
import { cn } from "@/lib/utils";
import { getAssembleRequests } from "@/prisma/seed";
import { AssembleProduct, PrismaClient } from "@prisma/client";
import type { AssembleRequest } from "@prisma/client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
const prisma = new PrismaClient();
type statusInfo = { background: string; content: string };
const requestStatus = new Map<string, statusInfo>([
  ["Pending", { content: "معلق", background: "bg-orange-500" }],
  ["Done", { content: "مكتمل", background: "bg-green-500" }],
]);

export const StatusInfo = ({ status }: { status: string }) => {
  const statusValue = requestStatus.get(status);
  return (
    <div
      className={cn(
        "rounded-md px-4 py-2 w-fit text-white ",
        statusValue?.background
      )}
    >
      {statusValue !== undefined && statusValue.content}
    </div>
  );
};

const AssembleRequestsPage = async () => {
  const requests = await getAssembleRequests();

  return (
    <section className=" p-4">
      <div className=" grid xl:grid-cols-3 sm:grid-col-2 gap-4">
        {requests?.map((request, index) => {
          let sum: number = request.assemble.reduce(
            (acc, val) => acc + val.qty,
            0
          );

          return (
            <Link href={`/requests/assemble/${request.id}`}>
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-2">
                    <div> الايدي : {request.id}</div>
                    <div>
                      {" "}
                      الوقت : {formatDate(request.createdAt, "DD-MM-YYYY")}
                    </div>
                    <div className=" flex items-center gap-1">
                      الحالة : <StatusInfo status={request.status} />
                    </div>
                    <div> عدد القطع : {sum}</div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default AssembleRequestsPage;
