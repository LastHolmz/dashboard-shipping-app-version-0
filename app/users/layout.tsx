import Tab, { TabItem } from "../components/tabs";
interface Props {
  children: React.ReactNode;
}
const usersLayout = ({ children }: Props) => {
  return (
    <main dir="rtl">
      <Tab>
        <TabItem href="users" content="تلقائي" />
        <TabItem href="users/users" content="المستخدمين" />
        <TabItem href="users/sellers" content="البائعين" />
        <TabItem href="users/deliveries" content="الدليلفريس" />
      </Tab>
      <section className="my-2">{children}</section>
    </main>
  );
};
export default usersLayout;
