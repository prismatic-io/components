import { connection } from "./common";
import { groupIdForMembers } from "./members";
import { mobileAppId } from "./mobileApps";
export const selectDetectedAppInputs = {
  connection,
};
export const selectDeviceCompliancePolicyInputs = {
  connection,
};
export const selectDeviceCompliancePolicySettingStateSummaryInputs = {
  connection,
};
export const selectDeviceConfigurationInputs = {
  connection,
};
export const selectDirectoryAuditInputs = {
  connection,
};
export const selectGroupInputs = {
  connection,
};
export const selectManagedAppInputs = {
  connection,
};
export const selectManagedDeviceInputs = {
  connection,
};
export const selectMemberInputs = {
  connection,
  groupId: {
    ...groupIdForMembers,
    dataSource: undefined,
  },
};
export const selectMobileAppInputs = {
  connection,
};
export const selectMobileAppAssignmentInputs = {
  mobileAppId: {
    ...mobileAppId,
    dataSource: undefined,
  },
  connection,
};
export const selectSubscriptionInputs = {
  connection,
};
export const selectUserInputs = {
  connection,
};
