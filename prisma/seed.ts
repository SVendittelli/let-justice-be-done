import {
  randAvatar,
  randFullName,
  randJobTitle,
  randNumber,
  randParagraph,
  randPastDate,
  randPronoun,
  randSentence,
  randSkill,
  randUser,
} from "@ngneat/falso";
import type { Prisma } from "@prisma/client";
import { db } from "../src/server/db";

async function main() {
  await db.user.upsert({
    where: {
      email: "sam.vendittelli@hotmail.com",
    },
    create: {
      name: "Admin",
      email: "sam.vendittelli@hotmail.com",
      emailVerified: randPastDate(),
      image: randAvatar(),
      role: "ADMIN",
      enabled: true,
    },
    update: {},
  });

  await createPlayers();
  await createNpcs();
  await createCrimeScenes();
  await createClues();
}

async function createPlayers() {
  if ((await db.user.count()) > 1) {
    return;
  }

  const users = Array.from({ length: 6 }).map((_, i) => {
    const { username, email, img } = randUser();
    const user: Prisma.UserCreateManyInput = {
      name: username,
      email,
      emailVerified: randPastDate(),
      image: img,
      role: "USER",
      enabled: i % 2 === 0,
    };
    return user;
  });

  const dbUsers = await db.user.createManyAndReturn({ data: users });

  const pcs = dbUsers.map(
    ({ id: userId }) =>
      ({
        name: randFullName(),
        pronouns: randPronoun(),
        description: randParagraph(),
        traits: [randSkill(), randSkill()],
        userId,
      }) satisfies Prisma.PlayerCharacterCreateManyInput,
  );

  await db.playerCharacter.createMany({ data: pcs });
}

async function createNpcs() {
  if ((await db.nonPlayerCharacter.count()) > 0) {
    return;
  }

  const npcs: Prisma.NonPlayerCharacterCreateManyInput[] = Array.from({
    length: 7,
  }).map((_, i) => ({
    name: randFullName(),
    moniker: randJobTitle(),
    description: randSentence(),
    type: i === 0 ? "AUTHORITY" : "SUSPECT",
  }));

  await db.nonPlayerCharacter.createMany({ data: npcs });
}

async function createCrimeScenes() {
  if ((await db.crimeScene.count()) > 0) {
    return;
  }

  const npcs = await db.nonPlayerCharacter.findMany({
    where: { type: "SUSPECT" },
  });
  const crimeScenes: Prisma.CrimeSceneCreateManyInput[] = npcs.map((npc) => ({
    name: `${npc.name}'s Room`,
    description: randSentence(),
  }));

  await db.crimeScene.createMany({ data: crimeScenes });
}

async function createClues() {
  if ((await db.clue.count()) > 0) {
    return;
  }

  const clues: Prisma.ClueCreateManyInput[] = Array.from({ length: 16 }).map(
    (_, i) => {
      const number = `${i + 1}`.padStart(2, "0");
      return { title: `Clue ${number}`, text: randSentence() };
    },
  );

  const createdClues = await db.clue.createManyAndReturn({ data: clues });
  const npcs = await db.nonPlayerCharacter.findMany({
    where: { type: "SUSPECT" },
  });
  const crimeScenes = await db.crimeScene.findMany();

  await Promise.all(
    createdClues.map(async ({ id }) =>
      db.clue.update({
        where: { id },
        data: {
          npcs: {
            connect: {
              id: npcs[randNumber({ min: 0, max: npcs.length - 1 })]!.id,
            },
          },
          crimeScenes: {
            connect: {
              id: crimeScenes[
                randNumber({ min: 0, max: crimeScenes.length - 1 })
              ]!.id,
            },
          },
        },
      }),
    ),
  );
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
