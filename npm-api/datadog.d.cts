//#region src/types/index.d.ts
type MetricIntakeType = 0 | 1 | 2 | 3;
type WebhookEncodeAs = "json" | "form";
interface WebhooksIntegration {
  name: string;
  url: string;
  custom_headers: string | null;
  payload: string | null;
  encode_as?: WebhookEncodeAs;
}
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "datadog";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/datadog/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Data Platforms";
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  actions: {
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
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookUrl: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookCustomHeaders: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      webhookEncodeAs: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: WebhookEncodeAs;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      webhookPayload: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
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
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getWebhook: import("@prismatic-io/spectral").ActionDefinition<{
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
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: WebhooksIntegration;
    }>;
    updateWebhook: import("@prismatic-io/spectral").ActionDefinition<{
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
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookUrl: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
      };
      webhookCustomHeaders: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      webhookEncodeAs: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: WebhookEncodeAs;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      webhookPayload: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
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
      debugRequest: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
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
    listMetrics: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      metricsFrom: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      metricsHost: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      metricsTagFilter: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    searchMetrics: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      metricsQuery: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    submitMetrics: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      metricSeries: {
        label: string;
        type: "code";
        required: true;
        language: "json";
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => unknown[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    submitSingleMetric: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      metricName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      metricValue: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      metricTimestamp: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      metricTags: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      metricFields: {
        label: string;
        comments: string;
        inputs: {
          metricType: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => MetricIntakeType | undefined;
          };
          metricUnit: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          metricInterval: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          resourceName: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          resourceType: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      datadogSite: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      apiKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      applicationKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "apiKey"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth2";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      datadogSite: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: false;
        comments: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: false;
        comments: string;
        default: string;
      };
      revokeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: false;
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
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "oauth2">)[];
  dataSources: {
    selectMetric: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{
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
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookPayload: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      webhookCustomHeaders: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
  };
}>;
export = _default;