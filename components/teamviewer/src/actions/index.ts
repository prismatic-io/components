import { getPing } from "./misc/getPing";
import { rawRequest } from "./misc/rawRequest";
import accounts from "./accounts";
import contacts from "./contacts";
import devices from "./devices";
import groups from "./groups";
import managedDevices from "./managedDevices";
import misc from "./misc";
import patchManagement from "./patchManagement";
import sessions from "./sessions";
import user from "./user";

export default {
  ...accounts,
  ...contacts,
  ...devices,
  ...groups,
  ...managedDevices,
  ...misc,
  ...patchManagement,
  ...sessions,
  ...user,
  getPing,
  rawRequest,
};
