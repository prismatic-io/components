//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/index.d.ts
interface CRMRecord {
  id: string;
  Created_Time: string;
  Modified_Time: string;
  Full_Name: string;
  Name?: string;
  Subject?: string;
}
interface BookRecord {
  created_time: string;
  last_modified_time: string;
  [key: string]: string;
}
interface CRMPollingCursor extends Record<string, unknown> {
  pageToken: string;
  streamStartedAt: string;
  restartedStream?: boolean;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "zoho";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/zoho/";
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
  };
  actions: {
    booksGetRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      parentRecordType: {
        label: string;
        placeholder: string;
        required: false;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentRecordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    booksGetRecords: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentRecordType: {
        label: string;
        placeholder: string;
        required: false;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentRecordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      searchFields: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (values: unknown) => Record<string, unknown>;
      };
      page: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        example: string;
        default: string;
      };
      per_page: {
        label: string;
        placeholder: string;
        default: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        example: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown;
      };
    }>;
    booksRemoveRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      parentRecordType: {
        label: string;
        placeholder: string;
        required: false;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentRecordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    booksCreateRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentRecordType: {
        label: string;
        placeholder: string;
        required: false;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentRecordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      dynamicValues: {
        label: string;
        type: "data";
        required: false;
        comments: string;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (values: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    booksUpdateRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      parentRecordType: {
        label: string;
        placeholder: string;
        required: false;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentRecordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      dynamicValues: {
        label: string;
        type: "data";
        required: false;
        comments: string;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (values: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    crmEnableNotification: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelId: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      events: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        clean: (value: unknown) => object;
        example: string;
      };
      notifyUrl: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      token: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      channelExpiry: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      returnAffectedFieldValues: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      notifyOnRelatedAction: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      notificationCondition: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object | undefined;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    crmGetNotificationDetails: import("@prismatic-io/spectral").ActionDefinition<{
      channelId: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      module: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      page: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        example: string;
        default: string;
      };
      per_page: {
        label: string;
        placeholder: string;
        default: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        example: string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown;
      };
    }>;
    crmUpdateNotification: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelId: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      events: {
        required: boolean;
        clean: (value: unknown) => object | undefined;
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
      };
      notifyUrl: {
        required: boolean;
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      token: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      channelExpiry: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      notificationCondition: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object | undefined;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    crmDisableNotification: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelIds: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    crmDisableSpecificNotification: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelId: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      events: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        clean: (value: unknown) => object;
        example: string;
      };
      notifyOnRelatedAction: {
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
    crmGetRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      fields: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        clean: (values: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    crmGetRecords: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fields: {
        required: true;
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        clean: (values: unknown) => string[];
      };
      page: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        example: string;
        default: string;
      };
      per_page: {
        label: string;
        placeholder: string;
        default: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        example: string;
      };
      page_token: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        example: string;
      };
      sort_order: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      sort_by: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown;
      };
    }>;
    crmRemoveRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    crmCreateRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dynamicValues: {
        label: string;
        type: "data";
        required: false;
        comments: string;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (values: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    crmUpdateRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      dynamicValues: {
        label: string;
        type: "data";
        required: false;
        comments: string;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (values: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    crmRunQuery: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      query: {
        label: string;
        placeholder: string;
        type: "text";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    crmAddAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        required: true;
        default: string;
        comments: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      file: {
        label: string;
        type: "data";
        required: true;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      fileName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    crmRawRequest: import("@prismatic-io/spectral").ActionDefinition<{
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
    booksRawRequest: import("@prismatic-io/spectral").ActionDefinition<{
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
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "zohoTemplatedConnection";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      zohoRegion: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: boolean;
        comments: string;
        default: string;
        example: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: boolean;
        comments: string;
        example: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: boolean;
        comments: string;
        example: string;
      };
    } & Partial<import("@prismatic-io/spectral").OAuth2AuthorizationCodeInputs> & {
      [key: string]: import("@prismatic-io/spectral").ConnectionInput;
    } & {
      tokenUrl: import("@prismatic-io/spectral").ConnectionTemplateInputField;
      authorizeUrl: import("@prismatic-io/spectral").ConnectionTemplateInputField;
    } & {
      [key: string]: import("@prismatic-io/spectral").ConnectionTemplateInputField;
    };
  }, "zohoTemplatedConnection"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth2";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: boolean;
        comments: string;
        default: string;
        example: string;
      };
      revokeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: boolean;
        comments: string;
        example: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: boolean;
        comments: string;
        example: string;
      };
    };
  }, "oauth2">)[];
  dataSources: {
    selectCrmRecord: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectBooksRecord: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentRecordId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectNotificationChannel: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  triggers: {
    contactsPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
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
      fields: {
        label: string;
        example: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (values: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        paginationState: CRMPollingCursor | undefined;
        body: {
          data: {
            updated: CRMRecord[];
            created: CRMRecord[];
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
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
    leadsPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
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
      fields: {
        label: string;
        example: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (values: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        paginationState: CRMPollingCursor | undefined;
        body: {
          data: {
            updated: CRMRecord[];
            created: CRMRecord[];
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
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
    bookContactsPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
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
        body: {
          data: {
            updated: BookRecord[];
            created: BookRecord[];
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
    notificationsTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      channelId: {
        required: boolean;
        comments: string;
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      events: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        clean: (value: unknown) => object;
        example: string;
      };
      token: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      channelExpiry: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      returnAffectedFieldValues: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      notifyOnRelatedAction: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      notificationCondition: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object | undefined;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, false, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      response: {
        statusCode: number;
        contentType: string;
      };
    }, import("@prismatic-io/spectral").Inputs>;
  };
}>;
export = _default;