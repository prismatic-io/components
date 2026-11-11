//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "aws-ses";
  documentationUrl: "https://prismatic.io/docs/components/aws-ses/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    listIdentities: import("@prismatic-io/spectral").ActionDefinition<{
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
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
      identityType: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      nextToken: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendEmail: import("@prismatic-io/spectral").ActionDefinition<{
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
      to: {
        label: string;
        example: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        clean: (value: unknown) => string[];
      };
      cc: {
        label: string;
        example: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (value: unknown) => string[];
      };
      bcc: {
        label: string;
        example: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (value: unknown) => string[];
      };
      sender: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      replyTo: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string[];
      };
      subject: {
        label: string;
        example: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      text: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      html: {
        label: string;
        example: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attachments: {
        label: string;
        type: "string";
        comments: string;
        collection: "keyvaluelist";
        clean: (attachments: unknown) => {
          filename: string;
          content: Buffer<ArrayBufferLike>;
        }[];
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        $metadata: any;
        MessageId: string;
      };
    }>;
  };
  dataSources: {
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
}>;
export = _default;