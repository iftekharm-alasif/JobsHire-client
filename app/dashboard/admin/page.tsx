
import Link from "next/link";
import {
  Users,
  BriefcaseBusiness,
  UserCheck,
  UserRound,
  ArrowUpRight,
  ShieldCheck,
  Settings,
  Activity,
  Plus,
  Eye,
} from "lucide-react";

import { getUsers } from "@/lib/api/user";

export const dynamic = "force-dynamic";

const quickActions = [
  {
    title: "Manage Users",
    description: "View, update and manage accounts",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "Manage Jobs",
    description: "Review published job listings",
    href: "/dashboard/admin/jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "Platform Settings",
    description: "Manage platform preferences",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
];

export default async function AdminDashboard() {
  const result = await getUsers();

  const users = result.users || [];

  const totalUsers = users.length;

  const recruiters = users.filter(
    (user) => user.role === "recruiter",
  ).length;

  const seekers = users.filter(
    (user) => user.role === "seeker",
  ).length;

  const admins = users.filter(
    (user) => user.role === "admin",
  ).length;

  const activeUsers = users.filter(
    (user) => !user.banned,
  ).length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      description: "Registered accounts",
      icon: Users,
      color: "bg-blue-500/10 text-blue-400",
    },
    {
      title: "Recruiters",
      value: recruiters,
      description: "Hiring professionals",
      icon: BriefcaseBusiness,
      color: "bg-violet-500/10 text-violet-400",
    },
    {
      title: "Job Seekers",
      value: seekers,
      description: "Looking for opportunities",
      icon: UserRound,
      color: "bg-emerald-500/10 text-emerald-400",
    },
    {
      title: "Administrators",
      value: admins,
      description: "Platform administrators",
      icon: UserCheck,
      color: "bg-amber-500/10 text-amber-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-indigo-400">
            <ShieldCheck size={17} />
            <span className="font-medium">Administrator Panel</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Dashboard Overview
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Welcome back! Here's what's happening on HireLoop today.
          </p>
        </div>

        <Link
          href="/dashboard/admin/users"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <Users size={17} />
          Manage Users
          <ArrowUpRight size={16} />
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-400">
                  {stat.title}
                </p>

                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={21} />
                </div>
              </div>

              <h2 className="mt-5 text-3xl font-bold text-white">
                {stat.value}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Platform Overview */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                Platform Overview
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Your platform at a glance
              </p>
            </div>

            <Activity className="text-indigo-400" size={22} />
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-500/10 p-2.5 text-blue-400">
                  <Users size={20} />
                </div>
                <span className="text-sm text-slate-400">
                  Community
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-white">
                {totalUsers}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Total registered members
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-500/10 p-2.5 text-emerald-400">
                  <BriefcaseBusiness size={20} />
                </div>
                <span className="text-sm text-slate-400">
                  Active Members
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-white">
                {activeUsers}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Users without suspension
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck
                className="mt-0.5 shrink-0 text-indigo-400"
                size={21}
              />

              <div>
                <h3 className="font-semibold text-white">
                  Keep HireLoop Secure
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Monitor user accounts, manage platform access and keep an eye
                  on suspicious activities from your admin panel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-white">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Manage your platform easily
          </p>

          <div className="mt-6 space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group flex items-center gap-3 rounded-xl border border-slate-800 p-4 transition hover:border-indigo-500/50 hover:bg-indigo-500/10"
                >
                  <div className="rounded-lg bg-indigo-500/10 p-2.5 text-indigo-400">
                    <Icon size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-white">
                      {action.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {action.description}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="text-slate-500 transition group-hover:text-indigo-400"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-500/10 p-3 text-violet-400">
              <UserCheck size={22} />
            </div>

            <div>
              <h3 className="font-bold text-white">
                User Management
              </h3>

              <p className="text-sm text-slate-400">
                Control platform members and permissions.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/admin/users"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 transition hover:text-indigo-300"
          >
            View all users <Eye size={16} />
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
              <Plus size={22} />
            </div>

            <div>
              <h3 className="font-bold text-white">
                Grow HireLoop
              </h3>

              <p className="text-sm text-slate-400">
                Keep the hiring community organized and growing.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/admin/users"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 transition hover:text-indigo-300"
          >
            Manage community <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
