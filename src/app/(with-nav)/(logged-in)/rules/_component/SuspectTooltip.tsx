import TooltipLink from "./TooltipLink";

type Props = { linkText?: string };

export default function SuspectTooltip({ linkText = "Suspect" }: Props) {
  return (
    <TooltipLink href="/npcs#suspects" linkText={linkText}>
      An NPC that can be framed for the crime.
    </TooltipLink>
  );
}
