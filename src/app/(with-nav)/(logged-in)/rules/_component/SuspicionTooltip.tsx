import TooltipLink from "./TooltipLink";

type Props = { linkText?: string };

export default function SuspicionTooltip({ linkText = "Suspicion" }: Props) {
  return (
    <TooltipLink href="/rules#suspicion" linkText={linkText}>
      <p>
        Gaining <b>Suspicion</b> means that the <b>Suspects</b>and the{" "}
        <b>Authority</b> start to figure out what you are <i>really</i> trying
        to do here.
      </p>
      <p>
        Gain seven or more <b>Suspicion</b> and you lose.
      </p>
    </TooltipLink>
  );
}
