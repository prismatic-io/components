import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanNumberInput, cleanStringInput } from "../../util";
import {
  CONFIGURATION_MANAGER_CLIENT_ENABLED_FEATURES_EXAMPLE,
  DEVICE_ACTION_RESULTS_EXAMPLE,
  DEVICE_HEALTH_ATTESTATION_STATE_EXAMPLE,
} from "../../constants";

const userId = input({
  label: "User Id",
  comments: "Unique Identifier for the user associated with the device.",
  example: "User Id value",
  placeholder: "User Id value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const deviceName = input({
  label: "Device Name",
  comments: "Name of the device.",
  example: "Device Name value",
  placeholder: "Device Name value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const managedDeviceOwnerType = input({
  label: "Managed Device Owner Type",
  comments: "Ownership of the device. Can be 'company' or 'personal'.",
  example: "company",
  placeholder: "company",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const deviceActionResults = input({
  label: "Device Action Results",
  comments:
    "List of ComplexType deviceActionResult objects. Update the default JSON to your desired values.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(DEVICE_ACTION_RESULTS_EXAMPLE, null, 2),
  clean: cleanCodeInput,
});

const enrolledDateTime = input({
  label: "Enrolled Date Time",
  comments:
    "Enrollment time of the device. Supports $filter operator 'lt' and 'gt'.",
  example: "2016-12-31T23:59:43.797191-08:00",
  placeholder: "2016-12-31T23:59:43.797191-08:00",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const lastSyncDateTime = input({
  label: "Last Sync Date Time",
  comments:
    "The date and time that the device last completed a successful sync with Intune. Supports $filter operator 'lt' and 'gt'.",
  example: "2017-01-01T00:02:49.3205976-08:00",
  placeholder: "2017-01-01T00:02:49.3205976-08:00",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const operatingSystem = input({
  label: "Operating System",
  comments: "Operating system of the device. Windows, iOS, etc.",
  example: "Windows",
  placeholder: "Windows",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const complianceState = input({
  label: "Compliance State",
  comments:
    "Compliance state of the device. Examples: Compliant, Conflict, Error, etc. Default is unknown. Supports $filter operator 'eq' and 'or'.",
  example: "compliant",
  placeholder: "compliant",
  default: "unknown",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const jailBroken = input({
  label: "Jail Broken",
  comments:
    "Whether the device is jailbroken or rooted. Default is an empty string. Supports $filter operator 'eq' and 'or'.",
  example: "Jail Broken value",
  placeholder: "Jail Broken value",
  default: "",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const managementAgent = input({
  label: "Management Agent",
  comments:
    "Management channel of the device. Examples: Intune, EAS, etc. Default is unknown. Supports $filter operator 'eq' and 'or'.",
  example: "mdm",
  default: "unknown",
  placeholder: "mdm",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const osVersion = input({
  label: "OS Version",
  comments: "Operating system version of the device.",
  example: "OS Version value",
  placeholder: "OS Version value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const easActivated = input({
  label: "EAS Activated",
  comments: "Whether the device is Exchange ActiveSync activated.",
  type: "boolean",
  default: "false",
  required: false,
  clean: util.types.toBool,
});

const easDeviceId = input({
  label: "EAS Device Id",
  comments: "Exchange ActiveSync Id of the device.",
  example: "Eas Device Id value",
  placeholder: "Eas Device Id value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const easActivationDateTime = input({
  label: "EAS Activation Date Time",
  comments: "Exchange ActivationSync activation time of the device.",
  example: "2016-12-31T23:59:43.4878784-08:00",
  placeholder: "2016-12-31T23:59:43.4878784-08:00",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const azureADRegistered = input({
  label: "Azure AD Registered",
  comments: "Whether the device is Azure Active Directory registered.",
  type: "boolean",
  default: "false",
  required: false,
  clean: util.types.toBool,
});

const deviceEnrollmentType = input({
  label: "Device Enrollment Type",
  comments: "Enrollment type of the device.",
  example: "userEnrollment",
  placeholder: "userEnrollment",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const activationLockBypassCode = input({
  label: "Activation Lock Bypass Code",
  comments:
    "The code that allows the Activation Lock on managed device to be bypassed. Default is Null (Non-Default property) for this property when returned as part of managedDevice entity in LIST call. To retrieve actual values GET call needs to be made, with device id and included in select parameter. Supports: $select. $Search is not supported. Read-only.",
  example: "Activation Lock Bypass Code value",
  placeholder: "Activation Lock Bypass Code value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const emailAddress = input({
  label: "Email Address",
  comments: "Email(s) for the user associated with the device.",
  example: "example@email.com",
  placeholder: "example@email.com",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const azureADDeviceId = input({
  label: "Azure AD Device Id",
  comments:
    "The unique identifier for the Azure Active Directory device. Read only.",
  example: "Azure ADDevice Id value",
  placeholder: "Azure ADDevice Id value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const deviceRegistrationState = input({
  label: "Device Registration State",
  comments: "Device registration state.",
  example: "registered",
  placeholder: "registered",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const deviceCategoryDisplayName = input({
  label: "Device Category Display Name",
  comments:
    "Device category display name. Default is an empty string. Supports $filter operator 'eq' and 'or'.",
  example: "Device Category Display Name value",
  default: "",
  placeholder: "Device Category Display Name value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const isSupervised = input({
  label: "Is Supervised",
  comments: "Device supervised status.",
  type: "boolean",
  default: "false",
  required: false,
  clean: util.types.toBool,
});

const exchangeLastSuccessfulSyncDateTime = input({
  label: "Exchange Last Successful Sync Date Time",
  comments: "Last time the device contacted Exchange.",
  example: "2017-01-01T00:00:45.8803083-08:00",
  placeholder: "2017-01-01T00:00:45.8803083-08:00",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const exchangeAccessState = input({
  label: "Exchange Access State",
  comments: "The Access State of the device in Exchange.",
  example: "unknown",
  placeholder: "unknown",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const exchangeAccessStateReason = input({
  label: "Exchange Access State Reason",
  comments: "The reason for the device's access state in Exchange.",
  example: "unknown",
  placeholder: "unknown",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const remoteAssistanceSessionUrl = input({
  label: "Remote Assistance Session Url",
  comments:
    "Url that allows a Remote Assistance session to be established with the device. Default is an empty string. To retrieve actual values GET call needs to be made, with device id and included in select parameter.",
  example: "https://example.com/remoteAssistanceSessionUrl/",
  placeholder: "https://example.com/remoteAssistanceSessionUrl/",
  default: "",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const remoteAssistanceSessionErrorDetails = input({
  label: "Remote Assistance Session Error Details",
  comments:
    "An error string that identifies issues when creating Remote Assistance session objects.",
  example: "Remote Assistance Session Error Details value",
  placeholder: "Remote Assistance Session Error Details value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const isEncrypted = input({
  label: "Is Encrypted",
  comments: "Device encryption status.",
  type: "boolean",
  default: "false",
  required: false,
  clean: util.types.toBool,
});

const userPrincipalName = input({
  label: "User Principal Name",
  comments: "Device user principal name.",
  example: "User Principal Name value",
  placeholder: "User Principal Name value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const model = input({
  label: "Model",
  comments: "Model of the device.",
  example: "Model value",
  placeholder: "Model value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const manufacturer = input({
  label: "Manufacturer",
  comments: "Manufacturer of the device.",
  example: "Manufacturer value",
  placeholder: "Manufacturer value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const imei = input({
  label: "IMEI",
  comments: "IMEI.",
  example: "IMEI value",
  placeholder: "IMEI value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const complianceGracePeriodExpirationDateTime = input({
  label: "Compliance Grace Period Expiration Date Time",
  comments: "The DateTime when device compliance grace period expires.",
  example: "2016-12-31T23:56:44.951111-08:00",
  placeholder: "2016-12-31T23:56:44.951111-08:00",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const serialNumber = input({
  label: "Serial Number",
  comments: "SerialNumber.",
  example: "Serial Number value",
  placeholder: "Serial Number value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const phoneNumber = input({
  label: "Phone Number",
  comments: "Phone number of the device.",
  example: "Phone Number value",
  placeholder: "Phone Number value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const androidSecurityPatchLevel = input({
  label: "Android Security Patch Level",
  comments: "Android security patch level.",
  example: "Android Security Patch Level value",
  placeholder: "Android Security Patch Level value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const userDisplayName = input({
  label: "User Display Name",
  comments: "User display name.",
  example: "User Display Name value",
  placeholder: "User Display Name value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const configurationManagerClientEnabledFeatures = input({
  label: "ConfigMgr Client Enabled Features",
  comments: "ConfigrMgr client enabled features.",
  type: "code",
  language: "json",
  example: JSON.stringify(
    CONFIGURATION_MANAGER_CLIENT_ENABLED_FEATURES_EXAMPLE,
    null,
    2,
  ),
  required: false,
  clean: cleanCodeInput,
});

const wiFiMacAddress = input({
  label: "Wi-Fi MAC Address",
  comments: "Wi-Fi MAC.",
  example: "Wi-Fi MAC Address value",
  placeholder: "Wi-Fi MAC Address value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const deviceHealthAttestationState = input({
  label: "Device Health Attestation State",
  comments: "The device health attestation state.",
  type: "code",
  language: "json",
  example: JSON.stringify(DEVICE_HEALTH_ATTESTATION_STATE_EXAMPLE, null, 2),
  required: false,
  clean: cleanCodeInput,
});

const subscriberCarrier = input({
  label: "Subscriber Carrier",
  comments: "Subscriber Carrier.",
  example: "Subscriber Carrier value",
  placeholder: "Subscriber Carrier value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const meid = input({
  label: "MEID",
  comments: "MEID.",
  example: "MEID value",
  placeholder: "MEID value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const totalStorageSpaceInBytes = input({
  label: "Total Storage Space In Bytes",
  comments: "Total Storage in Bytes.",
  example: "8",
  placeholder: "8",
  type: "string",
  required: false,
  clean: cleanNumberInput,
});

const freeStorageSpaceInBytes = input({
  label: "Free Storage Space In Bytes",
  comments: "Free Storage in Bytes. Default value is 0. Read-only.",
  default: "0",
  example: "7",
  placeholder: "7",
  type: "string",
  required: false,
  clean: cleanNumberInput,
});

const managedDeviceName = input({
  label: "Managed Device Name",
  comments:
    "Automatically generated name to identify a device. Can be overwritten to a user friendly name.",
  example: "Managed Device Name value",
  placeholder: "Managed Device Name value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const partnerReportedThreatState = input({
  label: "Partner Reported Threat State",
  comments:
    "Indicates the threat state of a device when a Mobile Threat Defense partner is in use by the account and device. Read Only.",
  example: "activated",
  placeholder: "activated",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const requireUserEnrollmentApproval = input({
  label: "Require User Enrollment Approval",
  comments: "Reports if the managed iOS device is user approval enrollment.",
  type: "boolean",
  default: "false",
  required: false,
  clean: util.types.toBool,
});

const managementCertificateExpirationDate = input({
  label: "Management Certificate Expiration Date",
  comments: "Reports device management certificate expiration date.",
  example: "2016-12-31T23:57:59.9789653-08:00",
  placeholder: "2016-12-31T23:57:59.9789653-08:00",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const iccid = input({
  label: "ICCID",
  comments:
    "Integrated Circuit Card Identifier, it is A SIM card's unique identification number. Default is an empty string. To retrieve actual values GET call needs to be made, with device id and included in select parameter. Supports: $select. $Search is not supported. Read-only.",
  example: "ICCID value",
  default: "",
  placeholder: "ICCID value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const udid = input({
  label: "UDID",
  comments:
    "Unique Device Identifier for iOS and macOS devices. Default is an empty string. To retrieve actual values GET call needs to be made, with device id and included in select parameter. Supports: $select. $Search is not supported. Read-only.",
  example: "UDID value",
  placeholder: "UDID value",
  default: "",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const notes = input({
  label: "Notes",
  comments:
    "Notes on the device created by IT Admin. Default is null. To retrieve actual values GET call needs to be made, with device id and included in select parameter. Supports: $select. $Search is not supported.",
  example: "Notes value",
  placeholder: "Notes value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const ethernetMacAddress = input({
  label: "Ethernet MAC Address",
  comments:
    "Indicates Ethernet MAC Address of the device. Default, is Null (Non-Default property) for this property when returned as part of managedDevice entity. Individual get call with select query options is needed to retrieve actual values. Example: deviceManagement/managedDevices({managedDeviceId})?$select=ethernetMacAddress Supports: $select. $Search is not supported. Read-only.",
  example: "Ethernet Mac Address value",
  placeholder: "Ethernet Mac Address value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const physicalMemoryInBytes = input({
  label: "Physical Memory In Bytes",
  comments:
    "Total Memory in Bytes. Default is 0. To retrieve actual values GET call needs to be made, with device id and included in select parameter. Supports: $select. Read-only.",
  example: "5",
  placeholder: "5",
  type: "string",
  required: false,
  clean: cleanNumberInput,
});

const enrollmentProfileName = input({
  label: "Enrollment Profile Name",
  comments:
    "Name of the enrollment profile assigned to the device. Default value is empty string, indicating no enrollment profile was assigned.",
  example: "Enrollment Profile Name value",
  placeholder: "Enrollment Profile Name value",
  default: "",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

export default {
  userId,
  deviceName,
  managedDeviceOwnerType,
  deviceActionResults,
  enrolledDateTime,
  lastSyncDateTime,
  operatingSystem,
  complianceState,
  jailBroken,
  managementAgent,
  osVersion,
  easActivated,
  easDeviceId,
  easActivationDateTime,
  azureADRegistered,
  deviceEnrollmentType,
  activationLockBypassCode,
  emailAddress,
  azureADDeviceId,
  deviceRegistrationState,
  deviceCategoryDisplayName,
  isSupervised,
  exchangeLastSuccessfulSyncDateTime,
  exchangeAccessState,
  exchangeAccessStateReason,
  remoteAssistanceSessionUrl,
  remoteAssistanceSessionErrorDetails,
  isEncrypted,
  userPrincipalName,
  model,
  manufacturer,
  imei,
  complianceGracePeriodExpirationDateTime,
  serialNumber,
  phoneNumber,
  androidSecurityPatchLevel,
  userDisplayName,
  configurationManagerClientEnabledFeatures,
  wiFiMacAddress,
  deviceHealthAttestationState,
  subscriberCarrier,
  meid,
  totalStorageSpaceInBytes,
  freeStorageSpaceInBytes,
  managedDeviceName,
  partnerReportedThreatState,
  requireUserEnrollmentApproval,
  managementCertificateExpirationDate,
  iccid,
  udid,
  notes,
  ethernetMacAddress,
  physicalMemoryInBytes,
  enrollmentProfileName,
};
