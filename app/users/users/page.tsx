import NestedPageHeader from "@/app/components/nested-page-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المستخدمين | المستخدمين",
};
const usersPage = async () => {
  return (
    <div dir="rtl">
      <NestedPageHeader content="المستخدمين" />
    </div>
  );
};

export default usersPage;
