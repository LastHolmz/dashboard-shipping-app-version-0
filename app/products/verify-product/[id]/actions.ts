import { updateSku, verifySku } from "@/prisma/seed";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function verifySkuAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string(),
      qty: z.string(),
    });
    const parse = schema.safeParse({
      id: formData.get("id"),
      qty: formData.get("qty"),
    });

    if (!parse.success) {
      return { message: "لا يوجد id" };
    }

    const data = parse.data;

    const res = await verifySku(parse.data.id, parse.data.qty);
    return { message: `${res.message}` };
  } catch (e) {
    return { message: "فشل التحديث" };
  }
}
export async function updateSkuQtyAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string(),
      qty: z.string().min(0, {
        message: "يجب ان تكون الكمية اكبر من 0",
      }),
    });

    const parse = schema.safeParse({
      id: formData.get("id"),
      qty: formData.get("qty"),
    });

    if (!parse.success) {
      return { message: "يجب ان تكون الكمية اكبر من 0" };
    }

    const data = parse.data;

    const res = await updateSku(data.id, Number(data.qty));

    return { message: `${res.message}` };
  } catch (e) {
    return { message: "فشل التحديث" };
  }
}
