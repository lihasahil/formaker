-- CreateTable
CREATE TABLE "JsonForm" (
    "id" SERIAL NOT NULL,
    "jsonform" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JsonForm_pkey" PRIMARY KEY ("id")
);
