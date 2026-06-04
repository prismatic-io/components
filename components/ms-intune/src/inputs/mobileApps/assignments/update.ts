import { intent, mobileAppId, settings, target } from "../general";
import { mobileAppAssignmentId } from "./general";

export const updateMobileAppAssignmentInputs = {
  mobileAppId: {
    ...mobileAppId,
    comments: "The ID of the mobile app to update the assignment from.",
  },
  mobileAppAssignmentId: {
    ...mobileAppAssignmentId,
    comments: "The ID of the mobile app assignment to update.",
  },
  intent,
  target,
  settings,
};
