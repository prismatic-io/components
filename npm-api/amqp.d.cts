//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "amqp";
  documentationUrl: "https://prismatic.io/docs/components/amqp/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Data Platforms";
  };
  actions: {
    getMessage: import("@prismatic-io/spectral").ActionDefinition<{
      queueName: {
        example: string;
        placeholder: string;
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown) => string;
      };
      amqpConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      acknowledgeMessage: {
        label: string;
        default: string;
        type: "boolean";
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        fields: {
          deliveryTag: number;
          redelivered: boolean;
          exchange: string;
          routingKey: string;
          messageCount: number;
        };
        properties: {
          contentType: string;
          contentEncoding: string;
          headers: {};
          deliveryMode: number;
          priority: number;
          correlationId: string;
          replyTo: string;
          expiration: string;
          messageId: string;
          timestamp: number;
          type: string;
          userId: string;
          appId: string;
          clusterId: string;
        };
        content: any;
        message: string;
      };
    }>;
    publishMessage: import("@prismatic-io/spectral").ActionDefinition<{
      amqpConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      queueName: {
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        label: string;
        type: "string";
        clean: (value: unknown) => string;
      };
      exchange: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      routingKey: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      routeMessage: {
        label: string;
        type: "boolean";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      message: {
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown) => Buffer<ArrayBuffer>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: boolean;
    }>;
    rejectMessage: import("@prismatic-io/spectral").ActionDefinition<{
      queueName: {
        example: string;
        placeholder: string;
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown) => string;
      };
      amqpConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("amqplib").Replies.Consume;
    }>;
    acknowledgeMessage: import("@prismatic-io/spectral").ActionDefinition<{
      amqpConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      message: {
        type: "string";
        label: string;
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    checkConnection: import("@prismatic-io/spectral").ActionDefinition<{
      amqpConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        connection: {
          [key: string]: unknown;
        };
        host: string;
        product: string;
        version: string;
        platform: string;
        copyright?: string;
        information: string;
      };
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "amqp";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      host: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      port: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      protocol: {
        label: string;
        model: {
          label: string;
          value: string;
        }[];
        type: "string";
        required: true;
        default: string;
        comments: string;
      };
      vhost: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
      };
      username: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
      };
      password: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
      };
    };
  }, "amqp">[];
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;