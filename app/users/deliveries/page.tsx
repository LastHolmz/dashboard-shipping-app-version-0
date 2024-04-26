import NestedPageHeader from "@/app/components/nested-page-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الدليفرييس | المستخدمين",
};
const deliveries = async () => {
  return (
    <div dir="rtl">
      <NestedPageHeader content="الدليفرييس" />
    </div>
  );
};

export default deliveries;
