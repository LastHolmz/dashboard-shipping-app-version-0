import { redirectOrder } from "@/prisma/seed";
import { z } from "zod";

export async function redirectOrderToStorageAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    id: z.string(),
  });

  const parse = schema.safeParse({
    id: formData.get("id"),
  });

  if (!parse.success) {
    return { message: "حدث خطأ أثناء تمرير المعرف" };
  }

  const data = parse.data;
  console.log(data);
  try {
    const res = await redirectOrder(data.id, "Processing");
    return { message: `${res.message}` };
  } catch (e) {
    return { message: "فشل النقل" };
  }
}
