import { getcity } from "@/prisma/seed";
import { CreateDialog } from "./components/skus";
import { Separator } from "@/components/ui/separator";
import CityTabel from "./components/city-tabel";
const page = async () => {
  const cities = await getcity();
  return (
    <main dir={"rtl"}>
      <CreateDialog />
      <Separator className="my-2" />
      {cities && <CityTabel cities={cities} />}
    </main>
  );
};

export default page;
