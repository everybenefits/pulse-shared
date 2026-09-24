"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ORG_ROLES_CALLABLES = void 0;
/**
 * Stable Gen2 callable names for the User / Org / Roles slice.
 * Prefer `@everybenefits/client` over invoking these directly.
 */
exports.USER_ORG_ROLES_CALLABLES = {
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
};
