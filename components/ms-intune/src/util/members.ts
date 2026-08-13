import { GENERAL_MEMBER_TYPE_URL } from "../constants";
const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch {
    return false;
  }
};
export const addObjectTypeToMemberIds = (memberIds: string[]) =>
  memberIds.map((id) =>
    isValidUrl(id) ? id : `${GENERAL_MEMBER_TYPE_URL}/${id}`,
  );
export const getMemberIds = (
  memberIds: string[] | undefined,
  memberIdsString: string | undefined,
) => {
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
