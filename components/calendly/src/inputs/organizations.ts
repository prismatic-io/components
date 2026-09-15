import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import {
  connection,
  uuid,
  organization,
  email,
  sort,
  status,
  user,
} from "./common";
const orgUuid = input({
  label: "Organization UUID",
  type: "string",
  comments: "The organization's unique identifier.",
  required: true,
  placeholder: "Enter organization UUID",
  clean: util.types.toString,
});
const actionInput = input({
  label: "Action",
  type: "string",
  collection: "valuelist",
  comments: "The action associated with the entries.",
  required: false,
  clean: (value) => value as string[],
});
const actor = input({
  label: "Actor",
  type: "string",
  collection: "valuelist",
  comments: "Return entries from the user associated with the provided URI.",
  required: false,
  clean: (value) => value as string[],
});
const maxOccurredAt = input({
  label: "Max Occurred At",
  type: "string",
  comments:
    "Include entries that occurred prior to this time. This time should use the UTC timezone. Format: ISO 8601 datetime.",
  required: false,
  placeholder: "Enter max occurred at (ISO 8601)",
  example: "2020-01-02T03:04:05.678Z",
  clean: cleanString,
});
const minOccurredAt = input({
  label: "Min Occurred At",
  type: "string",
  comments:
    "Include entries that occurred after this time. This time should use the UTC timezone. Format: ISO 8601 datetime.",
  required: false,
  placeholder: "Enter min occurred at (ISO 8601)",
  example: "2020-01-02T03:04:05.678Z",
  clean: cleanString,
});
const namespace = input({
  label: "Namespace",
  type: "string",
  collection: "valuelist",
  comments: "The category of the entry.",
  required: false,
  clean: (value) => value as string[],
});
const searchTerm = input({
  label: "Search Term",
  type: "string",
  comments: "Filters entries based on the search term.",
  required: false,
  example: "compliance",
  placeholder: "Enter search term",
  clean: cleanString,
});
const sortList = input({
  label: "Sort",
  type: "string",
  collection: "valuelist",
  comments:
    "Order results by the specified field and direction. {field}:{direction} value.",
  required: false,
  model: [
    {
      label: "Action Ascending",
      value: "action:asc",
    },
    {
      label: "Action Descending",
      value: "action:desc",
    },
    {
      label: "Actor Display Name Ascending",
      value: "actor.display_name:asc",
    },
    {
      label: "Actor Display Name Descending",
      value: "actor.display_name:desc",
    },
    {
      label: "Actor URI Ascending",
      value: "actor.uri:asc",
    },
    {
      label: "Actor URI Descending",
      value: "actor.uri:desc",
    },
    {
      label: "Namespace Ascending",
      value: "namespace:asc",
    },
    {
      label: "Namespace Descending",
      value: "namespace:desc",
    },
    {
      label: "Occurred At Ascending",
      value: "occurred_at:asc",
    },
    {
      label: "Occurred At Descending",
      value: "occurred_at:desc",
    },
  ],
  clean: (value) => value as string[],
});
export const getOrganizationInvitationInputs = {
  connection,
  uuid: {
    ...uuid,
    comments: "The organization invitation's unique identifier.",
  },
  orgUuid,
};
export const getOrganizationMembershipInputs = {
  connection,
  uuid: {
    ...uuid,
    comments: "The organization membership's unique identifier.",
  },
};
export const inviteUserToOrganizationInputs = {
  connection,
  uuid: { ...uuid, comments: "The UUID of the organization." },
  email: {
    ...email,
    required: true,
    comments: "The email address of the user to invite.",
  },
};
export const listActivityLogEntriesInputs = {
  connection,
  organization: {
    ...organization,
    required: true,
    dataSource: "organizations",
    comments:
      "Return activity log entries from the organization associated with this URI",
  },
  actionInput,
  actor,
  maxOccurredAt,
  minOccurredAt,
  namespace,
  searchTerm,
  sortList,
};
export const listOrganizationInvitationsInputs = {
  connection,
  uuid,
  email: {
    ...email,
    required: false,
    comments: "Indicates if the results should be filtered by email address",
  },
  sort,
  status: {
    ...status,
    required: false,
    comments:
      'Indicates if the results should be filtered by status ("pending", "accepted", or "declined")',
    model: [
      {
        value: "",
        label: "",
      },
      {
        value: "pending",
        label: "Pending",
      },
      {
        value: "accepted",
        label: "Accepted",
      },
      {
        value: "declined",
        label: "Declined",
      },
    ],
  },
};
export const listOrganizationMembershipsInputs = {
  connection,
  email: {
    ...email,
    comments: "Indicates if the results should be filtered by email address",
    example: "user@example.com",
  },
  organization: {
    ...organization,
    dataSource: "organizations",
    comments: "Indicates if the results should be filtered by organization",
  },
  user: {
    ...user,
    comments: "Indicates if the results should be filtered by user",
    example: "https://api.calendly.com/users/UR1234567890",
  },
};
export const removeUserFromOrganizationInputs = {
  connection,
  organization: { ...organization, dataSource: "organizations" },
  uuid: {
    ...uuid,
    comments: "The organization membership's unique identifier",
    dataSource: "organizationMemberships",
  },
};
export const revokeUserOrganizationInvitationInputs = {
  connection,
  uuid: {
    ...uuid,
    comments: "The organization invitation's unique identifier.",
  },
  orgUuid,
};
