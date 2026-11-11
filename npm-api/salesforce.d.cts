//#region src/types/workflow.d.ts
declare const filterOperationDescriptions: {
  equals: string;
  notEqual: string;
  lessThan: string;
  greaterThan: string;
  lessOrEqual: string;
  greaterOrEqual: string;
  contains: string;
  notContain: string;
  startsWith: string;
  includes: string;
  excludes: string;
};
type FilterOperation = keyof typeof filterOperationDescriptions;
interface FilterItem {
  field: string;
  operation: FilterOperation;
  value?: string;
  valueField?: string;
}
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "salesforce";
  documentationUrl: "https://prismatic.io/docs/components/salesforce/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    listWorkflowRules: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
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
    createWorkflowRule: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ruleName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      triggerType: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      active: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
      filterCriteria: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (criteriaValue: unknown) => FilterItem[];
      };
      formulaInput: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      outboundMessageActions: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => string[] | undefined;
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
    deleteWorkflowRule: import("@prismatic-io/spectral").ActionDefinition<{
      fullName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
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
    listWorkflowOutboundMessages: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
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
    createWorkflowOutboundMessage: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      endpointUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      integrationUserEmail: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      fields: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      dynamicFields: {
        label: string;
        type: "data";
        required: false;
        comments: string;
        clean: (value: unknown) => string[] | undefined;
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
    deleteWorkflowOutboundMessage: import("@prismatic-io/spectral").ActionDefinition<{
      fullName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
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
    subscribeToRecordChange: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      operation: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      endpointUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filterCriteria: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (criteriaValue: unknown) => FilterItem[];
      };
      formulaInput: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      integrationUserEmail: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
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
      fields: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      dynamicFields: {
        label: string;
        type: "data";
        required: false;
        comments: string;
        clean: (value: unknown) => string[] | undefined;
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
    createUser: import("@prismatic-io/spectral").ActionDefinition<{
      profile: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userName: {
        dataSource: any;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeZone: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        model: import("@prismatic-io/spectral").InputFieldChoice[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      alias: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      email: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      firstName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      lastName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
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
    updateUser: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      userName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
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
    addUserPermissionSet: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      userName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      permissionName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
    removeUserPermissionSet: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      userName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      permissionName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
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
          pageSize: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          pageNumber: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          maxRecordsToFetch: {
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
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      fieldValueTypes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      sort: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        example: string;
        required: false;
        clean: (value: unknown) => string;
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
    createRecord: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
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
    deleteRecord: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      recordId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
    updateRecord: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      recordId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
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
    upsertRecord: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      externalIdFieldName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      records: {
        label: string;
        placeholder: string;
        comments: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        clean: (value: unknown) => any[];
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
    findRecord: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      fieldValueTypes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
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
    findRecords: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
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
          pageSize: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          pageNumber: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          maxRecordsToFetch: {
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
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      fieldValueTypes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      sort: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        example: string;
        required: false;
        clean: (value: unknown) => string;
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
    getRecord: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      recordId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
    query: import("@prismatic-io/spectral").ActionDefinition<{
      queryString: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
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
    createProfile: import("@prismatic-io/spectral").ActionDefinition<{
      name: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      description: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userLicense: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      permissions: {
        label: string;
        type: "data";
        comments: string;
        clean: (value: unknown) => Record<string, boolean> | undefined;
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
    updateProfile: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
      };
      description: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
      };
      permissions: {
        label: string;
        type: "data";
        comments: string;
        clean: (value: unknown) => Record<string, boolean> | undefined;
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
    deleteProfile: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
    listProfiles: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
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
          pageSize: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          pageNumber: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          maxRecordsToFetch: {
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
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      fieldValueTypes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      sort: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        example: string;
        required: false;
        clean: (value: unknown) => string;
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
    createOpportunity: import("@prismatic-io/spectral").ActionDefinition<{
      stage: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      opportunityType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      closeDate: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      accountId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          amount: {
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          nextStep: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          leadSource: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          probability: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
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
      data: any;
    }>;
    deleteOpportunity: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
    updateOpportunity: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      stage: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      opportunityType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      closeDate: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      accountId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          amount: {
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          nextStep: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          leadSource: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          probability: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
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
      data: any;
    }>;
    listOpportunities: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
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
          pageSize: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          pageNumber: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          maxRecordsToFetch: {
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
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      fieldValueTypes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      sort: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        example: string;
        required: false;
        clean: (value: unknown) => string;
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
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
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
    validateConnection: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: boolean;
    }>;
    sendTransactionalEmail: import("@prismatic-io/spectral").ActionDefinition<{
      messageKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      definitionKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recipientContactKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recipientEmail: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recipientAttributes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
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
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
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
    createFieldsFromMetadata: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      metadata: {
        default: string;
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        clean: (value: unknown) => object;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      metadataType: {
        default: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createObjectsFromMetadata: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      metadata: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown) => object;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      metadataType: {
        default: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getObjectMetadataByName: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fullName: {
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        clean: (value: unknown) => string[];
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      metadataType: {
        default: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listObjectMetadata: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      metadataType: {
        default: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateMetadata: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      metadata: {
        default: any;
        comments: string;
        example: string;
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      metadataType: {
        default: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteMetadata: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fullNames: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      metadataType: {
        default: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createLead: import("@prismatic-io/spectral").ActionDefinition<{
      company: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      leadStatus: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      email: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      nameAndContact: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          firstName: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          lastName: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          phone: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          website: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      address: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          street: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          city: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          state: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          postalCode: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          country: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          title: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          leadSource: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          rating: {
            label: string;
            type: "string";
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          employeeCount: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
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
          revenue: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
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
      data: any;
    }>;
    deleteLead: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
    updateLead: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      company: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      leadStatus: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      email: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      nameAndContact: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          firstName: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          lastName: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          phone: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          website: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      address: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          street: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          city: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          state: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          postalCode: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          country: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          title: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          leadSource: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          rating: {
            label: string;
            type: "string";
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          employeeCount: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
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
          revenue: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
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
      data: any;
    }>;
    listLeads: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
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
          pageSize: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          pageNumber: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          maxRecordsToFetch: {
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
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      fieldValueTypes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      sort: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        example: string;
        required: false;
        clean: (value: unknown) => string;
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
    listFlows: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
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
    getFlow: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      flowName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
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
    createFlow: import("@prismatic-io/spectral").ActionDefinition<{
      flowName: {
        dataSource: any;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
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
      runInMode: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      flowMetadata: {
        label: string;
        placeholder: string;
        type: "code";
        required: false;
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => object;
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
    updateFlow: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      flowName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
      };
      description: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      status: {
        default: any;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      flowMetadata: {
        label: string;
        placeholder: string;
        type: "code";
        required: false;
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => object;
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
    deleteFlow: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      flowName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
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
    activateFlow: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      flowName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
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
    deactivateFlow: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      flowName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
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
    subscribeToRecordChanges: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      prefix: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string;
      };
      endpointUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      triggerObject: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      triggerOn: {
        label: string;
        placeholder: string;
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
      fields: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      dynamicFields: {
        label: string;
        type: "data";
        required: false;
        comments: string;
        clean: (value: unknown) => string[] | undefined;
      };
      flowMetadata: {
        label: string;
        placeholder: string;
        type: "code";
        required: false;
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
      filterFormula: {
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
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
    deleteInstancedFlowsAndOutboundMessages: import("@prismatic-io/spectral").ActionDefinition<{
      endpointUrl: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
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
    getFile: import("@prismatic-io/spectral").ActionDefinition<{
      contentDocumentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
      contentType: string;
    }>;
    uploadFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      file: {
        label: string;
        type: "data";
        required: true;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      pathOnClient: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    describeObject: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
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
    describePermissions: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
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
    createCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      name: {
        comments: string;
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      partyId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      customerStatusType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        default: string;
      };
      lastReferenceDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        example: string;
      };
      lastViewedDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        example: string;
      };
      ownerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        example: string;
      };
      totalLifeTimeValue: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
        example: string;
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
    deleteCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
    listCustomers: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
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
          pageSize: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          pageNumber: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          maxRecordsToFetch: {
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
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      fieldValueTypes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      sort: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        example: string;
        required: false;
        clean: (value: unknown) => string;
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
    getCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
    describeCustomerSObject: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
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
    updateCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        comments: string;
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      partyId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      customerStatusType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
        default: string;
      };
      lastReferenceDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        example: string;
      };
      lastViewedDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        example: string;
      };
      ownerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        example: string;
      };
      totalLifeTimeValue: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
        example: string;
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
    createContact: import("@prismatic-io/spectral").ActionDefinition<{
      email: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      nameAndContact: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          firstName: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          lastName: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          phone: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          mobile: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          fax: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          birthdate: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      mailingAddress: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          street: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          city: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          state: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          postalCode: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          country: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      billingAddress: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          billingStreet: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          billingCity: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          billingState: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          billingPostalCode: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          billingCountry: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          department: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
            example: string;
          };
          title: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          assistant: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
            example: string;
          };
          assistantPhone: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
            example: string;
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
      data: any;
    }>;
    deleteContact: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
    updateContact: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordId: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      email: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      nameAndContact: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          firstName: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          lastName: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          phone: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          mobile: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          fax: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          birthdate: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      mailingAddress: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          street: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          city: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          state: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          postalCode: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          country: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      billingAddress: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          billingStreet: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          billingCity: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          billingState: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          billingPostalCode: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          billingCountry: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          department: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
            example: string;
          };
          title: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          assistant: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
            example: string;
          };
          assistantPhone: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
            example: string;
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
      data: any;
    }>;
    listContacts: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
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
          pageSize: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          pageNumber: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          maxRecordsToFetch: {
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
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      fieldValueTypes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      sort: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        example: string;
        required: false;
        clean: (value: unknown) => string;
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
    compositeRequests: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      compositeRequest: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => any[];
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      allOrNone: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      collateSubrequests: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCompositeResources: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    abortBulkQueryJob: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      queryJobId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createBulkQueryJob: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      operation: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      query: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lineEnding: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      columnDelimiter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteBulkQueryJob: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      queryJobId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAllQueryJobInformation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      isPkChunkingEnabled: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      jobType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => string | undefined;
      };
      concurrencyMode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => string | undefined;
      };
      queryLocator: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getQueryJobInformation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      queryJobId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getQueryJobResults: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      queryJobId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          locator: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          maxRecords: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    abortBulkJob: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      bulkJobId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    bulkInsertRecords: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      externalIdFieldName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      file: {
        label: string;
        type: "data";
        required: true;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
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
    bulkUpsertRecords: import("@prismatic-io/spectral").ActionDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      externalIdFieldName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      file: {
        label: string;
        type: "data";
        required: true;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
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
    completeUploadBulkJob: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      bulkJobId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createBulkJob: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      operation: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lineEnding: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      object: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      externalIdFieldName: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        placeholder: string;
        type: "string";
        example: string;
      };
      assignmentRuleId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      columnDelimiter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteBulkJob: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      bulkJobId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listBulkJobs: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      isPkChunkingEnabled: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      jobType: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => string | undefined;
      };
      queryLocator: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getBulkJob: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      bulkJobId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    uploadJobData: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      bulkJobId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getJobFailedRecordResults: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      bulkJobId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getJobSuccessfulRecordResults: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      bulkJobId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fileName: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      file: {
        label: string;
        placeholder: string;
        type: "data";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fileId: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        example: string;
        required: true;
        clean: (value: unknown) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
      contentType: string;
    }>;
    createAccount: import("@prismatic-io/spectral").ActionDefinition<{
      name: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      type: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      industry: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      shippingAddress: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          street: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          city: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          state: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          postalCode: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          country: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      billingAddress: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          billingStreet: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          billingCity: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          billingState: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          billingPostalCode: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          billingCountry: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          phone: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          website: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
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
          employeeCount: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          revenue: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
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
      data: any;
    }>;
    deleteAccount: import("@prismatic-io/spectral").ActionDefinition<{
      recordId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
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
    updateAccount: import("@prismatic-io/spectral").ActionDefinition<{
      recordId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      type: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      industry: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      shippingAddress: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          street: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          city: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          state: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          postalCode: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          country: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      billingAddress: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          billingStreet: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          billingCity: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          billingState: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          billingPostalCode: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          billingCountry: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          phone: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          website: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
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
          employeeCount: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          revenue: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
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
      data: any;
    }>;
  };
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      response?: import("@prismatic-io/spectral").HttpResponse;
    }, import("@prismatic-io/spectral").Inputs>;
    workflowTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      triggerType: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      outboundMessageName: {
        label: string;
        comments: string;
        example: string;
        dataSource: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      workflowRuleName: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
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
      fields: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      response?: import("@prismatic-io/spectral").HttpResponse;
    }, import("@prismatic-io/spectral").Inputs>;
    flowOutboundMessageTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      prefix: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string;
      };
      triggerObject: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      triggerOn: {
        label: string;
        placeholder: string;
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
      fields: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      flowMetadata: {
        label: string;
        placeholder: string;
        type: "code";
        required: false;
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
      filterFormula: {
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      response?: import("@prismatic-io/spectral").HttpResponse;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
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
      showDeletedRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      selectedFields: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      returnIdsOnly: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      dynamicValues: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (val: unknown) => Record<string, unknown>;
      };
      fieldValueTypes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      maxRecordsToFetch: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        default: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      polledNoChanges?: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    mapRecordTypeFields: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      mappingFields: {
        label: string;
        type: "objectFieldMap";
        required: true;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").ObjectFieldMap;
        example: string;
      };
      objectSelection: {
        label: string;
        type: "objectSelection";
        required: true;
        comments: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").ObjectSelection;
      };
      includeSupplementalMetadata: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "objectFieldMap">;
    selectRecordTypes: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      defaultSelectedRecordTypes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (value: unknown) => string[];
      };
      recordTypeFilter: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (value: unknown) => string[];
      };
      includeAllCustomRecordTypes: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      includeOnlyTopLevelRecordTypes: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      showTriggerableOnly: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "objectSelection">;
    selectRecordTypesWithFields: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      defaultSelectedRecordTypes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (value: unknown) => string[];
      };
      recordTypeFilter: {
        required: boolean;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        clean: (value: unknown) => string[];
      };
      includeAllCustomRecordTypes: {
        clean: (value: unknown) => boolean;
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
      };
      includeOnlyTopLevelRecordTypes: {
        comments: string;
        clean: (value: unknown) => boolean;
        label: string;
        type: "boolean";
        required: true;
        default: string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      showTriggerableOnly: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "objectSelection">;
    selectBulkJob: import("@prismatic-io/spectral").DataSourceDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      filterQuery: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectContact: import("@prismatic-io/spectral").DataSourceDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      filterQuery: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCustomer: import("@prismatic-io/spectral").DataSourceDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      filterQuery: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectFlow: import("@prismatic-io/spectral").DataSourceDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      filterQuery: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectLead: import("@prismatic-io/spectral").DataSourceDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      filterQuery: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectOpportunity: import("@prismatic-io/spectral").DataSourceDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      filterQuery: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectOutboundMessage: import("@prismatic-io/spectral").DataSourceDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      filterQuery: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProfile: import("@prismatic-io/spectral").DataSourceDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      filterQuery: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUser: import("@prismatic-io/spectral").DataSourceDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      filterQuery: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectRecordType: import("@prismatic-io/spectral").DataSourceDefinition<{
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      filterQuery: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    previewRecordTypeFields: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      dynamicRecordType: {
        label: string;
        placeholder: string;
        type: "dynamicObjectSelection";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    previewRecordTypeFieldValues: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      dynamicRecordType: {
        label: string;
        placeholder: string;
        type: "dynamicObjectSelection";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      dynamicFieldName: {
        label: string;
        type: "dynamicFieldSelection";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (version: unknown) => string;
      };
      valueCount: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        example: string;
        clean: (value: unknown) => number;
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
    oauth2PkceMethod: import("@prismatic-io/spectral").OAuth2PkceMethod.S256;
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
      revokeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
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
        example: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
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
    };
  }, "oauth2"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "basic";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      loginUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        default: string;
      };
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
      };
    };
  }, "basic"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "salesforceClientCredentials";
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.ClientCredentials;
    display: {
      label: string;
      description: string;
    };
    inputs: {
      instanceUrl: {
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
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
      };
    } & Partial<import("@prismatic-io/spectral").OAuth2ClientCredentialInputs> & {
      [key: string]: import("@prismatic-io/spectral").ConnectionInput;
    } & {
      tokenUrl: import("@prismatic-io/spectral").ConnectionTemplateInputField;
    } & {
      [key: string]: import("@prismatic-io/spectral").ConnectionTemplateInputField;
    };
  }, "salesforceClientCredentials">)[];
}>;
export = _default;