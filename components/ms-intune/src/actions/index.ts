import audits from "./audits";
import compliancePolicy from "./compliancePolicy";
import detectedApps from "./detectedApps";
import deviceConfiguration from "./deviceConfiguration";
import devices from "./devices";
import domains from "./domains";
import groups from "./groups";
import managedApps from "./managedApps";
import members from "./members";
import misc from "./misc";
import mobileAppAssignments from "./mobileAppAssignments";
import mobileApps from "./mobileApps";
import softwareUpdates from "./softwareUpdates";
import subscriptions from "./subscriptions";
import users from "./users";
export default {
  ...audits,
  ...compliancePolicy,
  ...detectedApps,
  ...deviceConfiguration,
  ...devices,
  ...domains,
  ...groups,
  ...managedApps,
  ...members,
  ...misc,
  ...mobileAppAssignments,
  ...mobileApps,
  ...softwareUpdates,
  ...subscriptions,
  ...users,
};
