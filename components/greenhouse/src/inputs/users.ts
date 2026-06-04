import { input, util } from "@prismatic-io/spectral";

const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};

export const user_attributes = input({
  label: "Include User Attributes",
  type: "boolean",
  required: false,
  comments: "When true, includes user attributes in the response.",
  clean: util.types.toBool,
  default: "false",
});

export const send_email_invite = input({
  label: "Send Email Invite",
  type: "boolean",
  required: true,
  comments:
    "When true, an email is sent to the user alerting them of any new job permissions that have been assigned to them. Emails are never sent when permissions are removed.",
  clean: util.types.toBool,
});

export const employee_id = input({
  label: "Employee ID",
  type: "string",
  required: false,
  comments: "The external employee identifier for the user.",
  placeholder: "Enter employee ID",
  example: "12345",
  clean: cleanString,
});
