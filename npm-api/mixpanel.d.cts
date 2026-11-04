//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "mixpanel";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/mixpanel/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    createProfile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      properties: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      verbose: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
      redirect: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
      region: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProfile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      deleteProfiles: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      verbose: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
      redirect: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
      region: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateMultipleProfiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      propertiesToUpdate: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      verbose: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
      redirect: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
      region: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    queryProfiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      regionAndDomain: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      project_id: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
      };
      workspace_id: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
      distinct_ids: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        default: string[];
        clean: (value: unknown) => string[];
        example: string;
      };
      where: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        required: false;
        example: string;
      };
      output_properties: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        default: string[];
        clean: (value: unknown) => string[];
        example: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          session_id: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
          page: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      cohortFilters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          behaviors: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
          filter_by_cohort: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
          include_all_users: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
            example: string;
            default: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      as_of_timestamp: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createGCSPipeline: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      dataAndDomain: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      gcs_bucket: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        example: string;
      };
      gcs_prefix: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
      gcs_region: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      project_id: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        required: false;
        example: string;
      };
      from_date: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        required: true;
        example: string;
      };
      to_date: {
        comments: string;
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
      };
      trial: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        default: string;
      };
      frequency: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        default: string;
      };
      events: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        default: string[];
        clean: (value: unknown) => string[];
        example: string;
      };
      where: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        required: false;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createGenericPipeline: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        default: string;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
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
      dataAndDomain: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deletePipeline: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      useProjectToken: {
        default: string;
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      dataAndDomain: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      name: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        dataSource: string;
        example: string;
      };
      project_id: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    editGCSPipeline: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      dataAndDomain: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      name: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        dataSource: string;
        example: string;
      };
      project_id: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        required: false;
        example: string;
      };
      events: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        default: string[];
        clean: (value: unknown) => string[];
        example: string;
      };
      where: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        required: false;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    editGenericPipeline: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        default: string;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
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
      dataAndDomain: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      name: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        dataSource: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPipeline: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      dataAndDomain: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      project_id: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
      };
      name: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        dataSource: string;
        example: string;
      };
      summary: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        example: string;
        default: string;
      };
      status: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        default: string[];
        clean: (value: unknown) => string[];
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPipelines: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      dataAndDomain: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      project_id: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    customJQLQuery: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      regionAndDomain: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      script: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        example: string;
      };
      params: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      project_id: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
      workspace_id: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
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
      baseUrl: {
        label: string;
        comments: string;
        example: string;
        required: boolean;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    queryInsightsSavedReports: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      regionAndDomain: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      bookmark_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        example: string;
      };
      project_id: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
      workspace_id: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createIdentity: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      region: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      identified_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        example: string;
      };
      anon_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        example: string;
      };
      project_token: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        example: string;
      };
      deliveryOptions: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          strict: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
          verbose: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
          redirect: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createAlias: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      region: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      distinct_id: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
      };
      project_token: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        example: string;
      };
      alias: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        example: string;
      };
      deliveryOptions: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          strict: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
          verbose: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
          redirect: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSavedFunnels: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      useProjectToken: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
        comments: string;
      };
      regionAndDomain: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      project_id: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
      };
      workspace_id: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    queryFunnelSavedReports: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      useProjectToken: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
        comments: string;
      };
      regionAndDomain: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      funnel_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        dataSource: string;
        required: true;
        example: string;
      };
      from_date: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        example: string;
      };
      to_date: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        example: string;
      };
      project_id: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
      workspace_id: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
      length: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        example: string;
      };
      length_unit: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        example: string;
      };
      interval: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
      unit: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        example: string;
      };
      segmentation: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          on: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
          where: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    importEvents: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      useProjectToken: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
        comments: string;
      };
      region: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      events: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      project_id: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    trackEvents: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      useProjectToken: {
        default: string;
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
      };
      region: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      deliveryOptions: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          ip: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
          verbose: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
          redirect: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
          img: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      events: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    downloadData: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      dataAndDomain: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      from_date: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        example: string;
      };
      to_date: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: true;
        example: string;
      };
      project_id: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
      filters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
          event: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            placeholder: string;
            required: false;
            example: string;
          };
          where: {
            comments: string;
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            required: false;
            example: string;
          };
          gzipEncoding: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiToken";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      username: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      password: {
        label: string;
        placeholder: string;
        type: "password";
        required: false;
        comments: string;
        example: string;
      };
      projectToken: {
        label: string;
        placeholder: string;
        type: "password";
        required: false;
        comments: string;
        example: string;
      };
    };
  }, "apiToken">[];
  dataSources: {
    pipelines: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      dataAndDomain: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      project_id: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    funnels: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      regionAndDomain: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      project_id: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
      };
      workspace_id: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        required: false;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;