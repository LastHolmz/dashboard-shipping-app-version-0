"use server";
import { StoreVerificationProps } from "@/types";
import {
  PrismaClient,
  Prisma,
  OrderState,
  Gender,
  EmployeeRole,
} from "@prisma/client";
import {
  unstable_noStore as noStore,
  unstable_cache as forceStore,
  revalidateTag,
  revalidatePath,
} from "next/cache";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const findProductsByName = async (name?: string) => {
  noStore();
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
        },
        accepted: false,
      },
      include: {
        sku: true,
      },
    });

    return products;
  } catch (error) {
    console.error("Error finding products:", error);
    return undefined;
  }
};
export const findProductById = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        name: true,
        sku: true,
      },
    });
    return product;
  } catch (error) {
    console.error("Error finding products:", error);
    return undefined;
  }
};
export const verifySku = async (skuId: string) => {
  try {
    await prisma.sku.update({
      where: { id: skuId },
      data: {
        verified: "Working",
      },
    });
    return { message: "تم التحديث" };
  } catch (error) {
    return { message: "فشل التحديث" };
  }
};
export const updateSku = async (skuId: string, qty: number) => {
  try {
    const updated = await prisma.sku.update({
      where: { id: skuId },
      data: {
        qty: qty,
      },
    });
    revalidatePath("/");
    return { message: "تم التحديث" };
  } catch (error) {
    console.log(error);
    return { message: "فشل التحديث" };
  }
};
/* stores */
export const findStoressByName = async (name?: string) => {
  noStore();
  try {
    const stores = await prisma.store.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
    if (!stores) {
      return [];
    }
    return stores;
  } catch (error) {
    console.error("Error finding products:", error);
    return undefined;
  }
};

