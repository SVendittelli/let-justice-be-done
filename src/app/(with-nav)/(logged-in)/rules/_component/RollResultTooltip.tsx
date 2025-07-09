import type { ReactNode } from "react";
import TooltipLink from "./TooltipLink";

type Result = "CRITICAL_SUCCESS" | "SUCCESS" | "MIXED_SUCCESS" | "FAILURE";
type Props = {
  result: Result;
};

const map: Record<Result, { linkText: string; content: ReactNode }> = {
  CRITICAL_SUCCESS: {
    linkText: "critical success",
    content: "Highest results of two or more sixes.",
  },
  SUCCESS: { linkText: "success", content: "Highest result of one six." },
  MIXED_SUCCESS: {
    linkText: "mixed success",
    content: "Highest result of four or five.",
  },
  FAILURE: {
    linkText: "failure",
    content: "Highest result of one, two, or three.",
  },
};

export default function RollResultTooltip({ result }: Props) {
  return (
    <TooltipLink href="/rules#roll-result" linkText={map[result].linkText}>
      {map[result].content}
    </TooltipLink>
  );
}
