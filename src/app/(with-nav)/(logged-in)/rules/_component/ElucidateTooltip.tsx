import TooltipLink from "./TooltipLink";

type Props = { linkText?: string };

export default function ElucidateTooltip({ linkText = "Elucidate" }: Props) {
  return (
    <TooltipLink href="/rules#move-elucidate" linkText={linkText}>
      The final move of the mystery, you frame the <b>Suspects</b> using any{" "}
      <b>Clues</b> you can include.
    </TooltipLink>
  );
}
