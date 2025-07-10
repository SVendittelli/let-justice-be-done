import { Gavel, Square, SquareX } from "lucide-react";

type Props = {
  count: number;
  className?: string;
};

export default function SuspicionDisplay({ className, count }: Props) {
  return (
    <span className="flex items-center gap-2">
      {Array.from({ length: 7 }).map((_, i) =>
        i < count ? (
          <SquareX key={i} className={className} />
        ) : (
          <Square key={i} className={className} />
        ),
      )}
      {count === 7 && <Gavel />}
    </span>
  );
}
