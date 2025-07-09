import TooltipLink from "./TooltipLink";

type Props = { linkText?: string };

export default function TheAuthorityTooltip({
  linkText = "The Authority",
}: Props) {
  return (
    <TooltipLink href="/npcs#authority" linkText={linkText}>
      The NPC that must be convinced of the guilt of the suspects.
    </TooltipLink>
  );
}
