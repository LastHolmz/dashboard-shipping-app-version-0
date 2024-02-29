import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Gender } from "@prisma/client";
import { FaMale, FaFemale } from "react-icons/fa";
import { DeleteDialog, UpdateDialog } from "./skus";

const GenderParser = ({ gender }: { gender: Gender }) => {
  if (gender === "Man") {
    return (
      <div className=" rounded-sm bg-sky-500 text-white p-1 w-fit flex-between mx-auto">
        <span>رجالي</span> <FaMale />
      </div>
    );
  } else {
    return (
      <div className=" rounded-sm bg-pink-500 text-white p-1 w-fit flex-between mx-auto">
        <span>نسائي</span> <FaFemale />
      </div>
    );
  }
};
interface Cities {
  id: string;
  min: number;
  max: number;
  name: string;
  gender: Gender;
  price: number;
}
const CityTabel = async ({ cities }: { cities: Cities[] }) => {
  return (
    <Table dir="rtl">
      <TableCaption>قائمة جميع المدن المضافة</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=" text-center">اسم المدينة</TableHead>
          <TableHead className=" text-center">سعر التوصيل</TableHead>
          <TableHead className=" text-center">أقل مدة</TableHead>
          <TableHead className=" text-center">أقصى مدة</TableHead>
          <TableHead className=" text-center">نوع التوصيل</TableHead>
          <TableHead className=" text-center">actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cities ? (
          cities.map((city, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="text-center">{city.name}</TableCell>
                <TableCell className="text-center">{city.price}</TableCell>
                <TableCell className="text-center">{city.min}</TableCell>
                <TableCell className="text-center">{city.max}</TableCell>
                <TableCell className="text-center">
                  <GenderParser gender={city.gender} />
                </TableCell>
                <TableCell className="text-center">
                  <UpdateDialog id={city.id} city={{ ...city }} />
                  <DeleteDialog id={city.id} />
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <div> لا يوجد مدن</div>
        )}
      </TableBody>
    </Table>
  );
};

export default CityTabel;
