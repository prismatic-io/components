import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  CONFIGURATION_MANAGER_CLIENT_ENABLED_FEATURES_EXAMPLE,
  DEVICE_ACTION_RESULTS_EXAMPLE,
  DEVICE_HEALTH_ATTESTATION_STATE_EXAMPLE,
} from "../constants";
import { cleanCodeInput, cleanNumberInput, cleanStringInput } from "../util";
import { connection, fetchAll, odataParams } from "./common";
const managedDeviceId = input({
  label: "Managed Device ID",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter managed device ID",
  comments: "Unique identifier for the managed device (UUID format).",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectManagedDevice",
});
const userId = input({
  label: "User ID",
  comments: "Unique Identifier for the user associated with the device.",
  example: "d36894ae-94ae-d368-ae94-68d3ae9468d3",
  placeholder: "Enter user ID",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const deviceName = input({
  label: "Device Name",
  comments: "The friendly name assigned to the managed device.",
  example: "John-Laptop-Win11",
  placeholder: "Enter device name",
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
    "List of ComplexType deviceActionResult objects. Update the default JSON to the desired values.",
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
  example: "True",
  placeholder: "Enter jailbreak status",
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
  example: "10.0.19045.3803",
  placeholder: "Enter OS version",
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
  label: "EAS Device ID",
  comments: "Exchange ActiveSync ID of the device.",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter EAS device ID",
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
  example: "A1B2C3D4E5F6",
  placeholder: "Enter activation lock bypass code",
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
  label: "Azure AD Device ID",
  comments:
    "The unique identifier for the Azure Active Directory device. Read only.",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter Azure AD device ID",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const deviceRegistrationState = input({
  label: "Device Registration State",
  comments: "The Entra ID registration state of the device.",
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
  example: "Corporate Devices",
  default: "",
  placeholder: "Enter device category display name",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const isSupervised = input({
  label: "Is Supervised",
  comments: "When true, indicates the device is in supervised mode.",
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
  example: "Unable to establish connection",
  placeholder: "Enter error details",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const isEncrypted = input({
  label: "Is Encrypted",
  comments: "When true, indicates the device storage is encrypted.",
  type: "boolean",
  default: "false",
  required: false,
  clean: util.types.toBool,
});
const userPrincipalName = input({
  label: "User Principal Name",
  comments:
    "The UPN (email-format login) of the user associated with the managed device.",
  example: "john.doe@contoso.com",
  placeholder: "Enter user principal name",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const model = input({
  label: "Model",
  comments:
    "The hardware model name reported by the device (e.g., Surface Pro 9, iPhone 15).",
  example: "Surface Pro 9",
  placeholder: "Enter device model",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const manufacturer = input({
  label: "Manufacturer",
  comments:
    "The hardware manufacturer reported by the device (e.g., Microsoft, Apple, Dell).",
  example: "Microsoft",
  placeholder: "Enter manufacturer",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const imei = input({
  label: "IMEI",
  comments: "The International Mobile Equipment Identity number of the device.",
  example: "353456789012345",
  placeholder: "Enter IMEI",
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
  comments: "The hardware serial number of the device.",
  example: "SN-1234567890",
  placeholder: "Enter serial number",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const phoneNumber = input({
  label: "Phone Number",
  comments: "The phone number associated with the device's SIM.",
  example: "+1-555-123-4567",
  placeholder: "Enter phone number",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const androidSecurityPatchLevel = input({
  label: "Android Security Patch Level",
  comments:
    "The most recent Android security patch date applied to the device.",
  example: "2024-01-05",
  placeholder: "Enter Android security patch level",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const userDisplayName = input({
  label: "User Display Name",
  comments: "The display name of the user associated with the managed device.",
  example: "John Doe",
  placeholder: "Enter user display name",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const configurationManagerClientEnabledFeatures = input({
  label: "ConfigMgr Client Enabled Features",
  comments:
    "Configuration Manager client enabled features for co-managed device capabilities.",
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
  comments: "The Wi-Fi media access control address of the device.",
  example: "00:1A:2B:3C:4D:5E",
  placeholder: "Enter Wi-Fi MAC address",
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
  comments: "The mobile network carrier associated with the device's SIM.",
  example: "Verizon",
  placeholder: "Enter subscriber carrier",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const meid = input({
  label: "MEID",
  comments: "The Mobile Equipment Identifier of the CDMA device.",
  example: "A1000012345678",
  placeholder: "Enter MEID",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const totalStorageSpaceInBytes = input({
  label: "Total Storage Space In Bytes",
  comments: "Total Storage in Bytes.",
  example: "8",
  placeholder: "Enter total storage in bytes",
  type: "string",
  required: false,
  clean: cleanNumberInput,
});
const freeStorageSpaceInBytes = input({
  label: "Free Storage Space In Bytes",
  comments: "Free Storage in Bytes. Default value is 0. Read-only.",
  default: "0",
  example: "7",
  placeholder: "Enter free storage in bytes",
  type: "string",
  required: false,
  clean: cleanNumberInput,
});
const managedDeviceName = input({
  label: "Managed Device Name",
  comments:
    "Automatically generated name to identify a device. Can be overwritten to a user friendly name.",
  example: "DESKTOP-ABC1234",
  placeholder: "Enter managed device name",
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
  example: "8901260012345678901",
  default: "",
  placeholder: "Enter ICCID",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const udid = input({
  label: "UDID",
  comments:
    "Unique Device Identifier for iOS and macOS devices. Default is an empty string. To retrieve actual values GET call needs to be made, with device id and included in select parameter. Supports: $select. $Search is not supported. Read-only.",
  example: "A1B2C3D4-E5F6-7890-ABCD-EF1234567890",
  placeholder: "Enter UDID",
  default: "",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const createNotes = input({
  label: "Notes",
  comments:
    "Notes on the device created by IT Admin. Default is null. To retrieve actual values GET call needs to be made, with device id and included in select parameter. Supports: $select. $Search is not supported.",
  example: "Device issued to Marketing department",
  placeholder: "Enter notes",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const ethernetMacAddress = input({
  label: "Ethernet MAC Address",
  comments:
    "Indicates Ethernet MAC Address of the device. Default, is Null (Non-Default property) for this property when returned as part of managedDevice entity. Individual get call with select query options is needed to retrieve actual values. Example: deviceManagement/managedDevices({managedDeviceId})?$select=ethernetMacAddress Supports: $select. $Search is not supported. Read-only.",
  example: "00:1A:2B:3C:4D:5F",
  placeholder: "Enter Ethernet MAC address",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const physicalMemoryInBytes = input({
  label: "Physical Memory In Bytes",
  comments:
    "Total Memory in Bytes. Default is 0. To retrieve actual values GET call needs to be made, with device id and included in select parameter. Supports: $select. Read-only.",
  example: "5",
  placeholder: "Enter physical memory in bytes",
  type: "string",
  required: false,
  clean: cleanNumberInput,
});
const enrollmentProfileName = input({
  label: "Enrollment Profile Name",
  comments:
    "Name of the enrollment profile assigned to the device. Default value is empty string, indicating no enrollment profile was assigned.",
  example: "Corporate iOS Enrollment",
  placeholder: "Enter enrollment profile name",
  default: "",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
export const createManagedDeviceInputs = {
  connection,
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
  notes: createNotes,
  ethernetMacAddress,
  physicalMemoryInBytes,
  enrollmentProfileName,
};
const deleteManagedDeviceId = input({
  label: "Managed Device ID",
  comments: "Unique Identifier for the device to delete.",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter managed device ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
  dataSource: "selectManagedDevice",
});
export const deleteManagedDeviceInputs = {
  connection,
  managedDeviceId: deleteManagedDeviceId,
};
const getManagedDeviceId = input({
  label: "Managed Device ID",
  comments: "Unique Identifier for the device to retrieve.",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter managed device ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
  dataSource: "selectManagedDevice",
});
export const getManagedDeviceInputs = {
  connection,
  managedDeviceId: getManagedDeviceId,
};
const listPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: {
    $top: odataParams.$top,
    $skip: odataParams.$skip,
    $skipToken: odataParams.$skipToken,
  },
});
const listFilters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments: "Optional query controls to sort and refine the results.",
  inputs: {
    $filter: odataParams.$filter,
    $select: odataParams.$select,
    $expand: odataParams.$expand,
    $orderBy: odataParams.$orderBy,
    $count: odataParams.$count,
    $search: odataParams.$search,
    $format: odataParams.$format,
  },
});
export const listManagedDevicesInputs = {
  connection,
  fetchAll,
  pagination: listPagination,
  filters: listFilters,
};
const updateManagedDeviceId = input({
  label: "Managed Device ID",
  comments: "Unique identifier for the managed device to update (UUID format).",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter managed device ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
  dataSource: "selectManagedDevice",
});
const updateManagedDeviceName = input({
  label: "Managed Device Name",
  comments: "Update the device name to make it easier to identify.",
  example: "John-Laptop",
  placeholder: "Enter device name",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const updateNotes = input({
  label: "Notes",
  comments: "Additional notes about the device for documentation purposes.",
  example: "Device issued to John Doe in Marketing department",
  placeholder: "Enter notes",
  type: "string",
  required: false,
  clean: cleanStringInput,
});
const extraFields = input({
  label: "Extra Fields",
  comments:
    "Additional fields to update on the device. This is an object that can contain any additional fields that might not be covered by the other inputs.",
  type: "code",
  language: "json",
  required: false,
  clean: cleanCodeInput,
});
export const updateManagedDeviceInputs = {
  connection,
  managedDeviceId: updateManagedDeviceId,
  managedDeviceName: updateManagedDeviceName,
  notes: updateNotes,
  extraFields,
};
const removeDeviceId = input({
  label: "Managed Device ID",
  comments:
    "Unique Identifier for the device to remove devices from management for.",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter managed device ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
  dataSource: "selectManagedDevice",
});
const removeDetectedAppId = input({
  label: "Detected App ID",
  comments: "Unique Identifier for the detected app to remove devices from.",
  example: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
  placeholder: "Enter detected app ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
});
const removeUserId = input({
  label: "User ID",
  comments:
    "Unique Identifier for the user to remove devices from management for.",
  example: "d36894ae-94ae-d368-ae94-68d3ae9468d3",
  placeholder: "Enter user ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
});
export const removeAllDevicesFromUserInputs = {
  connection,
  managedDeviceId: removeDeviceId,
  detectedAppId: removeDetectedAppId,
  userId: removeUserId,
};
export const retireDeviceInputs = {
  connection,
  managedDeviceId: {
    ...managedDeviceId,
    comments: "Unique Identifier for the device to retire.",
  },
};
export const wipeDeviceInputs = {
  connection,
  managedDeviceId: {
    ...managedDeviceId,
    comments: "Unique Identifier for the device to wipe.",
  },
};
