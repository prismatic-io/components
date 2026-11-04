//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "sendgrid";
  documentationUrl: "https://prismatic.io/docs/components/sendgrid/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    createWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      url: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      events: {
        label: string;
        collection: "valuelist";
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        example: string;
        default: string[];
        clean: (value: unknown) => string[];
      };
      friendlyName: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      enabled: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    testWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      url: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    toggleSignatureVerification: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      enabled: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      url: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      events: {
        label: string;
        collection: "valuelist";
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        example: string;
        default: string[];
        clean: (value: unknown) => string[];
      };
      friendlyName: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      enabled: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
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
    getAllFieldDefinitions: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
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
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page_size: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          page_token: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createList: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
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
    getAllLists: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
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
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page_size: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          page_token: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getListById: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      list_id: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contact_sample: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addOrUpdateContact: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      list_ids: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      contacts: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => any[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getContactsByEmails: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      emails: {
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
    getImportStatus: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      job_id: {
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
    initiateContactsImport: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      list_ids: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      field_mappings: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => any[];
      };
      is_compressed: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendEmail: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      to: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fromEmail: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subject: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      text: {
        label: string;
        placeholder: string;
        type: "text";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      cc: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      bcc: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      fromName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      replyToEmail: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      replyToName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      html: {
        label: string;
        placeholder: string;
        type: "text";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      personalizations: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        placeholder: string;
        comments: string;
        example: string;
        default: string;
        clean: (code: unknown) => Record<string, unknown>[];
      };
      content: {
        label: string;
        placeholder: string;
        type: "data";
        required: false;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload | undefined;
      };
      fileName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      attachmentDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          disposition: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          fileType: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          contentId: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      multipleAttachments: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        placeholder: string;
        example: string;
        comments: string;
        clean: (code: unknown) => Record<string, unknown>[];
      };
      subscriptionTracking: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    sendEmailWithDynamicTemplate: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      templateId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dynamicTemplateData: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
      fromEmail: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      to: {
        required: boolean;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fromName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      cc: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      bcc: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      replyToEmail: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      replyToName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      personalizations: {
        comments: string;
        label: string;
        type: "code";
        required: false;
        language: "json";
        placeholder: string;
        example: string;
        default: string;
        clean: (code: unknown) => Record<string, unknown>[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    sendMultipleEmails: import("@prismatic-io/spectral").ActionDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      to: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fromEmail: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subject: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      text: {
        label: string;
        placeholder: string;
        type: "text";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      cc: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      bcc: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      fromName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      replyToEmail: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      replyToName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      html: {
        label: string;
        placeholder: string;
        type: "text";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      personalizations: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        placeholder: string;
        comments: string;
        example: string;
        default: string;
        clean: (code: unknown) => Record<string, unknown>[];
      };
      content: {
        label: string;
        placeholder: string;
        type: "data";
        required: false;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload | undefined;
      };
      fileName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      attachmentDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          disposition: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          fileType: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          contentId: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      multipleAttachments: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        placeholder: string;
        example: string;
        comments: string;
        clean: (code: unknown) => Record<string, unknown>[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
  };
  dataSources: {
    selectWebhook: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    sendGridListsDataSource: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    eventWebhook: import("@prismatic-io/spectral").TriggerDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      events: {
        label: string;
        collection: "valuelist";
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        example: string;
        default: string[];
        clean: (value: unknown) => string[];
      };
      friendlyName: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      sendGridConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lookBackDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      showNewRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      showUpdatedRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      apiKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "apiKey">[];
}>;
export = _default;