//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/index.d.ts
interface Board {
  id: string;
  created: string;
  isPrivate: boolean;
  name: string;
  postCount: number;
  privateComments: boolean;
  token: string;
  url: string;
}
interface Post {
  id: string;
  author: User | null;
  board: Board;
  by: User | null;
  category: Category | null;
  commentCount: number;
  created: string;
  customFields: Record<string, unknown>;
  details: string;
  eta: string;
  etaPublic: boolean;
  imageURLs: string[];
  jira: {
    linkedIssues: unknown[];
  };
  mergeHistory: unknown[];
  owner: User | null;
  score: number;
  status: string;
  statusChangedAt: string;
  tags: Tag[];
  title: string;
  url: string;
}
interface Category {
  id: string;
  board: Board;
  created: string;
  name: string;
  parentID: string | null;
  postCount: number;
  url: string;
}
interface Tag {
  id: string;
  board: Board;
  created: string;
  name: string;
  postCount: number;
  url: string;
}
interface User {
  id: string;
  created: string;
  email: string;
  isAdmin: boolean;
  name: string;
  url: string;
  userID: string;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "canny";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/canny/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
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
    listEntries: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      entryType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        model: {
          label: string;
          value: string;
        }[];
        placeholder: string;
        example: string;
      };
      entrySort: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        model: {
          label: string;
          value: string;
        }[];
        placeholder: string;
        example: string;
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
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            placeholder: string;
            example: string;
          };
          skip: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createEntry: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      entryTitle: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      entryDetails: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      entryType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        model: {
          label: string;
          value: string;
        }[];
        placeholder: string;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          notify: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          published: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          additionalFields: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => object;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listStatusChanges: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      boardId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
        example: string;
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
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listCompanies: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companySearch: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      segment: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
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
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateCompany: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyIdRequired: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      companyName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          monthlySpend: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            placeholder: string;
            example: string;
          };
          customFields: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            clean: (value: unknown) => object | undefined;
            placeholder: string;
            example: string;
          };
          additionalFields: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => object;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteCompany: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyIdRequired: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
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
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    retrieveUser: import("@prismatic-io/spectral").ActionDefinition<{
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
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createOrUpdateUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userEmail: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      userName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      userId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          companies: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            clean: (value: unknown) => object | undefined;
            placeholder: string;
            example: string;
          };
          customFields: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            clean: (value: unknown) => object | undefined;
            placeholder: string;
            example: string;
          };
          additionalFields: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => object;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteUser: import("@prismatic-io/spectral").ActionDefinition<{
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
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listTags: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      boardId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
        example: string;
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
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            placeholder: string;
            example: string;
          };
          skip: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    retrieveTag: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      tagId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createTag: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      boardIdRequired: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      tagName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listCategories: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      boardId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
        example: string;
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
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            placeholder: string;
            example: string;
          };
          skip: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    retrieveCategory: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      categoryIdRequired: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createCategory: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      boardIdRequired: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      categoryName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      subscribeAdmins: {
        label: string;
        type: "boolean";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      parentCategoryId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteCategory: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      categoryIdRequired: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listVotes: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      boardId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      postIdOptional: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      userIdOptional: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
        example: string;
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
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    retrieveVote: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      voteId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createVote: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      postId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      voterId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      additionalFields: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteVote: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      voteId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listComments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      boardId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      postIdOptional: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      authorId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
        example: string;
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
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    retrieveComment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      commentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createComment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      postId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      commentAuthorId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      commentValue: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      parentId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          internal: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          imageURLs: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            clean: (value: unknown) => object | undefined;
            placeholder: string;
            example: string;
          };
          additionalFields: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => object;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteComment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      commentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listPosts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      boardId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      authorId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      tagIDs: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object | undefined;
        placeholder: string;
        example: string;
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
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            placeholder: string;
            example: string;
          };
          skip: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      listControls: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          search: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          sort: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            model: {
              label: string;
              value: string;
            }[];
            placeholder: string;
            example: string;
          };
          status: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    retrievePost: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      postId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createPost: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      boardIdRequired: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      authorIdRequired: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      title: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      details: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      categoryId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          customFields: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            clean: (value: unknown) => object | undefined;
            placeholder: string;
            example: string;
          };
          eta: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          etaPublic: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          imageURLs: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            clean: (value: unknown) => object | undefined;
            placeholder: string;
            example: string;
          };
          additionalFields: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => object;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updatePost: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      postId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      titleOptional: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      detailsOptional: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          customFields: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            clean: (value: unknown) => object | undefined;
            placeholder: string;
            example: string;
          };
          eta: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          imageURLs: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            clean: (value: unknown) => object | undefined;
            placeholder: string;
            example: string;
          };
          additionalFields: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => object;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deletePost: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      postId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    changePostStatus: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      postId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      statusRequired: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      changerId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      shouldNotifyVoters: {
        label: string;
        type: "boolean";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      postCommentValue: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      additionalFields: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listBoards: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    retrieveBoard: import("@prismatic-io/spectral").ActionDefinition<{
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
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        dataSource: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "cannyApiKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      apiKey: {
        label: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "cannyApiKey">[];
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
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
        comments: string;
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
            created: Post[];
            updated: Post[];
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
  dataSources: {
    selectBoard: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCategory: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      boardId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCompany: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPost: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      boardId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTag: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      boardId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
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
  };
}>;
export = _default;