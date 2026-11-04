//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "pagerduty";
  documentationUrl: "https://prismatic.io/docs/components/pagerduty/";
  display: {
    label: string;
    category: "Application Connectors";
    description: string;
    iconPath: string;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  public: true;
  dataSources: {
    selectIncident: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUser: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectService: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTemplate: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    incidentsTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      events: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => string[];
      };
      webhookDescription: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filterId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filterType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, false, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      showNewIncidents: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      lookBackDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
    serviceTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      events: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => string[];
      };
      webhookDescription: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filterId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filterType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, false, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  actions: {
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
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
      debugRequest: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
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
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createWebhookSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookSubscription: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        clean: (value: unknown) => object;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listWebhookSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        example: string;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      total: {
        label: string;
        type: "boolean";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
      filterType: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      filterId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWebhookSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateWebhookSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        comments: string;
      };
      webhookSubscription: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteWebhookSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    enableWebhookSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    testWebhookSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAllInstanceWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: string;
      };
    }>;
    createUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      user: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        required: true;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        example: string;
      };
      query: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      teamIds: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        collection: "valuelist";
        clean: (value: unknown) => string[];
        comments: string;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      total: {
        label: string;
        type: "boolean";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
      include: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      include: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      user: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: true;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTemplates: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        example: string;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      total: {
        label: string;
        type: "boolean";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
      query: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      templateType: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      sortBy: {
        label: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTemplate: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteTemplate: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateTemplate: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      template: {
        label: string;
        comments: string;
        required: true;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTemplate: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      template: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    renderTemplate: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      incidentId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      updateMessage: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => {
          status_update: string;
        } | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listServices: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        example: string;
      };
      query: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      total: {
        label: string;
        type: "boolean";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
      teamIds: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        collection: "valuelist";
        clean: (value: unknown) => string[];
        comments: string;
      };
      timeZone: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      sortBy: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      include: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getService: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      include: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createService: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      service: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateService: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      service: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: true;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteService: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPriorities: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        example: string;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      total: {
        label: string;
        type: "boolean";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listNotifications: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        example: string;
      };
      since: {
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
      };
      until: {
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      total: {
        label: string;
        type: "boolean";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
      timeZone: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      include: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listIncidents: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        example: string;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      total: {
        label: string;
        type: "boolean";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
      dateRange: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      incidentKey: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      serviceIds: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string[];
        collection: "valuelist";
        comments: string;
      };
      teamIds: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        collection: "valuelist";
        clean: (value: unknown) => string[];
        comments: string;
      };
      userIds: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        collection: "valuelist";
        clean: (value: unknown) => string[];
        comments: string;
      };
      urgencies: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string[];
        comments: string;
      };
      timeZone: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      statuses: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string[];
        comments: string;
      };
      sortBy: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      include: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string[];
        comments: string;
      };
      since: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      until: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createIncident: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      incident: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        required: true;
        clean: (value: unknown) => object;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getIncident: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      include: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string[];
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateIncident: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      incident: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listIncidentAlerts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        example: string;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      total: {
        label: string;
        type: "boolean";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
      alertKey: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      statuses: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string[];
        comments: string;
      };
      sortBy: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      include: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string[];
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getIncidentAlert: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      alertId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateIncidentAlert: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      alertId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      alert: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listIncidentNotes: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createIncidentNote: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      note: {
        label: string;
        comments: string;
        example: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateIncidents: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      total: {
        label: string;
        type: "boolean";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
      incidents: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        clean: (value: unknown) => object;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateIncidentAlerts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      total: {
        label: string;
        type: "boolean";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
      alerts: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendEvent: import("@prismatic-io/spectral").ActionDefinition<{
      event: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listChangeEvents: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        example: string;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
        comments: string;
      };
      total: {
        label: string;
        type: "boolean";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
      teamIds: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        collection: "valuelist";
        clean: (value: unknown) => string[];
        comments: string;
      };
      integrationIds: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        collection: "valuelist";
        clean: (value: unknown) => string[];
        comments: string;
      };
      since: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      until: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getChangeEvent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateChangeEvent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      event: {
        label: string;
        example: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendChangeEvent: import("@prismatic-io/spectral").ActionDefinition<{
      event: {
        label: string;
        example: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "pagerduty-oauth";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: false;
        default: string;
        comments: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: false;
        default: string;
        comments: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        default: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "pagerduty-oauth"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "pagerduty-api-key";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      apiKey: {
        label: string;
        type: "password";
        required: true;
        comments: string;
      };
    };
  }, "pagerduty-api-key">)[];
}>;
export = _default;