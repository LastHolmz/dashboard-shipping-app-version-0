import NestedPageHeader from "@/app/components/nested-page-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "البائعين | المستخدمين",
};
const sellersPage = async () => {
  return (
    <div dir="rtl">
      <NestedPageHeader content="البائعين" />
    </div>
  );
};

export default sellersPage;
