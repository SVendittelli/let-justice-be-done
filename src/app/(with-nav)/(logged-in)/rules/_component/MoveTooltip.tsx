import TooltipLink from "./TooltipLink";

type Props = { linkText?: string };

export default function MoveTooltip({ linkText = "Move" }: Props) {
  return (
    <TooltipLink href="/rules#moves" linkText={linkText}>
      One of the 6 possible in game actions:
      <ul>
        <li>Collaborate</li>
        <li>Investigate</li>
        <li>Interrogate</li>
        <li>Fabricate</li>
        <li>Undertake</li>
        <li>Elucidate</li>
      </ul>
    </TooltipLink>
  );
}
