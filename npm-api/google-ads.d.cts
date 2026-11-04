//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "google-ads";
  documentationUrl: "https://prismatic.io/docs/components/google-ads/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth";
    display: {
      label: string;
      description: string;
      icons: {
        oauth2ConnectionIconPath: string;
      };
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
        required: true;
        shown: true;
        comments: string;
        example: string;
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
        example: string;
      };
      developerToken: {
        label: string;
        placeholder: string;
        type: "password";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
      apiVersion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        example: string;
        default: string;
      };
    };
  }, "oauth"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "dataManagerOAuth";
    display: {
      label: string;
      description: string;
      icons: {
        oauth2ConnectionIconPath: string;
      };
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
        required: true;
        shown: false;
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
        example: string;
      };
      apiVersion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        example: string;
        default: string;
      };
    };
  }, "dataManagerOAuth">)[];
  dataSources: {
    listAccessibleCustomers: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listAccessibleSubAccounts: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        dataSource: undefined;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      customerClientLevel: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        default: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  actions: {
    inviteUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      emailAddress: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      accessRole: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        example: string;
        comments: string;
        default: string;
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
      data: any;
    }>;
    accountReports: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      managerCustomerIdInput: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSizeInput: {
            required: false;
            default: string;
            label: string;
            placeholder: string;
            type: "string";
            example: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
          };
          pageTokenInput: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            example: string;
            clean: (value: unknown) => string | undefined;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      customerIds: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      startDateInput: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      endDateInput: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    detailedLeadReports: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      managerCustomerIdInput: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSizeInput: {
            required: false;
            default: string;
            label: string;
            placeholder: string;
            type: "string";
            example: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
          };
          pageTokenInput: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            example: string;
            clean: (value: unknown) => string | undefined;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      customerIds: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      startDateInput: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      endDateInput: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createClientLink: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      managerCustomerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      customerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    confirmClientLink: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      managerCustomerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      customerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      managerLinkId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAccessibleCustomers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCustomers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      managerCustomerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      pageToken: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    ingestOfflineConversions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      events: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown) => object;
      };
      destinations: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown) => object;
      };
      encoding: {
        label: string;
        type: "string";
        required: false;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      validateOnly: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    uploadCallConversions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      conversions: {
        example: string;
        comments: string;
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
      };
      managerCustomerId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
      };
      validateOnly: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    uploadClickConversions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      conversions: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown) => object;
      };
      managerCustomerId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
      };
      validateOnly: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchAdsLocalServices: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      query: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      pageTokenInput: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      managerCustomerId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
      };
      returnTotalResultsCount: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    mutateCampaign: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      operations: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown) => object;
      };
      partialFailure: {
        label: string;
        type: "boolean";
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
        comments: string;
      };
      managerCustomerId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
      };
      validateOnly: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    mutateCampaignCriteria: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      operations: {
        default: string;
        placeholder: string;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
      };
      partialFailure: {
        label: string;
        type: "boolean";
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
        comments: string;
      };
      managerCustomerId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
      };
      validateOnly: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    campaignChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
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
      managerCustomerId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
      };
      changeTypes: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        model: ({
          label: string;
          value: "status";
        } | {
          label: string;
          value: "budget";
        } | {
          label: string;
          value: "bidding";
        } | {
          label: string;
          value: "settings";
        } | {
          label: string;
          value: "all";
        })[];
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    } | undefined, import("@prismatic-io/spectral").Inputs>;
    changeHistoryTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
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
      managerCustomerId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
      };
      resourceTypes: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string[];
      };
      includeUserInfo: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    } | undefined, import("@prismatic-io/spectral").Inputs>;
    budgetAlertTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      managerCustomerId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
      };
      alertThreshold: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      includeSharedBudgets: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    } | undefined, import("@prismatic-io/spectral").Inputs>;
  };
}>;
export = _default;