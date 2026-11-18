import { deleteResultSchema, odataCollectionSchema } from "./common";

const deviceActionResultProperties = {
  actionName: { type: ["string", "null"] },
  startDateTime: { type: ["string", "null"], format: "date-time" },
  lastUpdatedDateTime: { type: ["string", "null"], format: "date-time" },
};

const deviceActionResultSchema = {
  type: "object" as const,
  properties: {
    ...deviceActionResultProperties,
    actionState: {
      type: ["string", "null"],
      enum: [
        "none",
        "pending",
        "canceled",
        "active",
        "done",
        "failed",
        "notSupported",
        null,
      ],
    },
  },
};

const configurationManagerClientEnabledFeaturesSchema = {
  type: "object" as const,
  properties: {
    inventory: { type: ["boolean", "null"] },
    modernApps: { type: ["boolean", "null"] },
    resourceAccess: { type: ["boolean", "null"] },
    deviceConfiguration: { type: ["boolean", "null"] },
    compliancePolicy: { type: ["boolean", "null"] },
    windowsUpdateForBusiness: { type: ["boolean", "null"] },
  },
};

const deviceHealthAttestationStateSchema = {
  type: "object" as const,
  properties: {
    lastUpdateDateTime: { type: ["string", "null"] },
    contentNamespaceUrl: { type: ["string", "null"] },
    deviceHealthAttestationStatus: { type: ["string", "null"] },
    contentVersion: { type: ["string", "null"] },
    issuedDateTime: { type: ["string", "null"], format: "date-time" },
    attestationIdentityKey: { type: ["string", "null"] },
    resetCount: { type: ["integer", "null"] },
    restartCount: { type: ["integer", "null"] },
    dataExcutionPolicy: { type: ["string", "null"] },
    bitLockerStatus: { type: ["string", "null"] },
    bootManagerVersion: { type: ["string", "null"] },
    codeIntegrityCheckVersion: { type: ["string", "null"] },
    secureBoot: { type: ["string", "null"] },
    bootDebugging: { type: ["string", "null"] },
    operatingSystemKernelDebugging: { type: ["string", "null"] },
    codeIntegrity: { type: ["string", "null"] },
    testSigning: { type: ["string", "null"] },
    safeMode: { type: ["string", "null"] },
    windowsPE: { type: ["string", "null"] },
    earlyLaunchAntiMalwareDriverProtection: { type: ["string", "null"] },
    virtualSecureMode: { type: ["string", "null"] },
    pcrHashAlgorithm: { type: ["string", "null"] },
    bootAppSecurityVersion: { type: ["string", "null"] },
    bootManagerSecurityVersion: { type: ["string", "null"] },
    tpmVersion: { type: ["string", "null"] },
    pcr0: { type: ["string", "null"] },
    secureBootConfigurationPolicyFingerPrint: { type: ["string", "null"] },
    codeIntegrityPolicy: { type: ["string", "null"] },
    bootRevisionListInfo: { type: ["string", "null"] },
    operatingSystemRevListInfo: { type: ["string", "null"] },
    healthStatusMismatchInfo: { type: ["string", "null"] },
    healthAttestationSupportedStatus: { type: ["string", "null"] },
  },
};

const managedDeviceCommonProperties = {
  "@odata.type": { type: "string" },
  id: { type: "string" },
  userId: { type: ["string", "null"] },
  deviceName: { type: ["string", "null"] },
  enrolledDateTime: { type: ["string", "null"], format: "date-time" },
  lastSyncDateTime: { type: ["string", "null"], format: "date-time" },
  operatingSystem: { type: ["string", "null"] },
  jailBroken: { type: ["string", "null"] },
  osVersion: { type: ["string", "null"] },
  easActivated: { type: ["boolean", "null"] },
  easDeviceId: { type: ["string", "null"] },
  easActivationDateTime: { type: ["string", "null"], format: "date-time" },
  azureADRegistered: { type: ["boolean", "null"] },
  activationLockBypassCode: { type: ["string", "null"] },
  emailAddress: { type: ["string", "null"] },
  azureADDeviceId: { type: ["string", "null"] },
  deviceCategoryDisplayName: { type: ["string", "null"] },
  isSupervised: { type: ["boolean", "null"] },
  exchangeLastSuccessfulSyncDateTime: {
    type: ["string", "null"],
    format: "date-time",
  },
  remoteAssistanceSessionUrl: { type: ["string", "null"] },
  remoteAssistanceSessionErrorDetails: { type: ["string", "null"] },
  isEncrypted: { type: ["boolean", "null"] },
  userPrincipalName: { type: ["string", "null"] },
  model: { type: ["string", "null"] },
  manufacturer: { type: ["string", "null"] },
  imei: { type: ["string", "null"] },
  complianceGracePeriodExpirationDateTime: {
    type: ["string", "null"],
    format: "date-time",
  },
  serialNumber: { type: ["string", "null"] },
  phoneNumber: { type: ["string", "null"] },
  androidSecurityPatchLevel: { type: ["string", "null"] },
  userDisplayName: { type: ["string", "null"] },
  configurationManagerClientEnabledFeatures: {
    ...configurationManagerClientEnabledFeaturesSchema,
    type: ["object", "null"],
  },
  wiFiMacAddress: { type: ["string", "null"] },
  deviceHealthAttestationState: {
    ...deviceHealthAttestationStateSchema,
    type: ["object", "null"],
  },
  subscriberCarrier: { type: ["string", "null"] },
  meid: { type: ["string", "null"] },
  totalStorageSpaceInBytes: { type: ["integer", "null"] },
  freeStorageSpaceInBytes: { type: ["integer", "null"] },
  managedDeviceName: { type: ["string", "null"] },
  requireUserEnrollmentApproval: { type: ["boolean", "null"] },
  managementCertificateExpirationDate: {
    type: ["string", "null"],
    format: "date-time",
  },
  iccid: { type: ["string", "null"] },
  udid: { type: ["string", "null"] },
  notes: { type: ["string", "null"] },
  ethernetMacAddress: { type: ["string", "null"] },
  physicalMemoryInBytes: { type: ["integer", "null"] },
  enrollmentProfileName: { type: ["string", "null"] },
};

