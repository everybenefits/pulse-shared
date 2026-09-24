import { describe, expect, it } from "vitest";
import {
  USER_ORG_ROLES_CALLABLES,
  type UserAdminPort,
  type UserDirectoryPort,
  type OrgPort,
  type RolesPort,
} from "./index";

describe("USER_ORG_ROLES_CALLABLES", () => {
  it("exposes stable setUserRole / setUserApproval names", () => {
    expect(USER_ORG_ROLES_CALLABLES.setUserRole).toBe("setUserRole");
    expect(USER_ORG_ROLES_CALLABLES.setUserApproval).toBe("setUserApproval");
    expect(USER_ORG_ROLES_CALLABLES.assignUserToOrgNode).toBe(
      "assignUserToOrgNode",
    );
  });

  it("has unique callable name values", () => {
    const values = Object.values(USER_ORG_ROLES_CALLABLES);
    expect(new Set(values).size).toBe(values.length);
  });
});

describe("port shapes", () => {
  it("UserDirectoryPort / UserAdminPort / OrgPort / RolesPort are assignable stubs", () => {
    const directory: UserDirectoryPort = {
      listUsers: async () => ({ users: [], nextPageToken: null }),
    };
    const admin: UserAdminPort = {
      setUserRole: async () => undefined,
      setUserApproval: async () => undefined,
      createUser: async () => null,
      updateUser: async () => null,
      deactivateUser: async () => undefined,
      reactivateUser: async () => undefined,
      bulkSetUserApproval: async () => ({
        ok: true,
        succeeded: [],
        failed: [],
      }),
      bulkSetUserAccountStatus: async () => ({
        ok: true,
        succeeded: [],
        failed: [],
      }),
      bulkSetUserRole: async () => ({ ok: true, succeeded: [], failed: [] }),
      bulkAssignUsersToOrgNode: async () => ({
        ok: true,
        succeeded: [],
        failed: [],
      }),
      assignUserToOrgNode: async () => undefined,
    };
    const org: OrgPort = {
      listOrgSubtree: async () => [],
      listAgencies: async () => ({ agencies: [], nextPageToken: null }),
      listOrgNodesByType: async () => [],
      ensureOrgRoot: async () => null,
      createOrgNode: async () => null,
      updateOrgNode: async () => null,
      assignUserToOrgNode: async () => undefined,
      bulkSetOrgNodesActive: async () => ({
        ok: true,
        succeeded: [],
        failed: [],
      }),
    };
    const roles: RolesPort = {
      listRoles: async () => ({ roles: [] }),
      createRole: async () => null,
      updateRole: async () => null,
      deleteRole: async () => undefined,
      seedSystemRoles: async () => ({ roles: [] }),
    };

    expect(directory.listUsers).toBeTypeOf("function");
    expect(admin.setUserRole).toBeTypeOf("function");
    expect(org.listOrgSubtree).toBeTypeOf("function");
    expect(roles.listRoles).toBeTypeOf("function");
  });
});
