import { pendStore, verifyStore, ContinueStore } from "@/prisma/seed";
import { StoreVerificationProps } from "@/types";
import { z } from "zod";

export async function verifyInfoAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string(),
      password: z.string().min(8, {
        message: " يجب ان تحتوي كلمة السر 8 حروف على الأقل",
      }),
      info: z.string().optional(),
      location_info: z.string().optional(),
      date: z.string().optional(),
      city: z.string().optional(),
      region: z.string().optional(),
      street: z.string().optional(),
    });
    const parse = schema.safeParse({
      id: formData.get("id"),
      password: formData.get("password"),
      info: formData.get("info"),
      location_info: formData.get("location_info"),
      date: formData.get("date"),
      city: formData.get("city"),
      region: formData.get("region"),
      street: formData.get("street"),
    });
    if (!parse.success) {
      return { message: "يجب مل الحقول بطريقة صحيحة" };
    }

    const data = parse.data;
    const props: StoreVerificationProps = {
      verfivicationImgs: [
        "https://m.media-amazon.com/images/I/81IUL3oNhAL._AC_SL1500_.jpg",
      ],
      birthday: data.date,
      info: data.info,
      location: {
        city: data.city,
        region: data.region,
        street: data.street,
        info: data.location_info,
      },
    };
    const res = await verifyStore(data.id, data.password, props);
    // revalidatePath("/");
    return { message: `${res.message}` };
  } catch (e) {
    console.log(e);
    return { message: "فشل التأكيد" };
  }
}
export async function pendStoreAction(
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
      return { message: "يجب مل الحقول بطريقة صحيحة" };
    }
    const data = parse.data;

    const res = await pendStore(data.id);
    return { message: `${res.message}` };
  } catch (e) {
    console.log(e);
    return { message: "فشل التعليق" };
  }
}
export async function continueStoreAction(
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
      return { message: "يجب مل الحقول بطريقة صحيحة" };
    }
    const data = parse.data;

    const res = await ContinueStore(data.id);
    return { message: `${res.message}` };
  } catch (e) {
    console.log(e);
    return { message: "فشل رفع التعليق" };
  }
}
