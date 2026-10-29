export const MAX_PAGE_SIZE = 1000;

export const MAX_POLL_PAGES = 20;
export const WATERMARK_SKEW_MARGIN_MS = 60_000;

export const WEBHOOK_EVENTS = [
  "ComputerAdded",
  "ComputerCheckIn",
  "ComputerInventoryCompleted",
  "ComputerPatchPolicyCompleted",
  "ComputerPolicyFinished",
  "ComputerPushCapabilityChanged",
  "MobileDeviceCheckIn",
  "MobileDeviceCommandCompleted",
  "MobileDeviceEnrolled",
  "MobileDeviceInventoryCompleted",
  "MobileDevicePushSent",
  "MobileDeviceUnenrolled",
  "JSSStartup",
  "JSSShutdown",
  "DeviceAddedToDEP",
  "SmartGroupComputerMembershipChange",
  "SmartGroupMobileDeviceMembershipChange",
  "SmartGroupUserMembershipChange",
  "PatchSoftwareTitleUpdated",
  "PushSent",
  "RestAPIOperation",
  "SCEPChallenge",
];

export const WEBHOOK_AUTH_HEADER = "X-Jamf-Signature";

export const WEBHOOK_NAME_MAX_LENGTH = 100;

export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const DEFAULT_BATCH_SIZE = 50;
