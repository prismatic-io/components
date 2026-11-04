//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "klaviyo";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/klaviyo/";
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
      excludeAuthorization: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSegments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsSegment: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").GetSegmentListResponseCollectionCompoundDocument;
    }>;
    createSegment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      segmentName: {
        type: "string";
        required: true;
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      segmentConditionGroups: {
        type: "code";
        language: "json";
        required: true;
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => any[] | undefined;
      };
      isStarredSegment: {
        type: "boolean";
        required: false;
        label: string;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").PostSegmentCreateResponse;
    }>;
    getSegment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      segmentId: {
        type: "string";
        required: true;
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fieldsSegment: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").GetSegmentRetrieveResponseCompoundDocument;
    }>;
    updateSegment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      segmentId: {
        type: "string";
        required: true;
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      segmentName: {
        required: false;
        clean: (value: unknown) => string | undefined;
        type: "string";
        label: string;
        comments: string;
        example: string;
        placeholder: string;
      };
      segmentConditionGroups: {
        required: false;
        type: "code";
        language: "json";
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => any[] | undefined;
      };
      isStarredSegmentOptional: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").PatchSegmentPartialUpdateResponse;
    }>;
    deleteSegment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      segmentId: {
        type: "string";
        required: true;
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    bulkCreateEvents: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      eventsArray: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: true;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    listEvents: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsEvent: {
        label: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      fieldsMetric: {
        label: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      fieldsProfile: {
        label: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").GetEventResponseCollectionCompoundDocument;
    }>;
    createEvent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      eventName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      eventProfile: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: true;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      eventProperties: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: true;
        example: string;
        clean: (value: unknown) => object;
      };
      eventFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          eventTime: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => Date | undefined;
          };
          eventValue: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          eventValueCurrency: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          eventUniqueId: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    getEvent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      eventId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fieldsEvent: {
        label: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      fieldsMetric: {
        label: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      fieldsProfile: {
        label: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").GetEventResponseCompoundDocument;
    }>;
    listCampaigns: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      filterCampaigns: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fieldsCampaign: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").GetCampaignResponseCollectionCompoundDocument;
    }>;
    createCampaign: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      campaignName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      campaignMessages: {
        label: string;
        placeholder: string;
        comments: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        clean: (value: unknown) => any[] | undefined;
      };
      includedAudiences: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string[] | undefined;
      };
      excludedAudiences: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string[] | undefined;
      };
      campaignConfig: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          trackingOptions: {
            label: string;
            placeholder: string;
            comments: string;
            type: "code";
            language: "json";
            example: string;
            required: false;
            clean: (value: unknown) => object | undefined;
          };
          sendOptions: {
            label: string;
            placeholder: string;
            comments: string;
            type: "code";
            language: "json";
            example: string;
            required: false;
            clean: (value: unknown) => object | undefined;
          };
          sendStrategy: {
            label: string;
            placeholder: string;
            comments: string;
            type: "code";
            language: "json";
            example: string;
            required: false;
            clean: (value: unknown) => object | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").PostCampaignResponse;
    }>;
    updateCampaign: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      campaignId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      campaignName: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
      };
      includedAudiences: {
        required: false;
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      excludedAudiences: {
        required: false;
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      campaignConfig: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          trackingOptions: {
            label: string;
            placeholder: string;
            comments: string;
            type: "code";
            language: "json";
            example: string;
            required: false;
            clean: (value: unknown) => object | undefined;
          };
          sendOptions: {
            label: string;
            placeholder: string;
            comments: string;
            type: "code";
            language: "json";
            example: string;
            required: false;
            clean: (value: unknown) => object | undefined;
          };
          sendStrategy: {
            label: string;
            placeholder: string;
            comments: string;
            type: "code";
            language: "json";
            example: string;
            required: false;
            clean: (value: unknown) => object | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").PatchCampaignResponse;
    }>;
    getCampaign: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      campaignId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fieldsCampaign: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").GetCampaignResponseCompoundDocument;
    }>;
    deleteCampaign: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      campaignId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    listProfile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsProfile: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      additionalFieldsProfile: {
        label: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").GetProfileResponseCollection;
    }>;
    createProfile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          email: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          phoneNumber: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          firstName: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          lastName: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      profileFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          externalId: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          organization: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          title: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          image: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          location: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => object | undefined;
          };
          properties: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            placeholder: string;
            required: false;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").PostProfileResponse;
    }>;
    getProfile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      profileId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fieldsProfile: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      additionalFieldsProfile: {
        label: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").GetProfileResponsePluralConversationsCompoundDocument;
    }>;
    updateProfile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      profileId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          email: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          phoneNumber: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          firstName: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          lastName: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      profileFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          externalId: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          organization: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          title: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          image: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          location: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => object | undefined;
          };
          properties: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            placeholder: string;
            required: false;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").PatchProfileResponse;
    }>;
    subscribeProfiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subscribeProfiles: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown) => any[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    unsubscribeProfiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      unsubscribeProfiles: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown) => any[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    getTemplate: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      templateId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fieldsTemplate: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").GetTemplateDndResponse;
    }>;
    listTemplates: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsTemplate: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").GetTemplateDndResponseCollection;
    }>;
    createTemplate: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      templateName: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      editorType: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      templateHtml: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      templateText: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").PostTemplateDndResponse;
    }>;
    updateTemplate: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      templateId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      templateName: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
      };
      templateHtml: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      templateText: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").PatchTemplateDndResponse;
    }>;
    deleteTemplate: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      templateId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    listLists: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsList: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").GetListListResponseCollectionCompoundDocument;
    }>;
    createList: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listName: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").PostListCreateResponse;
    }>;
    getList: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fieldsList: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").GetListRetrieveResponseCompoundDocument;
    }>;
    updateList: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      listName: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").PatchListPartialUpdateResponse;
    }>;
    deleteList: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    listListProfiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      additionalFieldsProfile: {
        label: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      fieldsProfile: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").GetListMemberResponseCollection;
    }>;
    listImages: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsImage: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").GetImageResponseCollection;
    }>;
    uploadImage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      imageUrl: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      imageName: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      fileData: {
        label: string;
        placeholder: string;
        type: "data";
        required: false;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").PostImageResponse;
    }>;
    getImage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      imageId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fieldsImage: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").GetImageResponse;
    }>;
    updateImage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      imageId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      imageName: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      imageHidden: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").PatchImageResponse;
    }>;
    listAccounts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsAccount: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").GetAccountResponseCollection;
    }>;
    getAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fieldsAccount: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("klaviyo-api").GetAccountResponse;
    }>;
  };
  triggers: {
    pollCampaignChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pollMessageChannel: {
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
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
    pollProfileAndListChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pollProfileOrListResourceType: {
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
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    selectAccount: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTemplate: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCampaign: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProfile: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectEvent: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSegment: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectList: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectImage: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "klaviyoApiKeyConnection";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      apiKey: {
        label: string;
        type: "password";
        required: true;
        comments: string;
      };
    };
  }, "klaviyoApiKeyConnection"> | import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    oauth2PkceMethod: import("@prismatic-io/spectral").OAuth2PkceMethod.S256;
    key: "klaviyoOAuth2Connection";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      authorizeUrl: {
        label: string;
        type: "string";
        required: true;
        shown: false;
        default: string;
      };
      tokenUrl: {
        label: string;
        type: "string";
        required: true;
        shown: false;
        default: string;
      };
      scopes: {
        label: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
      };
      clientId: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      clientSecret: {
        label: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "klaviyoOAuth2Connection">)[];
}>;
export = _default;