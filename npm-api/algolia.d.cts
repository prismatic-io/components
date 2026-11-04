//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types.d.ts
interface AlgoliaIndex {
  name: string;
  createdAt: string;
  updatedAt: string;
  entries: number;
  dataSize: number;
  fileSize: number;
  [key: string]: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "algolia";
  documentationUrl: "https://prismatic.io/docs/components/algolia/";
  public: true;
  display: {
    label: string;
    category: "Application Connectors";
    description: string;
    iconPath: string;
  };
  actions: {
    copyIndex: import("@prismatic-io/spectral").ActionDefinition<{
      algoliaConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      indexFrom: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        dataSource: string;
      };
      indexTo: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listIndexes: import("@prismatic-io/spectral").ActionDefinition<{
      algoliaConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      page: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteIndex: import("@prismatic-io/spectral").ActionDefinition<{
      algoliaConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      indexName: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    moveIndex: import("@prismatic-io/spectral").ActionDefinition<{
      algoliaConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      indexFrom: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        dataSource: string;
      };
      indexTo: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateBatchIndices: import("@prismatic-io/spectral").ActionDefinition<{
      algoliaConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      requests: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        required: true;
        comments: string;
        clean: (value: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    copySettings: import("@prismatic-io/spectral").ActionDefinition<{
      algoliaConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      indexFrom: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        dataSource: string;
      };
      indexTo: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSettings: import("@prismatic-io/spectral").ActionDefinition<{
      algoliaConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      indexName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    setSettings: import("@prismatic-io/spectral").ActionDefinition<{
      algoliaConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      indexName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      settings: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        required: true;
        comments: string;
        clean: (value: unknown) => any;
      };
      forwardToReplicas: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getIndex: import("@prismatic-io/spectral").ActionDefinition<{
      algoliaConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      indexName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      queryString: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchMultipleIndices: import("@prismatic-io/spectral").ActionDefinition<{
      algoliaConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      requests: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: true;
        comments: string;
        clean: (requestsInput: unknown) => any;
      };
      strategy: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
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
      algoliaConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchFacetValues: import("@prismatic-io/spectral").ActionDefinition<{
      algoliaConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      indexName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      facetName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
      facetQuery: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      maxFacetHits: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    browseIndex: import("@prismatic-io/spectral").ActionDefinition<{
      algoliaConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      indexName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      params: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      cursor: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      algoliaConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      showNewRecords: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      showUpdatedRecords: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: {
            created: AlgoliaIndex[];
            updated: AlgoliaIndex[];
          };
        };
        headers: {
          [key: string]: string;
        };
        queryParameters: {
          [key: string]: string;
        };
        rawBody: {
          data: unknown;
          contentType?: string;
        };
        pathFragment: string;
        webhookUrls: {
          [key: string]: string;
        };
        webhookApiKeys: {
          [key: string]: string[];
        };
        invokeUrl: string;
        executionId: string;
        customer: import("@prismatic-io/spectral").CustomerAttributes;
        instance: import("@prismatic-io/spectral").InstanceAttributes;
        user: import("@prismatic-io/spectral").UserAttributes;
        integration: import("@prismatic-io/spectral").IntegrationAttributes;
        flow: import("@prismatic-io/spectral").FlowAttributes;
        startedAt: string;
        globalDebug: boolean;
        paginationState?: Record<string, unknown> | undefined;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    selectIndex: import("@prismatic-io/spectral").DataSourceDefinition<{
      algoliaConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      apiKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      applicationId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "apiKey">[];
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;