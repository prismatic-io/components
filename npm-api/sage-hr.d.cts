//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types.d.ts
interface SageHRRecord {
  id: number | string;
  [key: string]: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "sage-hr";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/sage-hr/";
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
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    timeClockingInAndOut: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      override: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        example: string;
      };
      clocked_time: {
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
    createTimeOffRequests: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      type: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        example: string;
      };
      time_off_policy_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        required: false;
        example: string;
      };
      employee_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        dataSource: string;
      };
      replacement_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        required: false;
        example: string;
      };
      date: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        required: false;
        example: string;
      };
      date_from: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        required: false;
        example: string;
      };
      date_to: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        required: false;
        example: string;
      };
      part_of_day: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        example: string;
      };
      hours: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        required: false;
        example: string;
      };
      time_from: {
        comments: string;
        example: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        required: false;
      };
      time_to: {
        comments: string;
        example: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        required: false;
      };
      details: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTimeOffBalances: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      employee_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTimeOffRequests: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      from: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      to: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      page: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProjects: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      projects: {
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
    updateProjects: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      projects: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        clean: (value: unknown) => any;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    closeProject: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      project_id: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProject: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      code: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      start_date: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      end_date: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      limit_total_hours: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        example: string;
      };
      max_limit_total_hours: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProjects: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProject: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        dataSource: string;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      code: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      start_date: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      end_date: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      limit_total_hours: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        example: string;
      };
      max_limit_total_hours: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createEmployee: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      email: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
      };
      first_name: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
      };
      last_name: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
      };
      work_start_date: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      send_email: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        example: string;
      };
      date_of_birth: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      gender: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        example: string;
      };
      marital_status: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        example: string;
      };
      nationality: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      country: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      state: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      post_code: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      street_first: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      street_second: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      city: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      position_title: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      home_phone: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      work_phone: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      mobile_phone: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      personal_identification_number: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      tax_number: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getEmployee: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      employee_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        dataSource: string;
      };
      team_history: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        example: string;
      };
      employment_status_history: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        example: string;
      };
      position_history: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getEmployeeCompensations: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      employee_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getEmployeeCustomFields: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      employee_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTerminatedEmployee: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      employee_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listEmployees: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      team_history: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        example: string;
      };
      employment_status_history: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        example: string;
      };
      position_history: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        example: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      page: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTerminatedEmployees: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      team_history: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        example: string;
      };
      employment_status_history: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        example: string;
      };
      position_history: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        example: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      page: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    rehireEmployee: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      employee_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        dataSource: string;
      };
      date: {
        label: string;
        comments: string;
        required: true;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      comments: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      start_fresh: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    terminateEmployee: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      employee_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        dataSource: string;
      };
      date: {
        required: true;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      termination_reason_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        required: true;
        example: string;
      };
      comments: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
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
      employee_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        dataSource: string;
      };
      first_name: {
        required: false;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      last_name: {
        required: false;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      work_start_date: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      location_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      team_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
        dataSource: string;
      };
      leader_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
        dataSource: string;
      };
      date_of_birth: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      gender: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        example: string;
      };
      marital_status: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        example: string;
      };
      nationality: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      country: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      state: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      post_code: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      street_first: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      street_second: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      city: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      position_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
        dataSource: string;
      };
      employee_number: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      home_phone: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      work_phone: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      mobile_phone: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      personal_identification_number: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      tax_number: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      approver_ids: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        default: string[];
        clean: (value: unknown) => string[];
      };
      selected_leave_types: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        default: string[];
        clean: (value: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateEmployeeCustomField: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      employee_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        dataSource: string;
      };
      custom_field_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
      };
      value: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createDocument: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      fileInput: {
        label: string;
        type: "data";
        required: true;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
        comments: string;
        example: string;
      };
      file_name: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      employee_id: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        default: string[];
        clean: (value: unknown) => string[];
        example: string;
      };
      category_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      description: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      notify: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      source: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        default: string;
      };
      shared_with_everyone: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      shared_with_team_manager: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      shared_with_direct_manager: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      status: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        example: string;
      };
      right_to_work_document_type: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        example: string;
      };
      right_to_work_document_number: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      expires: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      expiration_date: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateDocument: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      document_id: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
        example: string;
        dataSource: string;
      };
      fileInput: {
        label: string;
        type: "data";
        required: true;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
        comments: string;
        example: string;
      };
      file_name: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      employee_id: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        default: string[];
        clean: (value: unknown) => string[];
        example: string;
      };
      category_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      description: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      notify: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      source: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        default: string;
      };
      shared_with_everyone: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      shared_with_team_manager: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      shared_with_direct_manager: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      status: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        example: string;
      };
      right_to_work_document_type: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        example: string;
      };
      right_to_work_document_number: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      expires: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
      expiration_date: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDocument: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      document_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: true;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDocuments: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      category_id: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
      employee_id: {
        comments: string;
        required: false;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteDocument: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      document_id: {
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPositions: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      page: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTeams: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      page: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
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
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      showNewRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: {
            created: SageHRRecord[];
            updated: any[];
          };
        };
        contentType: string;
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
        paginationState?: Record<string, unknown>;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      apiKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        comments: string;
      };
      subdomain: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
      };
    };
  }, "apiKey">[];
  dataSources: {
    positions: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      page: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        required: false;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    projects: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDocument: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectEmployee: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    teams: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      page: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
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