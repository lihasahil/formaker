"use server";

import prisma from "@/lib/prisma";

interface UpdateFormStyleInput {
  id: number;
  background: string;
  borderWidth: number;
  updatedBy: string;
}

export async function updateFormStyle({
  id,
  background,
  borderWidth,
  updatedBy,
}: UpdateFormStyleInput) {
  try {
    const existing = await prisma.jsonForm.findUnique({
      where: { id },
    });

    if (!existing) {
      return { success: false, error: "Form not found" };
    }

    if (existing.createdBy !== updatedBy) {
      return { success: false, error: "Unauthorized: creator mismatch" };
    }

    const updated = await prisma.jsonForm.update({
      where: { id },
      data: {
        background,
        borderWidth,
      },
    });

    return { success: true, data: updated };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to update form style" };
  }
}
