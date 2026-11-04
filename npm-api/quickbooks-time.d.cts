//#region src/types.d.ts
interface QBTimeRecord {
  id: number;
  [key: string]: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "quickbooks-time";
  documentationUrl: "https://prismatic.io/docs/components/quickbooks-time/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    getUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      active: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      perPage: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      page: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      additionalParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
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
      };
      id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      userName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      additionalParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      userNameReq: {
        label: string;
        type: "string";
        required: true;
        comments: string;
      };
      firstName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
      };
      lastName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
      };
      additionalParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getJobCodeAssignments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      active: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      perPage: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      page: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      userIds: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      additionalParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getJobCodes: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      active: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      perPage: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      page: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      additionalParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTimeSheets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      active: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      perPage: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      page: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      userIds: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      jobCodeIds: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      startDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      endDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      additionalParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTimesheet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      idReq: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
      };
      jobcodeIdReq: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
      };
      startDateISOReq: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
      };
      endDateISOReq: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
      };
      additionalParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateTimesheet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      timesheetId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
      };
      jobcodeId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        dataSource: string;
      };
      startDateISO: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      endDateISO: {
        label: string;
        type: "string";
        required: false;
        comments: string;
      };
      additionalParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteTimeSheet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      jobCodeIdsReq: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      resourceType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: "Timesheets" | "Users" | "Job Codes";
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      showNewRecords: {
        label: string;
        type: "boolean";
        required: true;
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
            created: QBTimeRecord[];
            updated: never[];
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
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth";
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
  }, "oauth">[];
  dataSources: {
    selectUser: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectJobCode: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectJobCodeAssignment: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTimeSheet: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
}>;
export = _default;