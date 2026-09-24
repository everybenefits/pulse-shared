/**
 * Stable Gen2 callable names for the User / Org / Roles slice.
 * Prefer `@everybenefits/client` over invoking these directly.
 */
export const USER_ORG_ROLES_CALLABLES = {
  listUsersForAdmin: "listUsersForAdmin",
  adminCreateUser: "adminCreateUser",
  adminUpdateUser: "adminUpdateUser",
  adminDeactivateUser: "adminDeactivateUser",
  adminReactivateUser: "adminReactivateUser",
  bulkSetUserApproval: "bulkSetUserApproval",
  bulkSetUserAccountStatus: "bulkSetUserAccountStatus",
  bulkSetUserRole: "bulkSetUserRole",
  bulkAssignUsersToOrgNode: "bulkAssignUsersToOrgNode",
  setUserRole: "setUserRole",
  setUserApproval: "setUserApproval",
  assignUserToOrgNode: "assignUserToOrgNode",
  listOrgSubtree: "listOrgSubtree",
  listAgenciesForAdmin: "listAgenciesForAdmin",
  listOrgNodesByType: "listOrgNodesByType",
  ensureOrgRoot: "ensureOrgRoot",
  createOrgNode: "createOrgNode",
  updateOrgNode: "updateOrgNode",
  bulkSetOrgNodesActive: "bulkSetOrgNodesActive",
  listRoles: "listRoles",
  createRole: "createRole",
  updateRole: "updateRole",
  deleteRole: "deleteRole",
  seedSystemRoles: "seedSystemRoles",
  listOwnedAgencies: "listOwnedAgencies",
  getOwnedAgency: "getOwnedAgency",
  getAgencyWorkspace: "getAgencyWorkspace",
  listOwnedOrgSubtree: "listOwnedOrgSubtree",
  listManagedAssigniableNodes: "listManagedAssigniableNodes",
  updateOwnedAgency: "updateOwnedAgency",
  createOwnedSubAgency: "createOwnedSubAgency",
  listAgencyMembers: "listAgencyMembers",
  assignMemberToOrgNode: "assignMemberToOrgNode",
} as const;

export type UserOrgRolesCallableName =
  (typeof USER_ORG_ROLES_CALLABLES)[keyof typeof USER_ORG_ROLES_CALLABLES];

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
