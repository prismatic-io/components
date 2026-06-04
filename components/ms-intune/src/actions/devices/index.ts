

import { deleteManagedDevice } from "./deleteManagedDevice";
import { getManagedDevice } from "./getManagedDevice";
import { listManagedDevices } from "./listManagedDevices";
import { retireDevice } from "./retire";
import { updateManagedDevice } from "./updateManagedDevice";
import { wipeDevice } from "./wipe";
import deviceCompliancePolicy from "./compliancePolicy";
import deviceConfiguration from "./configuration";
import deviceSoftwareUpdatesStatusSummary from "./softwareUpdatesStatusSummary";

export default {
  ...deviceCompliancePolicy,
  ...deviceConfiguration,
  ...deviceSoftwareUpdatesStatusSummary,
  
  
  deleteManagedDevice,
  getManagedDevice,
  listManagedDevices,
  retireDevice,
  updateManagedDevice,
  wipeDevice,
};
