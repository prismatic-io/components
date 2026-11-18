export const API_URL = "https://graph.microsoft.com/";

export const API_VERSIONS = {
  beta: "beta",
  v1: "v1.0",
};

export const CREATE_OFFICE_SUITE_APP_SPECIFIC_PROPERTIES_EXAMPLE =
  JSON.stringify(
    {
      roleScopeTagIds: [],
      autoAcceptEula: true,
      excludedApps: {
        lync: true,
        infoPath: true,
        sharePointDesigner: true,
        groove: true,
      },
      officePlatformArchitecture: "x64",
      localesToInstall: [],
      productIds: ["o365ProPlusRetail"],
      shouldUninstallOlderVersionsOfOffice: true,
      targetVersion: "",
      updateChannel: "current",
      updateVersion: "",
      useSharedComputerActivation: false,
      officeSuiteAppDefaultFileFormat: "OfficeOpenDocumentFormat",
    },
    null,
    2,
  );

export const UPDATE_OFFICE_SUITE_APP_SPECIFIC_PROPERTIES_EXAMPLE =
  JSON.stringify(
    {
      roleScopeTagIds: ["0"],
    },
    null,
    2,
  );

export const ENDPOINTS = {
  MANAGED_DEVICES: "/deviceManagement/managedDevices",
  DETECTED_APPS: "/deviceManagement/detectedApps",
  MOBILE_APPS: "/deviceAppManagement/mobileApps",
  SOFTWARE_UPDATE_STATUS_SUMMARY:
    "/deviceManagement/softwareUpdateStatusSummary",
  DEVICE_COMPLIANCE_POLICIES: "/deviceManagement/deviceCompliancePolicies",
  DEVICE_COMPLIANCE_POLICY_SETTING_STATE_SUMMARIES:
    "/deviceManagement/deviceCompliancePolicySettingStateSummaries",
  DEVICE_CONFIGURATIONS: "/deviceManagement/deviceConfigurations",
  USERS: "/users",
  GROUPS: "/groups",
  SUBSCRIPTIONS: "/subscriptions",
  DIRECTORY_AUDITS: "/auditLogs/directoryaudits",
  DOMAINS: "/domains",
};

export const ODATA_TYPES = {
  MANAGED_DEVICE: "#microsoft.graph.managedDevice",
  COMPLIANCE_POLICY_ASSIGNMENT:
    "#microsoft.graph.deviceCompliancePolicyAssignment",
  MIME_CONTENT: "microsoft.graph.mimeContent",
};

export const GROUP_ASSIGNMENT_TARGET_TYPES = [
  "microsoft.graph.groupAssignmentTarget",
  "microsoft.graph.exclusionGroupAssignmentTarget",
];

export const MS_PER_MINUTE = 60 * 1000;

export const MANAGED_APPS_FILTER =
  "(microsoft.graph.managedApp/appAvailability eq null or microsoft.graph.managedApp/appAvailability eq 'lineOfBusiness' or isAssigned eq true)";

export const NO_RESPONSE_SUCCESSFUL_PAYLOAD = "Action successfully completed.";

export enum TriggerBranches {
  Notification = "Notification",
  URLValidation = "URL Validation",
}

export const MAX_MINUTES_EXPIRATION_USERS_GROUPS_SUBSCRIPTION = 41760;

export const MISSING_CHANGE_TYPE_MESSAGE = "Select at least one Change Type.";

export const ADD_MEMBERS_RESPONSE_MESSAGE =
  "Successfully added member(s) to group.";

export const GENERAL_MEMBER_TYPE_URL =
  "https://graph.microsoft.com/v1.0/directoryObjects";
