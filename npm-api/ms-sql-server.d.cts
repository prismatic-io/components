//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "ms-sql-server";
  documentationUrl: "https://prismatic.io/docs/components/ms-sql-server/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Data Platforms";
  };
  actions: {
    query: import("@prismatic-io/spectral").ActionDefinition<{
      queryField: {
        label: string;
        type: "code";
        language: "sql";
        default: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      params: {
        label: string;
        comments: string;
        type: "data";
        required: false;
        collection: "keyvaluelist";
        clean: (value: unknown) => Record<string, unknown>;
      };
      paramsObject: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object;
      };
      timeout: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        default: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      sqlConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        recordsets: any;
        recordset: {
          id: number;
          first_name: string;
          last_name: string;
          email: string;
          created_at: string;
        }[];
        output: {};
        rowsAffected: number[];
      };
    }>;
    execute: import("@prismatic-io/spectral").ActionDefinition<{
      storedProcedure: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        default: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      sqlConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        recordsets: any;
        recordset: {
          id: number;
          status: string;
          last_updated: string;
        }[];
        output: {};
        rowsAffected: number[];
        returnValue: number;
      };
    }>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "basic";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      host: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        onPremControlled: true;
      };
      port: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
        onPremControlled: true;
      };
      database: {
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        shown: true;
      };
      connectionTimeout: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        shown: true;
        comments: string;
        example: string;
      };
      username: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
      };
      password: {
        label: string;
        placeholder: string;
        type: "password";
        required: false;
        shown: true;
        comments: string;
      };
    };
  }, "basic"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "azureAd";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      host: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        onPremControlled: true;
      };
      port: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
        onPremControlled: true;
      };
      database: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      tenantId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
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
      connectionTimeout: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "azureAd">)[];
}>;
export = _default;