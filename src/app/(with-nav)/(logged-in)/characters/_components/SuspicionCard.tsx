"use client";

import SuspicionDisplay from "~/components/SuspicionDisplay";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { Target } from "lucide-react";

export default function SuspicionCard() {
  const [isMounted, setIsMounted] = useState(false);
  const count = api.suspicion.count.useQuery();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Card className="w-full sm:w-sm">
      <CardHeader>
        <CardTitle>Suspicion</CardTitle>
        <CardDescription>Get to 7 and it is game over.</CardDescription>
        <CardAction>
          <Target />
        </CardAction>
      </CardHeader>
      <CardContent>
        <SuspicionDisplay count={count.data ?? 0} />
      </CardContent>
    </Card>
  );
}
