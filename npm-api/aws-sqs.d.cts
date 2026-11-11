import { ReceiveMessageCommandOutput } from "@aws-sdk/client-sqs";

//#region src/interfaces/ReceiveMessageOutput.d.ts
interface ReceiveMessageOutput {
  data: ReceiveMessageCommandOutput;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "aws-sqs";
  documentationUrl: "https://prismatic.io/docs/components/aws-sqs/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Data Platforms";
  };
  actions: {
    listQueues: import("@prismatic-io/spectral").ActionDefinition<{
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: false;
      };
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      prefix: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      maxResults: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number;
      };
      nextToken: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sqs").ListQueuesCommandOutput;
    }>;
    sendMessage: import("@prismatic-io/spectral").ActionDefinition<{
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: false;
      };
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      url: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      message: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (msg: unknown) => string;
      };
      messageGroupId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      messageDeduplicationId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attributes: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
      delaySeconds: {
        label: string;
        placeholder: string;
        type: "data";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sqs").SendMessageCommandOutput;
    }>;
    receiveMessages: import("@prismatic-io/spectral").ActionDefinition<{
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: false;
      };
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      url: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      maxNumber: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number;
      };
      waitTime: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, ReceiveMessageOutput>;
    getQueueUrl: import("@prismatic-io/spectral").ActionDefinition<{
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: false;
      };
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sqs").GetQueueUrlCommandOutput;
    }>;
    deleteQueue: import("@prismatic-io/spectral").ActionDefinition<{
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: false;
      };
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      url: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sqs").DeleteQueueCommandOutput;
    }>;
    createQueue: import("@prismatic-io/spectral").ActionDefinition<{
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: false;
      };
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      isFifo: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      contentBasedDeduplication: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      tags: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, string>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sqs").CreateQueueCommandOutput;
    }>;
    deleteMessage: import("@prismatic-io/spectral").ActionDefinition<{
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: false;
      };
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      url: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      receiptHandle: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sqs").DeleteMessageCommandOutput;
    }>;
    createDeadLetterQueue: import("@prismatic-io/spectral").ActionDefinition<{
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: false;
      };
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      isFifo: {
        comments: string;
        label: string;
        type: "boolean";
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      contentBasedDeduplication: {
        comments: string;
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      dlqName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      maxReceiveCount: {
        label: string;
        type: "string";
        required: true;
        example: string;
        default: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tags: {
        comments: string;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        clean: (value: unknown) => Record<string, string>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        mainQueue: import("@aws-sdk/client-sqs").CreateQueueCommandOutput;
        deadLetterQueue: import("@aws-sdk/client-sqs").CreateQueueCommandOutput;
      };
    }>;
  };
  dataSources: {
    selectQueue: import("@prismatic-io/spectral").DataSourceDefinition<{
      awsRegion: {
        dataSource: any;
        model: any;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectRegion: import("@prismatic-io/spectral").DataSourceDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: (import("@prismatic-io/spectral").DefaultConnectionDefinition | import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiKeySecret";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      accessKeyId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      secretAccessKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "apiKeySecret">)[];
  triggers: {
    pollMessagesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
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
      payload: {
        body: {
          data: import("@aws-sdk/client-sqs").Message[];
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
    }, {
      awsRegion: {
        dataSource: any;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: false;
      };
      url: {
        dataSource: any;
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }>;
  };
}>;
export = _default;