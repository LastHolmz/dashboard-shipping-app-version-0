import NavBox from "./components/nav-box";

const page = async () => {
  // const data = await fetch("http://localhost:10000/users")
  // const users = await data.json()
  // console.log(users.data);
  return (
    <section dir="rtl">
      <div className="flex justify-start items-start gap-2 my-2 p-2 w-[95%]">
        <NavBox
          link="products/verify-product"
          info={`توثيق و إضافة المنتجات`}
          className=" transition-all md:basis-1/2 hover:scale-[1.1] hover:m-1 lg:basis-1/4"
        />
        <NavBox
          link="products/verify-store"
          info={`توثيق متجر`}
          className=" transition-all md:basis-1/2 hover:scale-[1.1] hover:m-1 lg:basis-1/4"
        />
      </div>
      <div></div>
    </section>
  );
};
export default page;
