import { input, util } from "@prismatic-io/spectral";

export const showInactiveUsersInput = input({
  label: "Show Inactive Users",
  type: "boolean",
  required: false,
  comments: "When true, includes inactive users in the results.",
  clean: util.types.toBool,
});
