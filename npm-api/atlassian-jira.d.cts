//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/Attachment.d.ts
interface Attachment$1 {
  id: number;
  mimeType: string;
}
interface AttachmentResponse {
  data: Buffer;
  contentType: string;
}
//#endregion
//#region src/types/PaginatedResponse.d.ts
interface PaginatedResponse<T> {
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: T[];
}
//#endregion
//#region src/types/Issue.d.ts
interface Issue {
  fields: IssueFields;
  id: string;
  key: string;
  self: string;
}
interface IssueFields {
  watcher: Watcher;
  attachment: Attachment[];
  "sub-tasks": Issuelink[];
  description: Description;
  project: Project;
  comment: Comment[];
  issuelinks: Issuelink[];
  worklog: Worklog[];
  updated: number;
  timetracking: Timetracking;
}
interface Attachment {
  author: AttachmentAuthor;
  content: string;
  created: string;
  filename: string;
  id: number;
  mimeType: string;
  self: string;
  size: number;
  thumbnail: string;
}
interface AttachmentAuthor {
  accountId: string;
  accountType: string;
  active: boolean;
  avatarUrls: AvatarUrls;
  displayName: string;
  key: string;
  name: string;
  self: string;
}
interface AvatarUrls {
  "16x16": string;
  "24x24": string;
  "32x32": string;
  "48x48": string;
}
interface Comment {
  author: UpdateAuthorClass;
  body: Description;
  created: string;
  id: string;
  self: string;
  updateAuthor: UpdateAuthorClass;
  updated: string;
  visibility: Visibility;
}
interface UpdateAuthorClass {
  accountId: string;
  active: boolean;
  displayName: string;
  self: string;
}
interface Description {
  type: string;
  version: number;
  content: DescriptionContent[];
}
interface DescriptionContent {
  type: string;
  content: ContentContent[];
}
interface ContentContent {
  type: string;
  text: string;
}
interface Visibility {
  identifier: string;
  type: string;
  value: string;
}
interface Issuelink {
  id: string;
  type: Type;
  outwardIssue?: WardIssue;
  inwardIssue?: WardIssue;
}
interface WardIssue {
  fields: InwardIssueFields;
  id: string;
  key: string;
  self: string;
}
interface InwardIssueFields {
  status: Status;
}
interface Status {
  iconUrl: string;
  name: string;
}
interface Type {
  id: string;
  inward: string;
  name: string;
  outward: string;
}
interface Project {
  avatarUrls: AvatarUrls;
  id: string;
  insight: Insight;
  key: string;
  name: string;
  projectCategory: ProjectCategory;
  self: string;
  simplified: boolean;
  style: string;
}
interface Insight {
  lastIssueUpdateTime: string;
  totalIssueCount: number;
}
interface ProjectCategory {
  description: string;
  id: string;
  name: string;
  self: string;
}
interface Timetracking {
  originalEstimate: string;
  originalEstimateSeconds: number;
  remainingEstimate: string;
  remainingEstimateSeconds: number;
  timeSpent: string;
  timeSpentSeconds: number;
}
interface Watcher {
  isWatching: boolean;
  self: string;
  watchCount: number;
}
interface Worklog {
  author: UpdateAuthorClass;
  comment: Description;
  id: string;
  issueId: string;
  self: string;
  started: string;
  timeSpent: string;
  timeSpentSeconds: number;
  updateAuthor: UpdateAuthorClass;
  updated: string;
  visibility: Visibility;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "atlassian-jira";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/atlassian-jira/";
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
        default: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
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
      data: {
        data: any;
      };
    }>;
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<unknown>;
    }>;
    createWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookUrl: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookDetails: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        comments: string;
        clean: (value: unknown) => object;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    refreshWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getVersion: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      versionId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listVersions: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          startAt: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            default: string;
            comments: string;
            clean: (rawValue: unknown) => number;
          };
          maxResults: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            comments: string;
            clean: (rawValue: unknown) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createVersion: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      description: {
        placeholder: string;
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      versionName: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      releaseDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          archived: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown) => true | undefined;
          };
          released: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown) => true | undefined;
          };
          startDate: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          releaseDate: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      projectKey: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      projectId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dynamicValues: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        type: "string";
        placeholder: string;
        collection: "keyvaluelist";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateVersion: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      versionId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      description: {
        placeholder: string;
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      versionName: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
      };
      releaseDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          archived: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown) => true | undefined;
          };
          released: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown) => true | undefined;
          };
          startDate: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          releaseDate: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      projectKey: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      projectId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dynamicValues: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        type: "string";
        placeholder: string;
        collection: "keyvaluelist";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    queryV3: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      searchString: {
        comments: string;
        example: string;
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expand: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      maxResults: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (rawValue: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getStatusList: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          startAt: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            default: string;
            comments: string;
            clean: (rawValue: unknown) => number;
          };
          maxResults: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            comments: string;
            clean: (rawValue: unknown) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listIssueFields: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listIssueCustomFields: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listIssueLinkTypes: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listIssueTypes: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPriorities: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          startAt: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            default: string;
            comments: string;
            clean: (rawValue: unknown) => number;
          };
          maxResults: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            comments: string;
            clean: (rawValue: unknown) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchUsers: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      searchString: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAssignableUsers: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectKey: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          startAt: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            default: string;
            comments: string;
            clean: (rawValue: unknown) => number;
          };
          maxResults: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            comments: string;
            clean: (rawValue: unknown) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    findUser: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      searchValue: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUser: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expand: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createUser: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      emailAddress: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      username: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      password: {
        label: string;
        type: "password";
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      notifications: {
        label: string;
        type: "boolean";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      displayName: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dynamicValues: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        type: "string";
        placeholder: string;
        collection: "keyvaluelist";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    findProject: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      searchType: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (rawValue: unknown) => string;
      };
      searchValue: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        key?: string;
        name?: string;
      }[];
    }>;
    getProject: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProjects: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          startAt: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            default: string;
            comments: string;
            clean: (rawValue: unknown) => number;
          };
          maxResults: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            comments: string;
            clean: (rawValue: unknown) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchProjects: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      searchString: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchIssues: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      searchString: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projectKey: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      fields: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getIssue: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      issueId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Issue;
    }>;
    findIssue: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      searchType: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (rawValue: unknown) => string;
      };
      searchValue: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown) => string;
      };
      fields: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listIssues: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          nextPageToken: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          maxResults: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            comments: string;
            clean: (rawValue: unknown) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      fields: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createIssue: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      summary: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      description: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      ADFdescription: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object;
      };
      issueType: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      issueTypeId: {
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      assignee: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      reporter: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      priority: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        dataSource: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      labels: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        collection: "valuelist";
        comments: string;
        clean: (rawLabels: any) => string[] | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          dueDate: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          versions: {
            label: string;
            type: "code";
            placeholder: string;
            required: false;
            example: string;
            language: "json";
            comments: string;
            clean: (value: unknown) => Array<{
              id: string;
            }> | undefined;
          };
          fixVersions: {
            label: string;
            type: "code";
            placeholder: string;
            required: false;
            example: string;
            language: "json";
            comments: string;
            clean: (value: unknown) => Array<{
              id: string;
            }> | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      dynamicValues: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        type: "string";
        placeholder: string;
        collection: "keyvaluelist";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateIssue: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      issueId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projectId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      summary: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
      };
      description: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      ADFdescription: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object;
      };
      issueType: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      issueTypeId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      assignee: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      reporter: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      priority: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        dataSource: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      labels: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        collection: "valuelist";
        comments: string;
        clean: (rawLabels: any) => string[] | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          dueDate: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          versions: {
            label: string;
            type: "code";
            placeholder: string;
            required: false;
            example: string;
            language: "json";
            comments: string;
            clean: (value: unknown) => Array<{
              id: string;
            }> | undefined;
          };
          fixVersions: {
            label: string;
            type: "code";
            placeholder: string;
            required: false;
            example: string;
            language: "json";
            comments: string;
            clean: (value: unknown) => Array<{
              id: string;
            }> | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      dynamicValues: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        type: "string";
        placeholder: string;
        collection: "keyvaluelist";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteIssue: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      issueId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    downloadAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      issueId: {
        comments: string;
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
      };
      attachmentIds: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Attachment$1[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AttachmentResponse[];
    }>;
    listIssueAttachments: import("@prismatic-io/spectral").ActionDefinition<{
      issueId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Attachment$1[];
    }>;
    listIssueTransitions: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      issueId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listIssueWorklogs: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      issueId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    transitionIssue: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      issueId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      transitionId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addIssueAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      issueId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      file: {
        label: string;
        type: "data";
        required: true;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      fileName: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getComments: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      issueId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addComment: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      issueId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      comment: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dynamicValues: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        type: "string";
        placeholder: string;
        collection: "keyvaluelist";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateComment: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      issueId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      commentId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      comment: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dynamicValues: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        type: "string";
        placeholder: string;
        collection: "keyvaluelist";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteComment: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      issueId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      commentId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getBoard: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      boardId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listBoards: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      filter: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        comments: string;
        example: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          startAt: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            default: string;
            comments: string;
            clean: (rawValue: unknown) => number;
          };
          maxResults: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            comments: string;
            clean: (rawValue: unknown) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listBoardsSprints: import("@prismatic-io/spectral").ActionDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      boardId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          startAt: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            default: string;
            comments: string;
            clean: (rawValue: unknown) => number;
          };
          maxResults: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            example: string;
            comments: string;
            clean: (rawValue: unknown) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  connections: ({
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: string;
    display: {
      label: string;
      description: string;
    };
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        default: string;
        comments: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      apiSiteOverride: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
    };
  } | {
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.ClientCredentials;
    key: string;
    display: {
      label: string;
      description: string;
    };
    inputs: {
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        default: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        default: string;
        comments: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      cloudId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  } | {
    key: string;
    display: {
      label: string;
      description: string;
    };
    inputs: {
      username: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      password: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      host: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  })[];
  dataSources: {
    selectVersion: import("@prismatic-io/spectral").DataSourceDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        dataSource: any;
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPriority: import("@prismatic-io/spectral").DataSourceDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWebhook: import("@prismatic-io/spectral").DataSourceDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectBoard: import("@prismatic-io/spectral").DataSourceDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      startAt: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        default: string;
        comments: string;
        clean: (rawValue: unknown) => number;
      };
      maxResults: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (rawValue: unknown) => number;
      };
      filter: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        comments: string;
        example: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectBoardVersion: import("@prismatic-io/spectral").DataSourceDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      boardId: {
        dataSource: any;
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      startAt: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        default: string;
        comments: string;
        clean: (rawValue: unknown) => number;
      };
      maxResults: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        example: string;
        comments: string;
        clean: (rawValue: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectIssueType: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectIds: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (rawValue: unknown) => {
          projectId: string;
          projectName?: string;
        }[];
      };
      returnIssueTypeName: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        default: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectIssueTypes: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectIds: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (rawValue: unknown) => {
          projectId: string;
          projectName?: string;
        }[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "objectSelection">;
    selectIssueTypeFromProject: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        dataSource: any;
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      returnIssueTypeName: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        default: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    issueFields: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      onlyCustomFields: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectIssue: import("@prismatic-io/spectral").DataSourceDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        dataSource: any;
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProject: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProjects: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "objectSelection">;
  };
  triggers: {
    issueEventsTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      jiraConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      eventTypes: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        placeholder: string;
        comments: string;
        example: string;
      };
      jqlFilter: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fieldIdsFilter: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      jiraConnection: {
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
      pollJqlFilter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      showNewIssues: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      showUpdatedIssues: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, false, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
}>;
export = _default;