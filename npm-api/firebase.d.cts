//#region src/util/clean.d.ts
declare function validateJSON(json: unknown): unknown;
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "firebase";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/firebase/";
  display: {
    category: "Data Platforms";
    label: string;
    description: string;
    iconPath: string;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  actions: {
    listCollections: import("@prismatic-io/spectral").ActionDefinition<{
      firebaseConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createDocument: import("@prismatic-io/spectral").ActionDefinition<{
      collection: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      data: {
        label: string;
        placeholder: string;
        type: "data";
        required: true;
        collection: "keyvaluelist";
        comments: string;
        clean: (values: unknown) => Record<string, unknown>;
      };
      firebaseConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    bulkCreateDocuments: import("@prismatic-io/spectral").ActionDefinition<{
      firebaseConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      collection: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      documents: {
        type: "code";
        label: string;
        language: "json";
        comments: string;
        placeholder: string;
        required: true;
        default: string;
        clean: typeof validateJSON;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listDocuments: import("@prismatic-io/spectral").ActionDefinition<{
      collection: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firebaseConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderBy: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      queryOperatorCode: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getDocument: import("@prismatic-io/spectral").ActionDefinition<{
      collection: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      document: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firebaseConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: FirebaseFirestore.DocumentData | undefined;
        id: string;
        createTime: Date | undefined;
        updateTime: Date | undefined;
        exists: boolean;
        readTime: Date;
      };
    }>;
    updateDocument: import("@prismatic-io/spectral").ActionDefinition<{
      collection: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      document: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      data: {
        label: string;
        placeholder: string;
        type: "data";
        required: true;
        collection: "keyvaluelist";
        comments: string;
        clean: (values: unknown) => Record<string, unknown>;
      };
      firebaseConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteDocument: import("@prismatic-io/spectral").ActionDefinition<{
      collection: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      document: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firebaseConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    removeField: import("@prismatic-io/spectral").ActionDefinition<{
      collection: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      document: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fieldToRemove: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firebaseConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
  };
  dataSources: {
    selectDocument: import("@prismatic-io/spectral").DataSourceDefinition<{
      collection: {
        dataSource: undefined;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firebaseConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      queryOperatorCode: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderBy: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCollection: import("@prismatic-io/spectral").DataSourceDefinition<{
      firebaseConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "firebaseConnection";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      projectId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      privateKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      clientEmail: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "firebaseConnection">[];
}>;
export = _default;