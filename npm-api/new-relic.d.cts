//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "new-relic";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/new-relic/";
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
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
      baseUrl: {
        label: string;
        type: "string";
        required: boolean;
        default: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendMetrics: import("@prismatic-io/spectral").ActionDefinition<{
      metricName: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      metricType: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      metricValue: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      attributes: {
        label: string;
        type: "string";
        example: string;
        required: false;
        collection: "keyvaluelist";
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      timestamp: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      newRelicConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendEventData: import("@prismatic-io/spectral").ActionDefinition<{
      eventType: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      additionalAttributes: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      accountId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      newRelicConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendLogs: import("@prismatic-io/spectral").ActionDefinition<{
      jsonMessage: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      timestamp: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      newRelicConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendDetailedLogs: import("@prismatic-io/spectral").ActionDefinition<{
      codeMessage: {
        label: string;
        type: "code";
        required: true;
        example: string;
        language: "json";
        comments: string;
        clean: (value: unknown) => object;
      };
      newRelicConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiKey";
    display: {
      description: string;
      label: string;
    };
    inputs: {
      apiKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      region: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        default: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
      };
    };
  }, "apiKey">[];
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;