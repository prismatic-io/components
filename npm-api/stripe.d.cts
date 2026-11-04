//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "stripe";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/stripe/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    createWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      webhookUrl: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookEvents: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string[];
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      webhookId: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      webhookId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        object: string;
        api_version: any;
        application: any;
        created: number;
        description: any;
        enabled_events: string[];
        livemode: boolean;
        metadata: {};
        status: string;
        url: string;
      };
    }>;
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          startingAfter: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          endingBefore: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
        label: string;
        comments: string;
      } & {
        type: "structuredObject";
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      webhookId: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookUrl: {
        comments: string;
        required: boolean;
        clean: (string: unknown) => string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
      };
      webhookEvents: {
        comments: string;
        required: boolean;
        clean: (value: unknown) => string[] | undefined;
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        placeholder: string;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      customerId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      priceId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      collectionMethod: {
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (string: unknown) => string;
      };
      quantity: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      paymentId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      cancelAt: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      daysUntilDue: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      fieldValues: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
      };
      metadata: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      subscriptionId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      subscriptionId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      pagination: {
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          startingAfter: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
        label: string;
        comments: string;
      } & {
        type: "structuredObject";
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      subscriptionId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      subscriptionPriceId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      quantity: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      collectionMethod: {
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (string: unknown) => string;
      };
      paymentId: {
        dataSource: any;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      cancelAt: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      fieldValues: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
      };
      metadata: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createProduct: import("@prismatic-io/spectral").ActionDefinition<{
      productName: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productType: {
        label: string;
        type: "string";
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      productUrl: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      shippable: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      active: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      description: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      productImages: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      metadata: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      fieldValues: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteProduct: import("@prismatic-io/spectral").ActionDefinition<{
      productId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getProduct: import("@prismatic-io/spectral").ActionDefinition<{
      productId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listProducts: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      pagination: {
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          startingAfter: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
        label: string;
        comments: string;
      } & {
        type: "structuredObject";
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateProduct: import("@prismatic-io/spectral").ActionDefinition<{
      productId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      updateProductName: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      productUrl: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      shippable: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      active: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      description: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      productImages: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      metadata: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      fieldValues: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createPrice: import("@prismatic-io/spectral").ActionDefinition<{
      productId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      currency: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      unitPrice: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => number;
      };
      active: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      nickname: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      recurringInterval: {
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (string: unknown) => string;
      };
      fieldValues: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
      };
      metadata: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getPrice: import("@prismatic-io/spectral").ActionDefinition<{
      priceId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listPrices: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      pagination: {
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          startingAfter: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
        label: string;
        comments: string;
      } & {
        type: "structuredObject";
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updatePrice: import("@prismatic-io/spectral").ActionDefinition<{
      priceId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      active: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      nickname: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      fieldValues: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
      };
      metadata: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    cancelPaymentIntent: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      paymentIntentId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      cancellationReason: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (string: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    capturePaymentIntent: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      paymentIntentId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      amountToCapture: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => number;
      };
      metadata: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      additionalFields: {
        label: string;
        comments: string;
        inputs: {
          applicationFeeAmount: {
            comments: string;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          statementDescriptor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          statementDescriptorSuffix: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          transferData: {
            comments: string;
            example: string;
            label: string;
            type: "code";
            language: "json";
            placeholder: string;
            required: false;
            clean: (object: unknown) => object;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    confirmPaymentIntent: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      paymentIntentId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      paymentMethod: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      receiptEmail: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      captureMethod: {
        label: string;
        type: "string";
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        required: false;
        clean: (string: unknown) => string;
      };
      additionalFields: {
        label: string;
        comments: string;
        inputs: {
          setupFutureUsage: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            clean: (string: unknown) => string;
          };
          errorOnRequiresAction: {
            label: string;
            type: "string";
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            required: false;
            clean: (value: unknown) => boolean;
          };
          mandate: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          mandateData: {
            label: string;
            type: "code";
            language: "json";
            example: string;
            comments: string;
            placeholder: string;
            required: false;
            clean: (object: unknown) => object;
          };
          offSession: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            clean: (value: unknown) => boolean;
          };
          paymentMethodData: {
            label: string;
            type: "code";
            language: "json";
            example: string;
            comments: string;
            placeholder: string;
            required: false;
            clean: (object: unknown) => object;
          };
          paymentMethodOptions: {
            label: string;
            type: "code";
            language: "json";
            example: string;
            comments: string;
            placeholder: string;
            required: false;
            clean: (object: unknown) => object;
          };
          radarOptions: {
            label: string;
            type: "code";
            language: "json";
            example: string;
            comments: string;
            placeholder: string;
            required: false;
            clean: (object: unknown) => object;
          };
          returnUrl: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          useStripeSdk: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            clean: (value: unknown) => boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createPaymentIntent: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      amount: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number;
      };
      currency: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      automaticPaymentMethods: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (object: unknown) => object;
      };
      confirm: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      customerId: {
        label: string;
        comments: string;
        clean: (string: unknown) => string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
      };
      description: {
        comments: string;
        clean: (string: unknown) => string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
      };
      metadata: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      paymentMethod: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      receiptEmail: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      paymentMethodTypes: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      transferOptions: {
        label: string;
        comments: string;
        inputs: {
          applicationFeeAmount: {
            comments: string;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          onBehalfOf: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          transferData: {
            label: string;
            type: "code";
            language: "json";
            example: string;
            comments: string;
            placeholder: string;
            required: false;
            clean: (object: unknown) => object;
          };
          transferGroup: {
            comments: string;
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (string: unknown) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        comments: string;
        inputs: {
          setupFutureUsage: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            clean: (string: unknown) => string;
          };
          shipping: {
            comments: string;
            label: string;
            type: "code";
            language: "json";
            placeholder: string;
            required: false;
            example: string;
            clean: (object: unknown) => object;
          };
          statementDescriptor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          statementDescriptorSuffix: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          captureMethod: {
            label: string;
            type: "string";
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            required: false;
            clean: (string: unknown) => string;
          };
          confirmationMethod: {
            label: string;
            type: "string";
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            required: false;
            clean: (string: unknown) => string;
          };
          errorOnRequiresAction: {
            label: string;
            type: "string";
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            required: false;
            clean: (value: unknown) => boolean;
          };
          mandate: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          mandateData: {
            label: string;
            type: "code";
            language: "json";
            example: string;
            comments: string;
            placeholder: string;
            required: false;
            clean: (object: unknown) => object;
          };
          offSession: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            clean: (value: unknown) => boolean;
          };
          paymentMethodData: {
            label: string;
            type: "code";
            language: "json";
            example: string;
            comments: string;
            placeholder: string;
            required: false;
            clean: (object: unknown) => object;
          };
          paymentMethodOptions: {
            label: string;
            type: "code";
            language: "json";
            example: string;
            comments: string;
            placeholder: string;
            required: false;
            clean: (object: unknown) => object;
          };
          radarOptions: {
            label: string;
            type: "code";
            language: "json";
            example: string;
            comments: string;
            placeholder: string;
            required: false;
            clean: (object: unknown) => object;
          };
          returnUrl: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          useStripeSdk: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            clean: (value: unknown) => boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getPaymentIntent: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      paymentIntent: {
        required: boolean;
        comments: string;
        label: string;
        clean: (value: unknown, defaultValue?: string) => string;
        type: "string";
        example: string;
        placeholder: string;
      };
      clientSecret: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (string: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listPaymentIntents: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        comments: string;
        clean: (string: unknown) => string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
      };
      created: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        placeholder: string;
        required: false;
        example: string;
        clean: (object: unknown) => object;
      };
      pagination: {
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          startingAfter: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          endingBefore: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
        label: string;
        comments: string;
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    searchPaymentIntent: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      query: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (string: unknown) => string;
          };
        };
        label: string;
        comments: string;
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updatePaymentIntent: import("@prismatic-io/spectral").ActionDefinition<{
      paymentIntentId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      amount: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number;
      };
      currency: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      customerId: {
        label: string;
        comments: string;
        clean: (string: unknown) => string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
      };
      description: {
        comments: string;
        clean: (string: unknown) => string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
      };
      metadata: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      paymentMethod: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      receiptEmail: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      paymentMethodTypes: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      transferOptions: {
        label: string;
        comments: string;
        inputs: {
          applicationFeeAmount: {
            comments: string;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          transferData: {
            label: string;
            type: "code";
            language: "json";
            example: string;
            comments: string;
            placeholder: string;
            required: false;
            clean: (object: unknown) => object;
          };
          transferGroup: {
            comments: string;
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (string: unknown) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        comments: string;
        inputs: {
          setupFutureUsage: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            clean: (string: unknown) => string;
          };
          shipping: {
            comments: string;
            label: string;
            type: "code";
            language: "json";
            placeholder: string;
            required: false;
            example: string;
            clean: (object: unknown) => object;
          };
          statementDescriptor: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          statementDescriptorSuffix: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          captureMethod: {
            label: string;
            type: "string";
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            required: false;
            clean: (string: unknown) => string;
          };
          paymentMethodData: {
            label: string;
            type: "code";
            language: "json";
            example: string;
            comments: string;
            placeholder: string;
            required: false;
            clean: (object: unknown) => object;
          };
          paymentMethodOptions: {
            label: string;
            type: "code";
            language: "json";
            example: string;
            comments: string;
            placeholder: string;
            required: false;
            clean: (object: unknown) => object;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
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
      debugRequest: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
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
    createInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      customerId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      collectionMethod: {
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (string: unknown) => string;
      };
      paymentId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      autoAdvance: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      fieldValues: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
      };
      subscriptionId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      description: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      metadata: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      dueDate: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      invoiceId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      invoiceId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listInvoices: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      pagination: {
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          startingAfter: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
        label: string;
        comments: string;
      } & {
        type: "structuredObject";
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      invoiceId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customerId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      paymentId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      collectionMethod: {
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (string: unknown) => string;
      };
      description: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      dueDate: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      fieldValues: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
      };
      metadata: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      additionalFields: {
        label: string;
        comments: string;
        inputs: {
          autoAdvance: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          applicationFeeAmount: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          coupon: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          discount: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    closeDispute: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      disputeId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getDispute: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      disputeId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listDisputes: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      chargeId: {
        label: string;
        required: boolean;
        comments: string;
        clean: (string: unknown) => string;
        type: "string";
        example: string;
        placeholder: string;
      };
      paymentIntent: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (string: unknown) => string;
      };
      created: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        placeholder: string;
        required: false;
        example: string;
        clean: (object: unknown) => object;
      };
      pagination: {
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          startingAfter: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          endingBefore: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
        label: string;
        comments: string;
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateDispute: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      disputeId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      evidence: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        comments: string;
        placeholder: string;
        required: false;
        clean: (object: unknown) => object;
      };
      metadata: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      submit: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      contactInfo: {
        label: string;
        comments: string;
        inputs: {
          customerName: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          customerEmail: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          customerPhone: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      address: {
        label: string;
        comments: string;
        inputs: {
          customerAddress1: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          customerAddress2: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          customerCity: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          customerState: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          customerPostal: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          customerCountry: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      customerBalance: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => number;
      };
      customerPaymentId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      customerDescription: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      customerMetadata: {
        label: string;
        type: "string";
        comments: string;
        collection: "keyvaluelist";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      customerId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      customerId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listCustomers: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      pagination: {
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          startingAfter: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
        label: string;
        comments: string;
      } & {
        type: "structuredObject";
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      customerId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      contactInfo: {
        label: string;
        comments: string;
        inputs: {
          customerName: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          customerEmail: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          customerPhone: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      address: {
        label: string;
        comments: string;
        inputs: {
          customerAddress1: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          customerAddress2: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          customerCity: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          customerState: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          customerPostal: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          customerCountry: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      customerBalance: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => number;
      };
      customerDescription: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      fieldValues: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
      };
      customerMetadata: {
        label: string;
        type: "string";
        comments: string;
        collection: "keyvaluelist";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createCheckoutSession: import("@prismatic-io/spectral").ActionDefinition<{
      mode: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        placeholder: string;
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lineItems: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
      customerEmail: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      customerId: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      clientReferenceId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      successUrl: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      cancelUrl: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      bodyParams: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        placeholder: string;
        required: false;
        example: string;
        clean: (object: unknown) => object;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    expireCheckoutSession: import("@prismatic-io/spectral").ActionDefinition<{
      sessionId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getCheckoutSession: import("@prismatic-io/spectral").ActionDefinition<{
      sessionId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        object: string;
        amount_subtotal: number;
        amount_total: number;
        automatic_tax: {
          enabled: boolean;
          liability: any;
          provider: any;
          status: any;
        };
        created: number;
        currency: string;
        custom_fields: any[];
        custom_text: {
          after_submit: any;
          shipping_address: any;
          submit: any;
          terms_of_service_acceptance: any;
        };
        customer: any;
        expires_at: number;
        livemode: boolean;
        mode: string;
        payment_method_types: string[];
        payment_status: string;
        shipping_options: any[];
        status: string;
        url: string;
      };
    }>;
    listCheckoutSessionLineItems: import("@prismatic-io/spectral").ActionDefinition<{
      sessionId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          startingAfter: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          endingBefore: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
        label: string;
        comments: string;
      } & {
        type: "structuredObject";
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("stripe").Stripe.ApiList<import("stripe").Stripe.LineItem>;
    }>;
    listCheckoutSessions: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          startingAfter: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          endingBefore: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
        label: string;
        comments: string;
      } & {
        type: "structuredObject";
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateCheckoutSession: import("@prismatic-io/spectral").ActionDefinition<{
      sessionId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      metadata: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getCharge: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      chargeId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listCharges: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      pagination: {
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          startingAfter: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
        label: string;
        comments: string;
      } & {
        type: "structuredObject";
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    searchCharges: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      query: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        comments: string;
        inputs: {
          limit: {
            comments: string;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (string: unknown) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateCharge: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      chargeId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customerId: {
        label: string;
        comments: string;
        clean: (string: unknown) => string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
      };
      description: {
        comments: string;
        clean: (string: unknown) => string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
      };
      metadata: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      receiptEmail: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      shipping: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (object: unknown) => object;
      };
      fraudDetails: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (object: unknown) => object;
      };
      transferGroup: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (string: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    attachCard: import("@prismatic-io/spectral").ActionDefinition<{
      customerId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      paymentId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createCard: import("@prismatic-io/spectral").ActionDefinition<{
      customerId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      cardNumber: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expMonth: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      expYear: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      cvc: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      billingAddress: {
        label: string;
        comments: string;
        inputs: {
          billingAddress1: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          billingAddress2: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          billingCity: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          state: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          postalCode: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          billingCountry: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      contactInfo: {
        label: string;
        comments: string;
        inputs: {
          billingName: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          billingEmail: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          phone: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      metadata: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    detachCard: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      customerId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      paymentId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getCard: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      customerId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      paymentId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listCards: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      customerId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      pagination: {
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          startingAfter: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          endingBefore: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
        label: string;
        comments: string;
      } & {
        type: "structuredObject";
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateCard: import("@prismatic-io/spectral").ActionDefinition<{
      customerId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (string: unknown) => string;
      };
      paymentId: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      expMonth: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      expYear: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      billingAddress: {
        label: string;
        comments: string;
        inputs: {
          billingAddress1: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          billingAddress2: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          billingCity: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          state: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          postalCode: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          billingCountry: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      contactInfo: {
        label: string;
        comments: string;
        inputs: {
          billingName: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          billingEmail: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          phone: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      metadata: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getBalanceTransaction: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      balanceTransactionId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listBalanceTransactions: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      created: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        placeholder: string;
        required: false;
        example: string;
        clean: (object: unknown) => object;
      };
      currency: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      source: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      pagination: {
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          startingAfter: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
          endingBefore: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
        label: string;
        comments: string;
      } & {
        type: "structuredObject";
      };
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listAccounts: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (number: unknown) => number;
      };
      pagination: {
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          startingAfter: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (string: unknown) => string;
          };
        };
        label: string;
        comments: string;
      } & {
        type: "structuredObject";
      };
      stripeConnection: {
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
    instanceDeployWebhook: import("@prismatic-io/spectral").TriggerDefinition<{
      webhookEvents: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string[];
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      disableWebhookValidation: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      webhookSecret: {
        comments: string;
        label: string;
        type: "password";
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pollEventTypes: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
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
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
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
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "apiKey">[];
  dataSources: {
    selectBalanceTransaction: import("@prismatic-io/spectral").DataSourceDefinition<{
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCard: import("@prismatic-io/spectral").DataSourceDefinition<{
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        dataSource: any;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCharge: import("@prismatic-io/spectral").DataSourceDefinition<{
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCheckoutSession: import("@prismatic-io/spectral").DataSourceDefinition<{
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCustomer: import("@prismatic-io/spectral").DataSourceDefinition<{
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDispute: import("@prismatic-io/spectral").DataSourceDefinition<{
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectInvoice: import("@prismatic-io/spectral").DataSourceDefinition<{
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPaymentIntent: import("@prismatic-io/spectral").DataSourceDefinition<{
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        comments: string;
        clean: (string: unknown) => string;
        dataSource: any;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
      };
      startingAfter: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
      endingBefore: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (string: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProduct: import("@prismatic-io/spectral").DataSourceDefinition<{
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPrice: import("@prismatic-io/spectral").DataSourceDefinition<{
      stripeConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSubscription: import("@prismatic-io/spectral").DataSourceDefinition<{
      stripeConnection: {
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