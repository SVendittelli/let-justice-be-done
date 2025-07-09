import TooltipLink from "./TooltipLink";

type Props = { linkText?: string };

export default function InterrogateTooltip({
  linkText = "Interrogate",
}: Props) {
  return (
    <TooltipLink href="/rules#move-interrogate" linkText={linkText}>
      <p>
        Charm, bully, or otherwise manipulate a <b>Suspect</b> into giving a
        statement.
      </p>
      <p>
        A chance to gain <b>Clues</b> at the risk of getting a{" "}
        <b>Complication</b>.
      </p>
    </TooltipLink>
  );
}
