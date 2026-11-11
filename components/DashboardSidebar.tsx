"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { authClient } from "@/lib/auth-client"

import {
  LayoutDashboard,
  Briefcase,
  Bookmark,
  FileText,
  Wallet,
  Settings,
  Building2,
  PlusCircle,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menus = {
  seeker: [
    { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { name: "Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
    { name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
    {
      name: "My Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    { name: "Billing", url: "/dashboard/seeker/billing", icon: Wallet },
    { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],

  recruiter: [
    { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    {
      name: "My Company",
      url: "/dashboard/recruiter/my-company",
      icon: Building2,
    },
    { name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
    { name: "Add Job", url: "/dashboard/recruiter/jobs/new", icon: PlusCircle },
    {
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],

  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", url: "/dashboard/admin/users", icon: Users },
    { name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { name: "Payments", url: "/dashboard/admin/payments", icon: Wallet },
    { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session } = authClient.useSession()

  const role = session?.user?.role as keyof typeof menus
  const menuItems = menus[role] || menus.seeker

  return (
    <Sidebar className="!border-r !border-[#263B55] !bg-[#101B2B] !text-white">
      <SidebarHeader className="!border-b !border-[#263B55] !bg-[#101B2B] px-5 py-7">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white">
          HireLoop<span className="text-blue-400">.</span>
        </Link>

        <p className="mt-1 text-xs text-slate-400 capitalize">
          {role || "seeker"} workspace
        </p>
      </SidebarHeader>

 <SidebarContent className="!bg-[#101B2B] px-3 py-5">
  <p className="mb-4 px-3 text-[11px] font-bold tracking-[2px] text-slate-500">
    WORKSPACE
  </p>

  <SidebarMenu className="gap-2">
    {menuItems.map((item) => {
      const isActive = pathname === item.url;

      return (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton
            render={<Link href={item.url} />}
            isActive={isActive}
            className={`h-11 rounded-lg px-3 transition-all duration-200 ${
              isActive
                ? "!bg-blue-400 !text-white font-semibold shadow-md shadow-blue-950/30"
                : "!bg-transparent !text-slate-400 hover:!bg-[#1D3048] hover:!text-white"
            } [&_svg]:!text-current`}
          >
            <item.icon className="size-[18px]" />
            <span>{item.name}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    })}
  </SidebarMenu>
</SidebarContent>

      <SidebarFooter className="!border-t !border-[#263B55] !bg-[#101B2B] p-4">
        <div className="flex items-center gap-3 rounded-xl bg-[#1A2B40] p-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
            {session?.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {session?.user?.name || "User"}
            </p>

            <p className="text-xs text-slate-400 capitalize">
              {role || "seeker"}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
