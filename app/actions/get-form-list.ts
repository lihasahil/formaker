"use server";

import prisma from "@/lib/prisma";

export async function getFormsByCreator(createdBy: string) {
  try {
    const forms = await prisma.jsonForm.findMany({
      where: { createdBy },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { responses: true } },
        responses: { orderBy: { createdAt: "asc" } },
      },
    });

    return { success: true, data: forms };
  } catch (error) {
    console.error("Failed to fetch forms:", error);
    return { success: false, error: "Failed to fetch forms" };
  }
}
