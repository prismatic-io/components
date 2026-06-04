import { input, util } from "@prismatic-io/spectral";
import { cleanBooleanInput, getOptionalBooleanModel } from "../util";
import {
  additionalProperties,
  connection,
  eventualConsistencyLevelHeader,
  getAllPaginatedResults,
  groupId,
  groupTypes,
  memberId,
  odataParams,
  uniqueName,
  useAsUpsert,
} from "./common";

const displayName = input({
  label: "Display Name",
  type: "string",
  required: true,
  comments: "The name to display in the address book for the group.",
  placeholder: "Enter display name",
  example: "Marketing Team",
  clean: util.types.toString,
});

const mailEnabled = input({
  label: "Mail Enabled",
  type: "boolean",
  required: true,
  default: "true",
  comments: "When true, the group is mail-enabled.",
  clean: util.types.toBool,
});

const mailNickname = input({
  label: "Mail Nickname",
  type: "string",
  required: true,
  comments:
    'The mail alias for the group, unique for Microsoft 365 groups in the organization. This property can contain only characters in the ASCII character set 0 - 127 except the following: @ () \\ [] " ; : <> , SPACE.',
  placeholder: "Enter mail nickname",
  example: "MarketingTeam",
  clean: util.types.toString,
});

const securityEnabled = input({
  label: "Security Enabled",
  type: "boolean",
  required: true,
  default: "true",
  comments:
    "When true, the group is security-enabled, including Microsoft 365 groups. Groups created using the Microsoft Entra admin center or the Azure portal always have securityEnabled initially set to true.",
  clean: util.types.toBool,
});

export const createGroupInputs = {
  connection,
  displayName,
  mailEnabled,
  mailNickname,
  securityEnabled,
  groupTypes,
  additionalProperties: input({
    ...additionalProperties,
    comments: `${additionalProperties.comments} See [Create Group API](https://learn.microsoft.com/en-us/graph/api/group-post-groups).`,
  }),
};

export const deleteGroupInputs = {
  connection,
  groupId: input({
    ...groupId,
    comments: "The ID of the group to delete.",
  }),
};

export const getGroupInputs = {
  connection,
  groupId,
  $select: odataParams.$select,
};

export const listGroupInputs = {
  connection,
  $count: odataParams.$count,
  $expand: odataParams.$expand,
  $filter: odataParams.$filter,
  $orderby: odataParams.$orderby,
  $search: odataParams.$search,
  $select: odataParams.$select,
  $top: odataParams.$top,
  getAllPaginatedResults,
  eventualConsistencyLevelHeader,
};

export const listGroupMembersInputs = {
  connection,
  groupId,
  $filter: odataParams.$filter,
  $count: odataParams.$count,
  $select: odataParams.$select,
  $search: odataParams.$search,
  $top: odataParams.$top,
  getAllPaginatedResults,
  $expand: odataParams.$expand,
  eventualConsistencyLevelHeader,
};

export const removeMemberOfGroupInputs = {
  connection,
  groupId: input({
    ...groupId,
    comments: "The ID of the group to remove the member from.",
  }),
  memberId: input({
    ...memberId,
    comments: "The ID of the member to remove from the group.",
  }),
};

const mailEnabledOptional = input({
  label: mailEnabled.label,
  comments: mailEnabled.comments,
  type: "string",
  required: false,
  model: getOptionalBooleanModel(),
  clean: cleanBooleanInput,
});

const securityEnabledOptional = input({
  label: securityEnabled.label,
  comments: securityEnabled.comments,
  type: "string",
  required: false,
  model: getOptionalBooleanModel(),
  clean: cleanBooleanInput,
});

export const upsertGroupInputs = {
  connection,
  uniqueName: input({
    ...uniqueName,
    comments: "The unique name of the group to update or create.",
    placeholder: "MarketingTeam",
    example: "MarketingTeam",
  }),
  useAsUpsert: input({
    ...useAsUpsert,
    comments:
      "When true, creates a new group if it does not exist. When false, only updates an existing group.",
  }),
  displayName: input({ ...displayName, required: false }),
  mailEnabled: mailEnabledOptional,
  mailNickname: input({ ...mailNickname, required: false }),
  securityEnabled: securityEnabledOptional,
  groupTypes,
  additionalProperties: input({
    ...additionalProperties,
    comments: `${additionalProperties.comments} See [Upsert Group API](https://learn.microsoft.com/en-us/graph/api/group-upsert).`,
  }),
};

const groupMemberOdataId = input({
  label: "Group Member OData ID",
  type: "string",
  required: true,
  comments:
    "The @odata.id property with a reference by ID to a supported group member object type.",
  placeholder: "Enter OData ID URL",
  example:
    "https://graph.microsoft.com/v1.0/directoryObjects/12345678-1234-1234-1234-123456789012",
  clean: util.types.toString,
});
export const addMemberToGroupInputs = {
  connection,
  groupId: input({
    ...groupId,
    comments: "The ID of the group to add the member to.",
  }),
  groupMemberOdataId,
};
