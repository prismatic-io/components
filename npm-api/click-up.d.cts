//#region src/types/timeTracking.d.ts
type TagAction = "replace" | "add" | "remove";
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "click-up";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/click-up/";
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
  };
  actions: {
    createWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      spaceId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      folderId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      listId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      endpoint: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      events: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        comments: string;
        example: string;
        required: true;
        clean: (value: unknown) => string[] | undefined;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      endpoint: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      allEvents: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      events: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        comments: string;
        example: string;
        required: true;
        clean: (value: unknown) => string[] | undefined;
      };
      status: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    editUserOnWorkspace: import("@prismatic-io/spectral").ActionDefinition<{
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      admin: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      customRoleId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      userId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      username: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUser: import("@prismatic-io/spectral").ActionDefinition<{
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      userId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    inviteUserToWorkspace: import("@prismatic-io/spectral").ActionDefinition<{
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      email: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      admin: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      customRoleId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removeUserFromWorkspace: import("@prismatic-io/spectral").ActionDefinition<{
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTimeEntry: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      customTaskIds: {
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      customTeamId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
      description: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
      start: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => number | undefined;
      };
      billable: {
        label: string;
        type: "boolean";
        required: boolean;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      duration: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => number | undefined;
      };
      assigneeTimeEntry: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => number | undefined;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      tagsCode: {
        label: string;
        type: "code";
        placeholder: string;
        language: "json";
        comments: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteTimeEntry: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      timerId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSingularTimeEntry: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      timerId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includeTaskTags: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      includeLocationNames: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTimeEntriesWithinDateRange: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      spaceId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      folderId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      listId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      startDate: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      endDate: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      assignee: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      includeTaskTags: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      includeLocationNames: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      customTaskIds: {
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      customTeamId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    startTimeEntry: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      description: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
      billable: {
        label: string;
        type: "boolean";
        required: boolean;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      tagNamesArray: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        required: boolean;
        comments: string;
        clean: (value: unknown) => string[] | undefined;
      };
      customTaskIds: {
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      customTeamId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    stopTimeEntry: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateTimeEntry: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      customTaskIds: {
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      customTeamId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
      description: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
      start: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => number | undefined;
      };
      billable: {
        label: string;
        type: "boolean";
        required: boolean;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      duration: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => number | undefined;
      };
      assigneeTimeEntry: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => number | undefined;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      timerId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tagAction: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
        required: true;
        clean: (value: unknown) => TagAction;
      };
      end: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => number | undefined;
      };
      tagsCode: {
        label: string;
        type: "code";
        placeholder: string;
        language: "json";
        comments: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAuthorizedTeams: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWorkspacePlan: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWorkspaceSeats: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTeam: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      name: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      members: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        comments: string;
        example: string;
        required: true;
        clean: (value: unknown) => number[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteTeam: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTeam: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      groupIds: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateTeam: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      teamName: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      teamHandle: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      addMember: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (idsString: unknown) => number[] | undefined;
      };
      removeMember: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (idsString: unknown) => number[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      name: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
      customTaskIds: {
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      description: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      assignees: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => number[] | undefined;
      };
      tags: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => string[] | undefined;
      };
      status: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      priority: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => number | undefined;
      };
      schedule: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          startDate: {
            required: boolean;
            comments: string;
            clean: (value: unknown) => number | undefined;
            example?: string | undefined;
            label: string;
            type: "string";
            placeholder: string;
          };
          startDateTime: {
            default?: string | undefined;
            label: string;
            type: "boolean";
            comments: string;
            required: boolean;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          dueDate: {
            clean: (value: unknown) => number | undefined;
            example?: string | undefined;
            label: string;
            type: "string";
            placeholder: string;
            comments: string;
            required: boolean;
          };
          dueDateTime: {
            label: string;
            type: "boolean";
            comments: string;
            required: boolean;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          timeEstimate: {
            clean: (value: unknown) => number | undefined;
            example?: string | undefined;
            label: string;
            type: "string";
            placeholder: string;
            comments: string;
            required: boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
      parent: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      linksTo: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          markdownDescription: {
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          notifyAll: {
            label: string;
            type: "boolean";
            required: boolean;
            comments: string;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          checkRequiredCustomFields: {
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            default?: string | undefined;
            label: string;
            type: "boolean";
            comments: string;
            required: boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
      customFields: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        placeholder: string;
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => import("@prismatic-io/spectral").KeyValuePair[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      customTaskIds: {
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      customTaskIds: {
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      subTasks: {
        label: string;
        type: "boolean";
        required: boolean;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTasks: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      page: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      subTasks: {
        label: string;
        type: "boolean";
        required: boolean;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      filters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          orderBy: {
            label: string;
            type: "string";
            placeholder: string;
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          reverse: {
            label: string;
            type: "boolean";
            required: false;
            default: string;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          archived: {
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            default?: string | undefined;
            label: string;
            type: "boolean";
            comments: string;
            required: boolean;
          };
          includeClosed: {
            label: string;
            type: "boolean";
            required: false;
            default: string;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          customFieldsCode: {
            label: string;
            type: "code";
            placeholder: string;
            language: "json";
            comments: string;
            example: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      assignees: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => number[] | undefined;
      };
      tags: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => string[] | undefined;
      };
      dateRangeFilters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          dueDateGt: {
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          dueDateLt: {
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          dateCreatedGt: {
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          dateCreatedLt: {
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          dateUpdatedGt: {
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          dateUpdatedLt: {
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          dateDoneGt: {
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          dateDoneLt: {
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
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
    updateTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      customTaskIds: {
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      name: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      markdownDescription: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      status: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      priority: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => number | undefined;
      };
      schedule: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          startDate: {
            required: boolean;
            comments: string;
            clean: (value: unknown) => number | undefined;
            example?: string | undefined;
            label: string;
            type: "string";
            placeholder: string;
          };
          startDateTime: {
            default?: string | undefined;
            label: string;
            type: "boolean";
            comments: string;
            required: boolean;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          dueDate: {
            clean: (value: unknown) => number | undefined;
            example?: string | undefined;
            label: string;
            type: "string";
            placeholder: string;
            comments: string;
            required: boolean;
          };
          dueDateTime: {
            label: string;
            type: "boolean";
            comments: string;
            required: boolean;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          timeEstimate: {
            clean: (value: unknown) => number | undefined;
            example?: string | undefined;
            label: string;
            type: "string";
            placeholder: string;
            comments: string;
            required: boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
      parent: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      addAssignees: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => number[] | undefined;
      };
      removeAssignees: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => number[] | undefined;
      };
      archived: {
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createSpace: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      spaceName: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      multipleAssignees: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableDueDates: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      useStartDate: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      remapDueDates: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      remapClosedDueDates: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableTimeTracking: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableTags: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableTimeEstimates: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableChecklists: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableCustomFields: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableRemapDependencies: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableDependencyWarning: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enablePortfolios: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteSpace: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      spaceId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSpace: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      spaceId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSpaces: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateSpace: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      spaceId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      spaceName: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      multipleAssignees: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableDueDates: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      useStartDate: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      remapDueDates: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      remapClosedDueDates: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableTimeTracking: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableTags: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableTimeEstimates: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableChecklists: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableCustomFields: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableRemapDependencies: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enableDependencyWarning: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      enablePortfolios: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      color: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      privateInput: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      adminCanManage: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
    getListMembers: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTaskMembers: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addTaskToList: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createList: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      listName: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      content: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      dueDate: {
        clean: (value: unknown) => number | undefined;
        example?: string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
      };
      dueDateTime: {
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      priority: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => number | undefined;
      };
      assigneeInt: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      status: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteList: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getList: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getLists: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      archived: {
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removeTaskFromList: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateList: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      name: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      content: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
      dueDate: {
        clean: (value: unknown) => number | undefined;
        example?: string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
      };
      dueDateTime: {
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      priority: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => number | undefined;
      };
      assignee: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
      status: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
      };
      unsetStatus: {
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addGuestToFolder: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      guestId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      permissionLevel: {
        clean: (value: unknown, defaultValue?: string) => string;
        default?: string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: boolean;
      };
      includeShared: {
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addGuestToList: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      guestId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      permissionLevel: {
        clean: (value: unknown, defaultValue?: string) => string;
        default?: string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: boolean;
      };
      includeShared: {
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addGuestToTask: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      guestId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      permissionLevel: {
        clean: (value: unknown, defaultValue?: string) => string;
        default?: string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: boolean;
      };
      includeShared: {
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      customTaskIds: {
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    editGuestOnWorkspace: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      username: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      canEditTags: {
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      canSeeTimeSpent: {
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      canSeeTimeEstimated: {
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      canCreateViews: {
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      customRoleId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      guestId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getGuest: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      guestId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    inviteGuestToWorkspace: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      email: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      canEditTags: {
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      canSeeTimeSpent: {
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      canSeeTimeEstimated: {
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      canCreateViews: {
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      customRoleId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removeGuestFromFolder: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      guestId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includeShared: {
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removeGuestFromList: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      guestId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includeShared: {
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removeGuestFromTask: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      guestId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includeShared: {
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      customTaskIds: {
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removeGuestFromWorkspace: import("@prismatic-io/spectral").ActionDefinition<{
      clickUpConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      guestId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
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
      spaceId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      folderName: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
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
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
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
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listFolders: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      spaceId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      archived: {
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default?: string | undefined;
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
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
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      folderName: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAccessibleCustomFields: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removeCustomFieldValue: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      fieldId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customTaskIds: {
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    setCustomFieldValue: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      fieldId: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fieldValue: {
        label: string;
        type: "data";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => unknown;
      };
      valueType: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTaskComment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      commentText: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      notifyAll: {
        label: string;
        type: "boolean";
        required: boolean;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      customTaskIds: {
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      assigneeId: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
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
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTaskComments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      customTaskIds: {
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          startDate: {
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            comments: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          startId: {
            label: string;
            type: "string";
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
    updateComment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      commentId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => number | undefined;
      };
      commentText: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resolved: {
        label: string;
        type: "boolean";
        required: boolean;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      assigneeId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTaskAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      taskId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      file: {
        label: string;
        placeholder: string;
        comments: string;
        type: "data";
        required: boolean;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      fileName: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: boolean;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customTaskIds: {
        label: string;
        type: "boolean";
        comments: string;
        required: boolean;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "clickUpOauth2Connection";
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
        comments: string;
        example: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        example: string;
        default: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: false;
        comments: string;
        default: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        example: string;
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
      headers: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        shown: false;
        default: never[];
        example: string;
        comments: string;
      };
    };
  }, "clickUpOauth2Connection"> | import("@prismatic-io/spectral").KeyedConnection<{
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
        example: string;
        comments: string;
      };
    };
  }, "apiKey">)[];
  dataSources: {
    customFieldOptions: import("@prismatic-io/spectral").DataSourceDefinition<{
      listId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldName: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    customFields: import("@prismatic-io/spectral").DataSourceDefinition<{
      listId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    lists: import("@prismatic-io/spectral").DataSourceDefinition<{
      folderId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    folders: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      spaceId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    spaces: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    teams: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    tasks: import("@prismatic-io/spectral").DataSourceDefinition<{
      listId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    calendars: import("@prismatic-io/spectral").DataSourceDefinition<{
      spaceId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      scopeType: {
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
      scopeId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;