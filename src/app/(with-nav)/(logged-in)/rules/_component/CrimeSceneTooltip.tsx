import TooltipLink from "./TooltipLink";

type Props = { linkText?: string };

export default function CrimeSceneTooltip({ linkText = "Crime Scene" }: Props) {
  return (
    <TooltipLink href="/crime-scenes" linkText={linkText}>
      A location relevant to the investigation.
    </TooltipLink>
  );
}
