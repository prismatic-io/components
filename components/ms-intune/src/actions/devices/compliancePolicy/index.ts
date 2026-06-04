import { assignDeviceCompliancePolicy } from "./assign";
import { getDeviceCompliancePolicy } from "./get";
import { listDeviceCompliancePolicies } from "./list";
import settingStateSummary from "./settingStateSummary";

export default {
  assignDeviceCompliancePolicy,
  getDeviceCompliancePolicy,
  listDeviceCompliancePolicies,
  ...settingStateSummary,
};
