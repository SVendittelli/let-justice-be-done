/*
  Warnings:

  - Added the required column `imageBlurData` to the `NonPlayerCharacter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `NonPlayerCharacter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NonPlayerCharacter" ADD COLUMN     "imageBlurData" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;
