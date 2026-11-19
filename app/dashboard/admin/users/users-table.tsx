
"use client";

import { useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
  banned?: boolean;
  createdAt?: string | Date;
};

export default function UsersTable({
  initialUsers,
}: {
  initialUsers: User[];
}) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loadingId, setLoadingId] = useState("");
  const [deleteUserData, setDeleteUserData] = useState<User | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !user.banned) ||
        (filter === "banned" && user.banned) ||
        user.role === filter;

      return matchesSearch && matchesFilter;
    });
  }, [users, search, filter]);

  const changeRole = async (userId: string, role: string) => {
    if (!confirm(`Change this user's role to ${role}?`)) return;

    setLoadingId(userId);

    try {
      const { error } = await authClient.admin.setRole({
        userId,
        role: role as "admin" | "recruiter" | "seeker",
      });

      if (error) throw new Error(error.message);

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role } : user,
        ),
      );

      toast.success("User role updated successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update role.",
      );
    } finally {
      setLoadingId("");
    }
  };

  const toggleBan = async (user: User) => {
    setLoadingId(user.id);

    try {
      if (user.banned) {
        const { error } = await authClient.admin.unbanUser({
          userId: user.id,
        });

        if (error) throw new Error(error.message);
      } else {
        const { error } = await authClient.admin.banUser({
          userId: user.id,
          banReason: "Suspended by administrator",
        });

        if (error) throw new Error(error.message);
      }

      setUsers((prev) =>
        prev.map((item) =>
          item.id === user.id
            ? { ...item, banned: !user.banned }
            : item,
        ),
      );

      toast.success(user.banned ? "User activated." : "User suspended.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Action failed.",
      );
    } finally {
      setLoadingId("");
    }
  };

  const deleteUser = async (user: User) => {
    setLoadingId(user.id);

    try {
      const { error } = await authClient.admin.removeUser({
        userId: user.id,
      });

      if (error) throw new Error(error.message);

      setUsers((prev) => prev.filter((item) => item.id !== user.id));
      setDeleteUserData(null);

      toast.success("User deleted successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete user.",
      );
    } finally {
      setLoadingId("");
    }
  };

  const filters = [
    { label: "All Users", value: "all" },
    { label: "Active", value: "active" },
    { label: "Suspended", value: "banned" },
    { label: "Admin", value: "admin" },
    { label: "Seeker", value: "seeker" },
    { label: "Recruiter", value: "recruiter" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <p className="mt-2 text-sm text-slate-400">
          View and manage all HireLoop accounts.
        </p>
      </div>

      {/* User Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Total Users</p>
          <h2 className="mt-2 text-3xl font-bold">{users.length}</h2>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Recruiters</p>
          <h2 className="mt-2 text-3xl font-bold">
            {users.filter((user) => user.role === "recruiter").length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Job Seekers</p>
          <h2 className="mt-2 text-3xl font-bold">
            {users.filter((user) => user.role === "seeker").length}
          </h2>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="mb-5 h-11 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 text-sm outline-none focus:border-indigo-500"
        />

        {/* Filters */}
        <div className="mb-5 flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value)}
              className={`rounded-lg px-4 py-2 text-sm transition ${
                filter === item.value
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-700 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="border-b border-slate-800 text-slate-400">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Joined</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-800/70">
                  <td className="p-3">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </td>

                  <td className="p-3">
                    <select
                      value={user.role || "seeker"}
                      disabled={loadingId === user.id}
                      onChange={(e) => changeRole(user.id, e.target.value)}
                      className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-2"
                    >
                      <option value="seeker">Seeker</option>
                      <option value="recruiter">Recruiter</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  <td className="p-3">
                    <span
                      className={
                        user.banned
                          ? "rounded-full bg-red-500/10 px-3 py-1 text-red-400"
                          : "rounded-full bg-green-500/10 px-3 py-1 text-green-400"
                      }
                    >
                      {user.banned ? "Suspended" : "Active"}
                    </span>
                  </td>

                  <td className="p-3 text-slate-400">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        disabled={loadingId === user.id}
                        onClick={() => toggleBan(user)}
                        className="rounded-lg border border-slate-700 px-3 py-2 hover:bg-slate-800 disabled:opacity-50"
                      >
                        {user.banned ? "Unban" : "Ban"}
                      </button>

                      <button
                        disabled={loadingId === user.id}
                        onClick={() => setDeleteUserData(user)}
                        className="rounded-lg bg-red-600/10 px-3 py-2 text-red-400 hover:bg-red-600/20 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteUserData}
        onOpenChange={(open) => {
          if (!open && !loadingId) {
            setDeleteUserData(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete{" "}
              <strong>{deleteUserData?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={!!loadingId}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={!!loadingId}
              onClick={(e) => {
                e.preventDefault();

                if (deleteUserData) {
                  deleteUser(deleteUserData);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              {loadingId ? "Deleting..." : "Delete User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
