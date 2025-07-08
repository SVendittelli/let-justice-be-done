import { Gavel, Square, SquareX } from "lucide-react";

type Props = {
  count: number;
};

export default function SuspicionDisplay({ count }: Props) {
  return (
    <span className="flex items-center gap-2">
      {Array.from({ length: 7 }).map((_, i) =>
        i < count ? <SquareX key={i} /> : <Square key={i} />,
      )}
      {count === 7 && <Gavel />}
    </span>
  );
}
