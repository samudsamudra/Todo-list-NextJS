/*
  Warnings:

  - You are about to drop the column `category` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "category",
DROP COLUMN "dueDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
