import CardBox from "../components/card-box";

const page = async () => {
  // const data = await fetch("http://localhost:10000/users")
  // const users = await data.json()
  // console.log(users.data);
  return (
    <section dir="rtl">
      <div className="flex justify-start items-start gap-2 my-2 p-2 w-[95%]">
        <CardBox
          link="products/verify-product"
          info={`توثيق و إضافة المنتجات`}
          content="توثيق اي منتج او  اضافة منتج جديد و تعديل اي كمية  من منتج معين"
        />
        <CardBox
          link="products/verify-store"
          info={`توثيق متجر`}
          content="إمكانية توثيق اي متجر و تعطيل و تشغيل متجر ما"
        />
      </div>
      <div></div>
    </section>
  );
};
export default page;
