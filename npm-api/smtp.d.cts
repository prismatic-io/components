//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "smtp";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/smtp/";
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
  };
  actions: {
    sendEmail: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        type: "connection";
        label: string;
        required: true;
      };
      to: {
        label: string;
        example: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        clean: (emails: unknown) => (string | undefined)[];
      };
      toJson: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, required?: boolean) => (string | undefined)[];
      };
      from: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      cc: {
        label: string;
        example: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
      };
      ccJson: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, required?: boolean) => (string | undefined)[];
      };
      bcc: {
        label: string;
        example: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
      };
      bccJson: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, required?: boolean) => (string | undefined)[];
      };
      replyTo: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
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
        type: "code";
        language: "html";
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
      multipleAttachments: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        example: string;
        comments: string;
        clean: (code: unknown) => Record<string, unknown>[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("nodemailer/lib/smtp-transport").SentMessageInfo;
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "smtpConnection";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      host: {
        label: string;
        type: "string";
        example: string;
        required: true;
        onPremControlled: true;
      };
      port: {
        label: string;
        type: "string";
        default: string;
        required: true;
        comments: string;
        onPremControlled: true;
      };
      secure: {
        label: string;
        type: "boolean";
        default: string;
        comments: string;
      };
      allowUnauthorized: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
      };
      username: {
        label: string;
        type: "string";
        required: false;
      };
      password: {
        label: string;
        type: "password";
        required: false;
      };
    };
  }, "smtpConnection">[];
}>;
export = _default;