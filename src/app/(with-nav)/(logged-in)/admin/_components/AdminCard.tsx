import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function AdminCard({ title, children }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
