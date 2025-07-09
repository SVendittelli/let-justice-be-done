import TooltipLink from "./TooltipLink";

type Props = { linkText?: string };

export default function InvestigateTooltip({
  linkText = "Investigate",
}: Props) {
  return (
    <TooltipLink href="/rules#move-investigate" linkText={linkText}>
      <p>
        Search a <b>Crime Scene</b> for useful evidence.
      </p>
      <p>
        A chance to gain <b>Clues</b> at the risk of getting a{" "}
        <b>Complication</b>.
      </p>
    </TooltipLink>
  );
}
