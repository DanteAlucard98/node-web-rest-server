/*
  Warnings:

  - You are about to drop the column `completeAt` on the `todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todo" DROP COLUMN "completeAt",
ADD COLUMN     "completedAt" TIMESTAMP;
