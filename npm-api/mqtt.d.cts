//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "mqtt";
  documentationUrl: "https://prismatic.io/docs/components/mqtt/";
  public: true;
  display: {
    label: string;
    category: "Application Connectors";
    description: string;
    iconPath: string;
  };
  actions: {
    publish: import("@prismatic-io/spectral").ActionDefinition<{
      topicName: {
        label: string;
        example: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      message: {
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      mqttConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "mqtt";
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
      };
      protocol: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      port: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
      };
      username: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
      };
      password: {
        label: string;
        placeholder: string;
        type: "password";
        required: false;
        shown: true;
      };
    };
  }, "mqtt">[];
}>;
export = _default;