const managedDeviceSchema = {
  type: "object" as const,
  properties: {
    ...managedDeviceCommonProperties,
    managedDeviceOwnerType: {
      type: ["string", "null"],
      enum: ["unknown", "company", "personal", null],
    },
    deviceActionResults: { type: "array", items: deviceActionResultSchema },
    complianceState: {
      type: ["string", "null"],
      enum: [
        "unknown",
        "compliant",
        "noncompliant",
        "conflict",
        "error",
        "inGracePeriod",
        "configManager",
        null,
      ],
    },
    managementAgent: {
      type: ["string", "null"],
      enum: [
        "eas",
        "mdm",
        "easMdm",
        "intuneClient",
        "easIntuneClient",
        "configurationManagerClient",
        "configurationManagerClientMdm",
        "configurationManagerClientMdmEas",
        "unknown",
        "jamf",
        "googleCloudDevicePolicyController",
        null,
      ],
    },
    deviceEnrollmentType: {
      type: ["string", "null"],
      enum: [
        "unknown",
        "userEnrollment",
        "deviceEnrollmentManager",
        "appleBulkWithUser",
        "appleBulkWithoutUser",
        "windowsAzureADJoin",
        "windowsBulkUserless",
        "windowsAutoEnrollment",
        "windowsBulkAzureDomainJoin",
        "windowsCoManagement",
        "windowsAzureADJoinUsingDeviceAuth",
        "appleUserEnrollment",
        "appleUserEnrollmentWithServiceAccount",
        null,
      ],
    },
    deviceRegistrationState: {
      type: ["string", "null"],
      enum: [
        "notRegistered",
        "registered",
        "revoked",
        "keyConflict",
        "approvalPending",
        "certificateReset",
        "notRegisteredPendingEnrollment",
        "unknown",
        null,
      ],
    },
    exchangeAccessState: {
      type: ["string", "null"],
      enum: ["none", "unknown", "allowed", "blocked", "quarantined", null],
    },
    exchangeAccessStateReason: {
      type: ["string", "null"],
      enum: [
        "none",
        "unknown",
        "exchangeGlobalRule",
        "exchangeIndividualRule",
        "exchangeDeviceRule",
        "exchangeUpgrade",
        "exchangeMailboxPolicy",
        "other",
        "compliant",
        "notCompliant",
        "notEnrolled",
        "unknownLocation",
        "mfaRequired",
        "azureADBlockDueToAccessPolicy",
        "compromisedPassword",
        "deviceNotKnownWithManagedApp",
        null,
      ],
    },
    partnerReportedThreatState: {
      type: ["string", "null"],
      enum: [
        "unknown",
        "activated",
        "deactivated",
        "secured",
        "lowSeverity",
        "mediumSeverity",
        "highSeverity",
        "unresponsive",
        "compromised",
        "misconfigured",
        null,
      ],
    },
  },
};

export const getManagedDeviceOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...managedDeviceSchema.properties,
  },
  required: ["id"],
};

export const listManagedDevicesOutputSchema = {
  type: "object" as const,
  properties: {
    ...odataCollectionSchema.properties,
    value: { type: "array", items: managedDeviceSchema },
  },
  required: ["value"],
};

export const updateManagedDeviceOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...managedDeviceCommonProperties,
    managedDeviceOwnerType: { type: ["string", "null"] },
    deviceActionResults: {
      type: "array",
      items: {
        type: "object",
        properties: {
          ...deviceActionResultProperties,
          actionState: { type: ["string", "null"] },
        },
      },
    },
    complianceState: { type: ["string", "null"] },
    managementAgent: { type: ["string", "null"] },
    deviceEnrollmentType: { type: ["string", "null"] },
    deviceRegistrationState: { type: ["string", "null"] },
    exchangeAccessState: { type: ["string", "null"] },
    exchangeAccessStateReason: { type: ["string", "null"] },
    partnerReportedThreatState: { type: ["string", "null"] },
  },
  required: ["id"],
  additionalProperties: true,
};

export const deleteManagedDeviceOutputSchema = deleteResultSchema;

export const retireDeviceOutputSchema = { type: "string" as const };

export const wipeDeviceOutputSchema = { type: "string" as const };
