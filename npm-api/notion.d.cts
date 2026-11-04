//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/notion.d.ts
interface NotionPage {
  id: string;
  object: string;
  created_time: string;
  last_edited_time: string;
  [key: string]: unknown;
}
//#endregion
//#region src/types/triggers.d.ts
interface PagesChangesObject {
  newPages?: NotionPage[];
  updatedPages?: NotionPage[];
}
interface DataSourcesChangesObject {
  newDataSources?: NotionPage[];
  updatedDataSources?: NotionPage[];
}
interface DataSourceItemsChangesObject {
  newItems?: NotionPage[];
  updatedItems?: NotionPage[];
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "notion";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/notion/";
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
  };
  actions: {
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      userId: {
        label: string;
        required: true;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      fetchAll: {
        comments: string;
        label: string;
        required: false;
        type: "boolean";
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          startCursor: {
            label: string;
            required: false;
            type: "string";
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          pageSize: {
            type: "string";
            label: string;
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
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
        required: true;
        type: "connection";
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      pageId: {
        label: string;
        required: true;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      filterProperties: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPages: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      fetchAll: {
        label: string;
        required: false;
        type: "boolean";
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      startCursor: {
        label: string;
        required: false;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createPage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      parent: {
        type: "code";
        label: string;
        language: "json";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
      properties: {
        type: "code";
        label: string;
        language: "json";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
      children: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
      icon: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
      coverImage: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createDatabaseItem: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      parent: {
        comments: string;
        example: string;
        type: "code";
        label: string;
        language: "json";
        required: true;
        placeholder: string;
        clean: (value: unknown) => object | undefined;
      };
      properties: {
        type: "code";
        label: string;
        language: "json";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
      children: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
      icon: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
      coverImage: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createDataSource: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      databaseId: {
        label: string;
        required: true;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      properties: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
      title: {
        label: string;
        comments: string;
        required: false;
        type: "code";
        language: "json";
        clean: (value: unknown) => object | undefined;
        placeholder: string;
        example: string;
      };
      icon: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDataSources: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      fetchAll: {
        label: string;
        required: false;
        type: "boolean";
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      startCursor: {
        label: string;
        required: false;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    queryDataSource: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      dataSourceId: {
        label: string;
        required: true;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        required: false;
        type: "boolean";
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sorts: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
      filter: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          startCursor: {
            label: string;
            required: false;
            type: "string";
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          pageSize: {
            type: "string";
            label: string;
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      resultType: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      filterProperties: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    retrieveDataSource: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      dataSourceId: {
        label: string;
        required: true;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateDataSource: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      dataSourceId: {
        label: string;
        required: true;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      properties: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
      title: {
        label: string;
        comments: string;
        required: false;
        type: "code";
        language: "json";
        clean: (value: unknown) => object | undefined;
        placeholder: string;
        example: string;
      };
      icon: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
      databaseId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updatedCreateDatabase: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      parent: {
        type: "code";
        label: string;
        language: "json";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
      title: {
        label: string;
        comments: string;
        required: false;
        type: "code";
        language: "json";
        clean: (value: unknown) => object | undefined;
        placeholder: string;
        example: string;
      };
      initialDataSourceProperties: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
      icon: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
      description: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
      cover: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    retrieveDatabase: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      databaseId: {
        label: string;
        required: true;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updatedUpdateDatabase: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      databaseId: {
        label: string;
        required: true;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parent: {
        required: boolean;
        comments: string;
        type: "code";
        label: string;
        language: "json";
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      title: {
        label: string;
        comments: string;
        required: false;
        type: "code";
        language: "json";
        clean: (value: unknown) => object | undefined;
        placeholder: string;
        example: string;
      };
      isInline: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      icon: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
      cover: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "notionOauth";
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
        shown: false;
        comments: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
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
        example: string;
      };
    };
  }, "notionOauth"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "notionInternalIntegration";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      apiKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "notionInternalIntegration">)[];
  dataSources: {
    selectDatabase: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDataSource: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPage: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUser: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    pagesPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, import("@prismatic-io/spectral").TriggerBaseResult<import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>> & {
      body: {
        data: PagesChangesObject;
      };
    }>, import("@prismatic-io/spectral").Inputs>;
    dataSourcesPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, import("@prismatic-io/spectral").TriggerBaseResult<import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>> & {
      body: {
        data: DataSourcesChangesObject;
      };
    }>, import("@prismatic-io/spectral").Inputs>;
    dataSourceItemsPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      dataSourceId: {
        label: string;
        required: true;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, import("@prismatic-io/spectral").TriggerBaseResult<import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>> & {
      body: {
        data: DataSourceItemsChangesObject;
      };
    }>, import("@prismatic-io/spectral").Inputs>;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;