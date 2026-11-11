//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "Expensify";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/Expensify/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
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
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateEmployee: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      type: {
        default: "employees";
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      employees: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        required: false;
      };
      provisioningOptions: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          dryRun: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            default: string;
            clean: (value: unknown) => boolean | undefined;
          };
          setEmployeePrimaryPolicy: {
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
          shouldFixApprovalChains: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            default: string;
            clean: (value: unknown) => boolean | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      onFinish: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCards: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      type: {
        default: "domainCardList";
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      domain: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createExpense: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      type: {
        default: "expenses";
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      employeeEmail: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      transactionList: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createReport: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      type: {
        default: "report";
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      employeeEmail: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      report: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object;
        required: true;
      };
      expenses: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object;
        required: true;
      };
      policyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateReportStatus: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      type: {
        default: "reportStatus";
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      status: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
      };
      filters: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    downloadReport: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      fileName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fileSystem: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    exportReport: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      fileExtension: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
      };
      startDate: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        default: string;
      };
      endDate: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        default: string;
      };
      approvedAfter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      markAsExportedFilter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      policyIDList: {
        required: boolean;
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
      reportIdList: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          fileBasename: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          includeFullPageReceiptsPdf: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            default: string;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          test: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            default: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      status: {
        label: string;
        comments: string;
        required: boolean;
        clean: (value: unknown) => string | undefined;
        type: "string";
        placeholder: string;
        example: string;
        default: string;
      };
      employeeEmail: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
      };
      onFinish: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        placeholder: string;
        clean: (value: unknown) => object | undefined;
        required: false;
      };
      templateName: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPolicy: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      type: {
        default: "policy";
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      policyIDList: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
      fields: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string[] | undefined;
      };
      userEmail: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPolicies: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      type: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        default: "policyList";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      adminOnly: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      userEmail: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createPolicy: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      type: {
        default: "policy";
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      policyName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      plan: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updatePolicy: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      type: {
        default: "policy";
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      policyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      policyIDList: {
        required: boolean;
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
      categories: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        required: false;
      };
      tags: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        required: false;
      };
      reportFields: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createExpenseRule: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      type: {
        default: "expenseRules";
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      employeeEmail: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      policyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      actions: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateExpenseRule: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      type: {
        default: "expenseRules";
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      employeeEmail: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      policyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ruleId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      actions: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object;
        required: true;
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
      showNewRecords: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "basic";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      partnerUserID: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      partnerUserSecret: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "basic">[];
  dataSources: {
    listPolicies: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      type: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        default: "policyList";
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listCards: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      type: {
        default: "domainCardList";
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      domain: {
        default: string;
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;