//#region ../../packages/ms-utils/dist/connections/index.d.ts
declare enum ConnectionKeys {
  SharedOauth = "oauth",
  SharepointTemplatedOauth = "sharepointTemplatedOauth",
  MsExcelOauth = "ms-excel-oauth",
  OauthClientCredentials = "oauthClientCredentials",
  CertificateCredentials = "certificateCredentials"
}
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
//#region src/types/subscriptions.d.ts
interface Subscription {
  id: string;
  notificationUrl: string;
  resource: string;
  changeType: string;
  [key: string]: unknown;
}
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "ms-onedrive";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/ms-onedrive/";
  display: {
    label: string;
    category: "Data Platforms";
    description: string;
    iconPath: string;
  };
  dataSources: {
    listDrives: import("@prismatic-io/spectral").DataSourceDefinition<{
      oneDriveConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listFolders: import("@prismatic-io/spectral").DataSourceDefinition<{
      oneDriveConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      dir: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listFilesInDirectory: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      dir: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listGroups: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listUsers: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSite: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSubscription: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  actions: {
    searchUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      oneDriveConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      changeType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      notificationUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resource: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expirationDateTime: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (input: unknown) => string;
      };
      clientState: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
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
    deleteSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      oneDriveConnection: {
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
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      oneDriveConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {};
    }>;
    listSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      oneDriveConnection: {
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
        value: Subscription[];
        "@odata.context"?: string;
      };
    }>;
    renewSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      oneDriveConnection: {
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
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expirationDays: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        default: string;
        required: false;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GraphSubscription;
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
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
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
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageToken: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        "@odata.context": string;
        value: {
          id: string;
          createdDateTime: string;
          lastModifiedDateTime: string;
          name: string;
          displayName: string;
          webUrl: string;
          siteCollection: {
            hostname: string;
          };
        }[];
      };
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
    listGroups: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pageToken: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        "@odata.context": string;
        value: {
          id: string;
          createdDateTime: string;
          displayName: string;
          description: string;
          mail: string;
          mailEnabled: boolean;
          mailNickname: string;
          securityEnabled: boolean;
          groupTypes: string[];
        }[];
      };
    }>;
    deleteFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      itemId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
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
      fileLocation: {
        label: string;
        example: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Buffer<any>;
      contentType: string;
    }>;
    uploadFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fileName: {
        label: string;
        example: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown) => string;
      };
      fileData: {
        label: string;
        type: "data";
        required: true;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      dir: {
        label: string;
        comments: string;
        example: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown) => string;
      };
      fileName: {
        label: string;
        required: boolean;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      path: {
        label: string;
        required: boolean;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      values: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    moveFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      dir: {
        label: string;
        comments: string;
        example: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown) => string;
      };
      path: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string;
      };
      fileName: {
        label: string;
        example: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getItem: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      dir: {
        label: string;
        comments: string;
        example: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getItemById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      itemId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listChildren: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      itemId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageToken: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        "@odata.context": string;
        value: ({
          id: string;
          createdDateTime: string;
          lastModifiedDateTime: string;
          name: string;
          size: number;
          webUrl: string;
          file: {
            mimeType: string;
          };
          parentReference: {
            driveId: string;
            id: string;
            path: string;
          };
          folder?: undefined;
        } | {
          id: string;
          createdDateTime: string;
          lastModifiedDateTime: string;
          name: string;
          size: number;
          webUrl: string;
          folder: {
            childCount: number;
          };
          parentReference: {
            driveId: string;
            id: string;
            path: string;
          };
          file?: undefined;
        })[];
      };
    }>;
    listDriveItems: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      dir: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageToken: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        "@odata.context": string;
        value: ({
          id: string;
          createdDateTime: string;
          lastModifiedDateTime: string;
          name: string;
          size: number;
          webUrl: string;
          file: {
            mimeType: string;
          };
          parentReference: {
            driveId: string;
            id: string;
            path: string;
          };
          folder?: undefined;
        } | {
          id: string;
          createdDateTime: string;
          lastModifiedDateTime: string;
          name: string;
          size: number;
          webUrl: string;
          folder: {
            childCount: number;
          };
          parentReference: {
            driveId: string;
            id: string;
            path: string;
          };
          file?: undefined;
        })[];
      };
    }>;
    listShared: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSharedFiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageToken: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        "@odata.context": string;
        value: {
          id: string;
          name: string;
          size: number;
          webUrl: string;
          remoteItem: {
            id: string;
            name: string;
            file: {
              mimeType: string;
            };
            parentReference: {
              driveId: string;
              driveType: string;
            };
            createdBy: {
              user: {
                email: string;
                id: string;
                displayName: string;
              };
            };
            lastModifiedBy: {
              user: {
                email: string;
                id: string;
                displayName: string;
              };
            };
          };
        }[];
      };
    }>;
    listChanges: import("@prismatic-io/spectral").ActionDefinition<{
      oneDriveConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      deltaURL: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      $select: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      $expand: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      $top: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchDrive: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      search: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
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
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageToken: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        "@odata.context": string;
        value: ({
          id: string;
          createdDateTime: string;
          lastModifiedDateTime: string;
          name: string;
          driveType: string;
          webUrl: string;
          owner: {
            user: {
              email: string;
              id: string;
              displayName: string;
            };
            group?: undefined;
          };
          quota: {
            deleted: number;
            remaining: number;
            state: string;
            total: number;
            used: number;
          };
        } | {
          id: string;
          createdDateTime: string;
          lastModifiedDateTime: string;
          name: string;
          driveType: string;
          webUrl: string;
          owner: {
            group: {
              email: string;
              id: string;
              displayName: string;
            };
            user?: undefined;
          };
          quota: {
            deleted: number;
            remaining: number;
            state: string;
            total: number;
            used: number;
          };
        })[];
      };
    }>;
    listDrivesByGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageToken: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        "@odata.context": string;
        value: ({
          id: string;
          createdDateTime: string;
          lastModifiedDateTime: string;
          name: string;
          driveType: string;
          webUrl: string;
          owner: {
            user: {
              email: string;
              id: string;
              displayName: string;
            };
            group?: undefined;
          };
          quota: {
            deleted: number;
            remaining: number;
            state: string;
            total: number;
            used: number;
          };
        } | {
          id: string;
          createdDateTime: string;
          lastModifiedDateTime: string;
          name: string;
          driveType: string;
          webUrl: string;
          owner: {
            group: {
              email: string;
              id: string;
              displayName: string;
            };
            user?: undefined;
          };
          quota: {
            deleted: number;
            remaining: number;
            state: string;
            total: number;
            used: number;
          };
        })[];
      };
    }>;
    listDrivesByUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageToken: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        "@odata.context": string;
        value: ({
          id: string;
          createdDateTime: string;
          lastModifiedDateTime: string;
          name: string;
          driveType: string;
          webUrl: string;
          owner: {
            user: {
              email: string;
              id: string;
              displayName: string;
            };
            group?: undefined;
          };
          quota: {
            deleted: number;
            remaining: number;
            state: string;
            total: number;
            used: number;
          };
        } | {
          id: string;
          createdDateTime: string;
          lastModifiedDateTime: string;
          name: string;
          driveType: string;
          webUrl: string;
          owner: {
            group: {
              email: string;
              id: string;
              displayName: string;
            };
            user?: undefined;
          };
          quota: {
            deleted: number;
            remaining: number;
            state: string;
            total: number;
            used: number;
          };
        })[];
      };
    }>;
    listDrivesBySite: import("@prismatic-io/spectral").ActionDefinition<{
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
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pageLimit: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageToken: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        "@odata.context": string;
        value: ({
          id: string;
          createdDateTime: string;
          lastModifiedDateTime: string;
          name: string;
          driveType: string;
          webUrl: string;
          owner: {
            user: {
              email: string;
              id: string;
              displayName: string;
            };
            group?: undefined;
          };
          quota: {
            deleted: number;
            remaining: number;
            state: string;
            total: number;
            used: number;
          };
        } | {
          id: string;
          createdDateTime: string;
          lastModifiedDateTime: string;
          name: string;
          driveType: string;
          webUrl: string;
          owner: {
            group: {
              email: string;
              id: string;
              displayName: string;
            };
            user?: undefined;
          };
          quota: {
            deleted: number;
            remaining: number;
            state: string;
            total: number;
            used: number;
          };
        })[];
      };
    }>;
    getDrive: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: ConnectionKeys.SharedOauth;
    display: {
      description: string;
      label: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: false;
        comments: string;
        default: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
      source: {
        label: string;
        type: "string";
        required: true;
        shown: false;
        default: string;
      };
    };
  }, ConnectionKeys.SharedOauth>[];
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, true, import("@prismatic-io/spectral").TriggerBranchingResult<import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>>, import("@prismatic-io/spectral").Inputs>;
    instanceDeployWebhook: import("@prismatic-io/spectral").TriggerDefinition<{
      oneDriveConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resource: {
        comments: string;
        default: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      changeType: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      clientState: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expirationDateTime: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (input: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, import("@prismatic-io/spectral").TriggerBranchingResult<import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>>, import("@prismatic-io/spectral").Inputs>;
  };
}>;
export = _default;