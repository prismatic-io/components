//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "mysql";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/mysql/";
  display: {
    label: string;
    category: "Data Platforms";
    description: string;
    iconPath: string;
  };
  actions: {
    query: import("@prismatic-io/spectral").ActionDefinition<{
      mySQLConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      queryField: {
        label: string;
        type: "code";
        language: "mysql";
        default: string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      params: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        collection: "valuelist";
        clean: (value: unknown) => string[];
      };
      referenceParams: {
        label: string;
        comments: string;
        type: "code";
        language: "javascript";
        placeholder: string;
        required: false;
        example: string;
        clean: (values: unknown) => any[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>[];
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "mySQL";
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
        default: string;
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
  }, "mySQL">[];
}>;
export = _default;