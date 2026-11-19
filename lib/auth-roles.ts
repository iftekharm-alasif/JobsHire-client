
import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements,
  adminAc,
} from "better-auth/plugins/admin/access";

export const ac = createAccessControl(defaultStatements);

export const adminRole = ac.newRole({
  ...adminAc.statements,
});

export const recruiterRole = ac.newRole({});
export const seekerRole = ac.newRole({});
export const userRole = ac.newRole({});

export const roles = {
  admin: adminRole,
  recruiter: recruiterRole,
  seeker: seekerRole,
  user: userRole,
};
