import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

export const allowExternalSenders = input({
  label: "Allow External Senders",
  type: "boolean",
  comments:
    "When true, allows people external to the organization to send messages to the group.",
  clean: util.types.toBool,
});

export const assignedLabels = input({
  label: "Assigned Labels",
  type: "code",
  language: "json",
  comments:
    "The list of sensitivity label pairs (label ID, label name) associated with a group",
  example: JSON.stringify(
    {
      displayName: "String",
      labelId: "String",
    },
    null,
    2,
  ),
  clean: cleanStringInput,
});

export const autoSubscribeNewMembers = input({
  label: "Auto Subscribe New Members",
  type: "boolean",
  comments:
    "When true, new members added to the group will be auto-subscribed to receive email notifications.",
  clean: util.types.toBool,
});

export const description = input({
  label: "Description",
  type: "string",
  comments: "A description for the group.",
  example: "Self help community for library",
  placeholder: "Enter group description",
  clean: cleanStringInput,
});

export const displayName = input({
  label: "Display Name",
  type: "string",
  comments: "The name to display in the address book for the group.",
  example: "Library Assist",
  placeholder: "Enter group display name",
  required: true,
  clean: cleanStringInput,
});

export const mailNickname = input({
  label: "Mail Nickname",
  type: "string",
  comments:
    "The mail alias for the group, unique for Microsoft 365 groups in the organization.",
  example: "library",
  placeholder: "Enter mail nickname",
  required: true,
  clean: cleanStringInput,
});

export const uniqueName = input({
  label: "Unique Name",
  type: "string",
  comments: "The unique display name for the group.",
  example: "The best group ever",
  placeholder: "Enter unique group name",
  clean: cleanStringInput,
});

export const securityEnabled = input({
  label: "Security Enabled",
  type: "boolean",
  comments:
    "When true, creates a security group. Security groups are used to control access to resources.",
  required: true,
  clean: util.types.toBool,
});

export const visibility = input({
  label: "Visibility",
  type: "string",
  comments:
    "Specifies the visibility of the group. Possible values are Private, Public, or Hiddenmembership.",
  example: "Public",
  placeholder: "Enter visibility level",
  clean: cleanStringInput,
});

export const mailEnabled = input({
  label: "Mail Enabled",
  type: "boolean",
  comments:
    "When true, creates a mail-enabled group that can receive email messages.",
  required: true,
  clean: util.types.toBool,
});
