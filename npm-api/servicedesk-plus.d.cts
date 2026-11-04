//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types.d.ts
interface SDPRecord {
  id: string;
  [key: string]: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "servicedesk-plus";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/servicedesk-plus/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown) => string;
      };
      debugRequest: {
        comments: string;
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown) => boolean;
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
    createRequestTask: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      taskRequestId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskRequestTitle: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskRequestPercentageCompletion: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      taskRequestEstimatedEffortHours: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      taskRequestDescription: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      taskRequestOwner: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      taskRequestAdditionalCost: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      taskRequestActualEndTime: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      taskRequestActualStartTime: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      additionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteRequestTask: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      taskRequestId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      toDeleteRequestTaskId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getRequestTask: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      taskRequestId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      toGetRequestTaskId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listRequestTasks: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      taskRequestId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => boolean | undefined;
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
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
          rowCount: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      conditionsCriteria: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
      };
      conditionsCriteriaValue: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateRequestTask: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      taskRequestId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      toUpdateRequestTaskId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskRequestTitle: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      taskRequestPercentageCompletion: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      taskRequestEstimatedEffortHours: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      taskRequestDescription: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      taskRequestOwner: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      taskRequestAdditionalCost: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      taskRequestActualEndTime: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      taskRequestActualStartTime: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      additionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      requestSubject: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      requestDescription: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      impactDetails: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      emailIdsToNotify: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      deletePreTemplateTasks: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      additionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      toDeleteRequestId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      toGetRequestId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listRequests: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => boolean | undefined;
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
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
          rowCount: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      conditionsCriteria: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
      };
      conditionsCriteriaValue: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      toUpdateRequestId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      requestSubject: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      requestDescription: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      impactDetails: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      emailIdsToNotify: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      deletePreTemplateTasks: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      additionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProblemTask: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      taskProblemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskTitle: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskDescription: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      taskType: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      taskOwner: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      estimatedEffort: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          estimatedEffortMinutes: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          estimatedEffortHours: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          estimatedEffortDays: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      percentageCompletion: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      group: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      additionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProblemTask: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      taskProblemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      toDeleteTaskId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProblemTask: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      taskProblemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      toGetTaskId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProblemTasks: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      taskProblemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => boolean | undefined;
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
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
          rowCount: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      conditionsCriteria: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
      };
      conditionsCriteriaValue: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProblemTask: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      taskProblemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      toUpdateTaskId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskTitle: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      taskDescription: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      taskType: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      taskOwner: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      estimatedEffort: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          estimatedEffortMinutes: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          estimatedEffortHours: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          estimatedEffortDays: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      percentageCompletion: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      group: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      additionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProblemNote: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      noteProblemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      noteDescription: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      notifyTo: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      additionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProblemNote: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      noteProblemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      toDeleteNoteId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProblemNote: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      noteProblemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      toGetNoteId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProblemNotes: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      noteProblemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => boolean | undefined;
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
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
          rowCount: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      conditionsCriteria: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
      };
      conditionsCriteriaValue: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProblemNote: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      noteProblemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      toUpdateNoteId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      noteDescription: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      notifyTo: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      additionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProblem: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      problemTitle: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      problemDescription: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      problemTimes: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          problemReportedTime: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
          problemDueByTime: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
          problemClosedTime: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProblem: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      toDeleteProblemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProblem: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      toGetProblemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProblems: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => boolean | undefined;
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
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
          rowCount: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      conditionsCriteria: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
      };
      conditionsCriteriaValue: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProblem: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      toUpdateProblemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      problemTitle: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      problemDescription: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      problemTimes: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          problemReportedTime: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
          problemDueByTime: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
          problemClosedTime: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProductType: import("@prismatic-io/spectral").ActionDefinition<{
      name: {
        required: true;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      category: {
        required: true;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => object | undefined;
      };
      assetType: {
        required: true;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => object | undefined;
      };
      id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      attributes: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProductType: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        required: true;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProductType: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        required: true;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProductTypes: import("@prismatic-io/spectral").ActionDefinition<{
      conditionsCriteria: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
      };
      conditionsCriteriaValue: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
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
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
          rowCount: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProductType: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        required: true;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      category: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => object | undefined;
      };
      assetType: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => object | undefined;
      };
      attributes: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProduct: import("@prismatic-io/spectral").ActionDefinition<{
      productType: {
        required: true;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => object | undefined;
      };
      name: {
        required: true;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      productDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          manufacturer: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          isLaptop: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            clean: (value: unknown) => boolean | undefined;
          };
          partNo: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      attributes: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProduct: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        required: true;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProduct: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        required: true;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProducts: import("@prismatic-io/spectral").ActionDefinition<{
      conditionsCriteria: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
      };
      conditionsCriteriaValue: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
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
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
          rowCount: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProduct: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        required: true;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      productType: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => object | undefined;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      productDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          manufacturer: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          isLaptop: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            clean: (value: unknown) => boolean | undefined;
          };
          partNo: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      attributes: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createConfigurationItem: import("@prismatic-io/spectral").ActionDefinition<{
      ciTypeApiName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        comments: string;
        required: true;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
      attributes: {
        default: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteConfigurationItem: import("@prismatic-io/spectral").ActionDefinition<{
      ciTypeApiName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      ciIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listConfigurationItems: import("@prismatic-io/spectral").ActionDefinition<{
      ciTypeApiName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      conditionsCriteria: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
      };
      conditionsCriteriaValue: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
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
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
          rowCount: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getConfigurationItem: import("@prismatic-io/spectral").ActionDefinition<{
      ciTypeApiName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      ciId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateConfigurationItem: import("@prismatic-io/spectral").ActionDefinition<{
      ciTypeApiName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      ciId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
      attributes: {
        default: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAssets: import("@prismatic-io/spectral").ActionDefinition<{
      conditionsCriteria: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
      };
      conditionsCriteriaValue: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
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
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
          rowCount: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createAsset: import("@prismatic-io/spectral").ActionDefinition<{
      assetName: {
        required: true;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      state: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        default: string;
        clean: (value: unknown) => object | undefined;
      };
      product: {
        required: true;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => object | undefined;
      };
      assetId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          assetTag: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          stateHistoryComments: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          barCode: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      keyValuePairParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, object> | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAsset: import("@prismatic-io/spectral").ActionDefinition<{
      assetId: {
        required: true;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateAsset: import("@prismatic-io/spectral").ActionDefinition<{
      assetId: {
        required: true;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      assetName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      state: {
        required: false;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => object | undefined;
      };
      product: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => object | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          assetTag: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          stateHistoryComments: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          barCode: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      attributes: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAsset: import("@prismatic-io/spectral").ActionDefinition<{
      assetId: {
        required: true;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      pollResourceType: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        comments: string;
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: {
            created: SDPRecord[];
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
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: "sdp-oauth2";
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
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
      };
      dataCenter: {
        label: string;
        placeholder: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        required: true;
        shown: true;
      };
    };
  }, "sdp-oauth2">[];
  dataSources: {
    selectAsset: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProblem: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectRequest: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;