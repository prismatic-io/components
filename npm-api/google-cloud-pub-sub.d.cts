//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "google-cloud-pub-sub";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/google-cloud-pub-sub/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
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
      version: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    setPolicy: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resource: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      policy: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").pubsub_v1.Schema$Policy;
    }>;
    getPolicy: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resource: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      requestedPolicyVersion: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").pubsub_v1.Schema$Policy;
    }>;
    createSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      subscription: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      topic: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      topicNameOrFullFormat: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        placeholder: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pushConfig: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          bigqueryConfig: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          ackDeadlineSeconds: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: number) => number;
            comments: string;
            required: false;
            example: string;
            placeholder: string;
          };
          retainAckedMessages: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
            default: string;
          };
          messageRetentionDuration: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            required: false;
            example: string;
            placeholder: string;
          };
          labels: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          enableMessageOrdering: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
            default: string;
          };
          expirationPolicy: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          filter: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            required: false;
            example: string;
            placeholder: string;
          };
          deadLetterPolicy: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          retryPolicy: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          detached: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
            default: string;
          };
          enableExactlyOnceDelivery: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
            default: string;
          };
          topicMessageRetentionDuration: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            required: false;
            example: string;
            placeholder: string;
          };
          state: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").pubsub_v1.Schema$Subscription;
    }>;
    createWebhookSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      subscription: {
        label: string;
        comments: string;
        example: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
        placeholder: string;
        dataSource: string;
      };
      topic: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      topicNameOrFullFormat: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        placeholder: string;
      };
      webhookUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        alreadyExisted: boolean;
        ackDeadlineSeconds?: number | null;
        bigqueryConfig?: import("googleapis").pubsub_v1.Schema$BigQueryConfig;
        deadLetterPolicy?: import("googleapis").pubsub_v1.Schema$DeadLetterPolicy;
        detached?: boolean | null;
        enableExactlyOnceDelivery?: boolean | null;
        enableMessageOrdering?: boolean | null;
        expirationPolicy?: import("googleapis").pubsub_v1.Schema$ExpirationPolicy;
        filter?: string | null;
        labels?: {
          [key: string]: string;
        } | null;
        messageRetentionDuration?: string | null;
        name?: string | null;
        pushConfig?: import("googleapis").pubsub_v1.Schema$PushConfig;
        retainAckedMessages?: boolean | null;
        retryPolicy?: import("googleapis").pubsub_v1.Schema$RetryPolicy;
        state?: string | null;
        topic?: string | null;
        topicMessageRetentionDuration?: string | null;
      };
    }>;
    updateSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      subscription: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      topic: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      subscriptionNameOrFullFormat: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        placeholder: string;
      };
      updateMask: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pushConfig: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          bigqueryConfig: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          ackDeadlineSeconds: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: number) => number;
            comments: string;
            required: false;
            example: string;
            placeholder: string;
          };
          retainAckedMessages: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
            default: string;
          };
          messageRetentionDuration: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            required: false;
            example: string;
            placeholder: string;
          };
          labels: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          enableMessageOrdering: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
            default: string;
          };
          expirationPolicy: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          filter: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            required: false;
            example: string;
            placeholder: string;
          };
          deadLetterPolicy: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          retryPolicy: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          detached: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
            default: string;
          };
          enableExactlyOnceDelivery: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
            default: string;
          };
          topicMessageRetentionDuration: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            required: false;
            example: string;
            placeholder: string;
          };
          state: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").pubsub_v1.Schema$Subscription;
    }>;
    getSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      subscription: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      subscriptionNameOrFullFormat: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").pubsub_v1.Schema$Subscription;
    }>;
    listSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageToken: {
            comments: string;
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            required: false;
            example: string;
            placeholder: string;
          };
          pageSize: {
            comments: string;
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: number) => number;
            required: false;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").pubsub_v1.Schema$ListSubscriptionsResponse;
    }>;
    deleteSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      subscription: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      subscriptionNameOrFullFormat: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").pubsub_v1.Schema$Empty;
    }>;
    updatePushConfig: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      subscription: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      subscriptionNameOrFullFormat: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        placeholder: string;
      };
      pushConfiguration: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pushEndpoint: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            required: false;
            example: string;
            placeholder: string;
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
          oidcToken: {
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").pubsub_v1.Schema$Empty;
    }>;
    pullMessages: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      subscription: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      subscriptionNameOrFullFormat: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        placeholder: string;
      };
      maxMessages: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      returnImmediately: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").pubsub_v1.Schema$PullResponse;
    }>;
    createTopic: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      topic: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          labels: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          messageStoragePolicy: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          kmsKeyName: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            required: false;
            example: string;
            placeholder: string;
          };
          schemaSettings: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          satisfiesPzs: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
            default: string;
          };
          messageRetentionDuration: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            required: false;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        alreadyExisted: boolean;
        kmsKeyName?: string | null;
        labels?: {
          [key: string]: string;
        } | null;
        messageRetentionDuration?: string | null;
        messageStoragePolicy?: import("googleapis").pubsub_v1.Schema$MessageStoragePolicy;
        name?: string | null;
        satisfiesPzs?: boolean | null;
        schemaSettings?: import("googleapis").pubsub_v1.Schema$SchemaSettings;
      };
    }>;
    updateTopic: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      topic: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      topicNameOrFullFormat: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        placeholder: string;
      };
      updateMask: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          labels: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          messageStoragePolicy: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          kmsKeyName: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            required: false;
            example: string;
            placeholder: string;
          };
          schemaSettings: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          satisfiesPzs: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
            default: string;
          };
          messageRetentionDuration: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            required: false;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").pubsub_v1.Schema$Topic;
    }>;
    getTopic: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      topic: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      topicNameOrFullFormat: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").pubsub_v1.Schema$Topic;
    }>;
    listTopics: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageToken: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            required: false;
            example: string;
            placeholder: string;
          };
          pageSize: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: number) => number;
            comments: string;
            required: false;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").pubsub_v1.Schema$ListTopicsResponse;
    }>;
    deleteTopic: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      topic: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      topicNameOrFullFormat: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").pubsub_v1.Schema$Empty;
    }>;
    setTopicIamPolicy: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      topic: {
        comments: string;
        example: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").pubsub_v1.Schema$Policy;
    }>;
  };
  triggers: {
    myTrigger: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      response: {
        statusCode: number;
        contentType: string;
      };
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
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
        example: string;
      };
    };
  }, "oauth2"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "privateKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      clientEmail: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        shown: true;
        comments: string;
      };
      privateKey: {
        label: string;
        placeholder: string;
        type: "text";
        required: true;
        shown: true;
        comments: string;
      };
      projectId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        example: string;
        comments: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
      };
    };
  }, "privateKey">)[];
  dataSources: {
    topics: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      pageSize: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
      };
      pageToken: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    subscriptions: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      pageSize: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
      };
      pageToken: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;