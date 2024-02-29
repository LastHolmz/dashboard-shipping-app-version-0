import { createCity, updateCity, deleteCity } from "@/prisma/seed";
import { Gender } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function CreateCityAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      min: z.string(),
      max: z.string(),
      name: z.string().min(1, {
        message: "يجب أن يكون يحتوي",
      }),
      gender: z.string(),
      price: z.string(),
    });

    const parse = schema.safeParse({
      min: formData.get("min"),
      max: formData.get("max"),
      name: formData.get("name"),
      gender: formData.get("gender"),
      price: formData.get("price"),
    });
    if (!parse.success) {
      console.log(parse);
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }
    const data = {
      min: Number(parse.data.min),
      max: Number(parse.data.max),
      name: parse.data.name,
      gender: parse.data.gender,
      price: Number(parse.data.price),
    };
    const res = await createCity(
      data.min,
      data.max,
      data.name,
      data.gender as Gender,
      data.price
    );
    return { message: `${res.message}` };
  } catch (e) {
    return { message: "فشلت العملية" };
  }
}

export async function updateCityAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string(),
      min: z.string(),
      max: z.string(),
      name: z.string().min(1, {
        message: "يجب أن يكون يحتوي",
      }),
      gender: z.string(),
      price: z.string(),
    });

    const parse = schema.safeParse({
      id: formData.get("id"),
      min: formData.get("min"),
      max: formData.get("max"),
      name: formData.get("name"),
      gender: formData.get("gender"),
      price: formData.get("price"),
    });
    if (!parse.success) {
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }
    const data = {
      id: parse.data.id,
      min: Number(parse.data.min),
      max: Number(parse.data.max),
      name: parse.data.name,
      gender: parse.data.gender,
      price: Number(parse.data.price),
    };
    const res = await updateCity(
      data.id,
      data.min,
      data.max,
      data.name,
      data.gender as Gender,
      data.price
    );

    return { message: `${res.message}` };
  } catch (e) {
    return { message: "فشلت العملية" };
  }
}

export async function deleteCityAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string(),
    });

    const parse = schema.safeParse({
      id: formData.get("id"),
    });
    if (!parse.success) {
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }

    const data = {
      id: parse.data.id,
    };
    const res = await deleteCity(data.id);

    return { message: `${res.message}` };
  } catch (e) {
    return { message: "فشلت العملية" };
  }
}
