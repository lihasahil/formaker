//createdorm.ts
"use server";

import prisma from "@/lib/prisma";

interface CreateFormInput {
  jsonForm: string;
  createdBy: string;
}

export async function createFormAction(data: CreateFormInput) {
  try {
    if (!data.createdBy) {
      throw new Error("User email is required");
    }

    const res = await prisma.jsonForm.create({
      data: {
        jsonform: data.jsonForm,
        createdBy: data.createdBy,
        createdAt: new Date(),
      },
      select: {
        id: true,
      },
    });

    return res;
  } catch (error) {
    console.error("Error creating form in database:", error);
    throw new Error(
      `Failed to save form: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
