export interface PagedResponse<T> {
  results: T[];
  totalCount: number;
}

export interface RichPagedResponse<T> extends PagedResponse<T> {
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface JamfCreateResponse {
  id: string;
  href: string;
}

export interface ComputerInventory {
  id: string;
  udid: string | null;
  general?: {
    name: string;
    lastContactTime: string | null;
    lastEnrolledDate?: string | null;
    platform: string;
    assetTag: string | null;
    reportDate: string | null;
    remoteManagement: { managed: boolean };
    supervised: boolean;
  };
  hardware?: {
    make: string;
    model: string;
    serialNumber: string;
    processorType: string | null;
    totalRamMegabytes: number;
  };
  operatingSystem?: {
    name: string;
    version: string;
    build: string;
  };
  userAndLocation?: {
    username: string | null;
    realname: string | null;
    email: string | null;
    department: string | null;
    building: string | null;
  };
  security?: {
    sipStatus: string | null;
    gatekeeperStatus: string | null;
    xprotectVersion: string | null;
    firewall: boolean | null;
  };
}

export type NewComputersChanges = ComputerInventory[];

export interface NewComputerChange {
  changeType: "created";
  record: ComputerInventory;
}

export interface MobileDevice {
  id: string;
  managementId: string | null;
  name: string | null;
  udid: string | null;
  serialNumber: string | null;
  wifiMacAddress: string | null;
  phoneNumber: string | null;
  username: string | null;
  type: string | null;
  model: string | null;
  modelIdentifier: string | null;
  softwareUpdateDeviceId: string | null;
}

export interface MobileDeviceDetail extends MobileDevice {
  osVersion: string | null;
  osType: string | null;
  realname: string | null;
  email: string | null;
  department: string | null;
}

export interface MobileDeviceInventory {
  mobileDeviceId: string;
  deviceType: string | null;
  general?: {
    udid: string | null;
    displayName: string | null;
    assetTag: string | null;
    siteId: string | null;
    lastInventoryUpdateDate: string | null;
    osVersion: string | null;
    osRapidSecurityResponse: string | null;
    osBuild: string | null;
    osSupplementalBuildVersion: string | null;
    softwareUpdateDeviceId: string | null;
    ipAddress: string | null;
    managed: boolean;
    supervised: boolean;
    deviceOwnershipType: string | null;
    enrollmentMethodPrestage: string | null;
    enrollmentSessionTokenValid: boolean;
    lastEnrolledDate: string | null;
    mdmProfileExpirationDate: string | null;
    timeZone: string | null;
    declarativeDeviceManagementEnabled: boolean;
    managementId: string | null;
    extensionAttributes: unknown[] | null;
    lastLoggedInUsernameSelfService: string | null;
    lastLoggedInUsernameSelfServiceTimestamp: string | null;
    sharedIpad: boolean;
    diagnosticAndUsageReportingEnabled: boolean;
    appAnalyticsEnabled: boolean;
    residentUsers: number | null;
    quotaSize: number | null;
    temporarySessionOnly: boolean | null;
    temporarySessionTimeout: number | null;
    userSessionTimeout: number | null;
    syncedToComputer: number | null;
    maximumSharediPadUsersStored: number | null;
    lastBackupDate: string | null;
    deviceLocatorServiceEnabled: boolean;
    doNotDisturbEnabled: boolean;
    cloudBackupEnabled: boolean;
    lastCloudBackupDate: string | null;
    locationServicesForSelfServiceMobileEnabled: boolean;
    itunesStoreAccountActive: boolean;
    exchangeDeviceId: string | null;
    tethered: boolean;
  } | null;
  hardware?: {
    capacityMb: number | null;
    availableSpaceMb: number | null;
    usedSpacePercentage: number | null;
    batteryLevel: number | null;
    serialNumber: string | null;
    wifiMacAddress: string | null;
    bluetoothMacAddress: string | null;
    modelIdentifier: string | null;
    model: string | null;
    modelNumber: string | null;
    bluetoothLowEnergyCapable: boolean | null;
    deviceId: string | null;
  } | null;
  userAndLocation?: {
    username: string | null;
    realName: string | null;
    emailAddress: string | null;
    position: string | null;
    phoneNumber: string | null;
    departmentId: string | null;
    buildingId: string | null;
    room: string | null;
    building: string | null;
    department: string | null;
  } | null;
  security?: {
    dataProtected: boolean | null;
    blockLevelEncryptionCapable: boolean | null;
    fileLevelEncryptionCapable: boolean | null;
    passcodePresent: boolean | null;
    passcodeCompliant: boolean | null;
    passcodeCompliantWithProfile: boolean | null;
    hardwareEncryption: number | null;
    activationLockEnabled: boolean | null;
    jailBreakDetected: boolean | null;
    lostModeEnabled: boolean | null;
  } | null;
}

export interface JamfUser {
  id: string;
  username: string;
  realname: string | null;
  email: string | null;
  position: string | null;
  enableCustomPhotoUrl: boolean;
  customPhotoUrl: string | null;
  ldapServer: { id: string; name: string | null } | null;
  extensionAttributes: unknown[];
}

export interface Department {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  priority: number;
}

export interface Script {
  id: string;
  name: string;
  categoryId: string | null;
  categoryName: string | null;
  info: string | null;
  notes: string | null;
  priority: string;
  parameter4: string | null;
  parameter5: string | null;
  parameter6: string | null;
  parameter7: string | null;
  parameter8: string | null;
  parameter9: string | null;
  parameter10: string | null;
  parameter11: string | null;
  osRequirements: string | null;
  scriptContents: string | null;
}

export interface Package {
  id: string;
  packageName: string;
  fileName: string;
  categoryId: string | null;
  info: string | null;
  notes: string | null;
  priority: number;
  osRequirements: string;
  rebootRequired: boolean;
  fillUserTemplate: boolean;
  indexed: boolean;
  fillExistingUsers: boolean;
  swu: boolean;
  selfHealNotify: boolean;
  selfHealingAction: string | null;
  osInstall: boolean;
  serialNumber: string;
  parentPackageId: string;
  basePath: string;
  suppressUpdates: boolean;
  cloudTransferStatus: string | null;
  ignoreConflicts: boolean;
  suppressFromDock: boolean;
  suppressEula: boolean;
  suppressRegistration: boolean;
  installLanguage: string;
  md5: string;
  sha256: string;
  hashType: string | null;
  hashValue: string;
  size: string;
  osInstallerVersion: string;
  manifest: string;
  manifestFileName: string;
  format: string;
  sha3512: string;
}

export interface Webhook {
  id: number;
  name: string;
  enabled: boolean;
  url: string;
  content_type: string;
  event: string;
  connection_timeout?: number;
  read_timeout?: number;
  authentication_type?: string;
  username?: string;
  password?: string;
  header?: string;
  hash_algorithm?: string;
  enable_display_fields_for_group_object?: boolean;
  display_fields?: unknown[];
  smart_group_id?: number;
}

export interface WebhookListItem {
  id: number;
  name: string;
}

export interface WebhookMutationResult {
  id: number | null;
}

export interface WebhookResponse {
  webhook: Webhook;
}

export interface WebhooksListResponse {
  webhooks: WebhookListItem[];
}

export interface ManagedWebhookState {
  webhookIds: number[];
  webhookAuthValue: string;
}

export interface ComputerPollCursor extends Record<string, unknown> {
  watermark: string;
  boundaryIds: string[];
  tieGroup?: { lastKey: string | null };
}

export interface ComputerPollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  boundaryIds?: string[];
  cursor?: ComputerPollCursor;
}

export interface ComputerPageQuery {
  filter: string;
  sort: string;
  pageSize: number;
}

export type FetchComputerPage = (
  query: ComputerPageQuery,
) => Promise<ComputerInventory[]>;

export interface ComputerDrainRound {
  delivered: ComputerInventory[];
  cursor: ComputerPollCursor;
  drained: boolean;
}

export interface MobileDevicePollingState {
  lastMaxId?: number;
}

export type AttrSelector<T> = keyof T | ((item: T) => unknown);
