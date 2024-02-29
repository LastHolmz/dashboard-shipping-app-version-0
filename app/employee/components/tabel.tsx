import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmployeeRole } from "@prisma/client";
import { FaCrown } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export interface Data {
  phoneNumber: number;
  salaryAmount: number;
  role: EmployeeRole;
  fullName: string;
}

const RoleParser = ({ role }: { role: EmployeeRole }) => {
  if (role === "Manger") {
    return (
      <div className="rounded-sm flex-between gap-1 mx-auto p-1 w-fit bg-yellow-500 text-white">
        مدير <FaCrown />
      </div>
    );
  }
  if (role === "Admin") {
    return (
      <div className="rounded-sm flex-between gap-1 mx-auto p-1 w-fit bg-green-500 text-white">
        مشرف <MdOutlineSecurity />
      </div>
    );
  }
  if (role === "Employee") {
    return (
      <div className="rounded-sm flex-between gap-1 mx-auto p-1 w-fit bg-gray-500 text-white">
        موظف <CgProfile />
      </div>
    );
  }
};

const EmployeesTabel = ({ data }: { data: Data[] | [] }) => {
  return (
    <Table>
      <TableCaption>جدول يعرض كل الموظفين</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">الاسم الكامل</TableHead>
          <TableHead className="text-center">رقم الهاتف</TableHead>
          <TableHead className="text-center">الصلاحيات</TableHead>
          <TableHead className="text-center">الراتب</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((row, index) => {
          return (
            <TableRow key={index}>
              <TableCell className="text-center">{row.fullName}</TableCell>
              <TableCell className="text-center">{row.phoneNumber}</TableCell>
              <TableCell className="text-center">
                {<RoleParser role={row.role} />}
              </TableCell>
              <TableCell className="text-center">{row.salaryAmount}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default EmployeesTabel;
