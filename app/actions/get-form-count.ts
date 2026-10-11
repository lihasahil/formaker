"use server";

import prisma from "@/lib/prisma";

export async function getFormCount(createdBy: string) {
  try {
    const count = await prisma.jsonForm.count({ where: { createdBy } });
    return { success: true, count };
  } catch (error) {
    console.error("Failed to count forms:", error);
    return { success: false, count: 0 };
  }
}
