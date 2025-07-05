/*
  Warnings:

  - Added the required column `description` to the `CrimeScene` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `NonPlayerCharacter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CrimeScene" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "revealed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "revealedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "NonPlayerCharacter" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "revealed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "revealedAt" TIMESTAMP(3);
