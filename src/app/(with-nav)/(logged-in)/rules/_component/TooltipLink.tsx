import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  linkText: string;
  children: ReactNode;
};

export default function ClueTooltip({ href, linkText, children }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Link href={href}>{linkText}</Link>
      </TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  );
}
