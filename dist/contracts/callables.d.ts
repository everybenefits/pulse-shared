/**
 * Stable Gen2 callable names for the User / Org / Roles slice.
 * Prefer `@everybenefits/client` over invoking these directly.
 */
export declare const USER_ORG_ROLES_CALLABLES: {
    readonly listUsersForAdmin: "listUsersForAdmin";
    readonly createUserForAdmin: "createUserForAdmin";
    readonly updateUserForAdmin: "updateUserForAdmin";
    readonly adminDeactivateUser: "adminDeactivateUser";
    readonly adminReactivateUser: "adminReactivateUser";
    readonly bulkSetUserApproval: "bulkSetUserApproval";
    readonly bulkSetUserAccountStatus: "bulkSetUserAccountStatus";
    readonly bulkSetUserRole: "bulkSetUserRole";
    readonly bulkAssignUsersToOrgNode: "bulkAssignUsersToOrgNode";
    readonly setUserRole: "setUserRole";
    readonly setUserApproval: "setUserApproval";
    readonly assignUserToOrgNode: "assignUserToOrgNode";
    readonly listOrgSubtree: "listOrgSubtree";
    readonly listAgenciesForAdmin: "listAgenciesForAdmin";
    readonly listOrgNodesByType: "listOrgNodesByType";
    readonly ensureOrgRoot: "ensureOrgRoot";
    readonly createOrgNode: "createOrgNode";
    readonly updateOrgNode: "updateOrgNode";
    readonly bulkSetOrgNodesActive: "bulkSetOrgNodesActive";
    readonly listRoles: "listRoles";
    readonly createRole: "createRole";
    readonly updateRole: "updateRole";
    readonly deleteRole: "deleteRole";
    readonly seedSystemRoles: "seedSystemRoles";
    readonly listOwnedAgencies: "listOwnedAgencies";
    readonly getOwnedAgency: "getOwnedAgency";
    readonly getAgencyWorkspace: "getAgencyWorkspace";
    readonly listOwnedOrgSubtree: "listOwnedOrgSubtree";
    readonly listManagedAssigniableNodes: "listManagedAssigniableNodes";
    readonly updateOwnedAgency: "updateOwnedAgency";
    readonly createOwnedSubAgency: "createOwnedSubAgency";
    readonly listAgencyMembers: "listAgencyMembers";
    readonly assignMemberToOrgNode: "assignMemberToOrgNode";
};
export type UserOrgRolesCallableName = (typeof USER_ORG_ROLES_CALLABLES)[keyof typeof USER_ORG_ROLES_CALLABLES];
export type SetUserRoleRequest = {
    uid: string;
    role: string;
};
export type SetUserApprovalRequest = {
    uid: string;
    status: "pending" | "approved" | "rejected";
};
export type AssignUserToOrgNodeRequest = {
    uid: string;
    orgNodeId: string | null;
};
export type BulkIdsRequest = {
    uids: string[];
};
export type BulkSetUserApprovalRequest = BulkIdsRequest & {
    status: "pending" | "approved" | "rejected";
};
export type BulkSetUserAccountStatusRequest = BulkIdsRequest & {
    status: "active" | "deactivated";
};
export type BulkSetUserRoleRequest = BulkIdsRequest & {
    role: string;
};
export type BulkAssignUsersToOrgNodeRequest = BulkIdsRequest & {
    orgNodeId: string | null;
};
export type DeleteRoleRequest = {
    id: string;
    hard?: boolean;
};
//# sourceMappingURL=callables.d.ts.map