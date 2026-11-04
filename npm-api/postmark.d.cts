//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "postmark";
  documentationUrl: "https://prismatic.io/docs/components/postmark/";
  public: true;
  display: {
    label: string;
    category: "Application Connectors";
    description: string;
    iconPath: string;
  };
  actions: {
    sendSingleEmail: import("@prismatic-io/spectral").ActionDefinition<{
      postmarkConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fromAddress: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
      };
      toAddress: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
      };
      ccAddress: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
      };
      bccAddress: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
      };
      subject: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
      };
      tag: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
      };
      htmlBody: {
        label: string;
        type: "code";
        required: false;
        language: "html";
        example: string;
        comments: string;
      };
      textBody: {
        label: string;
        type: "text";
        required: false;
        default: string;
        example: string;
        placeholder: string;
        comments: string;
      };
      replyTo: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
      };
      trackOpens: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
      };
      headers: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (headersInput: unknown) => any;
      };
      metadata: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (metadataInput: unknown) => any;
      };
      attachments: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (attachmentsInput: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendBatchEmail: import("@prismatic-io/spectral").ActionDefinition<{
      postmarkConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      emails: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: true;
        comments: string;
        clean: (emailsInput: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendEmailWithTemplate: import("@prismatic-io/spectral").ActionDefinition<{
      postmarkConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fromAddress: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
      };
      toAddress: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
      };
      ccAddress: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
      };
      bccAddress: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
      };
      subject: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
      };
      tag: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
      };
      htmlBody: {
        label: string;
        type: "code";
        required: false;
        language: "html";
        example: string;
        comments: string;
      };
      textBody: {
        label: string;
        type: "text";
        required: false;
        default: string;
        example: string;
        placeholder: string;
        comments: string;
      };
      replyTo: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
      };
      trackOpens: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
      };
      headers: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (headersInput: unknown) => any;
      };
      metadata: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (metadataInput: unknown) => any;
      };
      attachments: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (attachmentsInput: unknown) => any;
      };
      templateId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
      };
      templateModel: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        example: string;
        comments: string;
        clean: (templateModelInput: unknown) => any;
      };
      templateAlias: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
      };
      inlineCss: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendBatchEmailWithTemplate: import("@prismatic-io/spectral").ActionDefinition<{
      postmarkConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      Messages: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        example: string;
        comments: string;
        clean: (messagesInput: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      postmarkConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookUrl: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
      };
      triggers: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        clean: (triggersInput: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      postmarkConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      postmarkConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      showOnlyInstanceWebhooks: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    editWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      postmarkConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      webhookUrl: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
      };
      triggers: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        clean: (triggersInput: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      postmarkConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteInstancedWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      postmarkConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    getServer: import("@prismatic-io/spectral").ActionDefinition<{
      postmarkConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    editServer: import("@prismatic-io/spectral").ActionDefinition<{
      postmarkConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      serverName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      serverColor: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getServers: import("@prismatic-io/spectral").ActionDefinition<{
      serverId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      postmarkConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createServer: import("@prismatic-io/spectral").ActionDefinition<{
      postmarkConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      serverName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      serverColor: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      smtpApiActivated: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
      };
      rawEmailEnabled: {
        label: string;
        type: "boolean";
        required: false;
        example: string;
        comments: string;
      };
      deliveryType: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        default: string;
      };
      inboundHookUrl: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    editServers: import("@prismatic-io/spectral").ActionDefinition<{
      postmarkConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      serverId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      serverName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      serverColor: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      smtpApiActivated: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
      };
      rawEmailEnabled: {
        label: string;
        type: "boolean";
        required: false;
        example: string;
        comments: string;
      };
      inboundHookUrl: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
      };
      enableSmtpApiErrorHooks: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listServers: import("@prismatic-io/spectral").ActionDefinition<{
      postmarkConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      serverName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      count: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
      offset: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteServer: import("@prismatic-io/spectral").ActionDefinition<{
      postmarkConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      serverId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
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
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    postmarkWebhook: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      response: {
        statusCode: number;
        contentType: string;
      };
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "postmark";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      accountToken: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        example: string;
        comments: string;
      };
      serverToken: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        example: string;
        comments: string;
      };
    };
  }, "postmark">[];
  dataSources: {
    selectWebhook: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectServer: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;