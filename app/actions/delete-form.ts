"use server";

import prisma from "@/lib/prisma";

export async function deleteForm(formId: number) {
  try {
    await prisma.jsonForm.delete({
      where: { id: formId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting form:", error);

    return {
      success: false,
      error: "Failed to delete form. Make sure it exists.",
    };
  }
}
