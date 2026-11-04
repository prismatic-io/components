//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/triggers.d.ts
interface ServiceTitanRecord {
  id: number;
  [key: string]: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "servicetitan";
  documentationUrl: "https://prismatic.io/docs/components/servicetitan/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    createTechnician: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        required: true;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      accountCreationMethod: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
        default: string;
      };
      roleId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      positions: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string[] | undefined;
      };
      licenseType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
        default: string;
      };
      phoneNumber: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      email: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      login: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      password: {
        label: string;
        type: "password";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      businessUnitId: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      aadUserId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      memo: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          team: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          dailyGoal: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          burdenRate: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          bio: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          jobFilter: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => string | undefined;
            default: string;
          };
          jobHistoryDateFilter: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => string | undefined;
            default: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      home: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      customFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateTechnician: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      technicianId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      name: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      phoneNumber: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      email: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      login: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      businessUnitId: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      roleId: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      positions: {
        required: boolean;
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string[] | undefined;
      };
      aadUserId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      licenseType: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
        default: string;
      };
      memo: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          team: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          dailyGoal: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          burdenRate: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          bio: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          jobFilter: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => string | undefined;
            default: string;
          };
          jobHistoryDateFilter: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => string | undefined;
            default: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      home: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      customFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTechnicians: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      page: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      pageSize: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      includeTotal: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sort: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
      data: any;
    }>;
    getTechnician: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      technicianId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locationId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      projectManagerIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number[] | undefined;
      };
      name: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      summary: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      statusId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      subStatusId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      startDate: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      targetCompletionDate: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      actualCompletionDate: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      customFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      externalData: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProjects: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeTotal: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sort: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
      data: any;
    }>;
    updateProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      projectManagerIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number[] | undefined;
      };
      jobsIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number[] | undefined;
        dataSource: string;
      };
      name: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      summary: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      statusId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      subStatusId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      startDate: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      targetCompletionDate: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      actualCompletionDate: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      customFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      externalData: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createPayment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      typeId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      splits: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown) => object;
      };
      memo: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      paidOn: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      authCode: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      checkNumber: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      exportId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      status: {
        label: string;
        type: "string";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: number;
        typeId: number;
        active: boolean;
        memo: string;
        paidOn: string;
        authCode: string;
        checkNumber: string;
        exportId: string;
        transactionStatus: string;
        status: string;
        splits: {
          invoiceId: number;
          amount: number;
        }[];
      };
    }>;
    listPayments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeTotal: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sort: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
      data: any;
    }>;
    updatePayment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      paymentId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      typeId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      splits: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown) => object;
      };
      memo: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      paidOn: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      authCode: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      checkNumber: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      exportId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      status: {
        label: string;
        type: "string";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updatePaymentCustomFields: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      operations: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listBusinessUnits: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeTotal: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sort: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
      data: any;
    }>;
    listUserRoles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeTotal: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sort: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
        comments: string;
      };
      urlType: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createLocation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      address: {
        required: boolean;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      customerId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      contacts: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      customFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      tagTypeIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number[] | undefined;
      };
      externalData: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateLocation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locationId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      name: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      address: {
        required: boolean;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      active: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        default: string;
      };
      taxZoneId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      customFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      tagTypeIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number[] | undefined;
      };
      externalData: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getLocation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locationId: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        required: true;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listLocations: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeTotal: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sort: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
      data: any;
    }>;
    createJob: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      locationId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      businessUnitId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      jobTypeId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      priority: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      campaignId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      appointments: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown) => object;
      };
      jobGeneratedLeadSource: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      projectId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      summary: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      customFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      tagTypeIds: {
        comments: string;
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        placeholder: string;
        clean: (value: unknown) => number[] | undefined;
      };
      externalData: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      invoiceSignatureIsRequired: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        default: string;
      };
      customerPo: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
        default: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listJobCancelReasons: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeTotal: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sort: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
      data: any;
    }>;
    cancelJob: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      jobId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      reasonId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      memo: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateJob: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      jobId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      locationId: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      businessUnitId: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      jobGeneratedLeadSource: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      jobTypeId: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      priority: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      campaignId: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      summary: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      shouldUpdateInvoiceItems: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        default: string;
      };
      customFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      tagTypeIds: {
        comments: string;
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        placeholder: string;
        clean: (value: unknown) => number[] | undefined;
      };
      externalData: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      customerPo: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
        default: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listJobs: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeTotal: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sort: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
      data: any;
    }>;
    getJob: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      jobId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      externalDataApplicationGuid: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listInvoices: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeTotal: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sort: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
      data: any;
    }>;
    createInvoices: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      adjustmentToId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      number: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      typeId: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      invoicedOn: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      subtotal: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      tax: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      summary: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      royaltyDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          royaltyStatus: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => string | undefined;
          };
          royaltyDate: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          royaltySentOn: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          royaltyMemo: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      exportId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      reviewStatus: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      assignedToId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      items: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteInvoiceItem: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      itemId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      number: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      typeId: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      invoicedOn: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      subtotal: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      tax: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      summary: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      royaltyDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          royaltyStatus: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => string | undefined;
          };
          royaltyDate: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          royaltySentOn: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          royaltyMemo: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      exportId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      reviewStatus: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      assignedToId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      items: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      payments: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateInvoiceCustomFields: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      operations: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: true;
        default: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateInvoiceItems: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      description: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      quantity: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      skuId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      skuName: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      technicianId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          unitPrice: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          cost: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          isAddOn: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              value: string;
              label: string;
            }[];
            default: string;
            clean: (value: unknown) => boolean | undefined;
          };
          signature: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          technicianAcknowledgementSignature: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          installedOn: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          inventoryWarehouseName: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          skipUpdatingMembershipPrices: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              value: string;
              label: string;
            }[];
            default: string;
            clean: (value: unknown) => boolean | undefined;
          };
          itemGroupName: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      itemGroupRootId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      inventoryLocationId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      durationBillingId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      id: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createInstalledEquipment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locationId: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        required: true;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      name: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      installedOn: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      serialNumber: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      memo: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      manufacturer: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      model: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      cost: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      warrantyDates: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          manufacturerWarrantyStart: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          manufacturerWarrantyEnd: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          serviceProviderWarrantyStart: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          serviceProviderWarrantyEnd: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      customFields: {
        required: boolean;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      attachments: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      tagTypeIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createInstalledEquipmentAttachment: import("@prismatic-io/spectral").ActionDefinition<{
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
      fileName: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getInstalledEquipment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      installedEquipmentId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listInstalledEquipment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeTotal: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sort: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
      data: any;
    }>;
    listInstalledEquipmentAttachments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      path: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateInstalledEquipment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      installedEquipmentId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      name: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      installedOn: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      serialNumber: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      memo: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      manufacturer: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      model: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      cost: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      warrantyDates: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          manufacturerWarrantyStart: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          manufacturerWarrantyEnd: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          serviceProviderWarrantyStart: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          serviceProviderWarrantyEnd: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      customFields: {
        required: boolean;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      attachments: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      tagTypeIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      locations: {
        required: boolean;
        label: string;
        type: "code";
        language: "json";
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      address: {
        required: boolean;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      type: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      doNotMail: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        default: string;
      };
      doNotService: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        default: string;
      };
      contacts: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      customFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      tagTypeIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number[] | undefined;
      };
      externalData: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      name: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      type: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      address: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      customFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      externalData: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      doNotMail: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        default: string;
      };
      doNotService: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        default: string;
      };
      active: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        default: string;
      };
      tagTypeIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCustomers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      sort: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      includeTotal: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
      data: any;
    }>;
    getCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createCustomerContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      type: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        default: string;
        clean: (value: unknown) => string | undefined;
      };
      value: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      memo: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateCustomerContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      customerContactId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      type: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        default: string;
        clean: (value: unknown) => string | undefined;
      };
      value: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      memo: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deletCustomersContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      customerContactId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCustomersContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeTotal: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      modifiedBefore: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      modifiedOnOrAfter: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createBookingByProvider: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      bookingProvider: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      summary: {
        comments: string;
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
      };
      isFirstTimeClient: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        default: string;
      };
      externalId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      source: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        required: true;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      address: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      contacts: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      customerType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      start: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      campaignId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      businessUnitId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      jobTypeId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      priority: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      uploadedImages: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
      isSendConfirmationEmail: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        default: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getBookingByProvider: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      bookingProvider: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      bookingId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getBookingByTenant: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      bookingId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listBookingByProvider: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      bookingProvider: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeTotal: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sort: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
      data: any;
    }>;
    listBookingByTenant: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeTotal: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sort: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
      data: any;
    }>;
    updateBooking: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      bookingProvider: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      bookingId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      summary: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      isFirstTimeClient: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
        default: string;
      };
      externalId: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      source: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        required: boolean;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      address: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      customerType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      start: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      campaignId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      businessUnitId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      jobTypeId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      priority: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      uploadedImages: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createAppointment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      jobId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      start: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
      };
      end: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
      };
      arrivalWindowStart: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      arrivalWindowEnd: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      technicianId: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
        dataSource: string;
      };
      specialInstructions: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAppointment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      appointmentId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAppointments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeTotal: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sort: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
      data: any;
    }>;
    deleteAppointment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      appointmentId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    assignTechnicians: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      jobAppointmentId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      technicianIds: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number[] | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    unassignTechnicians: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      jobAppointmentId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
        dataSource: string;
      };
      technicianIds: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number[] | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAppointmentsAssignment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeTotal: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sort: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
      data: any;
    }>;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
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
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: {
            created: ServiceTitanRecord[];
            updated: ServiceTitanRecord[];
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
    key: "serviceTitanConnection";
    display: {
      description: string;
      label: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.ClientCredentials;
    inputs: {
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
        required: false;
        shown: false;
        comments: string;
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
      tenant: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      applicationKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      environment: {
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
    };
  }, "serviceTitanConnection">[];
  dataSources: {
    selectAppointment: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectBooking: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectBusinessUnit: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCustomerContact: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: undefined;
        label: string;
        type: "string";
        example: string;
        required: true;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCustomers: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectInstalledEquipment: import("@prismatic-io/spectral").DataSourceDefinition<{
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
    selectJob: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectJobCancelReason: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectLocation: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPayment: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
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
    selectTechnician: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUserRole: import("@prismatic-io/spectral").DataSourceDefinition<{
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