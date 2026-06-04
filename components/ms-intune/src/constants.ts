export const API_URL = "https://graph.microsoft.com/";

export const API_VERSIONS = {
  beta: "beta",
  v1: "v1.0",
};

export const DEVICE_ACTION_RESULTS_EXAMPLE = [
  {
    "@odata.type": "microsoft.graph.deviceActionResult",
    actionName: "Action Name value",
    actionState: "pending",
    startDateTime: "2016-12-31T23:58:46.7156189-08:00",
    lastUpdatedDateTime: "2017-01-01T00:00:56.8321556-08:00",
  },
];

export const CONFIGURATION_MANAGER_CLIENT_ENABLED_FEATURES_EXAMPLE = {
  "@odata.type": "microsoft.graph.configurationManagerClientEnabledFeatures",
  inventory: true,
  modernApps: true,
  resourceAccess: true,
  deviceConfiguration: true,
  compliancePolicy: true,
  windowsUpdateForBusiness: true,
};

export const DEVICE_HEALTH_ATTESTATION_STATE_EXAMPLE = {
  "@odata.type": "microsoft.graph.deviceHealthAttestationState",
  lastUpdateDateTime: "Last Update Date Time value",
  contentNamespaceUrl: "https://example.com/contentNamespaceUrl/",
  deviceHealthAttestationStatus: "Device Health Attestation Status value",
  contentVersion: "Content Version value",
  issuedDateTime: "2016-12-31T23:58:22.1231038-08:00",
  attestationIdentityKey: "Attestation Identity Key value",
  resetCount: 10,
  restartCount: 12,
  dataExcutionPolicy: "Data Excution Policy value",
  bitLockerStatus: "Bit Locker Status value",
  bootManagerVersion: "Boot Manager Version value",
  codeIntegrityCheckVersion: "Code Integrity Check Version value",
  secureBoot: "Secure Boot value",
  bootDebugging: "Boot Debugging value",
  operatingSystemKernelDebugging: "Operating System Kernel Debugging value",
  codeIntegrity: "Code Integrity value",
  testSigning: "Test Signing value",
  safeMode: "Safe Mode value",
  windowsPE: "Windows PE value",
  earlyLaunchAntiMalwareDriverProtection:
    "Early Launch Anti Malware Driver Protection value",
  virtualSecureMode: "Virtual Secure Mode value",
  pcrHashAlgorithm: "Pcr Hash Algorithm value",
  bootAppSecurityVersion: "Boot App Security Version value",
  bootManagerSecurityVersion: "Boot Manager Security Version value",
  tpmVersion: "Tpm Version value",
  pcr0: "Pcr0 value",
  secureBootConfigurationPolicyFingerPrint:
    "Secure Boot Configuration Policy Finger Print value",
  codeIntegrityPolicy: "Code Integrity Policy value",
  bootRevisionListInfo: "Boot Revision List Info value",
  operatingSystemRevListInfo: "Operating System Rev List Info value",
  healthStatusMismatchInfo: "Health Status Mismatch Info value",
  healthAttestationSupportedStatus: "Health Attestation Supported Status value",
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

export const MANAGED_APPS_FILTER =
  "(microsoft.graph.managedApp/appAvailability eq null or microsoft.graph.managedApp/appAvailability eq 'lineOfBusiness' or isAssigned eq true)";

export const NO_RESPONSE_SUCCESSFULL_PAYLOAD = "Action successfully completed.";

export enum TriggerBranches {
  Notification = "Notification",
  URLValidation = "URL Validation",
}

export const MAX_MINUTES_EXPIRATION_USERS_GROUPS_SUBSCRIPTION = 41760;

export const ADD_MEMBERS_RESPONSE_MESSAGE =
  "Sucessfully added member(s) to group.";

export const DELETE_MEMBERS_RESPONSE_MESSAGE =
  "Successfully deleted member from group.";

export const GENERAL_MEMBER_TYPE_URL =
  "https://graph.microsoft.com/v1.0/directoryObjects";
