-- CreateTable
CREATE TABLE "PlayerCharacter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pronouns" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "traits" TEXT[],
    "notes" TEXT NOT NULL,

    CONSTRAINT "PlayerCharacter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NonPlayerCharacter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "moniker" TEXT NOT NULL,

    CONSTRAINT "NonPlayerCharacter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clue" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Clue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClueToNonPlayerCharacter" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClueToNonPlayerCharacter_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ClueToLocation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClueToLocation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_LocationToNonPlayerCharacter" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LocationToNonPlayerCharacter_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ClueToNonPlayerCharacter_B_index" ON "_ClueToNonPlayerCharacter"("B");

-- CreateIndex
CREATE INDEX "_ClueToLocation_B_index" ON "_ClueToLocation"("B");

-- CreateIndex
CREATE INDEX "_LocationToNonPlayerCharacter_B_index" ON "_LocationToNonPlayerCharacter"("B");

-- AddForeignKey
ALTER TABLE "_ClueToNonPlayerCharacter" ADD CONSTRAINT "_ClueToNonPlayerCharacter_A_fkey" FOREIGN KEY ("A") REFERENCES "Clue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClueToNonPlayerCharacter" ADD CONSTRAINT "_ClueToNonPlayerCharacter_B_fkey" FOREIGN KEY ("B") REFERENCES "NonPlayerCharacter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClueToLocation" ADD CONSTRAINT "_ClueToLocation_A_fkey" FOREIGN KEY ("A") REFERENCES "Clue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClueToLocation" ADD CONSTRAINT "_ClueToLocation_B_fkey" FOREIGN KEY ("B") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToNonPlayerCharacter" ADD CONSTRAINT "_LocationToNonPlayerCharacter_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToNonPlayerCharacter" ADD CONSTRAINT "_LocationToNonPlayerCharacter_B_fkey" FOREIGN KEY ("B") REFERENCES "NonPlayerCharacter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
