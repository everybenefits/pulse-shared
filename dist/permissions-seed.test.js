"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const permissions_1 = require("./permissions");
(0, vitest_1.describe)("builtin role seed", () => {
    (0, vitest_1.it)("ships a document for every built-in role", () => {
        const docs = (0, permissions_1.builtinRoleSeedDocs)();
        (0, vitest_1.expect)(docs.map((doc) => doc.id)).toEqual([...permissions_1.BUILTIN_ROLE_IDS]);
        for (const doc of docs) {
            (0, vitest_1.expect)(doc.builtIn).toBe(true);
            (0, vitest_1.expect)(doc.active).toBe(true);
            (0, vitest_1.expect)(doc.permissions).toEqual([...permissions_1.DEFAULT_ROLE_PERMISSIONS[doc.id]]);
        }
    });
    (0, vitest_1.it)("gives system the full permission catalog", () => {
        const system = (0, permissions_1.builtinRoleSeedDocs)().find((doc) => doc.id === "system");
        (0, vitest_1.expect)(system?.permissions).toEqual([...permissions_1.ALL_PERMISSION_KEYS]);
    });
    (0, vitest_1.it)("adds newly shipped keys without dropping extras", () => {
        (0, vitest_1.expect)((0, permissions_1.mergeBuiltinRolePermissions)("agent", ["forums.participate", "custom.extra"])).toEqual(vitest_1.expect.arrayContaining([
            "forums.participate",
            "custom.extra",
            "apps.web.access",
            "chats.participate",
        ]));
    });
    (0, vitest_1.it)("fills empty built-in docs from product defaults", () => {
        (0, vitest_1.expect)((0, permissions_1.mergeBuiltinRolePermissions)("student", [])).toEqual([
            ...permissions_1.DEFAULT_ROLE_PERMISSIONS.student,
        ]);
        (0, vitest_1.expect)((0, permissions_1.mergeBuiltinRolePermissions)("student", null)).toEqual([
            ...permissions_1.DEFAULT_ROLE_PERMISSIONS.student,
        ]);
    });
    (0, vitest_1.it)("resets system to the live catalog", () => {
        (0, vitest_1.expect)((0, permissions_1.mergeBuiltinRolePermissions)("system", ["admin.access"])).toEqual([
            ...permissions_1.ALL_PERMISSION_KEYS,
        ]);
    });
    (0, vitest_1.it)("keeps a stable version fingerprint for the same catalog", () => {
        (0, vitest_1.expect)((0, permissions_1.builtinRoleSeedVersion)()).toBe((0, permissions_1.builtinRoleSeedVersion)());
        (0, vitest_1.expect)((0, permissions_1.builtinRoleSeedVersion)()).toMatch(/^[0-9a-f]{8}$/);
    });
});
