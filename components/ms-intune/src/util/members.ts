import { util } from "@prismatic-io/spectral";
import { GENERAL_MEMBER_TYPE_URL } from "../constants";

export const addObjectTypeToMemberIds = (memberIds: string[]): string[] =>
  memberIds.map((id) =>
    util.types.isUrl(id) ? id : `${GENERAL_MEMBER_TYPE_URL}/${id}`,
  );

export const getMemberIds = (
  memberIds: string[] | undefined,
  memberIdsString: string | undefined,
): string[] => {
  const memberIdsToAdd =
    memberIds && memberIds.length > 0
      ? memberIds
      : memberIdsString?.split(",") || [];

  if (memberIdsToAdd.length === 0) {
    throw new Error(
      "No member IDs provided. You must fill either the dynamic member IDs input or the member IDs input.",
    );
  }
  return memberIdsToAdd;
};
