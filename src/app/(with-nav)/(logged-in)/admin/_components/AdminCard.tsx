import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { ReactNode } from "react";

type Props = {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
};

export default function AdminCard({ title, icon, children }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {icon} {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
