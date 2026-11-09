"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
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
} from "lucide-react";

import {
Sidebar,
SidebarContent,
SidebarFooter,
SidebarHeader,
SidebarMenu,
SidebarMenuButton,
SidebarMenuItem,
} from "@/components/ui/sidebar";

const menus = {
seeker: [
{ name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
{ name: "Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
{ name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
{ name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
{ name: "Billing", url: "/dashboard/seeker/billing", icon: Wallet },
{ name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
],
recruiter: [
{ name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
{ name: "My Company", url: "/dashboard/recruiter/my-company", icon: Building2 },
{ name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
{ name: "Add Job", url: "/dashboard/recruiter/jobs/new", icon: PlusCircle },
{ name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
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
};

export function DashboardSidebar() {
const pathname = usePathname();
const { data: session } = authClient.useSession();

const role = session?.user?.role as keyof typeof menus;
const menuItems = menus[role] || menus.seeker;

return (
<Sidebar className="border-r bg-white">
<SidebarHeader className="px-5 py-6">
<Link href="/" className="text-2xl font-bold tracking-tight text-blue-600">
HireLoop<span className="text-slate-800">.</span>
</Link>
<p className="text-xs text-slate-500 capitalize">
{role || "seeker"} workspace
</p>
</SidebarHeader>

  <SidebarContent className="px-3 py-4">
    <p className="mb-3 px-3 text-xs font-semibold tracking-wider text-slate-400">
      WORKSPACE
    </p>

    <SidebarMenu className="gap-1">
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.url}
            className="h-10 rounded-lg px-3 text-slate-600 hover:bg-slate-100 hover:text-blue-600 data-[active=true]:bg-blue-50 data-[active=true]:font-semibold data-[active=true]:text-blue-600"
          >
            <Link href={item.url}>
              <item.icon className="size-4" />
              <span>{item.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  </SidebarContent>

  <SidebarFooter className="border-t p-4">
    <div className="flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
        {session?.user?.name?.charAt(0).toUpperCase() || "U"}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-800">
          {session?.user?.name || "User"}
        </p>
        <p className="text-xs capitalize text-slate-500">
          {role || "seeker"}
        </p>
      </div>
    </div>
  </SidebarFooter>
</Sidebar>

);
}