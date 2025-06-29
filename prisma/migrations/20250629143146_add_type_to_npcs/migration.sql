/*
  Warnings:

  - Added the required column `type` to the `NonPlayerCharacter` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NPCType" AS ENUM ('AUTHORITY', 'SUSPECT');

-- AlterTable
ALTER TABLE "NonPlayerCharacter" ADD COLUMN     "type" "NPCType" NOT NULL;
