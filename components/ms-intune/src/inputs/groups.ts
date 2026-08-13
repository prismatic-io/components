import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanBooleanStringInput, cleanStringInput } from "../util";
import { bodyFields, connection, fetchAll, odataGroupParams } from "./common";
import { groupId } from "./mobileApps";
const assignedLabels = input({
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
const description = input({
  label: "Description",
  type: "string",
  comments:
    "A text summary of the group's purpose, visible to members and administrators.",
  example: "Self help community for library",
  placeholder: "Enter group description",
  clean: cleanStringInput,
});
const displayName = input({
  label: "Display Name",
  type: "string",
  comments: "The name to display in the address book for the group.",
  example: "Library Assist",
  placeholder: "Enter group display name",
  required: true,
  clean: cleanStringInput,
});
const mailNickname = input({
  label: "Mail Nickname",
  type: "string",
  comments:
    "The mail alias for the group, unique for Microsoft 365 groups in the organization.",
  example: "library",
  placeholder: "Enter mail nickname",
  required: true,
  clean: cleanStringInput,
});
const securityEnabled = input({
  label: "Security Enabled",
  type: "boolean",
  comments:
    "When true, creates a security group. Security groups are used to control access to resources.",
  required: true,
  clean: util.types.toBool,
});
const visibility = input({
  label: "Visibility",
  type: "string",
  comments:
    "Specifies the visibility of the group. Possible values are Private, Public, or Hiddenmembership.",
  example: "Public",
  placeholder: "Enter visibility level",
  clean: cleanStringInput,
});
const mailEnabled = input({
  label: "Mail Enabled",
  type: "boolean",
  comments:
    "When true, creates a mail-enabled group that can receive email messages.",
  required: true,
  clean: util.types.toBool,
});
const createAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments: "Less common group properties.",
  inputs: { description, assignedLabels, visibility },
});
export const createGroupInputs = {
  connection,
  displayName,
  mailNickname,
  securityEnabled,
  mailEnabled,
  additionalFields: createAdditionalFields,
  bodyFields,
};
export const deleteGroupInputs = {
  connection,
  groupId: {
    ...groupId,
    comments: "The unique identifier of the group to delete.",
  },
};
export const getGroupInputs = {
  connection,
  groupId: {
    ...groupId,
    comments: "The unique identifier of the group to retrieve.",
  },
};
const listFilters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments: "Optional query controls to sort and refine the results.",
  inputs: {
    $count: odataGroupParams.$count,
    $expand: odataGroupParams.$expand,
    $filter: odataGroupParams.$filter,
    $orderBy: odataGroupParams.$orderBy,
    $search: odataGroupParams.$search,
    $select: odataGroupParams.$select,
  },
});
export const listGroupsInputs = {
  connection,
  fetchAll,
  $top: odataGroupParams.$top,
  filters: listFilters,
};
const updateAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments: "Less common group properties.",
  inputs: { description, assignedLabels, visibility },
});
export const updateGroupInputs = {
  connection,
  groupId: {
    ...groupId,
    comments: "The unique identifier of the group to update.",
  },
  displayName: {
    ...displayName,
    required: false,
  },
  mailNickname: {
    ...mailNickname,
    required: false,
  },
  securityEnabled: input({
    label: "Security Enabled",
    type: "string",
    comments:
      "Set to true for mail-enabled groups. If Not Set the input will not be included in the request.",
    required: false,
    model: [
      {
        label: "True",
        value: "true",
      },
      {
        label: "False",
        value: "false",
      },
      {
        label: "Not Set",
        value: "",
      },
    ],
    default: "",
    clean: cleanBooleanStringInput,
  }),
  additionalFields: updateAdditionalFields,
  bodyFields,
};
