"use client";

import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { UserForm } from "./UserForm";

export default function UserManager() {
  const [isClient, setIsClient] = useState(false);

  const users = api.users.getAll.useQuery();
  const update = api.users.bulkEnable.useMutation();

  useEffect(() => {
    setIsClient(true);
  }, [setIsClient]);

  if (!isClient || !users.data) {
    return null;
  }

  const handleUpdate = (data: { ids: string[] }) => update.mutate(data);

  return (
    <UserForm
      users={users.data.filter(({ role }) => role !== "ADMIN")}
      onSubmit={handleUpdate}
      isPending={update.isPending}
    />
  );
}
