//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "odoo";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/odoo/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    rawHttpRequest: import("@prismatic-io/spectral").ActionDefinition<{
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
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      model: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      method: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parameters: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        clean: (value: unknown) => object;
        placeholder: string;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listModelFields: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      model: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listModels: import("@prismatic-io/spectral").ActionDefinition<{
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
          limit: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          offset: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      nameSearch: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string;
      };
      modelSearch: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      model: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parameters: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
        placeholder: string;
        comments: string;
        example: string;
      };
      externalId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteRecordById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      model: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      id: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getRecordByExternalId: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      externalId: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    getRecordById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      model: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      id: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    listRecords: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      model: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
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
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          offset: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    setExternalId: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      model: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      id: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      externalId: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      model: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      id: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      parameters: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
        placeholder: string;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "odooApiKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      baseUrl: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
      port: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      db: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
      apiKey: {
        label: string;
        type: "password";
        required: true;
        comments: string;
      };
    };
  }, "odooApiKey"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "odooBasicAuth";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      baseUrl: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
      port: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      db: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
      username: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
      password: {
        label: string;
        type: "password";
        required: true;
        comments: string;
      };
    };
  }, "odooBasicAuth">)[];
  dataSources: {
    selectModel: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      nameSearch: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string;
      };
      modelSearch: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectRecordById: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      model: {
        dataSource: any;
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      model: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
}>;
export = _default;