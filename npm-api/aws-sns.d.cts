//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "aws-sns";
  documentationUrl: "https://prismatic.io/docs/components/aws-sns/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Data Platforms";
  };
  actions: {
    createTopic: import("@prismatic-io/spectral").ActionDefinition<{
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
        placeholder: string;
        example: string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sns").CreateTopicResponse;
    }>;
    deleteTopic: import("@prismatic-io/spectral").ActionDefinition<{
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
      topicArn: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {};
    }>;
    getTopicAttributes: import("@prismatic-io/spectral").ActionDefinition<{
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
      topicArn: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sns").GetTopicAttributesResponse;
    }>;
    listTopics: import("@prismatic-io/spectral").ActionDefinition<{
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
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
      fetchAllTopics: {
        comments: string;
        label: string;
        type: "boolean";
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      nextToken: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sns").ListTopicsResponse;
    }>;
    publishMessage: import("@prismatic-io/spectral").ActionDefinition<{
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
      message: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      topicArn: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      messageAttributes: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        placeholder: string;
        example: string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sns").PublishResponse;
    }>;
    publishBatchMessages: import("@prismatic-io/spectral").ActionDefinition<{
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
      topicArn: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      publishBatchEntries: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sns").PublishBatchCommandOutput;
    }>;
    listSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
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
      topicArn: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAllSubscriptions: {
        comments: string;
        label: string;
        type: "boolean";
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      nextToken: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sns").ListSubscriptionsByTopicResponse;
    }>;
    subscribe: import("@prismatic-io/spectral").ActionDefinition<{
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
      topicArn: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      protocol: {
        label: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
      };
      endpoint: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sns").SubscribeResponse;
    }>;
    unsubscribe: import("@prismatic-io/spectral").ActionDefinition<{
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
      subscriptionArn: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {};
    }>;
    listOptOutNumbers: import("@prismatic-io/spectral").ActionDefinition<{
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
      nextToken: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sns").ListPhoneNumbersOptedOutResponse;
    }>;
    publishSms: import("@prismatic-io/spectral").ActionDefinition<{
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
      message: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      phoneNumber: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sns").PublishResponse;
    }>;
  };
  triggers: {
    subscriptionTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      parseMessage: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      branch: string;
      payload: any;
    }, import("@prismatic-io/spectral").Inputs>;
    webhookLifecycleTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      parseMessage: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
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
      topicArn: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      branch: string;
      payload: any;
    }, import("@prismatic-io/spectral").Inputs>;
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
  dataSources: {
    selectRegion: import("@prismatic-io/spectral").DataSourceDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSubscription: import("@prismatic-io/spectral").DataSourceDefinition<{
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
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
      topicArn: {
        dataSource: any;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTopic: import("@prismatic-io/spectral").DataSourceDefinition<{
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;