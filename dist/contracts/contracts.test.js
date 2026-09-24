"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_1 = require("./index");
(0, vitest_1.describe)("USER_ORG_ROLES_CALLABLES", () => {
    (0, vitest_1.it)("exposes stable setUserRole / setUserApproval names", () => {
        (0, vitest_1.expect)(index_1.USER_ORG_ROLES_CALLABLES.setUserRole).toBe("setUserRole");
        (0, vitest_1.expect)(index_1.USER_ORG_ROLES_CALLABLES.setUserApproval).toBe("setUserApproval");
        (0, vitest_1.expect)(index_1.USER_ORG_ROLES_CALLABLES.assignUserToOrgNode).toBe("assignUserToOrgNode");
    });
    (0, vitest_1.it)("has unique callable name values", () => {
        const values = Object.values(index_1.USER_ORG_ROLES_CALLABLES);
        (0, vitest_1.expect)(new Set(values).size).toBe(values.length);
    });
});
(0, vitest_1.describe)("port shapes", () => {
    (0, vitest_1.it)("UserDirectoryPort / UserAdminPort / OrgPort / RolesPort are assignable stubs", () => {
        const directory = {
            listUsers: async () => ({ users: [], nextPageToken: null }),
        };
        const admin = {
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
        const org = {
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
        const roles = {
            listRoles: async () => ({ roles: [] }),
            createRole: async () => null,
            updateRole: async () => null,
            deleteRole: async () => undefined,
            seedSystemRoles: async () => ({ roles: [] }),
        };
        (0, vitest_1.expect)(directory.listUsers).toBeTypeOf("function");
        (0, vitest_1.expect)(admin.setUserRole).toBeTypeOf("function");
        (0, vitest_1.expect)(org.listOrgSubtree).toBeTypeOf("function");
        (0, vitest_1.expect)(roles.listRoles).toBeTypeOf("function");
    });
});
