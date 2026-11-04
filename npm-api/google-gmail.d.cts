//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/interfaces/Attachment.d.ts
interface Attachment {
  filename: string;
  content: Buffer;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "google-gmail";
  documentationUrl: "https://prismatic.io/docs/components/google-gmail/";
  public: true;
  display: {
    label: string;
    category: "Application Connectors";
    description: string;
    iconPath: string;
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createPushNotification: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userIdInput: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (val: unknown) => string;
        comments: string;
      };
      topicNameInput: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        comments: string;
      };
      labelIdsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        required: true;
        clean: (value: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@googleapis/gmail").gmail_v1.Schema$WatchResponse;
    }>;
    deletePushNotification: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userIdInput: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (val: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: void;
    }>;
    getEventHistory: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (val: unknown) => string;
        comments: string;
      };
      historyId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageToken: {
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        clean: (val: unknown) => string | undefined;
        required: false;
        example: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      maxResults: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@googleapis/gmail").gmail_v1.Schema$Profile;
    }>;
    getMessageById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      messageId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        comments: string;
        dataSource: string;
      };
      userId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (val: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string | null | undefined;
        threadId: string | null | undefined;
        labelIds: string[] | null | undefined;
        message: {
          headers: {
            [k: string]: any;
          };
          attachments: any;
          text: any;
          html: any;
        };
      };
    }>;
    listMessages: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (val: unknown) => string;
        comments: string;
      };
      pageToken: {
        label: string;
        type: "string";
        placeholder: string;
        clean: (val: unknown) => string | undefined;
        required: false;
        comments: string;
        example: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      query: {
        label: string;
        type: "string";
        placeholder: string;
        clean: (val: unknown) => string | undefined;
        required: false;
        comments: string;
        example: string;
      };
      maxResults: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      labelIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        dataSource: string;
        placeholder: string;
        comments: string;
        example: string;
        clean: (values: unknown) => string[];
      };
      addMetadata: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@googleapis/gmail").gmail_v1.Schema$ListMessagesResponse;
    }>;
    sendMessage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      to: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (values: unknown) => string;
        collection: "valuelist";
      };
      from: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      cc: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (values: unknown) => string;
        collection: "valuelist";
      };
      bcc: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (values: unknown) => string;
        collection: "valuelist";
      };
      subject: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      text: {
        label: string;
        type: "text";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      html: {
        label: string;
        type: "text";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attachments: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        collection: "keyvaluelist";
        clean: (attachments: unknown) => Attachment[];
      };
      dynamicAttachments: {
        label: string;
        type: "data";
        placeholder: string;
        comments: string;
        example: string;
        required: false;
        clean: (attachments: unknown) => Attachment[];
      };
      userId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (val: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    trashMessageById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      messageId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        comments: string;
        dataSource: string;
      };
      userId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (val: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    unTrashMessageById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      messageId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        comments: string;
        dataSource: string;
      };
      userId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (val: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateLabels: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      messageId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        comments: string;
        dataSource: string;
      };
      userId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (val: unknown) => string;
        comments: string;
      };
      addLabels: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        comments: string;
        clean: (values: unknown) => string[];
      };
      removeLabels: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        comments: string;
        clean: (values: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getLabelByName: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      labelName: {
        label: string;
        type: "string";
        required: true;
      };
      userId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (val: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@googleapis/gmail").gmail_v1.Schema$Label;
    }>;
    listLabels: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (val: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@googleapis/gmail").gmail_v1.Schema$ListLabelsResponse;
    }>;
  };
  triggers: {
    pushNotificationWebhook: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, import("@prismatic-io/spectral").TriggerBaseResult<import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>>, import("@prismatic-io/spectral").Inputs>;
    managedPushNotificationEvents: import("@prismatic-io/spectral").TriggerDefinition<{
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
      topicId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      subscriptionId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        placeholder: string;
      };
      labelIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        required: true;
        clean: (value: unknown) => string[];
      };
      userId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (val: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, import("@prismatic-io/spectral").TriggerBranchingResult<import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>>, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      userId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (val: unknown) => string;
        comments: string;
      };
      labelId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      getMessageDetails: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      polledNoChanges: boolean;
    } | {
      payload: {
        body: {
          data: import("@googleapis/gmail").gmail_v1.Schema$ListHistoryResponse;
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
        paginationState?: Record<string, unknown> | undefined;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    selectLabel: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (val: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectMessage: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (val: unknown) => string;
        comments: string;
      };
      query: {
        label: string;
        type: "string";
        placeholder: string;
        clean: (val: unknown) => string | undefined;
        required: false;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth2";
    display: {
      label: string;
      description: string;
      icons: {
        oauth2ConnectionIconPath: string;
      };
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
        example: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        default: string;
        example: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
        example: string;
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
      };
    };
  }, "oauth2"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "gmailServiceAccount";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      keyFile: {
        label: string;
        placeholder: string;
        comments: string;
        type: "text";
        required: true;
      };
      user: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
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
        example: string;
      };
    };
  }, "gmailServiceAccount">)[];
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;