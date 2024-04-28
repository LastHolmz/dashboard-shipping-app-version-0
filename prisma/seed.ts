"use server";
import { StoreVerificationProps } from "@/types";
import {
  PrismaClient,
  Prisma,
  OrderState,
  Gender,
  EmployeeRole,
  AssembleRequest,
  AssembleProduct,
  $Enums,
} from "@prisma/client";
import {
  unstable_noStore as noStore,
  unstable_cache as forceStore,
  revalidateTag,
  revalidatePath,
} from "next/cache";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
//
export const findPrdocuts = async () => {
  try {
    const products = await prisma.product.findMany({
      where: {},
      select: {
        id: true,
        name: true,
        price: true,
        barcode: true,
        sizes: {
          include: {
            sku: true,
          },
        },
        /*  sku: {
          select: { qty: true },
        }, */
        store: {
          select: {
            name: true,
          },
        },
        accepted: true,
      },
    });
    if (!products || products.length === 0) {
      return [];
    }
    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
};

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
        /*         sku: true, */
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
        sizes: {
          include: {
            sku: true,
          },
        },
        /*  sku: true, */
      },
    });
    return product;
  } catch (error) {
    console.error("Error finding products:", error);
    return undefined;
  }
};
export const verifySku = async (skuId: string, qty: string) => {
  try {
    await prisma.sku.update({
      where: { id: skuId },
      data: {
        verified: "Working",
        newQty: {
          decrement: Number(qty),
        },
        qty: {
          increment: Number(qty),
        },
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
                /*  location: {
                  select: {
                    city: true,
                    region: true,
                    street: true,
                    info: true,
                  },
                }, */
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
                // location: {
                //   create: {
                //     city: props.location?.city || null,
                //     region: props.location?.region || null,
                //     street: props.location?.street || null,
                //     info: props.location?.info || null,
                //   },
                // },
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
      include: {
        Cities: true,
        orderItems: {
          include: {
            Sku: true,
          },
        },
        user: true,
      },
    });

    if (!order) {
      return undefined;
    }

    return order;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
/* city */
export const getcity = async () => {
  try {
    const city = await prisma.city.findMany({});
    if (!city || city.length === 0) {
      return [];
    }
    return city;
  } catch (error) {
    return [];
  }
};

export const getCityById = async (id: string) => {
  try {
    const city = await prisma.city.findUnique({
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
    const city = await prisma.city.create({
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
    const city = await prisma.city.update({
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
    const city = await prisma.city.delete({
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
/**
   async funciton that either [] or Category[] returns the main categories
   @example

// Get main Categories
const categories = await getCategories();
   @type {id: string;name: string;img: string | null;productIds: string[];main: boolean | null;}

 */
export const getCategories = async () => {
  noStore();
  try {
    const categories = await prisma.category.findMany({});
    if (!categories) {
      return [];
    }
    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const newCategory = async ({
  name,
  img,
  main,
}: {
  name: string;
  img?: string;
  main: boolean;
}): Promise<{ message: string }> => {
  try {
    const category = await prisma.category.create({
      data: {
        name,
        img,
        main,
      },
    });
    if (!category) {
      return { message: "فشلت العملية" };
    }
    revalidatePath("/");
    return { message: "تم إنشاء الصنف بنجاح" };
  } catch (error) {
    console.log(error);
    return { message: "فشلت العملية" };
  }
};
export const editCategory = async ({
  name,
  img,
  main,
  id,
}: {
  name: string;
  img?: string;
  main: boolean;
  id: string;
}): Promise<{ message: string }> => {
  noStore();
  try {
    const category = await prisma.category.update({
      where: { id: id },
      data: {
        name,
        img,
      },
    });
    if (!category) {
      return { message: "فشلت العملية" };
    }
    revalidatePath("/");
    return { message: "تم تعديل الصنف بنجاح" };
  } catch (error) {
    console.log(error);
    return { message: "فشلت العملية" };
  }
};
export const deletCategory = async ({
  id,
}: {
  id: string;
}): Promise<{ message: string }> => {
  try {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return { message: "category no more available" };
    }
    const deletCategory = await prisma.category.update({
      where: { id },
      data: {
        products: {
          disconnect: category.productIds.map((id) => ({ id: id })),
        },
      },
    });
    const deleted = await prisma.category.delete({ where: { id } });
    if (!deletCategory || !deleted) {
      return { message: "فشلت العملية" };
    }

    revalidatePath("/");
    return { message: "تم حذف الصنف بنجاح" };
  } catch (error) {
    console.log(error);
    return { message: "فشلت العملية" };
  }
};

export const getAssembleRequests = async () => {
  noStore();
  try {
    const requests = await prisma.assembleRequest.findMany({
      include: { assemble: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!requests) {
      return [];
    }
    return requests;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getAssembleRequestById = async (id: string) => {
  noStore();
  try {
    const requests = await prisma.assembleRequest.findUnique({
      where: { id },
      include: { assemble: true },
    });
    if (!requests) {
      return undefined;
    }
    return requests;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
interface RequestInstance extends AssembleRequest {
  readonly assemble: AssembleProduct[];
}
export const assemble = async (
  status: $Enums.AssembleStatus,
  request: RequestInstance
) => {
  if (status === "Done") return;
  await prisma.assembleRequest.update({
    where: { id: request.id },
    data: {
      status: "Done",
    },
  });
  await Promise.all(
    request.assemble.map(async (product) => {
      return await prisma.sku.update({
        where: { id: product.skuId },
        data: {
          qty: {
            increment: product.qty,
          },
          newQty: {
            decrement: product.qty,
          },
          verified: "Working",
        },
      });
    })
  );
};
