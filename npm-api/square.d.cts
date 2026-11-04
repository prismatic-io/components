//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/inputs/common.d.ts
declare function validateJSON(input: unknown): Record<string, unknown>;
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "square";
  documentationUrl: "https://prismatic.io/docs/components/square/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    listCustomers: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
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
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      sorting: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          sortField: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
          };
          sortOrder: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown;
      };
    }>;
    retrieveCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
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
    updateCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      address: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: false;
        comments: string;
        clean: (addressInput: unknown) => any;
      };
      birthday: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      companyName: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      emailAddress: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      familyName: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      givenName: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      nickname: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      note: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      phoneNumber: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      referenceId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      taxIds: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: false;
        comments: string;
        clean: (taxIdsInput: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      address: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: false;
        comments: string;
        clean: (addressInput: unknown) => any;
      };
      birthday: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      companyName: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      emailAddress: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      familyName: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      givenName: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      nickname: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      note: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      phoneNumber: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      referenceId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      taxIds: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: false;
        comments: string;
        clean: (taxIdsInput: unknown) => any;
      };
      idempotencyKey: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchCustomers: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      query: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: true;
        comments: string;
        clean: (queryInput: unknown) => any;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
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
    createTeamMember: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamMember: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        required: true;
        comments: string;
        clean: (teamMemberInput: unknown) => any;
      };
      idempotencyKey: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchTeamMembers: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      searchQuery: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: true;
        comments: string;
        clean: (searchQueryInput: unknown) => any;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    retrieveTeamMember: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamMemberId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateTeamMember: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      teamMemberId: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      teamMember: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        required: true;
        comments: string;
        clean: (teamMemberInput: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listLocations: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    retrieveLocation: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locationId: {
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
    updateLocation: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locationId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      locationUpdate: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: true;
        comments: string;
        clean: (locationUpdateInput: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      url: {
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listInvoices: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locationId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown;
      };
    }>;
    searchInvoices: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceQuery: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: true;
        comments: string;
        clean: (queryInput: unknown) => any;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      updateInvoiceInput: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: true;
        comments: string;
        clean: (updateInvoiceInput: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    publishInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      idempotencyKey: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    cancelInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchOrders: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locationIds: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: true;
        comments: string;
        clean: (locationIdsInput: unknown) => Record<string, unknown>;
      };
      orderQuery: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: true;
        comments: string;
        clean: (queryInput: unknown) => any;
      };
      returnEntries: {
        label: string;
        type: "boolean";
        default: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    retrieveOrder: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    batchRetrieveOrders: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locationId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderIds: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: true;
        comments: string;
        clean: (orderIdsInput: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createOrder: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locationId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderObject: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: true;
        comments: string;
        clean: (orderInput: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateOrder: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderObject: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: true;
        comments: string;
        clean: (orderInput: unknown) => any;
      };
      fieldsToClear: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: false;
        comments: string;
        clean: (fieldsToClearInput: unknown) => any;
      };
      idempotencyKey: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    cloneOrder: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      idempotencyKey: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCatalog: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      cursor: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      types: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        default: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      catalogVersion: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown;
      };
    }>;
    searchCatalogItems: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
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
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      textFilter: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      categoryIds: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        required: false;
        clean: (input: unknown) => Record<string, unknown>;
      };
      stockLevels: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        required: false;
        clean: (input: unknown) => Record<string, unknown>;
      };
      enabledLocationIds: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        required: false;
        clean: (input: unknown) => Record<string, unknown>;
      };
      sortOrder: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      productTypes: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        required: false;
        clean: (input: unknown) => Record<string, unknown>;
      };
      customAttributeFilters: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        required: false;
        clean: (input: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchCatalogObjects: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      objectTypes: {
        label: string;
        type: "text";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includeDeletedObjects: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      includeRelatedObjects: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      beginTime: {
        label: string;
        type: "text";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      catalogQuery: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        required: true;
        clean: typeof validateJSON;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    batchRetrieveCatalogObjects: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      objectIds: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        required: true;
        clean: typeof validateJSON;
      };
      includeRelatedObjects: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      includeDeletedObjects: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      catalogVersion: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    upsertCatalogObject: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      idempotencyKey: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      catalogObject: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        required: true;
        clean: typeof validateJSON;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    batchUpsertCatalogObjects: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      idempotencyKey: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      batches: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        required: true;
        clean: typeof validateJSON;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    retrieveCatalogObject: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      objectId: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includeRelatedObjects: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      catalogVersion: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteCatalogObject: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      objectId: {
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
    batchDeleteCatalogObjects: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      objectIds: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        required: true;
        clean: typeof validateJSON;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    batchChangeInventory: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      idempotencyKey: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      changes: {
        type: "code";
        label: string;
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (input: unknown) => Record<string, unknown>;
      };
      ignoreUnchangedCounts: {
        type: "boolean";
        label: string;
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    batchRetrieveInventoryCounts: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      catalogObjectIds: {
        type: "code";
        label: string;
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (input: unknown) => Record<string, unknown>;
      };
      locationIds: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: true;
        comments: string;
        clean: (locationIdsInput: unknown) => Record<string, unknown>;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      updatedAfter: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      states: {
        type: "code";
        label: string;
        language: "json";
        required: false;
        default: string;
        comments: string;
        clean: (input: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPayments: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      beginTime: {
        label: string;
        type: "text";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      endTime: {
        type: "string";
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      locationId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      sortOrder: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      total: {
        type: "string";
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      last4: {
        type: "string";
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      cardBrand: {
        type: "string";
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown;
      };
    }>;
    getPayment: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      paymentId: {
        type: "string";
        label: string;
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updatePayment: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      paymentId: {
        type: "string";
        label: string;
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      payment: {
        type: "code";
        label: string;
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (input: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createPayment: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      paymentData: {
        type: "code";
        label: string;
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (input: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    completePayment: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      paymentId: {
        type: "string";
        label: string;
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      versionToken: {
        type: "string";
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    cancelPayment: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      paymentId: {
        type: "string";
        label: string;
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    refundPayment: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      paymentId: {
        type: "string";
        label: string;
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      idempotencyKey: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      refundAmount: {
        type: "code";
        label: string;
        language: "json";
        required: true;
        example: string;
        comments: string;
        clean: (input: unknown) => Record<string, unknown>;
      };
      reason: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPaymentRefund: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      refundId: {
        type: "string";
        label: string;
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPaymentRefunds: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      beginTime: {
        label: string;
        type: "text";
        placeholder: string;
        example: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      endTime: {
        type: "string";
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      locationId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      sortOrder: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      status: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      sourceType: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown;
      };
    }>;
    listWebhookSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
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
          cursorSubscriptions: {
            type: "string";
            label: string;
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          limitSubscriptions: {
            type: "string";
            label: string;
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeDisabled: {
        type: "boolean";
        label: string;
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      sortOrderSubscriptions: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown;
      };
    }>;
    retrieveWebhookSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subscriptionId: {
        type: "string";
        label: string;
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createWebhookSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      idempotencyKey: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      webhookSubscription: {
        type: "code";
        label: string;
        language: "json";
        comments: string;
        example: string;
        clean: (input: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateWebhookSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subscriptionId: {
        type: "string";
        label: string;
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      updatedWebhookSubscription: {
        type: "code";
        label: string;
        language: "json";
        required: true;
        default: string;
        comments: string;
        clean: (input: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteWebhookSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      deleteSubscriptionId: {
        type: "string";
        label: string;
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteInstanceWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    createJob: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      jobTitle: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      idempotencyKey: {
        required: boolean;
        comments: string;
        type: "string";
        label: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      isTipEligible: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        example: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listJobs: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      cursor: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown;
      };
    }>;
    retrieveJob: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      jobId: {
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
    updateJob: import("@prismatic-io/spectral").ActionDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      jobId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      jobTitle: {
        required: boolean;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      isTipEligible: {
        required: boolean;
        comments: string;
        label: string;
        type: "boolean";
        example: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      version: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    squareWebhookTrigger: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      response: {
        statusCode: number;
        contentType: string;
      };
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      squareConnection: {
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
      payload: import("@prismatic-io/spectral").TriggerPayload;
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
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
        shown: true;
        comments: string;
        default: string;
        example: string;
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
        default: string;
        example: string;
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
        example: string;
        comments: string;
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
      apiVersion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        default: string;
        example: string;
      };
    };
  }, "oauth2">[];
  dataSources: {
    selectLocations: import("@prismatic-io/spectral").DataSourceDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectMerchants: import("@prismatic-io/spectral").DataSourceDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectBankAccounts: import("@prismatic-io/spectral").DataSourceDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      cursor: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      limit: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      location_id: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCatalog: import("@prismatic-io/spectral").DataSourceDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      cursor: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      types: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        default: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      catalogVersion: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCustomers: import("@prismatic-io/spectral").DataSourceDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      cursor: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      limit: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      sortField: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      sortOrder: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWebhookEventTypes: import("@prismatic-io/spectral").DataSourceDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectJob: import("@prismatic-io/spectral").DataSourceDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTeamMember: import("@prismatic-io/spectral").DataSourceDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectInvoice: import("@prismatic-io/spectral").DataSourceDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectOrder: import("@prismatic-io/spectral").DataSourceDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPayment: import("@prismatic-io/spectral").DataSourceDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectRefund: import("@prismatic-io/spectral").DataSourceDefinition<{
      squareConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWebhookSubscription: import("@prismatic-io/spectral").DataSourceDefinition<{
      squareConnection: {
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