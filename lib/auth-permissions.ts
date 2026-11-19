import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements,
  adminAc,
} from "better-auth/plugins/admin/access";

export const ac = createAccessControl(defaultStatements);

export const adminRole = ac.newRole({
  ...adminAc.statements,
});

export const seekerRole = ac.newRole({
  user: [],
  session: [],
});

export const recruiterRole = ac.newRole({
  user: [],
  session: [],
});

export const roles = {
  admin: adminRole,
  seeker: seekerRole,
  recruiter: recruiterRole,
};