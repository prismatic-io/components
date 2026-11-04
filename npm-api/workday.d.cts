//#region src/types/pagination.d.ts
interface WorkdayListResponse<T = unknown> {
  total: number;
  data: T[];
}
//#endregion
//#region src/types/wql.d.ts
type WqlResponse = WorkdayListResponse;
//#endregion
//#region src/inputs/common.d.ts
declare const connection: {
  label: string;
  type: "connection";
  required: true;
  comments: string;
};
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "workday";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/workday/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    deleteTimeClockEventsById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      timeClockEventId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteWorkerTimeBlock: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workerId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      workerTimeBlockId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTimeClockEvents: import("@prismatic-io/spectral").ActionDefinition<{
      extraParameters: {
        comments: string;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getTimeClockEventsById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      timeClockEventId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWorkerById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workerId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWorkers: import("@prismatic-io/spectral").ActionDefinition<{
      extraParameters: {
        comments: string;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    postWorkerTimeBlock: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workerId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      doNotBill: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      comment: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      instanceId: {
        required: boolean;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      instanceDescriptor: {
        required: boolean;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      extraBody: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        placeholder: string;
        clean: (value: unknown) => unknown;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateTimeClockEventsById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      timeClockEventId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      instanceDescriptor: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      instanceHref: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      instanceId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      clockEventOverrideRate: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      referenceId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      assignmentIds: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          clockEventTimeEntryCodeId: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          clockEventProjectId: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          clockEventProjectPlanTaskId: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      clockEventComment: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      extraBody: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        placeholder: string;
        clean: (value: unknown) => unknown;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateWorkerTimeBlock: import("@prismatic-io/spectral").ActionDefinition<{
      doNotBill: {
        label: string;
        type: "string";
        required: false;
        default: undefined;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
      extraBody: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        placeholder: string;
        clean: (value: unknown) => unknown;
      };
      comment: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      instanceId: {
        required: boolean;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      instanceDescriptor: {
        required: boolean;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workerId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      workerTimeBlockId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getStaffingWorkers: import("@prismatic-io/spectral").ActionDefinition<{
      extraParameters: {
        comments: string;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getStaffingWorkerById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workerId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWorkerServiceDates: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workerId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getWorkerExplicitSkills: import("@prismatic-io/spectral").ActionDefinition<{
      extraParameters: {
        comments: string;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workerId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    initiateJobChange: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workerId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      effectiveDate: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => Date;
      };
      jobId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      reasonId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      supervisoryOrganizationId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      locationId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      extraBody: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        placeholder: string;
        clean: (value: unknown) => unknown;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    initiateOrganizationAssignmentChange: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workerId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      effectiveDate: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => Date;
      };
      jobId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      positionId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      extraBody: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        placeholder: string;
        clean: (value: unknown) => unknown;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getRaasReport: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      reportUrl: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      format: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      prompts: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        collection: "keyvaluelist";
        required: false;
        example: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    runWqlQuery: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      query: {
        label: string;
        comments: string;
        type: "text";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tenant: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        comments: string;
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: WqlResponse;
    }>;
    getDataChangesById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      tenant: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dataChangeId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getFilesByContainerId: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      tenant: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fileContainerId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTableById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      tenant: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tableId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      extraParameters: {
        comments: string;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDataChanges: import("@prismatic-io/spectral").ActionDefinition<{
      extraParameters: {
        comments: string;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      tenant: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dataChangeType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      dataChangeName: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listTables: import("@prismatic-io/spectral").ActionDefinition<{
      extraParameters: {
        comments: string;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      tenant: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    postFileContainers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      tenant: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    postTable: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      tenant: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      displayName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fields: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown) => unknown[] | undefined;
      };
      tags: {
        label: string;
        comments: string;
        collection: "valuelist";
        required: boolean;
        inputs: {
          id: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          name: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          description: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          documentation: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          enableForAnalysis: {
            label: string;
            comments: string;
            type: "boolean";
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateTableById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      tenant: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tableId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      displayName: {
        required: boolean;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        required: boolean;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fields: {
        required: boolean;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        example: string;
        clean: (value: unknown) => unknown[] | undefined;
      };
      tags: {
        label: string;
        comments: string;
        collection: "valuelist";
        required: boolean;
        inputs: {
          id: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          name: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          description: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          documentation: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          enableForAnalysis: {
            label: string;
            type: "string";
            required: false;
            default: undefined;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => boolean | undefined;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    postFilesByContainerId: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      tenant: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fileContainerId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      file: {
        label: string;
        placeholder: string;
        type: "data";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPersonById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      personId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPeople: import("@prismatic-io/spectral").ActionDefinition<{
      extraParameters: {
        comments: string;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connection: typeof connection;
    } & Omit<{
      url: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
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
    }, "debugRequest">, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    verifyConnection: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      reportUrl: {
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        tokenExchanged: boolean;
        reportRead: boolean;
        reportEntryCount?: undefined;
      };
    } | {
      data: {
        tokenExchanged: boolean;
        reportRead: boolean;
        reportEntryCount: number;
      };
    }>;
    getInvoiceById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getInvoicePdf: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoicePdfId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Buffer<ArrayBuffer>;
      contentType: string;
    }>;
    getPaymentById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      paymentId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listInvoices: import("@prismatic-io/spectral").ActionDefinition<{
      extraParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    postPayment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      remitFromCustomerId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      amount: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      typeId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      date: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Date | undefined;
      };
      companyId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      paymentId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          readyToAutoApply: {
            label: string;
            comments: string;
            type: "boolean";
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          reference: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          transactionNumber: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          memo: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          paymentDescriptor: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getMessageTemplateById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      messageTemplateId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listMessageTemplates: import("@prismatic-io/spectral").ActionDefinition<{
      extraParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    postMessageTemplates: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      messageTemplateName: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      notificationTypeId: {
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
      };
      createdById: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      emailDetail: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          name: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          subject: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          body: {
            label: string;
            comments: string;
            type: "text";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          replyTo: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      pushDetail: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          message: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          redirectURL: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          id: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      referenceId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      templateInactive: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      templateDescriptor: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      templateId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      extraBody: {
        example: string;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        placeholder: string;
        clean: (value: unknown) => unknown;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendMessage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      senderOverrideId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      commId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      messageDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          emailDetailName: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          emailDetailSubject: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          emailDetailBody: {
            label: string;
            comments: string;
            type: "text";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          emailDetailReplyTo: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          pushDetailMessage: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          pushDetailRedirectURL: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          pushDetailId: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          contacts: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => unknown[] | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      messageTemplateId: {
        required: boolean;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      notificationTypeId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateMessageTemplateById: import("@prismatic-io/spectral").ActionDefinition<{
      templateInactive: {
        label: string;
        type: "string";
        required: false;
        default: undefined;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
      messageTemplateName: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      notificationTypeId: {
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
      };
      createdById: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      emailDetail: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          name: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          subject: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          body: {
            label: string;
            comments: string;
            type: "text";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          replyTo: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      pushDetail: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          message: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          redirectURL: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          id: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      referenceId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      templateDescriptor: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      templateId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      extraBody: {
        example: string;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        placeholder: string;
        clean: (value: unknown) => unknown;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      messageTemplateId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCustomerById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrganizationById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      organizationTypeId: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      organizationId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWorkerBusinessTitleChanges: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workerId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listOrganizations: import("@prismatic-io/spectral").ActionDefinition<{
      extraParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      organizationTypeId: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    postJobChanges: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workerId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      supervisoryOrganizationId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      jobChangeReasonId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      moveManagersTeam: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      effective: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => Date;
      };
      proposedOrganizations: {
        label: string;
        comments: string;
        collection: "valuelist";
        required: boolean;
        inputs: {
          id: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          descriptor: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      instanceId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      instanceHref: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      instanceDescriptor: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    postWorkerBusinessTitleChange: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workerId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      proposedBusinessTitle: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      instanceId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      instanceHref: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      instanceDescriptor: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getEventAttachments: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      eventId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getEventById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      eventId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listEvents: import("@prismatic-io/spectral").ActionDefinition<{
      extraParameters: {
        comments: string;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getSupplierInvoiceRequestAttachments: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      supplierInvoiceRequestId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getSupplierInvoiceRequestsById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      supplierInvoiceRequestId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSupplierInvoiceRequests: import("@prismatic-io/spectral").ActionDefinition<{
      extraParameters: {
        comments: string;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    postSupplierInvoiceRequests: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
      };
      supplierId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      invoiceDate: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Date;
      };
      amount: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          currencyId: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          taxAmount: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          controlTotalAmount: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      requesterId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      paymentTermsId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      referenceTypeId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      memo: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      supplierInvoiceId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      supplierInvoiceDescriptor: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      extraBody: {
        example: string;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        placeholder: string;
        clean: (value: unknown) => unknown;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    postSupplierInvoiceRequestsAttachments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      supplierInvoiceRequestId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      file: {
        label: string;
        comments: string;
        type: "data";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      attachmentDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          fileLength: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          fileName: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          supplierInvoiceRequestAttachmentDescriptor: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      contentTypeId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      supplierInvoiceRequestAttachmentId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    submitSupplierInvoiceRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      supplierInvoiceRequestId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      supplierInvoiceInstanceId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      supplierInvoiceInstanceDescriptor: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTimeOffBalanceById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      balanceId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTimeOffDetails: import("@prismatic-io/spectral").ActionDefinition<{
      extraParameters: {
        comments: string;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        comments: string;
        required: boolean;
        inputs: {
          limit: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
          offset: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workerId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    postTimeOffRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workerId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      days: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => unknown[] | undefined;
      };
      businessProcessParameters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          actionId: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          overallBusinessProcessId: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          timeOffComment: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          transactionStatusId: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          timeOffAttachments: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => unknown[] | undefined;
          };
          timeOffForId: {
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
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
    raasReportPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      reportUrl: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      watermarkPrompt: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      watermarkFormat: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recordKeyField: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
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
      prompts: {
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        collection: "keyvaluelist";
        required: false;
        example: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
    wqlQueryPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      query: {
        label: string;
        comments: string;
        type: "text";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recordKeyField: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dateField: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      overlapMinutes: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => number | undefined;
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
      tenant: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
    newEventStepsPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
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
      businessProcess: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      stepType: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: "workdayOAuth2Connection";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      apiUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
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
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "workdayOAuth2Connection"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "workdayRefreshTokenConnection";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      restApiUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
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
      refreshToken: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "workdayRefreshTokenConnection">)[];
  dataSources: {
    selectDataChange: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      tenant: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectEvent: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectInvoice: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectMessageTemplate: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectOrganization: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      organizationTypeId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPerson: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSupplierInvoiceRequest: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTable: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      tenant: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWorker: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;