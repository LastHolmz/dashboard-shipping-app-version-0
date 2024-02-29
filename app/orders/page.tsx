import { getOrders } from "@/prisma/seed";
import { Order, OrdersTable } from "./components/orders-table";
import { OrderState } from "@prisma/client";

const page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const orders = await getOrders(searchParams?.query as OrderState);
  const transformedOrders = orders.map((order) => {
    return {
      id: order.id,
      items: order.items ?? 0,
      state: order.state,
      city: order.Cities?.name,
      phoneNumber: order.user?.phoneNumber ?? 0,
      barcode: order.barcode,
    };
  });
  console.log(orders);
  return (
    <div>
      <OrdersTable data={transformedOrders as unknown as Order[]} />
    </div>
  );
};

export default page;
