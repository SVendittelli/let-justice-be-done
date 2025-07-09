import TooltipLink from "./TooltipLink";

type Props = { linkText?: string };

export default function ComplicationTooltip({
  linkText = "Complication",
}: Props) {
  return (
    <TooltipLink href="/rules#complications" linkText={linkText}>
      A problem that the <b>Consultants</b> must overcome to make progress.
    </TooltipLink>
  );
}
