"use server";

import prisma from "@/lib/prisma";

export async function getFormByIdAction(formId: number, createdBy: string) {
  try {
    if (!formId) {
      throw new Error("Form ID is required");
    }
    if (!createdBy) {
      throw new Error("Unknown User");
    }

    const form = await prisma.jsonForm.findUnique({
      where: {
        id: formId,
      },
      select: {
        jsonform: true,
        createdBy: true, // Add this to verify ownership
      },
    });

    if (!form) {
      throw new Error("Form not found");
    }

    // Verify user owns this form
    if (form.createdBy !== createdBy) {
      throw new Error("Unauthorized: You don't own this form");
    }

    return form;
  } catch (error) {
    throw new Error(
      `Failed to fetch form: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function getFormCaller(formId: number, userEmail: string) {
  return await getFormByIdAction(formId, userEmail);
}
