import { createEmployee } from "@/prisma/seed";
import { EmployeeRole } from "@prisma/client";
import { z } from "zod";

export async function createEmloyeeAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      phoneNumber: z.string(),
      fullName: z.string().min(8, {
        message: "يجب أن يحتوي الاسم على الأفل 8 حروف",
      }),
      role: z.string(),
      salaryAmount: z.string(),
    });
    const parse = schema.safeParse({
      phoneNumber: formData.get("phoneNumber"),
      fullName: formData.get("fullName"),
      role: formData.get("role"),
      salaryAmount: formData.get("salaryAmount"),
    });
    console.log(parse);
    if (!parse.success) {
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }
    const data = {
      phoneNumber: Number(parse.data.phoneNumber),
      salaryAmount: Number(parse.data.salaryAmount),
      role: parse.data.role,
      fullName: parse.data.fullName,
    };
    const res = await createEmployee(
      data.phoneNumber,
      data.fullName,
      data.role as EmployeeRole,
      data.salaryAmount
    );
    return { message: `${res.message}` };
  } catch (e) {
    return { message: "فشلت العملية" };
  }
}
