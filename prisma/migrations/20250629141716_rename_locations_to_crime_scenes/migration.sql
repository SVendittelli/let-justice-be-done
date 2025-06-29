/*
  Warnings:

  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClueToLocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LocationToNonPlayerCharacter` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `PlayerCharacter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `PlayerCharacter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ClueToLocation" DROP CONSTRAINT "_ClueToLocation_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClueToLocation" DROP CONSTRAINT "_ClueToLocation_B_fkey";

-- DropForeignKey
ALTER TABLE "_LocationToNonPlayerCharacter" DROP CONSTRAINT "_LocationToNonPlayerCharacter_A_fkey";

-- DropForeignKey
ALTER TABLE "_LocationToNonPlayerCharacter" DROP CONSTRAINT "_LocationToNonPlayerCharacter_B_fkey";

-- AlterTable
ALTER TABLE "PlayerCharacter" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL;

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "_ClueToLocation";

-- DropTable
DROP TABLE "_LocationToNonPlayerCharacter";

-- CreateTable
CREATE TABLE "CrimeScene" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CrimeScene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClueToCrimeScene" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClueToCrimeScene_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CrimeSceneToNonPlayerCharacter" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CrimeSceneToNonPlayerCharacter_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ClueToCrimeScene_B_index" ON "_ClueToCrimeScene"("B");

-- CreateIndex
CREATE INDEX "_CrimeSceneToNonPlayerCharacter_B_index" ON "_CrimeSceneToNonPlayerCharacter"("B");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerCharacter_userId_key" ON "PlayerCharacter"("userId");

-- AddForeignKey
ALTER TABLE "PlayerCharacter" ADD CONSTRAINT "PlayerCharacter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClueToCrimeScene" ADD CONSTRAINT "_ClueToCrimeScene_A_fkey" FOREIGN KEY ("A") REFERENCES "Clue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClueToCrimeScene" ADD CONSTRAINT "_ClueToCrimeScene_B_fkey" FOREIGN KEY ("B") REFERENCES "CrimeScene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CrimeSceneToNonPlayerCharacter" ADD CONSTRAINT "_CrimeSceneToNonPlayerCharacter_A_fkey" FOREIGN KEY ("A") REFERENCES "CrimeScene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CrimeSceneToNonPlayerCharacter" ADD CONSTRAINT "_CrimeSceneToNonPlayerCharacter_B_fkey" FOREIGN KEY ("B") REFERENCES "NonPlayerCharacter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
