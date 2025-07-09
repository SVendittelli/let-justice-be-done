import TooltipLink from "./TooltipLink";

type Props = { linkText?: string };

export default function TraitsTooltip({ linkText = "Traits" }: Props) {
  return (
    <TooltipLink href="/rules#traits" linkText={linkText}>
      <p>
        Things your <b>Character</b> is famous for.
      </p>
      <p>You can use them at any time to get extra dice on a roll.</p>
    </TooltipLink>
  );
}
