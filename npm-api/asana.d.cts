//#region src/types/resources.d.ts
interface Workspace {
  gid: string;
  name: string;
  resource_type: string;
}
interface User {
  gid: string;
  name: string;
  email: string;
  resource_type: string;
  workspaces: Workspace[];
}
interface Team {
  gid: string;
  name: string;
  resource_type: string;
}
type Task = {
  gid: string;
  assignee: Record<string, unknown> | null;
  assignee_status: string;
  completed: boolean;
  completed_at: null | string;
  created_at: string;
  custom_fields: Record<string, unknown>[];
  dependencies: Record<string, unknown>[];
  dependents: Record<string, unknown>[];
  due_at: null | string;
  due_on: null | string;
  followers: Record<string, unknown>[];
  html_notes: string;
  is_rendered_as_separator: boolean;
  liked: boolean;
  likes: Record<string, unknown>[];
  memberships: Record<string, unknown>[];
  modified_at: string;
  name: string;
  notes: string;
  num_likes: number;
  num_subtasks: number;
  parent: Record<string, unknown> | null;
  projects: Record<string, unknown>[];
  resource_type: string;
  start_on: null | string;
  tags: Record<string, unknown>[];
  resource_subtype: string;
  workspace: Record<string, unknown>;
};
interface Tag {
  gid: string;
  name: string;
  color: string;
  created_at: string;
  resource_type: string;
}
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "asana";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/asana/";
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
  };
  actions: {
    addUser: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      workspaceId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    findWorkspaceByName: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workspaceName: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Workspace;
    }>;
    getWorkspace: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workspaceId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listWorkspaces: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
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
          limit: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      endpoint: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string;
      };
      filter: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    } | undefined>;
    deleteInstanceWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workspaceId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {};
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workspaceId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      showOnlyInstanceWebhooks: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
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
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    findUserByNameOrEmail: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userName: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      userEmail: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      workspaceId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: User;
    }>;
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUsers: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      workspaceId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listUsersInTeam: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      limit: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      offset: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      teamId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      workspaceId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addUserToTeam: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      userId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTeam: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      organizationId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
      teamDescription: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      teamName: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    findTeamByName: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamName: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      workspaceId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Team;
    }>;
    getTeam: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTeams: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workspaceId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addFollowersToTask: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      followersList: {
        label: string;
        type: "string";
        example: string;
        collection: "valuelist";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string[];
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      taskId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addTagToTask: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      tagId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      taskId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTask: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      approvalStatus: {
        label: string;
        type: "string";
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        required: true;
        clean: (value: unknown) => string | undefined;
      };
      assigneeId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      assigneeSectionId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      followersList: {
        label: string;
        type: "string";
        example: string;
        collection: "valuelist";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string[];
      };
      htmlNotes: {
        label: string;
        type: "code";
        language: "html";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      notes: {
        label: string;
        type: "text";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      parentId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      projectList: {
        label: string;
        type: "string";
        example: string;
        collection: "valuelist";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      resourceSubtype: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      scheduling: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          dueAt: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => Date | undefined;
          };
          dueOn: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => Date | undefined;
          };
          startAt: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          startOn: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => Date | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      taskStatus: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          assigneeStatus: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          completedBy: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          isCompleted: {
            label: string;
            type: "string";
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            comments: string;
            required: false;
            clean: (value: unknown) => boolean | undefined;
          };
          isLiked: {
            label: string;
            type: "string";
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            required: false;
            comments: string;
            clean: (value: unknown) => boolean | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      workspaceId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteTask: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      taskId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTask: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      taskId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTasks: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assigneeId: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      projectId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      workspaceId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removeAssigneeFromTask: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      taskId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removeFollowersFromTask: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      followersList: {
        label: string;
        type: "string";
        example: string;
        collection: "valuelist";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string[];
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      taskId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removeTagFromTask: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      tagId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      taskId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateTask: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assigneeId: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      assigneeSectionId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      htmlNotes: {
        label: string;
        type: "code";
        language: "html";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      notes: {
        label: string;
        type: "text";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      parentId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      resourceSubtype: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      scheduling: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          dueAt: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => Date | undefined;
          };
          dueOn: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => Date | undefined;
          };
          startAt: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          startOn: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => Date | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      taskId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      taskStatus: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          approvalStatus: {
            required: false;
            label: string;
            type: "string";
            example: string;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          assigneeStatus: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          completedBy: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          isCompleted: {
            label: string;
            type: "string";
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            comments: string;
            required: false;
            clean: (value: unknown) => boolean | undefined;
          };
          isLiked: {
            label: string;
            type: "string";
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            required: false;
            comments: string;
            clean: (value: unknown) => boolean | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      workspaceId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTag: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      color: {
        label: string;
        type: "string";
        model: {
          label: "dark-pink" | "dark-green" | "dark-blue" | "dark-red" | "dark-teal" | "dark-brown" | "dark-orange" | "dark-purple" | "dark-warm-gray" | "light-pink" | "light-green" | "light-blue" | "light-red" | "light-teal" | "light-orange" | "light-purple" | "light-warm-gray" | "light-yellow";
          value: "dark-pink" | "dark-green" | "dark-blue" | "dark-red" | "dark-teal" | "dark-brown" | "dark-orange" | "dark-purple" | "dark-warm-gray" | "light-pink" | "light-green" | "light-blue" | "light-red" | "light-teal" | "light-orange" | "light-purple" | "light-warm-gray" | "light-yellow";
        }[];
        default: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      followersList: {
        label: string;
        type: "string";
        example: string;
        collection: "valuelist";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string[];
      };
      name: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      notes: {
        label: string;
        type: "text";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      workspaceId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteTag: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
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
          limit: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      tagId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    findTagByName: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      tagName: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      workspaceId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Tag;
    }>;
    getTag: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      tagId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTags: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      workspaceId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTagsInTask: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      taskId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateTag: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      color: {
        label: string;
        type: "string";
        model: {
          label: "dark-pink" | "dark-green" | "dark-blue" | "dark-red" | "dark-teal" | "dark-brown" | "dark-orange" | "dark-purple" | "dark-warm-gray" | "light-pink" | "light-green" | "light-blue" | "light-red" | "light-teal" | "light-orange" | "light-purple" | "light-warm-gray" | "light-yellow";
          value: "dark-pink" | "dark-green" | "dark-blue" | "dark-red" | "dark-teal" | "dark-brown" | "dark-orange" | "dark-purple" | "dark-warm-gray" | "light-pink" | "light-green" | "light-blue" | "light-red" | "light-teal" | "light-orange" | "light-purple" | "light-warm-gray" | "light-yellow";
        }[];
        default: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      notes: {
        label: string;
        type: "text";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      tagId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSubtasks: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      taskId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      listAllNestedSubtasks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: Task[];
      };
    }>;
    createStatusUpdate: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      parent: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string;
      };
      statusUpdateTitle: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      statusUpdateText: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      statusType: {
        label: string;
        comments: string;
        type: "string";
        default: string;
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteStatus: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      statusId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getStatusesForObject: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      parent: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getStatusUpdate: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      statusId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addTaskToSection: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      insertAfter: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      insertBefore: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      sectionId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      taskId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createSection: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      insertAfter: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      insertBefore: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      projectId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      sectionName: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteSection: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sectionId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSection: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sectionId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSections: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      projectId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateSection: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      insertAfter: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      insertBefore: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      sectionId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      sectionName: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addCustomFieldToProject: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      insertAfter: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      insertBefore: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      isImportant: {
        label: string;
        type: "boolean";
        default: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      projectId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addUserToProject: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      members: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        collection: "valuelist";
        clean: (value: unknown) => string[];
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      projectId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProjects: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      defaultView: {
        label: string;
        type: "string";
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      owner: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string;
      };
      team: {
        required: boolean;
        clean: (value: unknown) => string;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      name: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      notes: {
        label: string;
        type: "text";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      htmlNotes: {
        label: string;
        type: "code";
        language: "html";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      dueOn: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Date | undefined;
      };
      startOn: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Date | undefined;
      };
      followers: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      projectSettings: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          archived: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          privacySetting: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown, defaultValue?: string) => string;
          };
          projectColor: {
            label: string;
            type: "string";
            model: {
              label: "dark-pink" | "dark-green" | "dark-blue" | "dark-red" | "dark-teal" | "dark-brown" | "dark-orange" | "dark-purple" | "dark-warm-gray" | "light-pink" | "light-green" | "light-blue" | "light-red" | "light-teal" | "light-orange" | "light-purple" | "light-warm-gray" | "light-yellow";
              value: "dark-pink" | "dark-green" | "dark-blue" | "dark-red" | "dark-teal" | "dark-brown" | "dark-orange" | "dark-purple" | "dark-warm-gray" | "light-pink" | "light-green" | "light-blue" | "light-red" | "light-teal" | "light-orange" | "light-purple" | "light-warm-gray" | "light-yellow";
            }[];
            default: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      workspaceId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProjects: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProject: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      projectId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProjects: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      workspaceId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removeCustomFieldFromProject: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      projectId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProject: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      dueOn: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Date | undefined;
      };
      followers: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      htmlNotes: {
        label: string;
        type: "code";
        language: "html";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      notes: {
        label: string;
        type: "text";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      owner: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      projectId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      projectSettings: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          archived: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          defaultView: {
            required: false;
            default: string;
            label: string;
            type: "string";
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown, defaultValue?: string) => string;
          };
          privacySetting: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown, defaultValue?: string) => string;
          };
          projectColor: {
            label: string;
            type: "string";
            model: {
              label: "dark-pink" | "dark-green" | "dark-blue" | "dark-red" | "dark-teal" | "dark-brown" | "dark-orange" | "dark-purple" | "dark-warm-gray" | "light-pink" | "light-green" | "light-blue" | "light-red" | "light-teal" | "light-orange" | "light-purple" | "light-warm-gray" | "light-yellow";
              value: "dark-pink" | "dark-green" | "dark-blue" | "dark-red" | "dark-teal" | "dark-brown" | "dark-orange" | "dark-purple" | "dark-warm-gray" | "light-pink" | "light-green" | "light-blue" | "light-red" | "light-teal" | "light-orange" | "light-purple" | "light-warm-gray" | "light-yellow";
            }[];
            default: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      startOn: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => Date | undefined;
      };
      team: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addCustomFieldToPortfolio: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      insertAfter: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      insertBefore: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      isImportant: {
        label: string;
        type: "boolean";
        default: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      portfolioId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addUserToPortfolio: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      members: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        collection: "valuelist";
        clean: (value: unknown) => string[];
      };
      portfolioId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createPortfolio: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      color: {
        label: string;
        type: "string";
        model: {
          label: "dark-pink" | "dark-green" | "dark-blue" | "dark-red" | "dark-teal" | "dark-brown" | "dark-orange" | "dark-purple" | "dark-warm-gray" | "light-pink" | "light-green" | "light-blue" | "light-red" | "light-teal" | "light-orange" | "light-purple" | "light-warm-gray" | "light-yellow";
          value: "dark-pink" | "dark-green" | "dark-blue" | "dark-red" | "dark-teal" | "dark-brown" | "dark-orange" | "dark-purple" | "dark-warm-gray" | "light-pink" | "light-green" | "light-blue" | "light-red" | "light-teal" | "light-orange" | "light-purple" | "light-warm-gray" | "light-yellow";
        }[];
        default: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      isPublic: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      members: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        collection: "valuelist";
        clean: (value: unknown) => string[];
      };
      portfolioName: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      workspaceId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deletePortfolio: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      portfolioId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPortfolio: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      portfolioId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPortfolios: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
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
          limit: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      workspaceId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removeCustomFieldFromPortfolio: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      portfolioId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removeUserFromPortfolio: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      members: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        collection: "valuelist";
        clean: (value: unknown) => string[];
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      portfolioId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updatePortfolio: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      color: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        model: {
          label: "dark-pink" | "dark-green" | "dark-blue" | "dark-red" | "dark-teal" | "dark-brown" | "dark-orange" | "dark-purple" | "dark-warm-gray" | "light-pink" | "light-green" | "light-blue" | "light-red" | "light-teal" | "light-orange" | "light-purple" | "light-warm-gray" | "light-yellow";
          value: "dark-pink" | "dark-green" | "dark-blue" | "dark-red" | "dark-teal" | "dark-brown" | "dark-orange" | "dark-purple" | "dark-warm-gray" | "light-pink" | "light-green" | "light-blue" | "light-red" | "light-teal" | "light-orange" | "light-purple" | "light-warm-gray" | "light-yellow";
        }[];
        default: string;
        comments: string;
      };
      isPublic: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      portfolioId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      portfolioName: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
      };
      workspaceId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
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
    listPortfolioItems: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      portfolioId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removePortfolioItem: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      itemId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
      portfolioId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCustomField: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCustomFields: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workspaceId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    attachFileToTask: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      file: {
        label: string;
        comments: string;
        type: "data";
        required: true;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      fileName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      attachmentId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      attachmentId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      optFields: {
        default: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAttachments: import("@prismatic-io/spectral").ActionDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      taskId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
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
    projectTasksTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      triggerWhenAdded: {
        comments: string;
        label: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      triggerWhenChanged: {
        comments: string;
        label: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      triggerWhenDeleted: {
        comments: string;
        label: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      triggerWhenRemoved: {
        comments: string;
        label: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      triggerWhenUndeleted: {
        comments: string;
        label: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
    workspaceProjectsTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workspaceId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      triggerWhenAdded: {
        comments: string;
        label: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      triggerWhenChanged: {
        comments: string;
        label: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      triggerWhenDeleted: {
        comments: string;
        label: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      triggerWhenRemoved: {
        comments: string;
        label: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      triggerWhenUndeleted: {
        comments: string;
        label: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
    storiesTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      triggerWhenAdded: {
        comments: string;
        label: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      triggerWhenChanged: {
        comments: string;
        label: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      triggerWhenDeleted: {
        comments: string;
        label: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      triggerWhenRemoved: {
        comments: string;
        label: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      triggerWhenUndeleted: {
        comments: string;
        label: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      asanaConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown) => string;
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
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    selectWorkspace: import("@prismatic-io/spectral").DataSourceDefinition<{
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
      workspaceId: {
        required: boolean;
        dataSource: undefined;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTeam: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workspaceId: {
        dataSource: undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTask: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      project: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        dataSource: undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      workspace: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        dataSource: undefined;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
      };
      assignee: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTag: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workspaceId: {
        dataSource: undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSection: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        dataSource: undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProject: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workspace: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        dataSource: undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
      };
      team: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        dataSource: undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPortfolio: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workspaceId: {
        required: boolean;
        dataSource: undefined;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCustomField: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workspaceId: {
        dataSource: undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectAttachment: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      taskId: {
        dataSource: undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: "oauth2";
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
        shown: false;
        comments: string;
        default: string;
      };
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
        example: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
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
  }, "oauth2"> | import("@prismatic-io/spectral").KeyedConnection<{
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
  }, "apiKey">)[];
}>;
export = _default;