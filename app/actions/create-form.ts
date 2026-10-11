"use server";

import prisma from "@/lib/prisma";
import { FORM_LIMIT } from "@/lib/constants";

interface CreateFormInput {
  jsonForm: string;
  createdBy: string;
}

export async function createFormAction(data: CreateFormInput) {
  try {
    if (!data.createdBy) {
      throw new Error("User email is required");
    }

    const existing = await prisma.jsonForm.count({
      where: { createdBy: data.createdBy },
    });
    if (existing >= FORM_LIMIT) {
      throw new Error(`Form limit reached (${FORM_LIMIT} per account)`);
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
    throw new Error(
      `Failed to save form: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
