//#region src/types/paging.d.ts
interface Paging {
  next: {
    after: string;
    link?: string;
  };
}
//#endregion
//#region src/types/searchResponse.d.ts
interface SearchResponse {
  total: number;
  results: Record<string, unknown>[];
  paging?: {
    next?: {
      after: string;
    };
  };
}
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "hubspot";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/hubspot/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      eventType: {
        type: "string";
        label: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      propertyWebhookName: {
        type: "string";
        label: string;
        placeholder: string;
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      active: {
        type: "boolean";
        label: string;
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subscriptionId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAllWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    search: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      searchEndpoint: {
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
      searchProperties: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      objectType: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
      };
      searchLimit: {
        label: string;
        type: "string";
        required: true;
        default: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      fetchAll: {
        comments: string;
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: SearchResponse;
    }>;
    listProperties: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      objectType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProducts: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      archived: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
          limit: {
            label: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
          after: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalProperties: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        required: false;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string[];
      };
      associationsList: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown[] | {
        results: unknown[];
        paging: Paging;
      };
    }>;
    getProduct: import("@prismatic-io/spectral").ActionDefinition<{
      productId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        dataSource: string;
        comments: string;
        example: string;
      };
      productName: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
      };
      additionalProperties: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        required: false;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string[];
      };
      associationsList: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      archived: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProduct: import("@prismatic-io/spectral").ActionDefinition<{
      productId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProduct: import("@prismatic-io/spectral").ActionDefinition<{
      productName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      description: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      sku: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      price: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
      };
      recurringBillingPeriod: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      unitCost: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicFields: unknown) => Record<string, unknown>;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicValues: unknown) => Record<string, unknown>;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProduct: import("@prismatic-io/spectral").ActionDefinition<{
      productId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      updateProductName: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      updateSku: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      updatePrice: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      recurringBillingPeriod: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      unitCost: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicFields: unknown) => Record<string, unknown>;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicValues: unknown) => Record<string, unknown>;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    validateConnection: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: boolean;
    }>;
    listLineItems: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      archived: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
          limit: {
            label: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
          after: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalProperties: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        required: false;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string[];
      };
      associationsList: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown[] | {
        results: unknown[];
        paging: Paging;
      };
    }>;
    getLineItem: import("@prismatic-io/spectral").ActionDefinition<{
      lineItemId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        dataSource: string;
        comments: string;
        example: string;
      };
      lineItemName: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
      };
      archived: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      additionalProperties: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        required: false;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string[];
      };
      associationsList: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteLineItem: import("@prismatic-io/spectral").ActionDefinition<{
      lineItemId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createLineItem: import("@prismatic-io/spectral").ActionDefinition<{
      lineItemName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recurringBillingPeriod: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      recurringBillingFrequency: {
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
      quantity: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      price: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicFields: unknown) => Record<string, unknown>;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicValues: unknown) => Record<string, unknown>;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateLineItem: import("@prismatic-io/spectral").ActionDefinition<{
      lineItemId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      updateLineItemName: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      updateProductId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      recurringBillingPeriod: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      recurringBillingFrequency: {
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
      quantity: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      updatePrice: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicFields: unknown) => Record<string, unknown>;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicValues: unknown) => Record<string, unknown>;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    archiveBatchEngagement: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      engagementObject: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      engagementIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string[];
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createBatchEngagement: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      engagementObject: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      batchInputs: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        clean: (value: unknown) => object;
        example: string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createEngagement: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      engagementObject: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      associationsJson: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
      properties: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        clean: (value: unknown) => object;
        required: true;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteEngagement: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      engagementObject: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      engagementId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getEngagement: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      engagementObject: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      engagementId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      archived: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      propertiesToReturn: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string[];
      };
      propertiesWithHistoryToReturn: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string[];
      };
      associations: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      idProperty: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listEngagements: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      engagementObject: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      propertiesToReturn: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string[];
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown[] | {
        results: unknown[];
        paging: Paging;
      };
    }>;
    updateBatchEngagement: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      engagementObject: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      batchInputs: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateEngagement: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      engagementObject: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      engagementId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      properties: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        clean: (value: unknown) => object;
        required: true;
      };
      idProperty: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDeals: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      archived: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
          limit: {
            label: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
          after: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalProperties: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        required: false;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string[];
      };
      associationsList: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown[] | {
        results: unknown[];
        paging: Paging;
      };
    }>;
    getDealById: import("@prismatic-io/spectral").ActionDefinition<{
      dealId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
      };
      dealName: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
      };
      archived: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      additionalProperties: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        required: false;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string[];
      };
      associationsList: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteDeal: import("@prismatic-io/spectral").ActionDefinition<{
      dealId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchDeals: import("@prismatic-io/spectral").ActionDefinition<{
      propertyName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        dataSource: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      value: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      operator: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            required: false;
            default: string;
            example: string;
            comments: string;
            clean: (value: unknown) => number;
          };
          after: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createDeal: import("@prismatic-io/spectral").ActionDefinition<{
      dealName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pipeline: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dealStage: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      amount: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      closeDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      hubspotOwnerId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      priority: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      dealType: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicFields: unknown) => Record<string, unknown>;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicValues: unknown) => Record<string, unknown>;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateDeal: import("@prismatic-io/spectral").ActionDefinition<{
      dealId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        dataSource: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      amount: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      closeDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      updateDealName: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      hubspotOwnerId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      updatePipeline: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      updateDealStage: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      priority: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      dealType: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicFields: unknown) => Record<string, unknown>;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicValues: unknown) => Record<string, unknown>;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCustomObject: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      objectType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createCustomObject: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      singularLabel: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      properties: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => object;
        required: true;
      };
      pluralLabel: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      requiredProperties: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        default: string[];
        clean: (value: unknown) => string[];
        example: string;
      };
      searchableProperties: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        default: string[];
        clean: (value: unknown) => string[];
        example: string;
      };
      secondaryDisplayProperties: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        default: string[];
        clean: (value: unknown) => string[];
        example: string;
      };
      associatedObjects: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        default: string[];
        clean: (value: unknown) => string[];
        example: string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicFields: unknown) => Record<string, unknown>;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicValues: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateCustomObject: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      objectType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      singularLabel: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
      };
      pluralLabel: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
      };
      requiredProperties: {
        required: boolean;
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        default: string[];
        clean: (value: unknown) => string[];
        example: string;
      };
      searchableProperties: {
        required: boolean;
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        default: string[];
        clean: (value: unknown) => string[];
        example: string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicFields: unknown) => Record<string, unknown>;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicValues: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteCustomObject: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      objectType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      archived: {
        default: string;
        label: string;
        type: "boolean";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCustomObjects: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      archived: {
        required: boolean;
        label: string;
        type: "boolean";
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      additionalProperties: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        required: false;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    cancelImport: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      importId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listActiveImports: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown[] | {
        results: unknown[];
        paging: Paging;
      };
    }>;
    importCRMData: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        comments: string;
        example: string;
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      files: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        clean: (value: unknown) => object;
        example: string;
      };
      dataFiles: {
        label: string;
        type: "data";
        collection: "keyvaluelist";
        required: true;
        comments: string;
        example: string;
        clean: (values: unknown) => Record<string, unknown>;
      };
      dateFormat: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        default: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      importOptions: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          importOperations: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            clean: (value: unknown) => object | undefined;
            example: string;
          };
          marketableContactImport: {
            label: string;
            type: "boolean";
            required: false;
            default: string;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          createContactListFromImport: {
            label: string;
            type: "boolean";
            required: false;
            default: string;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAnImport: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      importId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    exportCRMData: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      schemaType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      format: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      exportName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      objectProperties: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      objectType: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      language: {
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
      listId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      publicCrmSearchRequest: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object | undefined;
        example: string;
      };
      associatedObjectType: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listContacts: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      archived: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
          limit: {
            label: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
          after: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalProperties: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        required: false;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string[];
      };
      associationsList: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown[] | {
        results: unknown[];
        paging: Paging;
      };
    }>;
    getContact: import("@prismatic-io/spectral").ActionDefinition<{
      contactId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        comments: string;
      };
      contactEmail: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
      };
      archived: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      additionalProperties: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        required: false;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string[];
      };
      associationsList: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteContact: import("@prismatic-io/spectral").ActionDefinition<{
      contactId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    CreateContact: import("@prismatic-io/spectral").ActionDefinition<{
      contactFirstName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contactlastName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contactCompany: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          contactEmail: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
          };
          phone: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            comments: string;
          };
          website: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicFields: unknown) => Record<string, unknown>;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicValues: unknown) => Record<string, unknown>;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateContact: import("@prismatic-io/spectral").ActionDefinition<{
      contactId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contactUpdateFirstName: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      contactUpdatelastName: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      contactUpdateCompany: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          contactUpdateEmail: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          updatePhone: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          updateWebsite: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicFields: unknown) => Record<string, unknown>;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicValues: unknown) => Record<string, unknown>;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    archiveBatchContacts: import("@prismatic-io/spectral").ActionDefinition<{
      contactIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string[];
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createBatchContacts: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      batchInputs: {
        label: string;
        comments: string;
        example: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getBatchContacts: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      archived: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      propertiesWithHistory: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (value: unknown) => string[];
      };
      properties: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (value: unknown) => string[];
      };
      idProperty: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      contactIds: {
        required: boolean;
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string[];
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateBatchContacts: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      batchInputs: {
        label: string;
        comments: string;
        example: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCompanies: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      archived: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
          limit: {
            label: string;
            type: "string";
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
          after: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalProperties: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        required: false;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string[];
      };
      associationsList: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown[] | {
        results: unknown[];
        paging: Paging;
      };
    }>;
    getCompany: import("@prismatic-io/spectral").ActionDefinition<{
      companyId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        comments: string;
      };
      companyName: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
      };
      domain: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
      };
      archived: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      additionalProperties: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        required: false;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string[];
      };
      associationsList: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteCompany: import("@prismatic-io/spectral").ActionDefinition<{
      companyId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createCompany: import("@prismatic-io/spectral").ActionDefinition<{
      companyName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      industry: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      companyPhone: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      domain: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
      };
      city: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      state: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicFields: unknown) => Record<string, unknown>;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicValues: unknown) => Record<string, unknown>;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateCompany: import("@prismatic-io/spectral").ActionDefinition<{
      companyId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      updateCompanyName: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      industry: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      companyPhone: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      updateDomain: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      city: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      state: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicFields: unknown) => Record<string, unknown>;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicValues: unknown) => Record<string, unknown>;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAssociationTypes: import("@prismatic-io/spectral").ActionDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fromObjectType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      toObjectType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createAssociations: import("@prismatic-io/spectral").ActionDefinition<{
      fromObjectType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      toObjectType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      fromId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      toId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      associateType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    readAssociations: import("@prismatic-io/spectral").ActionDefinition<{
      fromObjectType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      toObjectType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      fromId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    ArchiveAssociations: import("@prismatic-io/spectral").ActionDefinition<{
      fromObjectType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      toObjectType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      fromId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      toId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      associateType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: any;
    }, import("@prismatic-io/spectral").Inputs>;
    eventTypeSubscription: import("@prismatic-io/spectral").TriggerDefinition<{
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      eventTypes: {
        type: "string";
        collection: "valuelist";
        label: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        required: true;
        clean: (value: unknown) => string[];
      };
      propertyChangeProperties: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (dynamicFields: unknown) => Record<string, unknown>;
      };
      overwriteWebhookSettings: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, false, {
      payload: any;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      lookBackDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
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
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      searchEndpoint: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      searchProperties: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesCustomObjectsTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      lookBackDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
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
      hubspotConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      objectType: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      searchProperties: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: "oauth2";
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
        shown: true;
        comments: string;
        example: string;
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
      appId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
      developerApiKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: false;
        shown: true;
        comments: string;
      };
    };
  }, "oauth2"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "privateAppAccessToken";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      accessToken: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "privateAppAccessToken"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "hubspotOAuthTrigger";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "hubspotOAuthTrigger">)[];
  dataSources: {
    getObjectSelection: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      objectsToSelect: {
        label: string;
        type: "string";
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        comments: string;
        clean: (value: unknown) => string[];
      };
      includeCustomObjects: {
        label: string;
        type: "boolean";
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "objectSelection">;
    selectAssociationType: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fromObjectType: {
        dataSource: any;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      toObjectType: {
        dataSource: any;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCompany: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectContact: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCustomObject: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDeal: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectEngagement: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectImport: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectLineItem: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectObjectType: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProduct: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProperty: import("@prismatic-io/spectral").DataSourceDefinition<{
      objectType: {
        dataSource: any;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWebhook: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;