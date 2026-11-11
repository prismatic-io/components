//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "snowflake";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Data Platforms";
  };
  actions: {
    executeSql: import("@prismatic-io/spectral").ActionDefinition<{
      snowflakeConnectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sqlInput: {
        label: string;
        type: "code";
        language: "sql";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      snowflakeUrl: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      accountLocator: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      nStatementsToExecute: {
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      timeout: {
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (str: unknown) => number | undefined;
      };
      database: {
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      schema: {
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      warehouse: {
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      role: {
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      bindings: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => object;
      };
      parameters: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => object;
      };
      shouldPoll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      data: any;
      branch: string;
    }>;
    getStatementHandle: import("@prismatic-io/spectral").ActionDefinition<{
      snowflakeConnectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      snowflakeUrl: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      accountLocator: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      statementHandleId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      partition: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "snowflakeOauth2";
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
        comments: string;
        example: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        default: string;
        example: string;
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
      headers: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        shown: true;
        comments: string;
      };
    };
  }, "snowflakeOauth2"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "snowflakeKeyPairConnection";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      privateKey: {
        label: string;
        placeholder: string;
        type: "text";
        required: true;
        shown: true;
        comments: string;
      };
      username: {
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        required: true;
        shown: true;
        comments: string;
      };
      accountIdentifier: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      passphrase: {
        label: string;
        placeholder: string;
        type: "password";
        required: false;
        shown: true;
        comments: string;
      };
    };
  }, "snowflakeKeyPairConnection">)[];
  hooks: {
    error: (error: unknown) => unknown;
  };
  documentationUrl: "https://prismatic.io/docs/components/snowflake/";
}>;
export = _default;