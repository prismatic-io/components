//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/index.d.ts
interface PagedResponse<T> {
  results: T[];
  totalCount: number;
}
interface RichPagedResponse<T> extends PagedResponse<T> {
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
interface JamfCreateResponse {
  id: string;
  href: string;
}
interface ComputerInventory {
  id: string;
  udid: string | null;
  general?: {
    name: string;
    lastContactTime: string | null;
    lastEnrolledDate?: string | null;
    platform: string;
    assetTag: string | null;
    reportDate: string | null;
    remoteManagement: {
      managed: boolean;
    };
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
interface MobileDevice {
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
interface MobileDeviceDetail extends MobileDevice {
  osVersion: string | null;
  osType: string | null;
  realname: string | null;
  email: string | null;
  department: string | null;
}
interface MobileDeviceInventory {
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
interface JamfUser {
  id: string;
  username: string;
  realname: string | null;
  email: string | null;
  position: string | null;
  enableCustomPhotoUrl: boolean;
  customPhotoUrl: string | null;
  ldapServer: {
    id: string;
    name: string | null;
  } | null;
  extensionAttributes: unknown[];
}
interface Department {
  id: string;
  name: string;
}
interface Category {
  id: string;
  name: string;
  priority: number;
}
interface Script {
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
interface Package {
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
interface Webhook {
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
interface WebhookListItem {
  id: number;
  name: string;
}
interface WebhookMutationResult {
  id: number | null;
}
interface WebhookResponse {
  webhook: Webhook;
}
interface WebhooksListResponse {
  webhooks: WebhookListItem[];
}
interface ComputerPollCursor extends Record<string, unknown> {
  watermark: string;
  boundaryIds: string[];
  tieGroup?: {
    lastKey: string | null;
  };
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "jamf";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/jamf/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  actions: {
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
      };
      method: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: Method;
          value: Method;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      data: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      formData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileDataFileNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (values: any) => Record<string, string> | undefined;
      };
      queryParams: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
      headers: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      responseType: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        required: true;
        comments: string;
        model: {
          label: ResponseType;
          value: ResponseType;
        }[];
        clean: (value: unknown) => ResponseType;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      retryDelayMS: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      retryAllErrors: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      maxRetries: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      useExponentialBackoff: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      apiType: {
        label: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      webhookEvent: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      webhookUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          webhookContentType: {
            label: string;
            type: "string";
            required: false;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
            example: string;
          };
          webhookEnabled: {
            label: string;
            type: "boolean";
            required: false;
            default: string;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          webhookAuthType: {
            label: string;
            type: "string";
            required: false;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          webhookAuthHeaderName: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          webhookAuthHeaderValue: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: number | null;
      };
    }>;
    deleteInstancedWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        webhooksDeleted: number;
      };
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    getWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: WebhookResponse;
    }>;
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: WebhooksListResponse;
    }>;
    updateWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          webhookName: {
            required: boolean;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            comments: string;
            placeholder: string;
            example: string;
          };
          webhookEvent: {
            required: boolean;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            placeholder: string;
            example: string;
          };
          webhookUrl: {
            required: boolean;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            comments: string;
            placeholder: string;
            example: string;
          };
          webhookContentType: {
            default: undefined;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            example: string;
          };
          webhookEnabled: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => boolean | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: WebhookMutationResult;
    }>;
    createPackage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      packageName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      packageFileName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      packageCategoryId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          packagePriority: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            placeholder: string;
            example: string;
          };
          packageInfo: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          packageNotes: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          packageRebootRequired: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          packageOsInstall: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          packageFillUserTemplate: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          packageSuppressUpdates: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          packageSuppressEula: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          packageSuppressFromDock: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          packageSuppressRegistration: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: JamfCreateResponse;
    }>;
    deletePackage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    getPackage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Package;
    }>;
    listPackages: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
            default: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      sort: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PagedResponse<Package>;
    }>;
    updatePackage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      packageCategoryId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          packageName: {
            required: boolean;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            comments: string;
            placeholder: string;
            example: string;
          };
          packageFileName: {
            required: boolean;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            comments: string;
            placeholder: string;
            example: string;
          };
          packagePriority: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            placeholder: string;
            example: string;
          };
          packageInfo: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          packageNotes: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          packageRebootRequired: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => boolean | undefined;
          };
          packageOsInstall: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => boolean | undefined;
          };
          packageFillUserTemplate: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => boolean | undefined;
          };
          packageSuppressUpdates: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => boolean | undefined;
          };
          packageSuppressEula: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => boolean | undefined;
          };
          packageSuppressFromDock: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => boolean | undefined;
          };
          packageSuppressRegistration: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => boolean | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Package;
    }>;
    createScript: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      scriptName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      scriptCategoryId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          scriptContents: {
            label: string;
            type: "text";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          scriptPriority: {
            label: string;
            type: "string";
            required: false;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          scriptInfo: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          scriptNotes: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: JamfCreateResponse;
    }>;
    deleteScript: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    getScript: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Script;
    }>;
    listScripts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
            default: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      sort: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PagedResponse<Script>;
    }>;
    updateScript: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      scriptCategoryId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          scriptName: {
            required: boolean;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            comments: string;
            placeholder: string;
            example: string;
          };
          scriptContents: {
            label: string;
            type: "text";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          scriptPriority: {
            default: undefined;
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          scriptInfo: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          scriptNotes: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Script;
    }>;
    createCategory: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      categoryName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      priority: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: JamfCreateResponse;
    }>;
    deleteCategory: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    getCategory: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Category;
    }>;
    listCategories: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
            default: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      sort: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PagedResponse<Category>;
    }>;
    updateCategory: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      categoryName: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
      };
      priority: {
        default: undefined;
        clean: (value: unknown) => number | undefined;
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Category;
    }>;
    createDepartment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      departmentName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: JamfCreateResponse;
    }>;
    deleteDepartment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    getDepartment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Department;
    }>;
    listDepartments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
            default: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      sort: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PagedResponse<Department>;
    }>;
    updateDepartment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      departmentName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Department;
    }>;
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
            default: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      sort: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: RichPagedResponse<JamfUser>;
    }>;
    getMobileDevice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: MobileDeviceDetail;
    }>;
    listMobileDevices: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
            default: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      sort: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      section: {
        label: string;
        type: "string";
        collection: "valuelist";
        default: string[];
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string[];
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PagedResponse<MobileDeviceInventory>;
    }>;
    getComputer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      section: {
        label: string;
        type: "string";
        collection: "valuelist";
        default: string[];
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string[];
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ComputerInventory;
    }>;
    listComputers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
            default: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      sort: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      section: {
        label: string;
        type: "string";
        collection: "valuelist";
        default: string[];
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string[];
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PagedResponse<ComputerInventory>;
    }>;
    updateComputer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      computerUpdateBody: {
        label: string;
        language: "json";
        type: "code";
        required: true;
        comments: string;
        clean: (value: unknown) => object;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "jamfClientCredentials";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      baseUrl: {
        label: string;
        type: "string";
        required: true;
        shown: boolean;
        comments: string;
        placeholder: string;
        example: string;
      };
      clientId: {
        label: string;
        type: "string";
        required: true;
        shown: boolean;
        comments: string;
        placeholder: string;
        example: string;
      };
      clientSecret: {
        label: string;
        type: "password";
        required: true;
        shown: boolean;
        comments: string;
      };
    };
  }, "jamfClientCredentials"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "jamfBearerToken";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      baseUrl: {
        label: string;
        type: "string";
        required: true;
        shown: boolean;
        comments: string;
        placeholder: string;
        example: string;
      };
      username: {
        label: string;
        type: "string";
        required: true;
        shown: boolean;
        comments: string;
        placeholder: string;
        example: string;
      };
      password: {
        label: string;
        type: "password";
        required: true;
        shown: boolean;
        comments: string;
      };
    };
  }, "jamfBearerToken">)[];
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{
      authHeaderName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      authHeaderValue: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
    webhookEvents: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      events: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        default: string[];
        comments: string;
        clean: (value: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
    pollNewComputers: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        paginationState: ComputerPollCursor | undefined;
        body: {
          data: ComputerInventory[];
        };
        headers: {
          [key: string]: string;
        };
        queryParameters: {
          [key: string]: string;
        };
        rawBody: {
          data: unknown;
          contentType?: string;
        };
        pathFragment: string;
        webhookUrls: {
          [key: string]: string;
        };
        webhookApiKeys: {
          [key: string]: string[];
        };
        invokeUrl: string;
        executionId: string;
        customer: import("@prismatic-io/spectral").CustomerAttributes;
        instance: import("@prismatic-io/spectral").InstanceAttributes;
        user: import("@prismatic-io/spectral").UserAttributes;
        integration: import("@prismatic-io/spectral").IntegrationAttributes;
        flow: import("@prismatic-io/spectral").FlowAttributes;
        startedAt: string;
        globalDebug: boolean;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
    pollNewMobileDevices: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: MobileDevice[];
        };
        headers: {
          [key: string]: string;
        };
        queryParameters: {
          [key: string]: string;
        };
        rawBody: {
          data: unknown;
          contentType?: string;
        };
        pathFragment: string;
        webhookUrls: {
          [key: string]: string;
        };
        webhookApiKeys: {
          [key: string]: string[];
        };
        invokeUrl: string;
        executionId: string;
        customer: import("@prismatic-io/spectral").CustomerAttributes;
        instance: import("@prismatic-io/spectral").InstanceAttributes;
        user: import("@prismatic-io/spectral").UserAttributes;
        integration: import("@prismatic-io/spectral").IntegrationAttributes;
        flow: import("@prismatic-io/spectral").FlowAttributes;
        startedAt: string;
        globalDebug: boolean;
        paginationState?: Record<string, unknown> | undefined;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    selectComputer: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectMobileDevice: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDepartment: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCategory: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPackage: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectScript: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWebhook: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
}>;
export = _default;