import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { User } from "@prisma/client";

export function useUser(
  redirectTo: string | null = null,
  redirectIfFound = false
) {
  const { data: user, mutate: mutateUser } = useSWR<User>("/api/user");

  useEffect(() => {
    if (!redirectTo || !user) return;

    if (
      (redirectTo && !redirectIfFound && !user?.username) ||
      (redirectIfFound && user?.username)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
