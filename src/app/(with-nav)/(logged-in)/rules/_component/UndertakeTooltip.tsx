import TooltipLink from "./TooltipLink";

type Props = { linkText?: string };

export default function UndertakeTooltip({ linkText = "Undertake" }: Props) {
  return (
    <TooltipLink href="/rules#move-undertake" linkText={linkText}>
      <p>Doing anything that is not covered by the other moves.</p>
      <p>
        At risk of raising <b>Suspicion</b>.
      </p>
    </TooltipLink>
  );
}
