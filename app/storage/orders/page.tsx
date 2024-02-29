import { getOrders } from "@/prisma/seed";
import { Order, OrdersTable } from "./components/tabel";

const ordersPage = async () => {
  const orders = await getOrders("Processing");
  const transformedOrders = orders.map((order) => {
    return {
      id: order.id,
      items: order.items ?? 0,
      state: order.state,
      city: order.Cities?.name ? order.Cities.name : "Unknown",
      phoneNumber: order.user?.phoneNumber ?? 0,
      barcode: order.barcode,
    };
  });
  return (
    <div>
      <OrdersTable data={transformedOrders as unknown as Order[]} />
    </div>
  );
};

export default ordersPage;
