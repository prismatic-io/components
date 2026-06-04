import { intent, mobileAppId, settings, target } from "../general";

export const createMobileAppAssignmentInputs = {
  mobileAppId: {
    ...mobileAppId,
    comments: "The ID of the mobile app to create the assignment for.",
  },
  intent,
  target,
  settings,
};
