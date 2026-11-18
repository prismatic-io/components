import { GROUP_ASSIGNMENT_TARGET_TYPES } from "../constants";
import type { MobileAppAssignmentBody } from "../types";

export const getMobileAppObject = (
  intent: string,
  target: string,
  settings: string,
  groupId?: string,
): MobileAppAssignmentBody => {
  const isGroupTarget = GROUP_ASSIGNMENT_TARGET_TYPES.includes(
    target.replace(/^#/, ""),
  );
  return {
    intent,
    target: {
      "@odata.type": target,
      ...(groupId && isGroupTarget ? { groupId } : {}),
    },
    settings: {
      "@odata.type": settings,
      useDeviceContext: true,
    },
  };
};
