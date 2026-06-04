import { input, util } from "@prismatic-io/spectral";

const userId = input({
  label: "User Id",
  comments:
    "Unique Identifier for the user to reprocess the license assignment. This can be the user's id or userPrincipalName.",
  example: "d36894ae-94ae-d368-ae94-68d3ae9468d3",
  placeholder: "Enter user ID or principal name",
  type: "string",
  required: true,
  clean: util.types.toString,
});

export const reprocessLicenseAssignmentInputs = {
  userId,
};
