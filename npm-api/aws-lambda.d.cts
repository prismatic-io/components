//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "aws-lambda";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/aws-lambda/";
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
  };
  actions: {
    invoke: import("@prismatic-io/spectral").ActionDefinition<{
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      functionName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
      };
      invokeType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        default: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      invokeArgs: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    listFunctions: import("@prismatic-io/spectral").ActionDefinition<{
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      marker: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      maxItems: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-lambda").ListFunctionsCommandOutput;
    }>;
  };
  connections: (import("@prismatic-io/spectral").DefaultConnectionDefinition | import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiKeySecret";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      accessKeyId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      secretAccessKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "apiKeySecret">)[];
  dataSources: {
    selectRegion: import("@prismatic-io/spectral").DataSourceDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectFunction: import("@prismatic-io/spectral").DataSourceDefinition<{
      awsRegion: {
        dataSource: undefined;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;