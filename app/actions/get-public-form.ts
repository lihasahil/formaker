"use server";

import prisma from "@/lib/prisma";

export async function getPublicFormByIdAction(formId: number) {
  try {
    if (!formId) {
      throw new Error("Form ID is required");
    }

    const form = await prisma.jsonForm.findUnique({
      where: {
        id: formId,
      },
      select: {
        jsonform: true,
        createdBy: true,
        background: true,
        borderWidth: true,
      },
    });

    if (!form) {
      throw new Error("Form not found");
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

export async function getPublicFormCaller(formId: number) {
  return await getPublicFormByIdAction(formId);
}
