
"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { DashboardSidebar } from "@/components/DashboardSidebar";

const DashBoardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session, isPending } = authClient.useSession();

  const router = useRouter();
  const pathname = usePathname();

  const role = session?.user?.role;

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/sign-in");
      return;
    }

    if (
      role &&
      !["admin", "recruiter", "seeker"].includes(role)
    ) {
      router.replace("/");
      return;
    }

    if (role && pathname !== `/dashboard/${role}` &&
        !pathname.startsWith(`/dashboard/${role}/`)) {
      router.replace(`/dashboard/${role}`);
    }
  }, [session, isPending, role, pathname, router]);

  if (isPending || !session?.user || !role) {
    return <div className="p-5">Loading Dashboard...</div>;
  }

  if (
    pathname !== `/dashboard/${role}` &&
    !pathname.startsWith(`/dashboard/${role}/`)
  ) {
    return <div className="p-5">Redirecting...</div>;
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />

      <main className="flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashBoardLayout;
