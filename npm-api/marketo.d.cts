//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  documentationUrl: "https://prismatic.io/docs/components/marketo/";
  key: "marketo";
  public: true;
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
  };
  actions: {
    describeSalesPerson: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    getSalesPersonsByFilter: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      filterType: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        comments: string;
      };
      filterValues: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        clean: (values: unknown) => string;
        comments: string;
      };
      fields: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        clean: (values: unknown) => string;
        comments: string;
      };
      batchSize: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number;
        comments: string;
      };
      nextPageToken: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    syncSalesPersons: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      action: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      salesPersons: {
        label: string;
        type: "data";
        required: true;
        clean: (value: unknown) => object;
        comments: string;
      };
      dedupeBy: {
        label: string;
        type: "string";
        required: false;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    deleteSalesPersons: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      deleteBy: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ids: {
        label: string;
        type: "data";
        required: true;
        clean: (value: unknown) => object;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    describeOpportunities: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    getOpportunitiesByFilter: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      filterType: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        comments: string;
      };
      filterValues: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        clean: (values: unknown) => string;
        comments: string;
      };
      fields: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        clean: (values: unknown) => string;
        comments: string;
      };
      batchSize: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number;
        comments: string;
      };
      nextPageToken: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    syncOpportunities: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      action: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      opportunities: {
        label: string;
        type: "data";
        required: true;
        clean: (value: unknown) => object;
        comments: string;
      };
      dedupeBy: {
        label: string;
        type: "string";
        required: false;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    deleteOpportunities: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      deleteBy: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ids: {
        label: string;
        type: "data";
        required: true;
        clean: (value: unknown) => object;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    describeNamedAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    getNamedAccountsByFilter: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      filterType: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        comments: string;
      };
      filterValues: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        clean: (values: unknown) => string;
        comments: string;
      };
      fields: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        clean: (values: unknown) => string;
        comments: string;
      };
      batchSize: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number;
        comments: string;
      };
      nextPageToken: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    syncNamedAccounts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      action: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      namedAccounts: {
        label: string;
        type: "data";
        required: true;
        clean: (value: unknown) => object;
        comments: string;
      };
      dedupeBy: {
        label: string;
        type: "string";
        required: false;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    deleteNamedAccounts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      deleteBy: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ids: {
        label: string;
        type: "data";
        required: true;
        clean: (value: unknown) => object;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    describeLead: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        requestId: string;
        success: boolean;
        result: {
          id: number;
          displayName: string;
          dataType: string;
          length: number;
          rest: {
            name: string;
            readOnly: boolean;
          };
          soap: {
            name: string;
            readOnly: boolean;
          };
        }[];
      };
    }>;
    getSearchableLeadFields: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    getLeadById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      leadId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        comments: string;
        dataSource: string;
      };
      fields: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        clean: (values: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    getLeadsByFilter: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      filterType: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        comments: string;
      };
      filterValues: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        clean: (values: unknown) => string;
        comments: string;
      };
      fields: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        clean: (values: unknown) => string;
        comments: string;
      };
      batchSize: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number;
        comments: string;
      };
      nextPageToken: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    syncLeads: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      action: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      asyncProcessing: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown) => boolean;
        comments: string;
      };
      leads: {
        label: string;
        type: "data";
        required: true;
        clean: (value: unknown) => object;
        comments: string;
      };
      lookupField: {
        label: string;
        type: "string";
        required: false;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
      };
      partitionName: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    deleteLeads: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      ids: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        clean: (values: unknown) => string[];
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    listCustomObjects: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    describeCustomObject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      customObjectName: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    getCustomObjectsByFilter: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      customObjectName: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        comments: string;
        dataSource: string;
      };
      filterType: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        comments: string;
      };
      filterValues: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        clean: (values: unknown) => string;
        comments: string;
      };
      fields: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        clean: (values: unknown) => string;
        comments: string;
      };
      batchSize: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number;
        comments: string;
      };
      nextPageToken: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    syncCustomObjects: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      customObjectName: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        comments: string;
        dataSource: string;
      };
      action: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      customObjects: {
        label: string;
        type: "data";
        required: true;
        clean: (value: unknown) => object;
        comments: string;
      };
      dedupeBy: {
        label: string;
        type: "string";
        required: false;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    deleteCustomObjects: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      customObjectName: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        comments: string;
        dataSource: string;
      };
      deleteBy: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ids: {
        label: string;
        type: "data";
        required: true;
        clean: (value: unknown) => object;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    describeCompany: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    getCompaniesByFilter: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      filterType: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        comments: string;
      };
      filterValues: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        clean: (values: unknown) => string;
        comments: string;
      };
      fields: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        clean: (values: unknown) => string;
        comments: string;
      };
      batchSize: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number;
        comments: string;
      };
      nextPageToken: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        requestId: string;
        success: boolean;
        result: {
          seq: number;
          id: number;
          externalCompanyId: string;
          company: string;
        }[];
      };
    }>;
    syncCompanies: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      action: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      companies: {
        label: string;
        type: "data";
        required: true;
        clean: (value: unknown) => object;
        comments: string;
      };
      dedupeBy: {
        label: string;
        type: "string";
        required: false;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    deleteCompanies: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      deleteBy: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ids: {
        label: string;
        type: "data";
        required: true;
        clean: (value: unknown) => object;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
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
  dataSources: {
    selectCompany: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      filterType: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        comments: string;
      };
      filterValues: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        clean: (values: unknown) => string;
        comments: string;
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCustomObject: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectLead: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth2";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.ClientCredentials;
    inputs: {
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
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
  }, "oauth2">[];
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;