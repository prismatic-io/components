//#region src/interfaces/GitHubWebhook.d.ts
interface GitHubWebhook {
  id: number;
  name: string;
  active: boolean;
  events: string[];
  config: {
    url: string;
  };
}
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/interfaces/Issue.d.ts
interface Issue {
  id: number;
  number: number;
  title: string;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "github";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/github/";
  display: {
    label: string;
    description: string;
    category: "Application Connectors";
    iconPath: string;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  actions: {
    actionsCreateWorkflowDispatch: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      repo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      workflowId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      ref: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      inputs: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => any;
        default: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    usersGetAuthenticated: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    usersGetByUsername: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      username: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    reposCreateWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      repo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      callbackUrl: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      events: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
      };
      webhookSecret: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    reposDeleteInstanceWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      repo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {};
    }>;
    reposDeleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      repo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      hookId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    reposListWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      repo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      showOnlyInstanceWebhooks: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GitHubWebhook[];
    }>;
    pullsCreate: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      repo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      title: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      head: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      base: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      body: {
        label: string;
        type: "text";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      maintainerCanModify: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
      draft: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    pullsList: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      repo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      state: {
        label: string;
        type: "string";
        required: false;
        default: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      head: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      base: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      sort: {
        label: string;
        type: "string";
        required: false;
        default: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      direction: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
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
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
          };
          perPage: {
            label: string;
            type: "string";
            required: false;
            default: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    orgsListForAuthenticatedUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
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
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
          };
          perPage: {
            label: string;
            type: "string";
            required: false;
            default: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    reposListForOrg: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      org: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      type: {
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
      sort: {
        label: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      direction: {
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
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
          };
          perPage: {
            label: string;
            type: "string";
            required: false;
            default: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
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
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    issuesCreateComment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      repo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      issueNumber: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
      };
      body: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    issuesListComments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      repo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      issueNumber: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        dataSource: string;
      };
      since: {
        label: string;
        type: "string";
        required: false;
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
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
          };
          perPage: {
            label: string;
            type: "string";
            required: false;
            default: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    issuesListForRepo: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      repo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      milestone: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      state: {
        label: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      assignee: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      creator: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      mentioned: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      labels: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      sort: {
        label: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      direction: {
        label: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      since: {
        label: string;
        type: "string";
        required: false;
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
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
          };
          perPage: {
            label: string;
            type: "string";
            required: false;
            default: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Issue[];
    }>;
    gitCreateBlob: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      repo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      content: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      encoding: {
        label: string;
        type: "string";
        required: false;
        default: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    gitCreateRef: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      repo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      ref: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      sha: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    gitCreateTree: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      repo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      tree: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        default: string;
        clean: (value: unknown) => object;
      };
      baseTree: {
        label: string;
        type: "string";
        required: false;
        example: string;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    gitGetRef: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      repo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      ref: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth2";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      authorizeUrl: {
        label: string;
        type: "string";
        shown: false;
        required: true;
        default: string;
        comments: string;
        example: string;
      };
      tokenUrl: {
        label: string;
        type: "string";
        shown: false;
        required: true;
        default: string;
        comments: string;
        example: string;
      };
      scopes: {
        label: string;
        type: "string";
        shown: true;
        required: false;
        default: string;
        placeholder: string;
        example: string;
        comments: string;
      };
      clientId: {
        label: string;
        type: "string";
        shown: true;
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      clientSecret: {
        label: string;
        type: "password";
        shown: true;
        required: true;
        placeholder: string;
        comments: string;
      };
    };
  }, "oauth2">[];
  dataSources: {
    listReposForAuthenticatedUser: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectOrganizationsForAuthenticatedUser: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectIssueForAuthenticatedUser: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      repo: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      state: {
        label: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      assignee: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      labels: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      sort: {
        label: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      direction: {
        label: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      since: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPullRequestFromRepo: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      repo: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      state: {
        label: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      head: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      base: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      sort: {
        label: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      direction: {
        label: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUserFromOrganization: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      organization: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{
      webhookSecret: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
    eventWebhook: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      repo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      events: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      owner: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      repo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
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