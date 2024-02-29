import { getEmployees } from "@/prisma/seed";
import { CreateDialog } from "./components/skus";
import EmployeesTabel, { Data } from "./components/tabel";
const page = async () => {
  const employess = await getEmployees();
  return (
    <main dir="rtl">
      <div className="flex-between">
        <h1 className="font-bold text-xl">الموظفين</h1>
        <CreateDialog />
      </div>
      {employess && <EmployeesTabel data={employess as unknown as Data[]} />}
    </main>
  );
};

export default page;
