import type { CrimeScene } from "@prisma/client";

type Props = {
  crimeScene: CrimeScene;
};

export default function CrimeSceneHover({ crimeScene }: Props) {
  return (
    <>
      <h2 className="mb-2">{crimeScene.name}</h2>
      <p>{crimeScene.description}</p>
    </>
  );
}
