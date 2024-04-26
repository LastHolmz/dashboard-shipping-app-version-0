"use server";
import { deletCategory, editCategory, newCategory } from "@/prisma/seed";
import { z } from "zod";

export const newCategoryAction = async (
  prevState: {
    message: string;
  },
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const schema = z.object({
      name: z.string(),
      img: z.string(),
      // main: z.string(),
    });
    const data = schema.safeParse({
      name: formData.get("name"),
      img: formData.get("img"),
      // main: formData.get("main"),
    });
    if (!data.success) {
      console.log(data.error);
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }

    const order = await newCategory({
      name: data.data.name,
      main: true,
      img: data.data.img,
    });
    if (!order) {
      return { message: "فشل إنشاء الصنف" };
    }
    return { message: order.message };
  } catch (error) {
    console.log(error);
    return { message: "فشلت العملية الرجاء المحاولة لاحقا" };
  }
};
export const EditCategoryAction = async (
  prevState: {
    message: string;
  },
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const schema = z.object({
      name: z.string(),
      img: z.string(),
      id: z.string(),
      // main: z.string(),
    });
    const data = schema.safeParse({
      name: formData.get("name"),
      img: formData.get("img"),
      id: formData.get("id"),
      // main: formData.get("main"),
    });
    if (!data.success) {
      console.log(data.error);
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }

    const order = await editCategory({
      id: data.data.id,
      name: data.data.name,
      main: true,
      img: data.data.img,
    });
    if (!order) {
      return { message: "فشل تحديث الصنف" };
    }
    return { message: order.message };
  } catch (error) {
    console.log(error);
    return { message: "فشلت العملية الرجاء المحاولة لاحقا" };
  }
};
export const DeleteCategoryAction = async (
  prevState: {
    message: string;
  },
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const schema = z.object({
      id: z.string(),
    });
    const data = schema.safeParse({
      id: formData.get("id"),
    });
    if (!data.success) {
      console.log(data.error);
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }

    const order = await deletCategory({
      id: data.data.id,
    });
    if (!order) {
      return { message: "فشل حذف الصنف" };
    }
    return { message: order.message };
  } catch (error) {
    console.log(error);
    return { message: "فشلت العملية الرجاء المحاولة لاحقا" };
  }
};
