import { User } from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: "البريد",
    cell: ({ row }) => {
      const email: string | undefined = row.getValue("email");
      return <div>{email ?? "غير موجود"}</div>;
    },
  },
  {
    accessorKey: "firstName",
    header: "الاسم الاول",
    cell: ({ row }) => {
      const firstName: string = row.getValue("firstName");
      return <div>{firstName}</div>;
    },
  },
  {
    accessorKey: "lastName",
    header: "الاسم الاخير",
    cell: ({ row }) => {
      const lastName: string = row.getValue("lastName");
      return <div>{lastName}</div>;
    },
  },
  {
    accessorKey: "userName",
    header: "اسم المستخدم",
    cell: ({ row }) => {
      const userName: string = row.getValue("userName");
      return <div>{userName}</div>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "اسم المستخدم",
    cell: ({ row }) => {
      const phoneNumber: number = Number(row.getValue("phoneNumber"));
      return <div>{phoneNumber}</div>;
    },
  },
  {
    accessorKey: "verified",
    header: "اسم المستخدم",
    cell: ({ row }) => {
      const verified: boolean = row.getValue("verified");
      return <div> {verified ? "موثق" : "غير موثق"}</div>;
    },
  },
  /* 
+    verified: boolean;
    followedStoresIDs: string[];
    createdAt: Date;
    updatedAt: Date;
    role: Role;
  */
  {
    accessorKey: "role",
    header: "الحالة",
    cell: ({ row }) => {
      const status = row.getValue("role");
      return (
        <div
          className={cn(
            "capitalize p-1 rounded-sm w-fit text-white ",
            status === "Normal" && "bg-orange-500",
            status === "Seller" && "bg-sky-500",
            status === "Delivery" && "bg-yellow-500",
            status === "Delivered" && "bg-green-500"
          )}
        >
          {row.getValue("role")}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(user.userName.toString());
                toast({
                  title: "تم نسخ الباركود بنجاح",
                });
              }}
            >
              نسخ الباركود
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(user.userName.toString());
                toast({
                  title: "تم نسخ رقم الهاتف بنجاح",
                });
              }}
            >
              نسخ رقم الهاتف
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
