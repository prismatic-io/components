import { mobileAppId } from "../general";
import { mobileAppAssignmentId } from "./general";

export const deleteMobileAppAssignmentInputs = {
  mobileAppId: {
    ...mobileAppId,
    comments: "The ID of the mobile app to delete the assignment from.",
  },
  mobileAppAssignmentId: {
    ...mobileAppAssignmentId,
    comments: "The ID of the mobile app assignment to delete.",
  },
};
