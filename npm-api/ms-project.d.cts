//#region src/types.d.ts
interface MsProjectRecord {
  Id?: string;
  Name?: string;
  CreatedDate?: string;
  LastPublishedDate?: string;
  [key: string]: unknown;
}
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "ms-project";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/ms-project/";
  display: {
    label: string;
    category: "Application Connectors";
    description: string;
    iconPath: string;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
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
      payload: {
        body: {
          data: {
            created: MsProjectRecord[];
            updated: MsProjectRecord[];
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
  actions: {
    listProjects: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      queryString: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
      pageSize: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      pageNumber: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTasks: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      pageSize: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      pageNumber: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAssignments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      pageSize: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      pageNumber: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      projectName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
      projectDescription: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
      projectStartDate: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    checkoutProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDraftTasks: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      pageSize: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      pageNumber: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDraftTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      draftTaskId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createDraftTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      taskName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
      notes: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      taskStartDate: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      parentId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      taskFinishDate: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      taskId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    submitProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteDraftTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      draftTaskId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProjectResources: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDraftProjectResources: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      pageSize: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      pageNumber: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProjectResources: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      resourceId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createDraftProjectResources: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      notes: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      email: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      account: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      resourceName: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    verifyDraft: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateDraft: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    publishDraftProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    checkInDraftProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removeProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDraftAssignments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAssignments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createDraftAssignment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      draftTaskId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
      };
      resourceId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        dataSource: string;
      };
      assignmentStartDate: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      assignmentFinishDate: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
      };
      notes: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
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
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth";
    display: {
      description: string;
      label: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
        example: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: false;
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
      pwaSite: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
      };
    };
  }, "oauth">[];
  dataSources: {
    selectProject: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTask: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDraftTask: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProjectResource: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDraftProjectResource: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      guId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;