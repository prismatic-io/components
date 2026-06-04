import { assignMobileApp } from "./assign";
import mobileAppAssignment from "./assignment";
import { getMobileApp } from "./get";
import { listMobileApps } from "./list";

export default {
  getMobileApp,
  listMobileApps,
  assignMobileApp,
  ...mobileAppAssignment,
};
