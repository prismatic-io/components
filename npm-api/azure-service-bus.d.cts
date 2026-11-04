//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "azureServiceBus";
  documentationUrl: "https://prismatic.io/docs/components/azureServiceBus/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Data Platforms";
  };
  actions: {
    receiveMessagesFromQueue: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      subscriptionId: {
        required: false;
        label: string;
        comments: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      resourceGroupName: {
        required: false;
        label: string;
        comments: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      queueName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      amountOfMessages: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => number;
      };
      maxTimeToWait: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => number;
      };
      returnFullMessages: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      peek: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any[];
    }>;
    sendMessagesToQueue: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      subscriptionId: {
        required: false;
        label: string;
        comments: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      resourceGroupName: {
        required: false;
        label: string;
        comments: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      queueName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      messages: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        required: true;
        clean: (value: unknown) => any[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        body: any;
      }[];
    }>;
    sendMessageToQueue: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      subscriptionId: {
        required: false;
        label: string;
        comments: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      resourceGroupName: {
        required: false;
        label: string;
        comments: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      queueName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      body: {
        label: string;
        type: "string";
        required: true;
        comments: string;
      };
      contentType: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        required: false;
        clean: (val: unknown) => string | undefined;
      };
      messageId: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (val: unknown) => string | undefined;
      };
      partitionKey: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (val: unknown) => string | undefined;
      };
      replyTo: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (val: unknown) => string | undefined;
      };
      scheduledEnqueueTimeUtc: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (val: unknown) => Date | undefined;
      };
      subject: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (val: unknown) => string | undefined;
      };
      to: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (val: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@azure/service-bus").ServiceBusMessage;
    }>;
    createOrUpdateNamespaces: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      location: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      identityType: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          label: string;
          value: string;
        }[];
      };
      userAssignedIdentities: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      alternateName: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      disableLocalAuth: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      keySource: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      keyVaultProperties: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      requireInfrastructureEncryption: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      privateEndpointConnections: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      zoneRedundant: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sku: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tags: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createOrUpdateQueue: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      queueName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      autoDeleteOnIdle: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      deadLetteringOnMessageExpiration: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      defaultMessageTimeToLive: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      duplicateDetectionHistoryTimeWindow: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      enableBatchedOperations: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableExpress: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enablePartitioning: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      forwardDeadLetteredMessagesTo: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      forwardTo: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lockDuration: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      maxDeliveryCount: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      maxMessageSizeInKilobytes: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      maxSizeInMegabytes: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      requiresDuplicateDetection: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      requiresSession: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      status: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createOrUpdateRules: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      topicName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      subscriptionName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      ruleName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      actionInput: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      correlationFilter: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filterType: {
        label: string;
        comments: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sqlFilter: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createOrUpdateSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      topicName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      subscriptionName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      autoDeleteOnIdle: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      deadLetteringOnFilterEvaluationExceptions: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      deadLetteringOnMessageExpiration: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      defaultMessageTimeToLive: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      duplicateDetectionHistoryTimeWindow: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      enableBatchedOperations: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      forwardDeadLetteredMessagesTo: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      forwardTo: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      isClientAffine: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      lockDuration: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      maxDeliveryCount: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      requiresSession: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      status: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      clientId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      isDurable: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      isShared: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createOrUpdateTopic: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      topicName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      autoDeleteOnIdle: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      defaultMessageTimeToLive: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      duplicateDetectionHistoryTimeWindow: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      enableBatchedOperations: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableExpress: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enablePartitioning: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      maxMessageSizeInKilobytes: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      maxSizeInMegabytes: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      requiresDuplicateDetection: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      status: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      supportOrdering: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteNamespace: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteQueue: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      queueName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteRule: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      topicName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      subscriptionName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      ruleName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      topicName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      subscriptionName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteTopic: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      topicName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getNamespaces: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getQueue: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      queueName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getRule: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      topicName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      subscriptionName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      ruleName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      topicName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      subscriptionName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTopic: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      topicName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listNamespaces: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listNamespacesByResourceGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listQueues: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      $skip: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      $top: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listRules: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      topicName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      subscriptionName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      $skip: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      $top: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      version: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        default: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSubscriptionsByTopic: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      queueName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      $skip: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      $top: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      topicName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTopicsByNamespace: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      queueName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      $skip: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      $top: {
        label: string;
        comments: string;
        type: "string";
        required: false;
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
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth";
    display: {
      description: string;
      label: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
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
      tenantId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "oauth"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "connection-string";
    display: {
      description: string;
      label: string;
    };
    inputs: {
      connectionString: {
        label: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "connection-string">)[];
  dataSources: {
    selectSubscription: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectNamespace: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectNamespaceByResourceGroup: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectQueue: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTopic: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSubscriptionByTopic: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      topicName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectRule: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      subscriptionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceGroupName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      namespaceName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      topicName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    subscriptionMessageWebhook: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;