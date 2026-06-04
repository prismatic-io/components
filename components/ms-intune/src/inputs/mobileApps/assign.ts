import { groupId, intent, mobileAppId, settings, target } from "./general";

export default {
  mobileAppId: {
    ...mobileAppId,
    comments: "Unique Identifier for the mobile app to assign.",
  },
  groupId,
  intent,
  target,
  settings,
};
