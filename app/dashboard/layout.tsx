
"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
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

    if (role && !["admin", "recruiter", "seeker"].includes(role)) {
      router.replace("/");
      return;
    }

    if (
      role &&
      pathname !== `/dashboard/${role}` &&
      !pathname.startsWith(`/dashboard/${role}/`)
    ) {
      router.replace(`/dashboard/${role}`);
    }
  }, [session, isPending, role, pathname, router]);

  if (isPending || !session?.user || !role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#101B2B] text-slate-300">
        Loading Dashboard...
      </div>
    );
  }

  if (
    pathname !== `/dashboard/${role}` &&
    !pathname.startsWith(`/dashboard/${role}/`)
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#101B2B] text-slate-300">
        Redirecting...
      </div>
    );
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-background": "#101B2B",
        "--sidebar-foreground": "#F8FAFC",
        "--sidebar-border": "#263B55",
      } as React.CSSProperties}
    >
      <DashboardSidebar />

      <SidebarInset className="min-h-screen bg-[#101B2B] text-white">
        <header className="flex h-14 items-center border-b border-[#263B55] bg-[#101B2B] px-4">
          <SidebarTrigger className="text-slate-300 hover:bg-[#1D3048] hover:text-white" />
        </header>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashBoardLayout;
