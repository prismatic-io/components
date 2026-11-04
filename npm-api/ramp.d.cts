//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types.d.ts
interface RampRecord {
  id: string;
  [key: string]: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "ramp";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/ramp/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    postSyncStatus: import("@prismatic-io/spectral").ActionDefinition<{
      idempotency_key: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sync_type: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      failed_syncs: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => object | undefined;
      };
      successful_syncs: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => object | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        placeholder: string;
        example: string;
        label: string;
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
    deleteVendor: import("@prismatic-io/spectral").ActionDefinition<{
      vendorId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getVendor: import("@prismatic-io/spectral").ActionDefinition<{
      vendorId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listVendors: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
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
          start: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      customQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateVendor: import("@prismatic-io/spectral").ActionDefinition<{
      vendorId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      code: {
        label: string;
        type: "string";
        required: false;
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
      reactivate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
      };
      subsidiaries: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => object | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTransaction: import("@prismatic-io/spectral").ActionDefinition<{
      transactionId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTransactions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
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
          start: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      customQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getReimbursement: import("@prismatic-io/spectral").ActionDefinition<{
      reimbursementId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listReimbursements: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
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
          start: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      customQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createLocation: import("@prismatic-io/spectral").ActionDefinition<{
      name: {
        comments: string;
        required: true;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      entityId: {
        label: string;
        comments: string;
        placeholder: string;
        required: boolean;
        type: "string";
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getLocation: import("@prismatic-io/spectral").ActionDefinition<{
      locationId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listLocations: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
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
          start: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      customQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateLocation: import("@prismatic-io/spectral").ActionDefinition<{
      locationId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      entityId: {
        comments: string;
        label: string;
        placeholder: string;
        required: boolean;
        type: "string";
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getGeneralLedgerAccount: import("@prismatic-io/spectral").ActionDefinition<{
      generalLedgerAccountId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listGeneralLedgerAccounts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
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
          start: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      customQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteGeneralLedgerAccount: import("@prismatic-io/spectral").ActionDefinition<{
      generalLedgerAccountId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateGeneralLedgerAccount: import("@prismatic-io/spectral").ActionDefinition<{
      generalLedgerAccountId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      code: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      reactivate: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
      };
      subsidiaries: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        example: string;
        required: false;
        placeholder: string;
        clean: (value: unknown) => object | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createDepartment: import("@prismatic-io/spectral").ActionDefinition<{
      name: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDepartment: import("@prismatic-io/spectral").ActionDefinition<{
      departmentId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDepartments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
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
          start: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      customQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateDepartment: import("@prismatic-io/spectral").ActionDefinition<{
      departmentId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCustomAccountingFieldOption: import("@prismatic-io/spectral").ActionDefinition<{
      customAccountingFieldOptionId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCustomAccountingFieldOptions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
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
          start: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      customQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      customAccountingFieldId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteCustomAccountingFieldOption: import("@prismatic-io/spectral").ActionDefinition<{
      customAccountingFieldOptionId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateCustomAccountingFieldOption: import("@prismatic-io/spectral").ActionDefinition<{
      customAccountingFieldOptionId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      reactivate: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
      };
      value: {
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
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    uploadCustomAccountingFieldOption: import("@prismatic-io/spectral").ActionDefinition<{
      customAccountingFieldOptionId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      options: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => object;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createCustomAccountingField: import("@prismatic-io/spectral").ActionDefinition<{
      customAccountingFieldId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      inputType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      isSplittable: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCustomAccountingField: import("@prismatic-io/spectral").ActionDefinition<{
      customAccountingFieldId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCustomAccountingField: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
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
          start: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      customQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteCustomAccountingField: import("@prismatic-io/spectral").ActionDefinition<{
      customAccountingFieldId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateCustomAccountingField: import("@prismatic-io/spectral").ActionDefinition<{
      customAccountingFieldId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      isSplittable: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getBusinessEntity: import("@prismatic-io/spectral").ActionDefinition<{
      businessEntityId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        entity_name: string;
        id: string;
        is_primary: boolean;
        currency: string;
      };
    }>;
    listBusinessEntities: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
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
          start: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      customQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getBill: import("@prismatic-io/spectral").ActionDefinition<{
      billId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listBills: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
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
          start: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      customQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
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
          label: string;
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
      showUpdatedRecords: {
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
            created: RampRecord[];
            updated: RampRecord[];
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
    selectBill: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectBusinessEntity: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCustomAccountingField: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCustomAccountingFieldOption: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      customAccountingFieldId: {
        dataSource: undefined;
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDepartment: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectLedgerAccount: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectLocation: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectReimbursement: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTransaction: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectVendor: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: "ramp-oauth2";
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
        model: {
          label: string;
          value: string;
        }[];
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
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
    };
  }, "ramp-oauth2">[];
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;