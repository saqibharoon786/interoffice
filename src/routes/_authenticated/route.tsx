import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getDummySession, type SessionUser } from "@/lib/dummy-auth";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async (): Promise<{ user: SessionUser }> => {
    const user = getDummySession();
    if (!user) throw redirect({ to: "/auth" });
    return { user };
  },
  component: () => <Outlet />,
});
