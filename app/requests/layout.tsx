import Tab, { TabItem } from "../components/tabs";

interface Props {
  children: React.ReactNode;
}

const usersLayout = ({ children }: Props) => {
  return (
    <main dir="rtl">
      <Tab>
        <TabItem href="requests" content="تلقائي" />
        <TabItem href="requests/assemble" content="طلبات التجميع" />
        <TabItem href="requests/money" content="طلبات السحب" />
        <TabItem href="requests/get-products" content="طلبات سحب المنتجات" />
      </Tab>
      <section className="my-2">{children}</section>
    </main>
  );
};
export default usersLayout;
