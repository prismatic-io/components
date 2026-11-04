//#region src/types/ComponentNode.d.ts
interface ComponentNode {
  id: string;
  name: string;
  mass?: number | null;
  created?: string;
  lastModified?: string;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "duro-plm";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/duro-plm/";
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
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listChangeOrders: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderBy: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => any[];
        model: {
          label: string;
          value: string;
        }[];
      };
      first: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createChangeOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      type: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown) => string | undefined;
        default: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      query: {
        label: string;
        type: "code";
        required: true;
        language: "graphql";
        comments: string;
        placeholder: string;
        default: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      variables: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      variablesObject: {
        label: string;
        type: "code";
        comments: string;
        placeholder: string;
        example: string;
        language: "json";
        required: false;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getComponentById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      componentId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listComponents: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      libraryType: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        model: {
          label: string;
          value: string;
        }[];
      };
      first: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ComponentNode[];
    }>;
    listCompanyUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pollResourceType: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        example: string;
        placeholder: string;
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
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "duroApiKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      username: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "password";
        required: true;
      };
      duroEnvironment: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
      };
      customDuroEnvironment: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
      };
    };
  }, "duroApiKey">[];
  dataSources: {
    selectComponent: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      libraryType: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        model: {
          label: string;
          value: string;
        }[];
      };
      first: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
}>;
export = _default;