"use client";

import SuspicionDisplay from "~/components/SuspicionDisplay";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";

export default function Count() {
  const [isMounted, setIsMounted] = useState(false);

  const count = api.suspicion.count.useQuery();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <SuspicionDisplay className="size-10 sm:size-24" count={count.data ?? 0} />
  );
}
