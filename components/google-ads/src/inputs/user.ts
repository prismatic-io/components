import { input, util } from "@prismatic-io/spectral";
import { connectionInput, customerIdInput } from "./common";

const emailAddress = input({
  label: "Email Address",
  placeholder: "Enter email address",
  type: "string",
  required: true,
  example: "john.doe@example.com",
  comments: "The email address of the user to invite to the customer account.",
  clean: util.types.toString,
});

const accessRole = input({
  label: "Access Role",
  placeholder: "Enter access role",
  type: "string",
  required: true,
  comments:
    "The access role to grant to the user. See [Access roles documentation](https://developers.google.com/google-ads/api/reference/rpc/latest/AccessRoleEnum.AccessRole).",
  model: ["ADMIN", "STANDARD", "READ_ONLY", "EMAIL_ONLY"].map((role) => ({
    label: role,
    value: role,
  })),
  clean: util.types.toString,
});

export const inviteUserInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  emailAddress,
  accessRole,
};
