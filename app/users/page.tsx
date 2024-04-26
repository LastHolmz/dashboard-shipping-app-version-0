import { Metadata } from "next";
import Tab, { TabItem } from "../components/tabs";
import NestedPageHeader from "../components/nested-page-header";

export const metadata: Metadata = {
  title: "المستخدمين",
};
const usersPage = async () => {
  return (
    <div dir="rtl">
      <NestedPageHeader content="كل المستخدمين" />
    </div>
  );
};

export default usersPage;
