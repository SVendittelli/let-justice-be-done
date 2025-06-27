-- AlterTable
ALTER TABLE "Clue" ADD COLUMN     "revealed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT false;
