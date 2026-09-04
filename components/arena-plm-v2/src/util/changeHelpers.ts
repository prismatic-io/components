import type { ImplementationTaskAssigneeVo } from "../types";
import { toOptionalString } from "./cleanHelpers";
export const resolveImplementationTaskAssignee = (
  userGuid: unknown,
  userGroupGuid: unknown,
): ImplementationTaskAssigneeVo | undefined => {
  const user = toOptionalString(userGuid);
  if (user) {
    return { user: { guid: user } };
  }
  const userGroup = toOptionalString(userGroupGuid);
  if (userGroup) {
    return { userGroup: { guid: userGroup } };
  }
  return undefined;
};
