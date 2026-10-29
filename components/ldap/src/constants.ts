export const CHANGES_EXAMPLE = [
  {
    operation: "replace",
    modification: {
      mail: "mail@example.org",
    },
  },
  {
    operation: "replace",
    modification: {
      userPassword: "newSecurePassword123",
    },
  },
] as const;

export const ATTRIBUTES_TO_ADD_EXAMPLE = {
  cn: "New User",
  sn: "User",
  uid: "newuser",
  mail: "newuser@example.com",
  objectClass: ["inetOrgPerson"],
} as const satisfies Record<string, string | readonly string[]>;
