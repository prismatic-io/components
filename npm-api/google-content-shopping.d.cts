//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "google-content-shopping";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/google-content-shopping/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    rawRequestMerchant: import("@prismatic-io/spectral").ActionDefinition<{
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
      data: any;
    }>;
    listNotificationSubscriptionsMerchant: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          pageToken: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
      account: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createNotificationSubscriptionMerchant: import("@prismatic-io/spectral").ActionDefinition<{
      account: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      registeredEvent: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      callBackUri: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      targetAccount: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      allManagedAccounts: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        default: string;
        required: false;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProductRegionalInventoryMerchant: import("@prismatic-io/spectral").ActionDefinition<{
      region: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      inventory: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      contentLanguage: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      feedLabel: {
        clean: (value: unknown, defaultValue?: string) => string;
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      offerId: {
        dataSource: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      account: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    batchRegionalInventoryMerchant: import("@prismatic-io/spectral").ActionDefinition<{
      entries: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      contentLanguage: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      feedLabel: {
        clean: (value: unknown, defaultValue?: string) => string;
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      offerId: {
        dataSource: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      account: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    updateProductLocalInventoryMerchant: import("@prismatic-io/spectral").ActionDefinition<{
      storeCode: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      inventory: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      contentLanguage: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      feedLabel: {
        clean: (value: unknown, defaultValue?: string) => string;
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      offerId: {
        dataSource: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      account: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    batchLocalInventoryMerchant: import("@prismatic-io/spectral").ActionDefinition<{
      entries: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      contentLanguage: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      feedLabel: {
        clean: (value: unknown, defaultValue?: string) => string;
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      offerId: {
        dataSource: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      account: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    getProductMerchant: import("@prismatic-io/spectral").ActionDefinition<{
      contentLanguage: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      feedLabel: {
        clean: (value: unknown, defaultValue?: string) => string;
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      offerId: {
        dataSource: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      account: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProductsMerchant: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          pageToken: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
      account: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProductMerchant: import("@prismatic-io/spectral").ActionDefinition<{
      offerId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      attributes: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      customAttributes: {
        required: boolean;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      contentLanguage: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      feedLabel: {
        clean: (value: unknown, defaultValue?: string) => string;
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      account: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      dataSource: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProductMerchant: import("@prismatic-io/spectral").ActionDefinition<{
      attributes: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      customAttributes: {
        required: boolean;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      updateMask: {
        comments: string;
        example: string;
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        required: false;
      };
      contentLanguage: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      feedLabel: {
        clean: (value: unknown, defaultValue?: string) => string;
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      offerId: {
        dataSource: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      account: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      dataSource: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProductMerchant: import("@prismatic-io/spectral").ActionDefinition<{
      contentLanguage: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      feedLabel: {
        clean: (value: unknown, defaultValue?: string) => string;
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      offerId: {
        dataSource: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      account: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      dataSource: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    batchProductMerchant: import("@prismatic-io/spectral").ActionDefinition<{
      account: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      dataSource: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      entries: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    getAccountMerchant: import("@prismatic-io/spectral").ActionDefinition<{
      account: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAccountsMerchant: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          pageToken: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateAccountMerchant: import("@prismatic-io/spectral").ActionDefinition<{
      account: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      accountName: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      timeZone: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      languageCode: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      updateMask: {
        comments: string;
        example: string;
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        required: false;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAccountMerchant: import("@prismatic-io/spectral").ActionDefinition<{
      account: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createAccountMerchant: import("@prismatic-io/spectral").ActionDefinition<{
      accountName: {
        clean: (value: unknown, defaultValue?: string) => string;
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      service: {
        label: string;
        collection: "valuelist";
        required: boolean;
        comments: string;
        inputs: {
          serviceType: {
            type: "string";
            label: string;
            required: true;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          provider: {
            type: "string";
            label: string;
            required: true;
            comments: string;
          };
          externalAccountId: {
            type: "string";
            label: string;
            required: false;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      adultContent: {
        required: boolean;
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      timeZone: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      languageCode: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      users: {
        label: string;
        collection: "valuelist";
        required: boolean;
        comments: string;
        inputs: {
          emailAddress: {
            type: "string";
            label: string;
            required: true;
            comments: string;
          };
          admin: {
            type: "boolean";
            label: string;
            required: false;
            comments: string;
          };
          orderManager: {
            type: "boolean";
            label: string;
            required: false;
            comments: string;
          };
          paymentsManager: {
            type: "boolean";
            label: string;
            required: false;
            comments: string;
          };
          paymentsAnalyst: {
            type: "boolean";
            label: string;
            required: false;
            comments: string;
          };
          reportingManager: {
            type: "boolean";
            label: string;
            required: false;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
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
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        default: string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPubSubNotification: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").content_v2_1.Schema$PubsubNotificationSettings;
    }>;
    updatePubSubNotification: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      kind: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      cloudTopicName: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      registeredEvents: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").content_v2_1.Schema$PubsubNotificationSettings;
    }>;
    listReturnsOrders: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          maxResults: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          pageToken: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
      orderBy: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
      createdStartDate: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      createdEndDate: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      shipmentTypes: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      shipmentStatus: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      shipmentStates: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      acknowledged: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
      };
      googleOrderIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      shipmentTrackingNumbers: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getOrderReturn: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      returnId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createOrderReturn: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      orderId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      operationId: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      lineItems: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      returnMethodType: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    processOrderReturn: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      returnId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      operationId: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      returnItems: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      fullChargeReturnShippingCost: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
      };
      refundShippingFee: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").content_v2_1.Schema$OrderreturnsProcessResponse;
    }>;
    listOrders: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          maxResults: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          pageToken: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
      statuses: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      placedDateStart: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      placedDateEnd: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      orderBy: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
      acknowledged: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      orderId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    cancelOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      orderId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      operationId: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      reason: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        model: {
          label: string;
          value: string;
        }[];
      };
      reasonText: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").content_v2_1.Schema$OrdersCancelResponse;
    }>;
    updateProductRegionalInventory: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      productId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      regionId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      kind: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      price: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      salePrice: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      salePriceEffectiveDate: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      availability: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      customAttributes: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").content_v2_1.Schema$RegionalInventory;
    }>;
    batchRegionalInventory: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      entries: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateProductLocalInventory: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      productId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      storeCode: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      kind: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      price: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      salePrice: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      salePriceEffectiveDate: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      availability: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      quantity: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      pickupMethod: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
      pickupSla: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
      instoreProductLocation: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      customAttributes: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").content_v2_1.Schema$LocalInventory;
    }>;
    batchLocalInventory: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      entries: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      productId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listProducts: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          maxResults: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          pageToken: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      feedId: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      offerId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      contentLanguage: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      targetCountry: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      externalSellerId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      channel: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        model: {
          label: string;
          value: string;
        }[];
      };
      feedLabel: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      title: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      description: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      link: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      imageLink: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      additionalImageLinks: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      lifestyleImageLinks: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      expirationDate: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      adult: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
      };
      kind: {
        required: boolean;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      brand: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      color: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      googleProductCategory: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      gtin: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      itemGroupId: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      material: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      mpn: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      pattern: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      price: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      salePrice: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      salePriceEffectiveDate: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      dimensions: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          productLength: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          productWidth: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          productHeight: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          productWeight: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
      shipping: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      sizes: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      taxes: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      customAttributes: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      identifierExists: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: true;
      };
      installment: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      multipack: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      customLabel0: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      customLabel1: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      customLabel2: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      customLabel3: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      customLabel4: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      isBundle: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
      };
      mobileLink: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      availabilityDate: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      shippingLabel: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      unitPricingMeasure: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      unitPricingBaseMeasure: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      shippingDimensions: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          shippingLength: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          shippingWidth: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          shippingHeight: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          shippingWeight: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
          };
        };
      } & {
        type: "structuredObject";
      };
      displayAdsId: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      displayAdsSimilarIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      displayAdsTitle: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      displayAdsLink: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      displayAdsValue: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      sellOnGoogleQuantity: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      promotionIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      maxHandlingTime: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      minHandlingTime: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      costOfGoodsSold: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      source: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
      includedDestinations: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      excludedDestinations: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      adsGrouping: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      adsLabels: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      adsRedirect: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      productTypes: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      ageGroup: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      availability: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      condition: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      gender: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      sizeSystem: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      sizeType: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      additionalSizeType: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      energyEfficiencyClass: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      minEnergyEfficiencyClass: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      maxEnergyEfficiencyClass: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      taxCategory: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      transitTimeLabel: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      shoppingAdsExcludedCountries: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      pickupMethod: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
      pickupSla: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
      linkTemplate: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      mobileLinkTemplate: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      productDetails: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      productHighlights: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      subscriptionCost: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      canonicalLink: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      pause: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      productId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      offerId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      contentLanguage: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      targetCountry: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      externalSellerId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      channel: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      feedLabel: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      title: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      description: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      link: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      imageLink: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      additionalImageLinks: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      lifestyleImageLinks: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      expirationDate: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      adult: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
      };
      kind: {
        required: boolean;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      brand: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      color: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      googleProductCategory: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      gtin: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      itemGroupId: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      material: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      mpn: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      pattern: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      price: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      salePrice: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      salePriceEffectiveDate: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      dimensions: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          productLength: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          productWidth: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          productHeight: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          productWeight: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
      shipping: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      sizes: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      taxes: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      customAttributes: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      identifierExists: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: true;
      };
      installment: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      multipack: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      customLabel0: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      customLabel1: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      customLabel2: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      customLabel3: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      customLabel4: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      isBundle: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
      };
      mobileLink: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      availabilityDate: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      shippingLabel: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      unitPricingMeasure: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      unitPricingBaseMeasure: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      shippingDimensions: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          shippingLength: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          shippingWidth: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          shippingHeight: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          shippingWeight: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
          };
        };
      } & {
        type: "structuredObject";
      };
      displayAdsId: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      displayAdsSimilarIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      displayAdsTitle: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      displayAdsLink: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      displayAdsValue: {
        label: string;
        type: "string";
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      sellOnGoogleQuantity: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      promotionIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      maxHandlingTime: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      minHandlingTime: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      costOfGoodsSold: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      source: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
      includedDestinations: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      excludedDestinations: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      adsGrouping: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      adsLabels: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      adsRedirect: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      productTypes: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      ageGroup: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      availability: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      condition: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      gender: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      sizeSystem: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      sizeType: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      additionalSizeType: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      energyEfficiencyClass: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      minEnergyEfficiencyClass: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      maxEnergyEfficiencyClass: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      taxCategory: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      transitTimeLabel: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      shoppingAdsExcludedCountries: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      pickupMethod: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
      pickupSla: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
      linkTemplate: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      mobileLinkTemplate: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      productDetails: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      productHighlights: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      subscriptionCost: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      canonicalLink: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      pause: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
      updateMask: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      productId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      feedId: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    batchProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      entries: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      accountId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      view: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listAccounts: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          maxResults: {
            label: string;
            type: "string";
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          pageToken: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
      view: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
      label: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      name: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateAccount: import("@prismatic-io/spectral").ActionDefinition<{
      name: {
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
      };
      kind: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      websiteUrl: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      adultContent: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: true;
      };
      sellerId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      users: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      youtubeChannelLinks: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      googleMyBusinessLink: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      businessInformation: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      automaticImprovements: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      adsLinks: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      cssId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      labelIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      accountManagement: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
      automaticLabelIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      conversionSettings: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      accountId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      accountId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createAccount: import("@prismatic-io/spectral").ActionDefinition<{
      name: {
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
      };
      kind: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      websiteUrl: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      adultContent: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: true;
      };
      sellerId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      users: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      youtubeChannelLinks: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      googleMyBusinessLink: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      businessInformation: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      automaticImprovements: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      adsLinks: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      cssId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      labelIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      accountManagement: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
      automaticLabelIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      conversionSettings: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
  };
  dataSources: {
    selectAccountMerchant: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProductMerchant: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      account: {
        dataSource: undefined;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectAccount: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProduct: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      merchantId: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    pubSubWebhook: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth2";
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
        required: true;
        comments: string;
        default: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        comments: string;
      };
    };
  }, "oauth2">[];
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;