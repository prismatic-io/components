//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "kafka";
  documentationUrl: "https://prismatic.io/docs/components/kafka/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Data Platforms";
  };
  actions: {
    listTopics: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
      };
      clientId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      brokers: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        topics: {
          name: string;
          partitions: number;
          isInternal: boolean;
        }[];
        internalTopics: {
          name: string;
          partitions: number;
          isInternal: boolean;
        }[];
        totalCount: number;
      };
    }>;
    publishMessages: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
      };
      clientId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      brokers: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string[];
      };
      topic: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      messages: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => {
          key: string;
          value: string;
        }[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        topicName: string;
        partition: number;
        errorCode: number;
        offset?: string;
        timestamp?: string;
        baseOffset?: string;
        logAppendTime?: string;
        logStartOffset?: string;
      }[];
    }>;
    getConsumerGroupStatus: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
      };
      clientId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      brokers: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string[];
      };
      consumerGroupId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      topicsToCheck: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        groupId: string;
        state: string;
        protocolType: string;
        protocol: string;
        members: {
          memberId: string;
          clientId: string;
          clientHost: string;
        }[];
        topicsWithOffsets: {
          topic: string;
          partitions: {
            partition: number;
            committedOffset: string;
            currentOffset: string;
            lag: string;
          }[];
          totalLag: string;
        }[];
        totalLag: string;
      };
    }>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "basic";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      username: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      password: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      authMechanism: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        model: {
          label: "plain" | "scram-sha-256" | "scram-sha-512";
          value: "plain" | "scram-sha-256" | "scram-sha-512";
        }[];
      };
      sslEnabled: {
        label: string;
        type: "boolean";
        required: false;
        shown: true;
        comments: string;
        default: string;
      };
      caCert: {
        label: string;
        placeholder: string;
        type: "text";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
      clientCert: {
        label: string;
        placeholder: string;
        type: "text";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
      clientKey: {
        label: string;
        placeholder: string;
        type: "text";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
      avroEnabled: {
        label: string;
        type: "boolean";
        required: false;
        shown: true;
        comments: string;
        default: string;
      };
      schemaRegistryUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
      schemaRegistryApiKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
      schemaRegistryApiSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "basic"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "awsAccessKeySecret";
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
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      caCert: {
        label: string;
        placeholder: string;
        type: "text";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
      avroEnabled: {
        label: string;
        type: "boolean";
        required: false;
        shown: true;
        comments: string;
        default: string;
      };
      schemaRegistryUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
      schemaRegistryApiKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
      schemaRegistryApiSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "awsAccessKeySecret"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "awsAssumeRole";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      roleARN: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
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
      externalId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      caCert: {
        label: string;
        placeholder: string;
        type: "text";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
      avroEnabled: {
        label: string;
        type: "boolean";
        required: false;
        shown: true;
        comments: string;
        default: string;
      };
      schemaRegistryUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
      schemaRegistryApiKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
      schemaRegistryApiSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "awsAssumeRole">)[];
  triggers: {
    kafkaConsumer: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
      };
      clientId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      brokers: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string[];
      };
      consumerGroupId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      topics: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[];
      };
      maxMessages: {
        label: string;
        type: "string";
        default: string;
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number;
      };
      sessionTimeout: {
        label: string;
        type: "string";
        default: string;
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number;
      };
      heartbeatInterval: {
        label: string;
        type: "string";
        default: string;
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number;
      };
      consumerOptions: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          fromBeginning: {
            label: string;
            type: "boolean";
            default: string;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          autoCommit: {
            label: string;
            type: "boolean";
            default: string;
            comments: string;
            clean: (value: unknown) => boolean;
          };
          deserializeKeys: {
            label: string;
            type: "boolean";
            default: string;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    selectTopic: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
      };
      clientId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      brokers: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;