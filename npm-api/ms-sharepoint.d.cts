//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region ../../packages/ms-utils/dist/interfaces/Subscriptions.d.ts
interface GraphSubscription {
  id?: string;
  resource: string;
  changeType: string;
  notificationUrl: string;
  expirationDateTime: string;
  clientState?: string;
  latestSupportedTlsVersion?: string;
  creatorId?: string;
}
//#endregion
//#region src/actions/enums.d.ts
declare enum TriggerBranches {
  Notification = "Notification",
  URLValidation = "URL Validation"
}
//#endregion
//#region src/interfaces.d.ts
interface DriveItem {
  id: string;
  name: string;
  folder?: {
    childCount: number;
  };
  file?: {
    mimeType: string;
  };
  size?: number;
  webUrl?: string;
  lastModifiedDateTime?: string;
  createdDateTime?: string;
  deleted?: {
    state: string;
  };
  parentReference: {
    driveId: string;
    id: string;
    path: string;
  };
}
interface SiteDeltaCursor extends Record<string, unknown> {
  remaining: string[];
  nextLink?: string;
}
interface PollSiteChangesSeparatedChanges {
  deleted?: DriveItem[];
  added?: DriveItem[];
  updated?: DriveItem[];
  moved?: DriveItem[];
}
interface PollSiteChangesResult {
  [key: string]: PollSiteChangesSeparatedChanges;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "ms-sharepoint";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/ms-sharepoint/";
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  actions: {
    listItems: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      driveId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      folderId: {
        comments: string;
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchItems: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        dataSource: string;
        example: string;
      };
      query: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown[]>;
    }>;
    checkItemExists: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        dataSource: string;
        example: string;
      };
      driveId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      itemPath: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        exists: boolean;
        message: string;
        item: any;
      };
    } | {
      data: {
        exists: boolean;
        message: string;
        item?: undefined;
      };
    }>;
    moveFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      listId: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
      };
      driveId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      itemId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        dataSource: string;
        example: string;
      };
      parentItemId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createFolder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        dataSource: string;
        example: string;
      };
      driveId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentItemId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      folderName: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    renameFolder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        dataSource: string;
        example: string;
      };
      driveId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      folderId: {
        comments: string;
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      folderName: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listChanges: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      deltaURL: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      $select: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      $expand: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      $top: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      changeType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      notificationUrl: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resource: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expirationDateTime: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (input: unknown) => string;
      };
      clientState: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      allowDuplicates: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GraphSubscription;
    }>;
    deleteAllInstanceSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      notificationUrl: {
        comments: string;
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        subscriptionsRemoved: string[];
        count: number;
      };
    }>;
    deleteSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subscriptionId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      showInstanceSubscriptions: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        value: {
          [key: string]: unknown;
          notificationUrl: string;
        }[];
        "@odata.context": string;
      };
    }>;
    renewSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subscriptionId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expirationDays: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
        default: string;
        required: false;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GraphSubscription;
    }>;
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createSiteListSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      listId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
      };
      notificationUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expirationDateTime: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (rawValue: unknown) => string;
      };
      allowDuplicates: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateSiteListSubscriptionExpiration: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subscriptionId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expirationDateTime: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (rawValue: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSharedDocuments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSites: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pageToken: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listFollowedSites: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pageToken: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getRootSite: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSite: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSiteLists: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getListItemsInSite: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      listId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pageToken: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      optInFields: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createItemInSite: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      listId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
      };
      fields: {
        label: string;
        type: "string";
        required: true;
        collection: "keyvaluelist";
        placeholder: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getList: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      listId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getItemInSite: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      listId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
      };
      itemId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      optInFields: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDrives: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pageToken: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDrive: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        required: false;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        required: false;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      listId: {
        required: false;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      itemId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    uploadFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        required: false;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fileName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
      };
      fileData: {
        label: string;
        type: "data";
        required: true;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      folderId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        required: false;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      listId: {
        required: false;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      itemId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      fileData: {
        label: string;
        type: "data";
        required: true;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    downloadFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        required: false;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      listId: {
        required: false;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      itemId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
      contentType: any;
    }>;
    getFilesFromDriveFolderWithPagination: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        required: false;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      folderId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pageToken: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getFilesFromDriveWithPagination: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        required: false;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pageToken: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      recursive: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      branch: TriggerBranches;
    }, import("@prismatic-io/spectral").Inputs>;
    instanceDeployWebhook: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resource: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      changeType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      clientState: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expirationDateTime: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (input: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      branch: TriggerBranches;
    }, import("@prismatic-io/spectral").Inputs>;
    pollSiteChanges: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: Record<string, unknown>;
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
      polledNoChanges: true;
    } | {
      payload: {
        paginationState: SiteDeltaCursor | undefined;
        body: {
          data: PollSiteChangesResult;
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
    drivePollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        required: false;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: PollSiteChangesSeparatedChanges;
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
    }, import("@prismatic-io/spectral").Inputs>;
    folderPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      folderId: {
        comments: string;
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      includeSubfolders: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: PollSiteChangesSeparatedChanges;
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
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: any[];
  dataSources: {
    listDrives: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listFolders: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      driveId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listSites: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listItemsInSiteList: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
      };
      listId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listSubscriptions: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSiteList: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      siteId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
}>;
export = _default;