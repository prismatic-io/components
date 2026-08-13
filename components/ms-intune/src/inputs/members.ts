import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanOptionalArrayInput, cleanStringInput } from "../util";
import { connection, fetchAll, odataParams } from "./common";
import { groupId } from "./mobileApps";
const memberIdsString = input({
  label: "Member IDs",
  comments:
    "Comma-separated list of member unique identifiers (UUIDs). You must fill either this input or the Dynamic member IDs input.",
  type: "string",
  required: false,
  example:
    "a1b2c3d4-e5f6-7890-abcd-ef1234567890,b2c3d4e5-f678-9012-3456-789012345678",
  placeholder: "Enter comma-separated member IDs",
  clean: cleanStringInput,
});
const memberIds = input({
  label: "Dynamic Member IDs",
  comments:
    "Array of member unique identifiers (UUIDs). You must fill either this input or the member IDs input.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    [
      "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "b2c3d4e5-f678-9012-3456-789012345678",
    ],
    null,
    2,
  ),
  clean: cleanOptionalArrayInput,
});
const memberId = input({
  label: "Member ID",
  comments: "The unique identifier of a member (UUID format).",
  type: "string",
  required: true,
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter member ID",
  clean: util.types.toString,
  dataSource: "selectMember",
});
export const groupIdForMembers = input({
  ...groupId,
  comments: "The unique identifier of a MS365 or Security group.",
  dataSource: "selectGroup",
});
export const addMembersToGroupInputs = {
  connection,
  groupId: groupIdForMembers,
  memberIdsString,
  memberIds,
};
export const addMemberToGroupInputs = {
  connection,
  groupId: groupIdForMembers,
  memberId,
};
export const deleteMemberInputs = {
  connection,
  groupId,
  memberId,
};
const listFilters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments: "Optional query controls to sort and refine the results.",
  inputs: {
    $filter: odataParams.$filter,
    $count: odataParams.$count,
    $select: odataParams.$select,
    $search: odataParams.$search,
    $expand: odataParams.$expand,
  },
});
export const listMembersInputs = {
  connection,
  fetchAll,
  groupId: groupIdForMembers,
  $top: odataParams.$top,
  filters: listFilters,
};
