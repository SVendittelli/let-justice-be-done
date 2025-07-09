import TooltipLink from "./TooltipLink";

type Props = { linkText?: string };

export default function ConsultantTooltip({ linkText = "Consultant" }: Props) {
  return (
    <TooltipLink href="/characters" linkText={linkText}>
      A Player Character hired to solve the crime.
    </TooltipLink>
  );
}
