import type { AccountStatus } from "../schemas/user";
import type { OrgNode, OrgNodeType } from "../org";
import type { RoleCategory, RoleDoc } from "../permissions";
import type { UserRole } from "../roles";
import type { ApprovalStatus } from "../profile";

/** Directory row shared by admin list and agency member list. */
export type DirectoryUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoUrl: string | null;
  role: UserRole;
  isAnonymous?: boolean;
  profileCompleted?: boolean;
  npn: string | null;
  agency: string | null;
  orgNodeId: string | null;
  profileBadge?: {
    enabled: boolean;
    text: string;
    icon: string;
    color: string;
  } | null;
  accountStatus: AccountStatus;
  approvalStatus?: ApprovalStatus;
  createdAt?: number | null;
};

export type DirectoryUserFilters = {
  role?: UserRole | "";
  approvalStatus?: string;
  accountStatus?: string;
  orgNodeId?: string;
  query?: string;
  pageSize?: number;
  pageToken?: string | null;
  /** @deprecated use pageSize */
  limit?: number;
};

export type ListDirectoryUsersResult = {
  users: DirectoryUser[];
  nextPageToken: string | null;
};

export type BulkFailure = {
  id: string;
  code: string;
  message: string;
};

export type BulkResult = {
  ok: boolean;
  succeeded: string[];
  failed: BulkFailure[];
};

/** Read-oriented directory listing (admin + filters). */
export type UserDirectoryPort = {
  listUsers: (
    filters?: DirectoryUserFilters,
  ) => Promise<ListDirectoryUsersResult>;
};

/** Admin mutations for users (role, approval, account, org attach). */
export type UserAdminPort = {
  setUserRole: (uid: string, role: UserRole | string) => Promise<void>;
  setUserApproval: (uid: string, status: ApprovalStatus) => Promise<void>;
  createUser: (input: {
    email: string;
    password: string;
    displayName?: string;
    role?: UserRole | string;
    orgNodeId?: string | null;
    npn?: string | null;
    approvalStatus?: ApprovalStatus;
  }) => Promise<DirectoryUser | null>;
  updateUser: (input: {
    uid: string;
    email?: string;
    displayName?: string;
    role?: UserRole | string;
    orgNodeId?: string | null;
    npn?: string | null;
    approvalStatus?: ApprovalStatus;
    profileBadge?: {
      enabled: boolean;
      text: string;
      icon: string;
      color: string;
    } | null;
  }) => Promise<DirectoryUser | null>;
  deactivateUser: (uid: string) => Promise<void>;
  reactivateUser: (uid: string) => Promise<void>;
  bulkSetUserApproval: (
    uids: string[],
    status: ApprovalStatus,
  ) => Promise<BulkResult>;
  bulkSetUserAccountStatus: (
    uids: string[],
    status: "active" | "deactivated",
  ) => Promise<BulkResult>;
  bulkSetUserRole: (uids: string[], role: string) => Promise<BulkResult>;
  bulkAssignUsersToOrgNode: (
    uids: string[],
    orgNodeId: string | null,
  ) => Promise<BulkResult>;
  assignUserToOrgNode: (
    uid: string,
    orgNodeId: string | null,
  ) => Promise<void>;
};

export type ListOrgNodesResult = {
  agencies: OrgNode[];
  nextPageToken: string | null;
};

export type OrgPort = {
  listOrgSubtree: (
    parentId?: string | null,
    opts?: { full?: boolean; includeInactive?: boolean },
  ) => Promise<OrgNode[]>;
  listAgencies: (opts?: {
    pageSize?: number;
    pageToken?: string | null;
    query?: string;
    includeInactive?: boolean;
  }) => Promise<ListOrgNodesResult>;
  listOrgNodesByType: (
    type: OrgNodeType,
    pageSize?: number,
  ) => Promise<OrgNode[]>;
  ensureOrgRoot: () => Promise<OrgNode | null>;
  createOrgNode: (input: {
    name: string;
    type: OrgNodeType;
    parentId: string;
    logoUrl?: string | null;
    ownerUids?: string[];
    email?: string | null;
    paymentsEmail?: string | null;
    npn?: string | null;
    agencyLicense?: string | null;
    ein?: string | null;
  }) => Promise<OrgNode | null>;
  updateOrgNode: (input: {
    id: string;
    name?: string;
    active?: boolean;
    managerUids?: string[];
    logoUrl?: string | null;
    ownerUids?: string[];
    email?: string | null;
    paymentsEmail?: string | null;
    npn?: string | null;
    agencyLicense?: string | null;
    ein?: string | null;
  }) => Promise<OrgNode | null>;
  assignUserToOrgNode: (
    uid: string,
    orgNodeId: string | null,
  ) => Promise<void>;
  bulkSetOrgNodesActive: (
    ids: string[],
    active: boolean,
  ) => Promise<BulkResult>;
};

export type ListRolesFilters = {
  category?: RoleCategory | "";
  includeInactive?: boolean;
  includeSystem?: boolean;
};

export type ListRolesResult = {
  roles: RoleDoc[];
};

export type RolesPort = {
  listRoles: (filters?: ListRolesFilters) => Promise<ListRolesResult>;
  createRole: (input: {
    id: string;
    name: string;
    description?: string;
    category?: RoleCategory;
    permissions?: string[];
    sortOrder?: number;
    badgeText?: string | null;
    badgeIcon?: string | null;
    badgeColor?: string | null;
  }) => Promise<RoleDoc | null>;
  updateRole: (input: {
    id: string;
    name?: string;
    description?: string;
    category?: RoleCategory;
    permissions?: string[];
    active?: boolean;
    sortOrder?: number;
    badgeText?: string | null;
    badgeIcon?: string | null;
    badgeColor?: string | null;
  }) => Promise<RoleDoc | null>;
  deleteRole: (id: string, hard?: boolean) => Promise<void>;
  seedSystemRoles: () => Promise<ListRolesResult>;
};
