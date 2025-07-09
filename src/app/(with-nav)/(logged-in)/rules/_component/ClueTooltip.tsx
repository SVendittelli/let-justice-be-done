import TooltipLink from "./TooltipLink";

type Props = { linkText?: string };

export default function ClueTooltip({ linkText = "Clue" }: Props) {
  return (
    <TooltipLink href="/clues" linkText={linkText}>
      Some evidence that can be used to add dice to Action Rolls.
    </TooltipLink>
  );
}
