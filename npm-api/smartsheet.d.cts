//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/index.d.ts
interface SmartsheetWebhook {
  id: number;
  name: string;
  scope: string;
  scopeObjectId: number;
  events: string[];
  callbackUrl: string;
  sharedSecret: string;
  enabled: boolean;
  status: string;
  version: number;
  subscope: {
    columnIds: number[];
  };
  createdAt: string;
  modifiedAt: string;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "smartsheet";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/smartsheet/";
  display: {
    label: string;
    category: "Application Connectors";
    description: string;
    iconPath: string;
  };
  hooks: {
    error: (error: unknown) => unknown;
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
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createWorkspace: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteWorkspace: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workspaceId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWorkspace: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workspaceId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    listWorkspaces: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown[];
    }>;
    updateWorkspace: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workspaceId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      callbackUrl: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
      };
      scopeObjectId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      subscopeColumnIds: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        example: string;
        clean: (values: unknown) => (number | undefined)[] | undefined;
        comments: string;
        placeholder: string;
      };
      allowDuplicates: {
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
    deleteInstanceWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: null;
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      showAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: SmartsheetWebhook[];
    }>;
    getUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => number | "me" | undefined;
        comments: string;
        placeholder: string;
        dataSource: string;
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
      includeAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      email: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
      };
      modifiedSince: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    templatesList: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workspaceIdForTemplates: {
        label: string;
        type: "string";
        required: false;
        clean: (v: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>[];
    }>;
    templatesListPublic: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      includeAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        pageNumber: number;
        pageSize: number;
        totalPages: number;
        totalCount: number;
        data: {
          id: number;
          name: string;
          type: string;
          accessLevel: string;
          description: string;
          globalTemplate: string;
        }[];
      };
    }>;
    attachmentsGet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      attachmentId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    attachmentsListOnSheet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      includeAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    columnDelete: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      columnId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    columnGet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      columnId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    columnsAddToSheet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      title: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
      };
      type: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      formula: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
      };
      hidden: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      index: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => number;
        comments: string;
        placeholder: string;
      };
      description: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
      };
      locked: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      options: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => any;
        placeholder: string;
      };
      validation: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      width: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    columnsListOnSheet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      includeAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    commentDelete: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      commentId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    commentEdit: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      commentId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      text: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    commentGet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      commentId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    commentsCreate: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      discussionId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      text: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    copySheet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      destinationId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        placeholder: string;
      };
      destinationType: {
        label: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      newName: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createSheet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, required?: boolean) => number | undefined;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      workspaceId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
      };
      columns: {
        label: string;
        type: "code";
        required: true;
        language: "json";
        clean: (value: unknown) => any;
        default: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteSheet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    discussionDelete: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      discussionId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    discussionGet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      discussionId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    discussionListAttachments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      discussionId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      includeAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    discussionsCreate: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      rowId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      comment: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    discussionsList: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      includeAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      rowId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSheet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSheetPublish: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSheetVersion: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSheets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      includeAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      modifiedSince: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    moveSheet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      destinationId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        placeholder: string;
      };
      destinationType: {
        label: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    setSheetPublish: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      icalEnabled: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      readOnlyFullAccessibleBy: {
        label: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      readOnlyFullDefaultView: {
        label: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      readOnlyFullEnabled: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      readOnlyLiteEnabled: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      readWriteAccessibleBy: {
        label: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      readWriteDefaultView: {
        label: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      readWriteEnabled: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sheetSend: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      format: {
        label: string;
        type: "string";
        required: true;
        default: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      paperSize: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
      };
      emails: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        comments: string;
        placeholder: string;
      };
      groups: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        comments: string;
        placeholder: string;
      };
      ccMe: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      message: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
      };
      subject: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateSheet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchSheet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        example: string;
        placeholder: string;
      };
      query: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    attachmentsListOnRow: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      rowId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      includeAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    copyRows: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      rowIds: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        example: string;
        clean: (values: unknown) => (number | undefined)[];
        comments: string;
        placeholder: string;
      };
      toSheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteRow: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      rowId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    moveRows: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      rowIds: {
        required: boolean;
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        clean: (values: unknown) => (number | undefined)[];
        comments: string;
        placeholder: string;
      };
      toSheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    rowGet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      rowId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    rowsAddToSheet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      updateIdentifier: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        example: string;
        placeholder: string;
      };
      dynamicColumns: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => any[];
      };
      columnValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
      position: {
        label: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      allowPartialSuccess: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      overrideValidation: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getReport: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      reportId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getReports: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      modifiedSince: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listHomeContents: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listGroups: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      includeAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      modifiedSince: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createFolder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, required?: boolean) => number | undefined;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      workspaceId: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        example: string;
        placeholder: string;
      };
      folderName: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteFolder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getFolder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    listFolders: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, required?: boolean) => number | undefined;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      workspaceId: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    moveFolder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      destinationId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateFolder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      folderName: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getFavorites: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      includeAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listEvents: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      since: {
        label: string;
        type: "string";
        required: false;
        default: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          streamPosition: {
            label: string;
            type: "string";
            required: false;
            example: string;
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
          };
          maxCount: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      contactId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listContacts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      includeAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            clean: (value: unknown) => number | undefined;
            comments: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    smartsheetWebhook: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
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
      showNewRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      showUpdatedRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      polledNoChanges: boolean | undefined;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    selectAttachment: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectColumn: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectContact: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDiscussion: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectFolder: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectGroup: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectReport: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectRow: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sheetId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSheet: import("@prismatic-io/spectral").DataSourceDefinition<{
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
    selectWebhook: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWebhookScopeColumn: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      scopeObjectId: {
        label: string;
        dataSource: undefined;
        type: "string";
        required: true;
        clean: (value: unknown, required?: boolean) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWorkspace: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "Smartsheet OAuth2";
    display: {
      description: string;
      label: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      baseUrl: Omit<import("@prismatic-io/spectral").StringInputField | import("@prismatic-io/spectral").DataInputField | import("@prismatic-io/spectral").TextInputField | import("@prismatic-io/spectral").PasswordInputField | import("@prismatic-io/spectral").BooleanInputField | import("@prismatic-io/spectral").ConnectionTemplateInputField, "clean"> & {
        shown?: boolean;
        writeOnly?: true;
      } & {
        model: {
          label: string;
          value: string;
        }[];
      };
      authorizeUrl: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
      };
      tokenUrl: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
      };
      scopes: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        default: string;
        comments: string;
      };
      clientId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        required: true;
        shown: true;
      };
      clientSecret: {
        label: string;
        type: "password";
        comments: string;
        example: string;
        required: true;
        shown: true;
      };
    };
  }, "Smartsheet OAuth2"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      baseUrl: Omit<import("@prismatic-io/spectral").StringInputField | import("@prismatic-io/spectral").DataInputField | import("@prismatic-io/spectral").TextInputField | import("@prismatic-io/spectral").PasswordInputField | import("@prismatic-io/spectral").BooleanInputField | import("@prismatic-io/spectral").ConnectionTemplateInputField, "clean"> & {
        shown?: boolean;
        writeOnly?: true;
      } & {
        model: {
          label: string;
          value: string;
        }[];
      };
      apiKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "apiKey"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "templatedOAuth";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      apiDomain: import("@prismatic-io/spectral").ConnectionInput & {
        model: {
          label: string;
          value: string;
        }[];
      };
      appDomain: import("@prismatic-io/spectral").ConnectionInput & {
        model: {
          label: string;
          value: string;
        }[];
      };
      scopes: {
        label: string;
        type: "string";
        required: false;
        shown: true;
        default: string;
        comments: string;
      };
      clientId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        required: true;
        shown: true;
      };
      clientSecret: {
        label: string;
        type: "password";
        comments: string;
        example: string;
        required: true;
        shown: true;
      };
    } & Partial<import("@prismatic-io/spectral").OAuth2AuthorizationCodeInputs> & {
      [key: string]: import("@prismatic-io/spectral").ConnectionInput;
    } & {
      authorizeUrl: import("@prismatic-io/spectral").ConnectionTemplateInputField;
      tokenUrl: import("@prismatic-io/spectral").ConnectionTemplateInputField;
    } & {
      [key: string]: import("@prismatic-io/spectral").ConnectionTemplateInputField;
    };
  }, "templatedOAuth">)[];
}>;
export = _default;