export const findStoreById = async (id: string) => {
  noStore();
  try {
    const store = await prisma.store.findUnique({
      where: { id },
      include: {
        owener: {
          select: {
            userName: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            userInfo: {
              select: {
                info: true,
                verfivicationImgs: true,
                birthday: true,
                location: {
                  select: {
                    city: true,
                    region: true,
                    street: true,
                    info: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return store;
  } catch (error) {
    console.error("Error finding store:", error);
    return undefined;
  }
};
export const verifyStore = async (
  storeId: string,
  password: string,
  props: StoreVerificationProps
): Promise<{
  message: string;
}> => {
  try {
    const foundStore = await prisma.store.findUnique({
      where: { id: storeId },
      include: {
        owener: {
          select: {
            hashedPassword: true,
          },
        },
      },
    });
    if (!foundStore) {
      return { message: "فشل في العثور على المتجر" };
    }
    const compare = await comparePassword(
      password,
      (foundStore.owener?.hashedPassword as string) || ""
    );
    if (!compare) {
      return { message: "كلمة المرور غير متطابقة" };
    }
    if (foundStore.verified === true) {
      return { message: "المتجر مصدق بالفعل" };
    }
    const updatedStore = await prisma.store.update({
      where: { id: storeId },
      data: {
        verified: true,
        owener: {
          /* here i updated user field the owener of the store i update his info {created for scratch} */
          update: {
            userInfo: {
              create: {
                verfivicationImgs: props.verfivicationImgs,
                birthday: props.birthday || null,
                info: props.info || null,
                /* here i created new location for userInfo field its 1-1 relation */
                location: {
                  create: {
                    city: props.location?.city || null,
                    region: props.location?.region || null,
                    street: props.location?.street || null,
                    info: props.location?.info || null,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!updatedStore) {
      return { message: "فشلت العملية" };
    }
    revalidateTag("stores");
    return { message: "تم التحديث" };
  } catch (error) {
    return { message: "فشل التحديث" };
  }
};
export const pendStore = async (storeId: string) => {
  try {
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) {
      return {
        message: "فشل في العثور على المتجر",
      };
    }
    if (!store.verified) {
      return {
        message: "المتجر معلق بالفعل",
      };
    }
    const quitStore = await prisma.store.update({
      where: { id: storeId },
      data: {
        verified: false,
      },
    });
    if (!quitStore) {
      return {
        message: "حدث حطأ ",
      };
    }
    revalidatePath("/");
    return {
      message: "تم تعليق المتجر بنجاح",
    };
  } catch (error) {
    return {
      message: "حدث حطأ ",
    };
  }
};

export const ContinueStore = async (storeId: string) => {
  try {
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) {
      return {
        message: "فشل في العثور على المتجر",
      };
    }
    if (store.verified) {
      return {
        message: "المتجر يعمل بالفعل",
      };
    }
    const continueWorkStore = await prisma.store.update({
      where: { id: storeId },
      data: {
        verified: true,
      },
    });
    if (!continueWorkStore) {
      return {
        message: "حدث حطأ ",
      };
    }
    revalidatePath("/");
    return {
      message: "تم ايقاف تعليق المتجر بنجاح",
    };
  } catch (error) {
    return {
      message: "حدث حطأ ",
    };
  }
};

export const isStoreVerified = async (id: string): Promise<boolean> => {
  const foundStore = await prisma.store.findUnique({
    where: { id },
    include: {
      owener: {
        select: {
          userInfo: true,
        },
      },
    },
  });
  if (foundStore?.owener?.userInfo) {
    return true;
  } else {
    return false;
  }
};
/* orders */
export const getOrders = async (state?: OrderState) => {
  noStore();
  try {
    const orders = await prisma.order.findMany({
      where: { state: state },
      select: {
        id: true,
        state: true,
        Cities: true,
        items: true,
        user: {
          select: {
            phoneNumber: true,
          },
        },
        barcode: true,
      },
    });
    if (!orders || orders.length === 0) {
      return [];
    }
    return orders;
  } catch (error) {
    console.log(error);
    return [];
  }
};
// redirect the order to storage for checking the items
export const redirectOrder = async (
  id: string,
  status: OrderState,
  message?: string
): Promise<{ message: string }> => {
  try {
    const order = await prisma.order.update({
      where: { id },
      data: {
        state: status,
      },
    });
    if (!order) {
      return {
        message: "حدث خطأ أثناء النقل",
      };
    }
    revalidatePath("/");
    return {
      message: message ? message : "تم النقل الى المخزن",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "حدث خطأ ما",
    };
  }
};
export const findOrderByBarcode = async (barcode: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: { barcode },
      select: {
        barcode: true,
        id: true,
      },
    });

    if (!order) {
      return undefined;
    }
    const orderItems = await prisma.orderItem.findMany({
      where: { orderId: order.id },
      select: {
        id: true,
        price: true,
        qty: true,
        Sku: {
          select: {
            color: true,
            name: true,
            product: {
              select: {
                barcode: true,
              },
            },
          },
        },
      },
    });
    if (!orderItems) {
      return undefined;
    }
    const data = { order, orderItems };
    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
/* cities */
export const getCities = async () => {
  try {
    const cities = await prisma.cities.findMany({});
    if (!cities || cities.length === 0) {
      return [];
    }
    return cities;
  } catch (error) {
    return [];
  }
};

export const getCityById = async (id: string) => {
  try {
    const city = await prisma.cities.findUnique({
      where: { id: id },
    });
    if (!city) {
      return undefined;
    }
    return city;
  } catch (error) {
    return undefined;
  }
};

export const createCity = async (
  min: number,
  max: number,
  name: string,
  gender: Gender,
  price: number
): Promise<{
  message: string;
}> => {
  try {
    const city = await prisma.cities.create({
      data: {
        min,
        max,
        name,
        gender,
        price,
      },
    });
    if (!city) {
      return { message: "حدث خطأ أثناء الحفظ" };
    }
    revalidatePath("/");
    return { message: "تم الحفظ بنجاح" };
  } catch (error) {
    return { message: "حدث خطأ غير معروف" };
  }
};

export const updateCity = async (
  id: string,
  min: number,
  max: number,
  name: string,
  gender: Gender,
  price: number
) => {
  try {
    const city = await prisma.cities.update({
      where: { id },
      data: {
        min,
        max,
        name,
        gender,
        price,
      },
    });
    if (!city) {
      return { message: "حدث خطأ أثناء التحديث" };
    }
    revalidatePath("/");
    return { message: "تم التحديث بنجاح" };
  } catch (error) {
    return { message: "حدث خطأ غير معروف" };
  }
};

export const deleteCity = async (id: string) => {
  try {
    const city = await prisma.cities.delete({
      where: { id },
    });
    if (!city) {
      return { message: "حدث خطأ أثناء الحذف" };
    }
    revalidatePath("/");

    return { message: "تم الحذف بنجاح" };
  } catch (error) {
    return { message: "حدث خطأ غير معروف" };
  }
};

/* get all product for one store */
export const storeProducts = async (storeId: string) => {
  try {
    const products = await prisma.product.findMany({
      where: { storeId },
    });
    if (!products || products.length === 0) {
      return [];
    }
    return products;
  } catch (error) {
    return [];
  }
};

/* employee */

export const createEmployee = async (
  phoneNumber: number,
  fullName: string,
  role: EmployeeRole,
  salaryAmount: number
  //  verifactionImgs: string[],
) => {
  try {
    const employee = await prisma.employee.create({
      data: {
        phoneNumber,
        verifactionImgs: [
          "https://m.media-amazon.com/images/I/81N-Yb9ljtL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
        ],
        fullName,
        role,
        salaryAmount,
      },
    });
    if (!employee) {
      return { message: "حدث خطأ أثناء حفظ الموظف " };
    }
    revalidatePath("/");
    return { message: "تم الحفظ بنجاح" };
  } catch (error) {
    return { message: "حدث خطأ غير معروف" };
  }
};
// export const updateEmployee = async () => {
//   try {
//     const employee = await prisma.employee.create({
//       data: {
//         phoneNumber: "",
//         verifactionImgs: [""],
//         fullName: "",
//         role: "Manger",
//         salaryAmount: 23,
//       },
//     });
//     if (!employee) {
//       return { message: "حدث خطأ أثناء حفظ الموظف " };
//     }
//     revalidatePath("/");
//     return { message: "تم الحفظ بنجاح" };
//   } catch (error) {
//     return { message: "حدث خطأ غير معروف" };
//   }
// };

export const getEmployees = async () => {
  try {
    const employees = await prisma.employee.findMany({});
    if (!employees || employees.length === 0) {
      return undefined;
    }
    return employees;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getEmployeeById = async (id: string) => {
  try {
    const employee = await prisma.employee.findMany({ where: { id } });
    if (!employee) {
      return undefined;
    }
    return employee;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  return passwordMatch;
}
