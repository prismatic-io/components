import apps from "./apps";
import devices from "./devices";
import domains from "./domains";
import groups from "./groups";
import misc from "./misc";
import mobileApps from "./mobileApps";
import reports from "./reports";
import subscriptions from "./subscriptions";
import users from "./users";
import members from "./members";

export default {
  ...apps,
  ...devices,
  ...domains,
  ...groups,
  ...misc,
  ...mobileApps,
  ...reports,
  ...subscriptions,
  ...users,
  ...members,
};
