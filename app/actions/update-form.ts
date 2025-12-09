"use server";

import { FormSchema } from "@/app/types/form-types";
import prisma from "@/lib/prisma";

export async function updateJsonForm(
  id: number,
  updatedSchema: FormSchema,
  createdBy: string
) {
  try {
    const existing = await prisma.jsonForm.findUnique({
      where: { id },
    });

    if (!existing) {
      return { success: false, error: "Form not found" };
    }

    if (existing.createdBy !== createdBy) {
      return { success: false, error: "Unauthorized: creator mismatch" };
    }

    const updated = await prisma.jsonForm.update({
      where: { id },
      data: {
        jsonform: JSON.stringify(updatedSchema),
      },
    });

    return { success: true, data: updated };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { success: false, error: "Failed to update JSON form" };
  }
}
