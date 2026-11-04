//#region src/interfaces.d.ts
interface Envelope {
  envelope_id: string;
  envelope: string;
  status: string;
  created_at: string;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "yoti-sign";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/yoti-sign/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    archiveEnvelope: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        example: string;
      };
      envelopeId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (input: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createEmbeddedEnvelope: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        example: string;
      };
      file: {
        label: string;
        type: "data";
        required: true;
        collection: "valuelist";
        comments: string;
        clean: (input: unknown) => import("@prismatic-io/spectral").DataPayload[];
      };
      fileName: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        clean: (input: unknown) => string[] | undefined;
      };
      recipients: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        default: string;
        clean: (input: unknown) => object | undefined;
      };
      envelopName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (input: unknown) => string | undefined;
      };
      emails: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        default: string;
        clean: (input: unknown) => object | undefined;
      };
      notificationDestination: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (input: unknown) => string | undefined;
      };
      notificationsSubscriptions: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (input: unknown) => string[] | undefined;
      };
      branding: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        default: string;
        clean: (input: unknown) => object | undefined;
      };
      parent_redirect_urls: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        default: string;
        clean: (input: unknown) => object | undefined;
      };
      autotagging: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (input: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createEnvelope: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        example: string;
      };
      file: {
        label: string;
        type: "data";
        required: true;
        collection: "valuelist";
        comments: string;
        clean: (input: unknown) => import("@prismatic-io/spectral").DataPayload[];
      };
      fileName: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        clean: (input: unknown) => string[] | undefined;
      };
      envelopName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (input: unknown) => string | undefined;
      };
      recipients: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        default: string;
        clean: (input: unknown) => object | undefined;
      };
      has_envelope_otps: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (input: unknown) => boolean | undefined;
      };
      emails: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        default: string;
        clean: (input: unknown) => object | undefined;
      };
      notificationDestination: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (input: unknown) => string | undefined;
      };
      notificationsSubscriptions: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (input: unknown) => string[] | undefined;
      };
      branding: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        default: string;
        clean: (input: unknown) => object | undefined;
      };
      parent_redirect_urls: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        default: string;
        clean: (input: unknown) => object | undefined;
      };
      autotagging: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (input: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    editRecipient: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        example: string;
      };
      envelopeId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (input: unknown) => string | undefined;
      };
      recipientId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (input: unknown) => string | undefined;
      };
      recipientInfo: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        default: string;
        clean: (input: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    findEnvelopes: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        example: string;
      };
      envelopeIds: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        comments: string;
        clean: (input: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getEnvelope: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        example: string;
      };
      envelopeId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (input: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDocuments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        example: string;
      };
      envelopeId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (input: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getEnvelopeStatus: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        example: string;
      };
      envelopeId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (input: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listEnvelopes: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        example: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (input: unknown) => string | undefined;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (input: unknown) => string | undefined;
      };
      keyValueParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendEnvelopeReminder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        example: string;
      };
      envelopeId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (input: unknown) => string | undefined;
      };
      recipientId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (input: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getIDVSessionMedia: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        example: string;
      };
      recipientId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (input: unknown) => string | undefined;
      };
      mediaId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (input: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getIDVSessionResult: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        example: string;
      };
      recipientId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (input: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        example: string;
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: {
            created: Envelope[];
          };
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
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      baseUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (input: unknown) => string | undefined;
      };
      apiKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        comments: string;
      };
    };
  }, "apiKey">[];
  dataSources: {
    selectEnvelope: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;