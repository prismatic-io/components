//#region src/types/index.d.ts
interface ReportSuite {
  collectionItemType: string;
  id: string;
  rsid: string;
  name: string;
}
interface ReportSuiteMetric {
  id: string;
  title: string;
  name: string;
  type: string;
  category: string;
  support: string[];
  allocation: boolean;
  precision: number;
  calculated: boolean;
  segmentable: boolean;
  supportsDataGovernance: boolean;
  polarity: string;
  standardComponent: boolean;
}
interface ReportSuiteDimension {
  id: string;
  title: string;
  name: string;
  type: string;
  category: string;
  support: string[];
  pathable: boolean;
  segmentable: boolean;
  reportable: string[];
  supportsDataGovernance: boolean;
  description: string;
  multiValued: boolean;
  standardComponent: boolean;
}
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/triggers.d.ts
interface AdobeRecord {
  rsid?: string;
  globalCompanyId?: string;
  id?: string;
  [key: string]: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "adobe-analytics";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/adobe-analytics/";
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
  };
  actions: {
    listCompanies: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        globalCompanyId: string;
        companyName: string;
        apiRateLimitPolicy: string;
      }[];
    }>;
    listReportSuiteDimensions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      globalCompanyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      reportSuiteId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ReportSuiteDimension[];
    }>;
    listReportSuiteMetrics: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      globalCompanyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      reportSuiteId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ReportSuiteMetric[];
    }>;
    getReportSuite: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      globalCompanyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      reportSuiteId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ReportSuite;
    }>;
    listReportSuites: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      globalCompanyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ReportSuite[];
    }>;
    listVirtualReportSuites: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      globalCompanyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ReportSuite[];
    }>;
    runReport: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      globalCompanyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      reportSuiteId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dimension: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      reportRequestBody: {
        label: string;
        type: "code";
        required: true;
        comments: string;
        placeholder: string;
        language: "json";
        clean: (value: unknown) => object;
        default: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        imsUserId: string;
        imsOrgs: {
          imsOrgId: string;
          companies: {
            globalCompanyId: string;
            companyName: string;
            apiRateLimitPolicy: string;
          }[];
        }[];
      };
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
        required: true;
        type: "connection";
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: any;
        headers: any;
      };
    }>;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      globalCompanyId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: "Report Suites" | "Companies";
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: {
            created: AdobeRecord[];
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
    key: "adobeAnalyticsOauth";
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
        shown: true;
        default: string;
        comments: string;
      };
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
  }, "adobeAnalyticsOauth">[];
  dataSources: {
    selectReportSuite: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      globalCompanyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectVirtualReportSuite: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      globalCompanyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectReportSuiteMetric: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      globalCompanyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      reportSuiteId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectReportSuiteDimension: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
      globalCompanyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      reportSuiteId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCompany: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;