import { Metadata } from "next";
import Tab, { TabItem } from "../components/tabs";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "لوحة تحكم | الموظفين ",
  description: "إدارة الموظفين",
};

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="px-2 h-screen">
      <Tab>
        <TabItem href="employee" content="تلقائي" />
        {/* <TabItem href="employee/new" content="إضافة موظف" />{" "} */}
      </Tab>
      <Separator />
      {children}
    </main>
  );
}
