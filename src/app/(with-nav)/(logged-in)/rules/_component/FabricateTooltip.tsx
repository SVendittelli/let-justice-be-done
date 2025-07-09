import TooltipLink from "./TooltipLink";

type Props = { linkText?: string };

export default function FabricateTooltip({ linkText = "Fabricate" }: Props) {
  return (
    <TooltipLink href="/rules#move-fabricate" linkText={linkText}>
      <p>
        Alter, destroy, plant, or create <b>Clues</b>.
      </p>
      <p>
        A chance to alter or gain <b>Clues</b> at the risk of raising{" "}
        <b>Suspicion</b>.
      </p>
    </TooltipLink>
  );
}
