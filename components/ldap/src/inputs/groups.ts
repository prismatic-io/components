import { input, util } from "@prismatic-io/spectral";

export const groupDn = input({
  label: "Group DN",
  type: "string",
  required: true,
  comments: "The DN of the group to remove the user from.",
  example: "cn=group,ou=groups,dc=example,dc=com",
  placeholder: "Enter group DN",
  clean: util.types.toString,
  dataSource: "selectGroup",
});

export const groupName = input({
  label: "Group Name",
  type: "string",
  required: true,
  comments: "The name of the group to add.",
  example: "New Group",
  placeholder: "Enter group name",
  clean: util.types.toString,
});

export const sAMAccountName = input({
  label: "sAMAccountName",
  type: "string",
  required: true,
  comments: "The sAMAccountName of the group to add.",
  example: "newgroup",
  placeholder: "Enter sAMAccountName",
  clean: util.types.toString,
});

export const groupType = input({
  label: "Group Type",
  type: "string",
  required: true,
  comments: "The type of group to add.",
  example: "-2147483646",
  placeholder: "Enter group type",
  clean: util.types.toString,
});
