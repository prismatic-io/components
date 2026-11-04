//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types.d.ts
interface QlikRecord {
  id?: string;
  [key: string]: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "qlik";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/qlik/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    getMyUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        example: string;
      };
      sort: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (value: unknown) => string;
        example: string;
      };
      paramsInputFields: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createSpace: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      name: {
        label: string;
        comments: string;
        required: true;
        type: "string";
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      description: {
        label: string;
        comments: string;
        required: true;
        type: "string";
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      spaceType: {
        label: string;
        type: "string";
        default: string;
        comments: string;
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteSpace: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      spaceId: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSpace: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      spaceId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSpaces: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        example: string;
      };
      sort: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (value: unknown) => string;
        example: string;
      };
      paramsInputFields: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateSpace: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      spaceId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ownerId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        comments: string;
        required: true;
        label: string;
        type: "string";
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      description: {
        comments: string;
        required: true;
        label: string;
        type: "string";
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createReport: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      reportInput: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => any;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getReportRequestStatus: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      reportId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
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
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createDataStore: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      uri: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      type: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      technicalName: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      dataStoreInput: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => any;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateDataStore: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      dataStoreId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      uri: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      type: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      technicalName: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      dataStoreInput: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => any;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDataStore: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      dataStoreId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteDataStores: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      dataStoreIds: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteDataStoresAssets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      dataStoreIds: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string;
      };
      dataAssetsIds: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDataStores: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        example: string;
      };
      page: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      projections: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (value: unknown) => string;
      };
      sort: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createDataset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      qri: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      technicalName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      secureQri: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      dataSetInput: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => any;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateDataset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      dataSetId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      qri: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      technicalName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      secureQri: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      dataSetInput: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => any;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDataset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      dataSetId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projections: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteDataset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      dataSetIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDataFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      dataFileId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteDataFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      dataFileId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDatafiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        example: string;
      };
      page: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      paramsInputFields: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createDataAssets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      appId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      appType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      technicalName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      dataAssetInput: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => any;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateDataAssets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      dataAssetsId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      appId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      appType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      technicalName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      dataAssetInput: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => any;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDataAssets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      dataAssetsId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projections: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteDataAssets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      dataSetIds: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getApp: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      appId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteApp: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      appId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
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
      payload: {
        body: {
          data: {
            created: QlikRecord[];
            updated: QlikRecord[];
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
        paginationState?: Record<string, unknown>;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiKey";
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
        comments: string;
      };
      tenant: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
      };
    };
  }, "apiKey"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth2";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    oauth2PkceMethod: import("@prismatic-io/spectral").OAuth2PkceMethod.S256;
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        default: string;
        comments: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        default: string;
        comments: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "oauth2">)[];
  dataSources: {
    selectApp: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDataAsset: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDataFile: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDataSet: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDataStore: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSpace: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUser: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;