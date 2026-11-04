//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/index.d.ts
interface AirtableBase {
  id: string;
  name: string;
  permissionLevel: string;
}
interface AirtableRecord {
  id: string;
  createdTime: string;
  fields: Record<string, unknown>;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "airtable";
  documentationUrl: "https://prismatic.io/docs/components/airtable/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Data Platforms";
  };
  actions: {
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      baseId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {};
    }>;
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      baseId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      baseId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      notificationUrl: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      specification: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    refreshWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      baseId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
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
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          tables: {
            id: string;
            name: string;
            primaryFieldId: string;
            fields: {
              id: string;
              name: string;
              type: string;
            }[];
            views: {
              id: string;
              name: string;
              type: string;
            }[];
          }[];
        };
        headers: Record<string, unknown>;
      };
    }>;
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createRecord: import("@prismatic-io/spectral").ActionDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      baseId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      tableName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recordFields: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        placeholder: string;
        comments: string;
        clean: (values: unknown) => Record<string, string>;
      };
      dynamicFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (values: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AirtableRecord;
    }>;
    deleteRecord: import("@prismatic-io/spectral").ActionDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      baseId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      tableName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recordId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getRecord: import("@prismatic-io/spectral").ActionDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      baseId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      tableName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      record: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AirtableRecord;
    }>;
    listRecords: import("@prismatic-io/spectral").ActionDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      baseId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      tableName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      view: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      fields: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        collection: "valuelist";
        comments: string;
        clean: (values: unknown) => string[] | undefined;
      };
      filterByFormula: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AirtableRecord[];
    }>;
    updateRecord: import("@prismatic-io/spectral").ActionDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      baseId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      tableName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      record: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recordFields: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        placeholder: string;
        comments: string;
        clean: (values: unknown) => Record<string, string>;
      };
      dynamicFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (values: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AirtableRecord;
    }>;
    getBaseSchema: import("@prismatic-io/spectral").ActionDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      baseId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listBases: import("@prismatic-io/spectral").ActionDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AirtableBase[];
    }>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    oauth2PkceMethod: import("@prismatic-io/spectral").OAuth2PkceMethod.S256;
    key: "oauth";
    display: {
      label: string;
      description: string;
    };
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
    };
  }, "oauth"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "personalAccessToken";
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
  }, "personalAccessToken"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      base: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
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
  }, "apiKey">)[];
  dataSources: {
    selectBase: import("@prismatic-io/spectral").DataSourceDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      includeId: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTable: import("@prismatic-io/spectral").DataSourceDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      baseId: {
        required: boolean;
        dataSource: undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includeId: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWebhook: import("@prismatic-io/spectral").DataSourceDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      baseId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includeId: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectRecord: import("@prismatic-io/spectral").DataSourceDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      baseId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tableName: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includeId: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
    baseChanges: import("@prismatic-io/spectral").TriggerDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      baseId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      dataTypes: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        default: string[];
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string[];
      };
      recordChangeScope: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: {
        body: {
          data: {
            expirationTime: string;
            message: string;
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
      branch: string;
    } | {
      payload: {
        body: {
          data: {
            notification: unknown;
            payloads: {
              actionMetadata: {
                source: string;
                sourceMetadata: {
                  user: {
                    email: string;
                    id: string;
                    permissionLevel: string;
                  };
                };
              };
              baseTransactionNumber: number;
              payloadFormat: string;
              timestamp: string;
            }[];
            payloadCount: number;
            cursor: number | undefined;
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
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      airtableConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      baseId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      tableName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
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
      pollView: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalFilter: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
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
    }, import("@prismatic-io/spectral").Inputs>;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;