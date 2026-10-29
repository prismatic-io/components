import type { Element } from "@prismatic-io/spectral";
import type {
  MobileDevice,
  MobileDeviceDetail,
  MobileDeviceInventory,
  PagedResponse,
} from "../types";

const mobileDeviceExample: MobileDevice = {
  id: "5",
  managementId: "mgmt-abc-123",
  name: "iPad-001",
  udid: "B3D6E19F-4321-8765-DCBA-EF0A1B2C3D4E",
  serialNumber: "DMPC123456789",
  wifiMacAddress: "a4:5e:60:ab:cd:ef",
  phoneNumber: null,
  username: "jdoe",
  type: "ios",
  model: "iPad Pro (11-inch) (4th generation)",
  modelIdentifier: "iPad14,3",
  softwareUpdateDeviceId: null,
};

export const getMobileDeviceExamplePayload: { data: MobileDeviceDetail } = {
  data: {
    ...mobileDeviceExample,
    osVersion: "17.4",
    osType: "iOS",
    realname: "Jane Doe",
    email: "jdoe@example.com",
    department: "Engineering",
  },
};

const mobileDeviceInventoryExample: MobileDeviceInventory = {
  mobileDeviceId: "5",
  deviceType: "iOS",
  general: {
    udid: "B3D6E19F-4321-8765-DCBA-EF0A1B2C3D4E",
    displayName: "iPad-001",
    assetTag: "304822",
    siteId: "1",
    lastInventoryUpdateDate: "2026-06-14T18:22:05.000Z",
    osVersion: "17.4",
    osRapidSecurityResponse: "(a)",
    osBuild: "21E219",
    osSupplementalBuildVersion: "21E220",
    softwareUpdateDeviceId: "J617AP",
    ipAddress: "10.0.12.45",
    managed: true,
    supervised: true,
    deviceOwnershipType: "Institutional",
    enrollmentMethodPrestage: "PreStage enrollment",
    enrollmentSessionTokenValid: true,
    lastEnrolledDate: "2026-01-05T09:14:00.000Z",
    mdmProfileExpirationDate: "2027-01-05T09:14:00.000Z",
    timeZone: "America/Chicago",
    declarativeDeviceManagementEnabled: true,
    managementId: "mgmt-abc-123",
    extensionAttributes: [],
    lastLoggedInUsernameSelfService: null,
    lastLoggedInUsernameSelfServiceTimestamp: null,
    sharedIpad: false,
    diagnosticAndUsageReportingEnabled: false,
    appAnalyticsEnabled: false,
    residentUsers: null,
    quotaSize: null,
    temporarySessionOnly: null,
    temporarySessionTimeout: null,
    userSessionTimeout: null,
    syncedToComputer: -1,
    maximumSharediPadUsersStored: -1,
    lastBackupDate: "2026-06-10T03:00:00.000Z",
    deviceLocatorServiceEnabled: false,
    doNotDisturbEnabled: false,
    cloudBackupEnabled: true,
    lastCloudBackupDate: "2026-06-13T03:11:00.000Z",
    locationServicesForSelfServiceMobileEnabled: false,
    itunesStoreAccountActive: false,
    exchangeDeviceId: "",
    tethered: false,
  },
  hardware: {
    capacityMb: 256000,
    availableSpaceMb: 198450,
    usedSpacePercentage: 22,
    batteryLevel: 87,
    serialNumber: "DMPC123456789",
    wifiMacAddress: "a4:5e:60:ab:cd:ef",
    bluetoothMacAddress: "a4:5e:60:ab:cd:f0",
    modelIdentifier: "iPad14,3",
    model: "iPad Pro (11-inch) (4th generation)",
    modelNumber: "MNXE3LL/A",
    bluetoothLowEnergyCapable: true,
    deviceId: "J617AP",
  },
  userAndLocation: {
    username: "jdoe",
    realName: "Jane Doe",
    emailAddress: "jdoe@example.com",
    position: "Field Technician",
    phoneNumber: "555-0142",
    departmentId: "1",
    buildingId: "1",
    room: "204",
    building: "Headquarters",
    department: "Engineering",
  },
  security: {
    dataProtected: true,
    blockLevelEncryptionCapable: true,
    fileLevelEncryptionCapable: true,
    passcodePresent: true,
    passcodeCompliant: true,
    passcodeCompliantWithProfile: true,
    hardwareEncryption: 3,
    activationLockEnabled: true,
    jailBreakDetected: false,
    lostModeEnabled: false,
  },
};

export const listMobileDevicesExamplePayload: {
  data: PagedResponse<MobileDeviceInventory>;
} = {
  data: {
    results: [mobileDeviceInventoryExample],
    totalCount: 1,
  },
};

export const selectMobileDeviceExamplePayload: { result: Element[] } = {
  result: [{ key: "5", label: "iPad-001" }],
};
