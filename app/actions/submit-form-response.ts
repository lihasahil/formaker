"use server";

import prisma from "@/lib/prisma";

export async function createUserResponse(
  formData: Record<string, string | number | boolean | null>,
  formRef: number,
  createdBy: string = "anonymus"
) {
  try {
    const newResponse = await prisma.userResponse.create({
      data: {
        jsonResponse: JSON.stringify(formData),
        formRef,
        createdAt: new Date(),
        createdBy,
      },
    });

    return { success: true, data: newResponse };
  } catch (error) {
    console.error("Failed to create user response:", error);
    return { success: false, error: "Failed to create user response" };
  }
}
