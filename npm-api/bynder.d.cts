//#region src/types/index.d.ts
interface PollState {
  itemsDone: string[];
  itemsFailed: string[];
  itemsRejected: string[];
}
interface Collection {
  userId: string;
  dateModified: string;
  filename: string;
  dateCreated: string;
  collectionCount: number;
  id: string;
  name: string;
  cover: Cover;
  user: User;
  description: string;
  IsPublic: number;
}
interface Cover {
  thumbnail: string;
  thumbnails: string[];
  large: string;
}
interface User {
  id: string;
  name: string;
}
type OrderStatus = "IN_PROGRESS" | "CANCELED" | "FAILED" | "WAITING_FOR_PAYMENT" | "FOR_ORDER" | "IN_PRODUCTION" | "PRODUCTION_SUSPENDED" | "OUT_FOR_DELIVERY" | "FINISHED";
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/triggers.d.ts
interface BynderRecord {
  id: string;
  [key: string]: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "bynder";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/bynder/";
  display: {
    label: string;
    category: "Application Connectors";
    description: string;
    iconPath: string;
  };
  actions: {
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
      page: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      includeInActive: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
      headers: Record<string, string>;
    }>;
    getUser: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        comments: string;
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createUser: import("@prismatic-io/spectral").ActionDefinition<{
      email: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      password: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      profileId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      firstname: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      lastname: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      username: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      bodyData: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteUser: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateUser: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        comments: string;
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      email: {
        required: false;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      password: {
        required: false;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      profileId: {
        required: false;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      firstname: {
        required: false;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      lastname: {
        required: false;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      username: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      bodyData: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    finaliseCompleteUpload: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      targetid: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      s3Filename: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      chunks: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => number | undefined;
      };
      originalFilename: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    finaliseCompleteUploadAndSaveAsNewAsset: import("@prismatic-io/spectral").ActionDefinition<{
      assetId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      uploadId: {
        label: string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      targetid: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      s3Filename: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      chunks: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => number | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getClosestS3Endpoint: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    initialiseUpload: import("@prismatic-io/spectral").ActionDefinition<{
      filename: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    registerUploadedChunk: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      chunkNumber: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => number | undefined;
      };
      targetid: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      filename: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    retrievePollState: import("@prismatic-io/spectral").ActionDefinition<{
      items: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PollState;
    } | undefined>;
    saveAsNewAsset: import("@prismatic-io/spectral").ActionDefinition<{
      importId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      brandId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      copyright: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      bodyData: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    saveAsNewAssetVersion: import("@prismatic-io/spectral").ActionDefinition<{
      assetId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      importId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    uploadChunk: import("@prismatic-io/spectral").ActionDefinition<{
      uploadURL: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      file: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      chunk: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      chunks: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      multipartParams: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSecurityProfiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSecurityProfile: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrder: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        required: false;
        dataSource: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      orderNumber: {
        label: string;
        comments: string;
        required: false;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrderInfo: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listOrders: import("@prismatic-io/spectral").ActionDefinition<{
      page: {
        comments: string;
        required: false;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateOrder: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      status: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => OrderStatus;
      };
      messsage: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      trackingnumber: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        example: string;
        placeholder: string;
        label: string;
        type: "string";
        required: true;
        comments: string;
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
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listMetaproperties: import("@prismatic-io/spectral").ActionDefinition<{
      count: {
        comments: string;
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      type: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => (string | undefined)[] | undefined;
      };
      options: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      ids: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        clean: (value: unknown) => (string | undefined)[] | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listJobs: import("@prismatic-io/spectral").ActionDefinition<{
      page: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      extraParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
      headers: Record<string, string>;
    }>;
    listJobsByCampaign: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        required: true;
        dataSource: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      page: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      extraParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
      headers: Record<string, string>;
    }>;
    getJob: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        required: true;
        dataSource: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getJobPreset: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        required: true;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getMediaOfJob: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        required: true;
        dataSource: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createJob: import("@prismatic-io/spectral").ActionDefinition<{
      name: {
        comments: string;
        required: true;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      campaignID: {
        label: string;
        comments: string;
        required: true;
        dataSource: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      accountableID: {
        label: string;
        comments: string;
        required: true;
        dataSource: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      presetID: {
        label: string;
        comments: string;
        required: true;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      bodyData: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateJob: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        required: true;
        dataSource: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      campaignID: {
        label: string;
        comments: string;
        required: false;
        dataSource: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      accountableID: {
        label: string;
        comments: string;
        required: false;
        dataSource: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      bodyData: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteJob: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        required: true;
        dataSource: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createCollection: import("@prismatic-io/spectral").ActionDefinition<{
      name: {
        label: string;
        comments: string;
        required: true;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateCollection: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      isPublic: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCollection: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCollections: import("@prismatic-io/spectral").ActionDefinition<{
      page: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      count: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      extraParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        collections: Collection[];
        count: number;
      };
    } | {
      data: {
        collections: Collection[];
        count?: undefined;
      };
    }>;
    deleteCollection: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    shareCollection: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      collectionOptions: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      recipients: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      groups: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      profiles: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      bodyData: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    closeCampaign: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCampaigns: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createCampaign: import("@prismatic-io/spectral").ActionDefinition<{
      name: {
        comments: string;
        required: true;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      key: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        comments: string;
        required: true;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      responsibleID: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      bodyData: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCampaign: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteCampaign: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateCampaign: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        required: true;
        dataSource: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        comments: string;
        required: true;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      key: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      responsibleID: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        comments: string;
        required: true;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      bodyData: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listBrands: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addAssetMetapropertyOptions: import("@prismatic-io/spectral").ActionDefinition<{
      assetId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      metapropertyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      metapropertyOptionsIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => (string | undefined)[] | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAsset: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAssetMetapropertyOptions: import("@prismatic-io/spectral").ActionDefinition<{
      assetId: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      metapropertyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      metapropertyOptionsIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => (string | undefined)[] | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    downloadSpecificAssetItem: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      itemId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      hash: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    generateDynamicTransformation: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      io: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      focuspoint: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      format: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      quality: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAsset: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      versions: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      stats: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAssets: import("@prismatic-io/spectral").ActionDefinition<{
      page: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      limit: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      count: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      total: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      extraParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateAsset: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      copyright: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      bodyData: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAccountInformation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      showNewRecords: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      showUpdatedRecords: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
        body: {
          data: {
            created: BynderRecord[];
            updated: BynderRecord[];
          };
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
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "bynder-oauth";
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    display: {
      description: string;
      label: string;
    };
    inputs: {
      authorizeUrl: {
        label: string;
        type: "string";
        shown: true;
        required: true;
        comments: string;
        example: string;
        placeholder: string;
      };
      tokenUrl: {
        label: string;
        type: "string";
        shown: true;
        required: true;
        comments: string;
        example: string;
        placeholder: string;
      };
      scopes: {
        label: string;
        type: "string";
        shown: true;
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        default: string;
      };
      clientId: {
        label: string;
        type: "string";
        shown: true;
        required: true;
        comments: string;
        example: string;
        placeholder: string;
      };
      clientSecret: {
        label: string;
        type: "password";
        shown: true;
        required: true;
        comments: string;
        placeholder: string;
      };
    };
  }, "bynder-oauth"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "bynder-client-credentials-oauth";
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.ClientCredentials;
    display: {
      description: string;
      label: string;
    };
    inputs: {
      tokenUrl: {
        label: string;
        type: "string";
        shown: true;
        required: true;
        comments: string;
        example: string;
        placeholder: string;
      };
      scopes: {
        label: string;
        type: "string";
        shown: true;
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        default: string;
      };
      clientId: {
        label: string;
        type: "string";
        shown: true;
        required: true;
        comments: string;
        example: string;
        placeholder: string;
      };
      clientSecret: {
        label: string;
        type: "password";
        shown: true;
        required: true;
        comments: string;
        placeholder: string;
      };
    };
  }, "bynder-client-credentials-oauth">)[];
  dataSources: {
    selectAsset: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectBrand: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCampaign: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCollection: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectJob: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectMetaproperty: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectOrder: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSecurityProfile: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUser: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;