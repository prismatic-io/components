import { util, input } from "@prismatic-io/spectral";
import { cleanOptionalArrayInput, cleanStringInput } from "../../util";
import { groupId } from "../mobileApps/general";

export const memberIdsString = input({
  label: "Member Ids",
  comments:
    "Comma-separated list of member unique identifiers (UUIDs). You must fill either this input or the Dynamic member IDs input.",
  type: "string",
  required: false,
  example:
    "a1b2c3d4-e5f6-7890-abcd-ef1234567890,b2c3d4e5-f678-9012-3456-789012345678",
  placeholder: "Enter comma-separated member IDs",
  clean: cleanStringInput,
});

export const memberIds = input({
  label: "Dynamic Member Ids",
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

export const memberId = input({
  label: "Member Id",
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
