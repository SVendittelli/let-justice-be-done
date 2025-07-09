import TooltipLink from "./TooltipLink";

type Props = { linkText?: string };

export default function CollaborateTooltip({
  linkText = "Collaborate",
}: Props) {
  return (
    <TooltipLink href="/rules#move-collaborate" linkText={linkText}>
      <p>
        A <b>Consultant</b> helps another <b>Consultant</b> with their{" "}
        <b>Move</b>.
      </p>
      <p>
        Gain an extra dice roll at the risk of also encountering a{" "}
        <b>Complication</b>.
      </p>
    </TooltipLink>
  );
}
