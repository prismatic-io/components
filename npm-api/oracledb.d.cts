//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "oracledb";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/oracledb/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Data Platforms";
  };
  actions: {
    query: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      query: {
        label: string;
        type: "code";
        language: "sql";
        required: true;
        comments: string;
        placeholder: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      namedParameters: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        clean: (value: unknown) => Record<string, unknown>;
      };
      namedParametersObject: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown[] | undefined;
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "oracledbConnection";
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
        default: string;
        required: true;
        shown: true;
        comments: string;
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
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
      };
    };
  }, "oracledbConnection">[];
}>;
export = _default;