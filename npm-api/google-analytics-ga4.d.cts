//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types.d.ts
type Property = {
  name: string;
  parent: string;
  createTime: string;
  updateTime: string;
  displayName: string;
  industryCategory: string;
  timeZone: string;
  currencyCode: string;
  serviceLevel: string;
  account: string;
  propertyType: string;
};
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "google-analytics-ga4";
  documentationUrl: "https://prismatic.io/docs/components/google-analytics-ga4/";
  public: true;
  display: {
    label: string;
    category: "Application Connectors";
    description: string;
    iconPath: string;
  };
  actions: {
    sendMeasurementProtocolEvents: import("@prismatic-io/spectral").ActionDefinition<{
      firebaseAppId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      appInstanceId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      apiSecret: {
        label: string;
        type: "password";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      events: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
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
      };
      baseUrl: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          label: string;
          value: string;
        }[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProperty: import("@prismatic-io/spectral").ActionDefinition<{
      accountId: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      propertyId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Property;
    }>;
    listProperties: import("@prismatic-io/spectral").ActionDefinition<{
      accountId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (input: unknown) => string | undefined;
          };
          pageToken: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (input: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    runReport: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      accountId: {
        required: false;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      propertyId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      requestBody: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        default: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAccounts: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (input: unknown) => string | undefined;
          };
          pageToken: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (input: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        comments: string;
        label: string;
        type: "connection";
        required: true;
      };
      pollResourceType: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: "Accounts" | "Properties";
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      accountId: {
        required: boolean;
        placeholder: string;
        comments: string;
        label: string;
        type: "string";
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      showNewRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      showUpdatedRecords: {
        label: string;
        type: "boolean";
        required: false;
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
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    listProperties: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      accountId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listAccounts: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: "oauth2";
    display: {
      label: string;
      description: string;
      icons: {
        oauth2ConnectionIconPath: string;
      };
    };
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        default: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        shown: true;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        comments: string;
        required: true;
        shown: true;
      };
    };
  }, "oauth2">[];
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;