//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "facebook-marketing";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/facebook-marketing/";
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
  };
  actions: {
    createAdAccountWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        comments: string;
        label: string;
        type: "connection";
        required: true;
      };
      verifyToken: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      callbackUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      adAccountFields: {
        label: string;
        collection: "valuelist";
        type: "string";
        required: false;
        comments: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string[];
      };
      adAccountFieldsJSON: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createPageWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        comments: string;
        label: string;
        type: "connection";
        required: true;
      };
      verifyToken: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      callbackUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageFields: {
        label: string;
        collection: "valuelist";
        type: "string";
        required: false;
        comments: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string[];
      };
      pageFieldsJSON: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        comments: string;
        label: string;
        type: "connection";
        required: true;
      };
      object: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        comments: string;
        label: string;
        type: "connection";
        required: true;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
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
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    businessByName: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      businessName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createConversion: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      pixelId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      eventName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userData: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown) => any;
      };
      actionSource: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      eventTime: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      eventSourceUrl: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      customData: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => any;
      };
      moreData: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => any;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createMultipleConversions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      pixelId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      events: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown) => any[] | undefined;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUserById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      userId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAdAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adAccountId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAddAccounts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
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
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          before: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          after: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createCampaign: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adAccountId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      objective: {
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
      status: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      special_ad_categories: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => any[] | undefined;
      };
      special_ad_category_country: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => any[] | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          adLabels: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => any[] | undefined;
          };
          bid_strategy: {
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
          buying_type: {
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
          campaign_optimization_type: {
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
          daily_budget: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          is_skadnetwork_attribution: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          is_using_l3_schedule: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          iterative_split_test_configs: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            clean: (value: unknown) => any[] | undefined;
          };
          lifetime_budget: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          promoted_object: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            clean: (value: unknown) => any;
          };
          spend_cap: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          start_time: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          stop_time: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      source_campaign_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      topline_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCampaignsInAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adAccountId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
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
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          before: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          after: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addUrlTagsToCreative: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adAccountId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      urlTags: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      objectStoryId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          before: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          after: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      optionalValues: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        comments: string;
        clean: (values: unknown) => Record<string, unknown>;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAdCreative: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adCreativeId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAdCreatives: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adAccountId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
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
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          before: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          after: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateAdCreative: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adCreativeId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      urlTags: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      objectStoryId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      body: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          before: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          after: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      optionalValues: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        comments: string;
        clean: (values: unknown) => Record<string, unknown>;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAdSet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAdSetsInAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adAccountId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
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
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          before: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          after: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateAdSet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adName: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      status: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      targeting: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => any;
      };
      optionalValues: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        comments: string;
        clean: (values: unknown) => Record<string, unknown>;
      };
      fields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createAd: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adAccountId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      name: {
        comments: string;
        required: boolean;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      creative: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown) => any;
      };
      adset_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      status: {
        required: boolean;
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          adset_spec: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            clean: (values: unknown) => any;
          };
          ad_schedule_end_time: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          ad_schedule_start_time: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          adLabels: {
            comments: string;
            label: string;
            type: "code";
            language: "json";
            required: false;
            example: string;
            clean: (value: unknown) => any[] | undefined;
          };
          conversion_domain: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          date_format: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          display_sequence: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          engagement_audience: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          include_demolink_hashes: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          priority: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      audience_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      source_ad_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAd: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAd: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAdPreview: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adFormat: {
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
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAdLeads: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
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
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          before: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          after: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAdsInAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adAccountId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
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
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          before: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          after: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAdsInAdset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateAd: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adName: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      status: {
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
      creativeId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      tracking: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => any[] | undefined;
      };
      optionalValues: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        comments: string;
        clean: (values: unknown) => Record<string, unknown>;
      };
      fields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      authorizeUrl: {
        default: string;
        label: string;
        type: "string";
        comments: string;
        required: true;
        shown: true;
      };
      tokenUrl: {
        label: string;
        type: "string";
        shown: true;
        comments: string;
        default: string;
        required: true;
      };
      clientId: {
        label: string;
        type: "string";
        shown: true;
        example: string;
        comments: string;
        required: true;
      };
      clientSecret: {
        label: string;
        type: "password";
        example: string;
        shown: true;
        comments: string;
        required: true;
      };
      scopes: {
        label: string;
        type: "string";
        shown: true;
        comments: string;
        required: true;
        default: string;
      };
    };
  }, "oauth"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "meta-client-credentials";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.ClientCredentials;
    inputs: {
      authorizeUrl: {
        default: string;
        label: string;
        type: "string";
        comments: string;
        required: true;
        shown: true;
      };
      tokenUrl: {
        label: string;
        type: "string";
        shown: true;
        comments: string;
        default: string;
        required: true;
      };
      clientId: {
        label: string;
        type: "string";
        shown: true;
        example: string;
        comments: string;
        required: true;
      };
      clientSecret: {
        label: string;
        type: "password";
        example: string;
        shown: true;
        comments: string;
        required: true;
      };
      scopes: {
        label: string;
        type: "string";
        shown: true;
        comments: string;
        required: true;
        default: string;
      };
    };
  }, "meta-client-credentials"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "facebookMarketingConversionsToken";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      token: {
        label: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "facebookMarketingConversionsToken"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "sandboxToken";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      token: {
        label: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "sandboxToken">)[];
  dataSources: {
    businessNames: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectAdAccount: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectAdCreative: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adAccountId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectAdSet: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adAccountId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectAdsInAccount: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adAccountId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCampaignInAccount: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      adAccountId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    metaAdsPageTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        comments: string;
        label: string;
        type: "connection";
        required: true;
      };
      verifyToken: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageFields: {
        label: string;
        collection: "valuelist";
        type: "string";
        required: false;
        comments: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string[];
      };
      pageFieldsJSON: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
    metaAdsAdAccountTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        comments: string;
        label: string;
        type: "connection";
        required: true;
      };
      verifyToken: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      adAccountFields: {
        label: string;
        collection: "valuelist";
        type: "string";
        required: false;
        comments: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string[];
      };
      adAccountFieldsJSON: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      version: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
  };
}>;
export = _default;