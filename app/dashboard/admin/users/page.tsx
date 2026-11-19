import { getUsers } from "@/lib/api/user";
import UsersTable from "./users-table";

const AdminUsersPage = async () => {
  const result = await getUsers();
  const users = result.users || [];

  return <UsersTable initialUsers={users} />;
};

export default AdminUsersPage;