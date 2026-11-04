//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "tableau";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/tableau/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    createWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      webhookName: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      events: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          label: string;
          value: string;
        }[];
      };
      webhookUrl: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookEnabled: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      apiVersion: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      apiVersion: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      apiVersion: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          pageNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      apiVersion: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookName: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      events: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          label: string;
          value: string;
        }[];
      };
      webhookUrl: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookEnabled: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      webhookDisableReason: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      apiVersion: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    testWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      apiVersion: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchConnections: import("@prismatic-io/spectral").ActionDefinition<{
      workbookId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      searchString: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      searchField: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          pageNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchWorkbooks: import("@prismatic-io/spectral").ActionDefinition<{
      searchField: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          label: string;
          value: string;
        }[];
      };
      filterOperator: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          label: string;
          value: string;
        }[];
      };
      searchString: {
        example: string;
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          pageNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchUsers: import("@prismatic-io/spectral").ActionDefinition<{
      searchField: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          label: string;
          value: string;
        }[];
      };
      searchString: {
        example: string;
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          pageNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchProjects: import("@prismatic-io/spectral").ActionDefinition<{
      searchString: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      searchField: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          label: string;
          value: string;
        }[];
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          pageNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProjects: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          pageNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProject: import("@prismatic-io/spectral").ActionDefinition<{
      parentProjectId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      projectName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contentPermissions: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        model: {
          label: string;
          value: string;
        }[];
      };
      description: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProject: import("@prismatic-io/spectral").ActionDefinition<{
      projectId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentProjectId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      projectName: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contentPermissions: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        model: {
          label: string;
          value: string;
        }[];
      };
      description: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProjects: import("@prismatic-io/spectral").ActionDefinition<{
      projectId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProject: import("@prismatic-io/spectral").ActionDefinition<{
      projectName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listWorkbooks: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          pageNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    publishWorkbook: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      publishOptions: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          uploadSessionId: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          workbookType: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          overwrite: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          asJob: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          skipConnectionCheck: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
      workbookXml: {
        label: string;
        type: "code";
        language: "xml";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      workbookFileContents: {
        label: string;
        type: "data";
        required: true;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateWorkbook: import("@prismatic-io/spectral").ActionDefinition<{
      workbookId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      workbookName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projectId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      showTabs: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => boolean | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteWorkbook: import("@prismatic-io/spectral").ActionDefinition<{
      workbookId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWorkbook: import("@prismatic-io/spectral").ActionDefinition<{
      workbookId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createUser: import("@prismatic-io/spectral").ActionDefinition<{
      username: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      siteRole: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        model: {
          label: string;
          value: string;
        }[];
      };
      authSetting: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        model: {
          label: string;
          value: string;
        }[];
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteUser: import("@prismatic-io/spectral").ActionDefinition<{
      userId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUser: import("@prismatic-io/spectral").ActionDefinition<{
      userId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          pageNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateUser: import("@prismatic-io/spectral").ActionDefinition<{
      userId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      username: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      siteRole: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        model: {
          label: string;
          value: string;
        }[];
      };
      authSetting: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        model: {
          label: string;
          value: string;
        }[];
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listConnections: import("@prismatic-io/spectral").ActionDefinition<{
      workbookId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          pageNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateConnection: import("@prismatic-io/spectral").ActionDefinition<{
      workbookId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connectionId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connectionSettings: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          serverAddress: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          serverPort: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          connectionUsername: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          connectionPassword: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          embedPassword: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown) => boolean | undefined;
          };
          queryTaggingEnabled: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown) => boolean | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
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
      apiVersion: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "privateKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      token: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      tokenName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      hostName: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      siteId: {
        label: string;
        type: "string";
        shown: true;
        required: true;
        comments: string;
        example: string;
      };
    };
  }, "privateKey">[];
  dataSources: {
    selectConnection: import("@prismatic-io/spectral").DataSourceDefinition<{
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      workbookId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProject: import("@prismatic-io/spectral").DataSourceDefinition<{
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUser: import("@prismatic-io/spectral").DataSourceDefinition<{
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWebhook: import("@prismatic-io/spectral").DataSourceDefinition<{
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      apiVersion: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWorkbook: import("@prismatic-io/spectral").DataSourceDefinition<{
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  triggers: {
    tableauTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      events: {
        required: boolean;
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => any[];
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
      };
      apiVersion: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, false, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      tableauConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      pollResourceType: {
        label: string;
        type: "string";
        required: true;
        default: string;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
  };
}>;
export = _default;