//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/messages.d.ts
interface CountTokensResponse {
  input_tokens: number;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "anthropic";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/anthropic/";
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
        example: "/models";
        default: "/models";
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
    getModel: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      model: {
        label: string;
        type: "string";
        required: true;
        default: "claude-sonnet-4-6";
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        created_at: string;
        display_name: string;
        id: string;
        type: string;
      };
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
        key: string;
        label: string;
        comments: string;
        inputs: {
          beforeId: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          afterId: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            default: string;
            comments: string;
            clean: (value: unknown) => number;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    chat: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      model: {
        label: string;
        type: "string";
        required: true;
        default: "claude-sonnet-4-6";
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      initialMessage: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      systemPrompt: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      maxTokens: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
        placeholder: string;
        example: string;
      };
      temperature: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    countTokens: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      model: {
        label: string;
        type: "string";
        required: true;
        default: "claude-sonnet-4-6";
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      message: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: CountTokensResponse;
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "anthropic";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      apiKey: {
        label: string;
        type: "password";
        required: true;
        comments: string;
        shown: true;
      };
    };
  }, "anthropic">[];
  dataSources: {
    selectModel: import("@prismatic-io/spectral").DataSourceDefinition<{
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