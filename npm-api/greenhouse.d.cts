//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/v3/index.d.ts
interface V3Application {
  id: number;
  candidate_id: number;
  job_id: number | null;
  job_post_id: number | null;
  referrer_id: number | null;
  source_id: number | null;
  recruiter_id: number | null;
  coordinator_id: number | null;
  stage_id: number | null;
  stage_name: string | null;
  status: "in_process" | "rejected" | "hired" | "converted";
  prospect: boolean;
  needs_decision: boolean;
  rejection_reason_id: number | null;
  created_at: string;
  updated_at: string;
  last_activity_at: string;
  custom_fields: Record<string, unknown> | null;
  answers: Array<{
    question: string;
    answer: string | null;
  }>;
  prospective_job_ids?: number[];
  [key: string]: unknown;
}
interface V3Candidate {
  id: number;
  first_name: string;
  last_name: string;
  company: string | null;
  title: string | null;
  created_at: string;
  updated_at: string;
  last_activity: string | null;
  is_private: boolean;
  email_addresses: Array<{
    value: string;
    type: string;
  }>;
  phone_numbers: Array<{
    value: string;
    type: string;
  }>;
  addresses: Array<{
    value: string;
    type: string;
  }>;
  website_addresses: Array<{
    value: string;
    type: string;
  }>;
  social_media_addresses: Array<{
    value: string;
  }>;
  tags: string[];
  custom_fields: Record<string, unknown> | null;
  [key: string]: unknown;
}
interface V3Attachment {
  id: number;
  application_id: number;
  candidate_id: number | null;
  type: string;
  filename: string;
  url: string;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}
interface V3Job {
  id: number;
  name: string;
  requisition_id: string | null;
  status: "open" | "closed" | "draft";
  confidential: boolean;
  is_template: boolean | null;
  copied_from_id: number | null;
  department_id: number | null;
  office_ids: number[];
  created_at: string;
  opened_at: string | null;
  closed_at: string | null;
  updated_at: string;
  notes: string | null;
  custom_fields: Record<string, unknown> | null;
  [key: string]: unknown;
}
interface V3User {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  primary_email: string | null;
  updated_at: string;
  created_at: string;
  deactivated: boolean;
  site_admin: boolean;
  emails: string[];
  employee_id: string | null;
  [key: string]: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "greenhouse";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/greenhouse/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    rawRequestV3: import("@prismatic-io/spectral").ActionDefinition<{
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listJobsV3: import("@prismatic-io/spectral").ActionDefinition<{
      idFilters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          ids: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          departmentId: {
            comments: string;
            dataSource: string;
            clean: (value: unknown) => number | undefined;
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
          };
          officeId: {
            comments: string;
            dataSource: string;
            clean: (value: unknown) => number | undefined;
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      requisitionId: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      status: {
        comments: string;
        example: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      confidential: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown) => boolean | undefined;
      };
      dateRangeFilters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          createdAtGte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          createdAtLte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          updatedAtGte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          updatedAtLte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
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
          perPage: {
            comments: string;
            clean: (value: unknown) => number | undefined;
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
          };
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
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
      data: V3Job[];
    }>;
    getJobV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      jobId: {
        required: boolean;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown> | null;
    }>;
    createJobV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      templateJobId: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      numberOfOpenings: {
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
      };
      jobName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      jobPostName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      notes: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      requisitionId: {
        comments: string;
        example: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      departmentId: {
        comments: string;
        dataSource: string;
        clean: (value: unknown) => number | undefined;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
      };
      externalDepartmentId: {
        comments: string;
        example: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      officeIds: {
        comments: string;
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => number[] | undefined;
      };
      externalOfficeIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
      openingIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
      customFields: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    editJobV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      jobId: {
        required: boolean;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        placeholder: string;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      notes: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      requisitionId: {
        comments: string;
        example: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      teamAndResponsibilities: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      howToSellThisJob: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      anywhere: {
        comments: string;
        clean: (value: unknown) => boolean | undefined;
        label: string;
        type: "boolean";
        required: false;
      };
      officeIds: {
        comments: string;
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => number[] | undefined;
      };
      externalOfficeIds: {
        comments: string;
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
      departmentId: {
        comments: string;
        dataSource: string;
        clean: (value: unknown) => number | undefined;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
      };
      externalDepartmentId: {
        comments: string;
        example: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      customFields: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAttachmentsV3: import("@prismatic-io/spectral").ActionDefinition<{
      idFilters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          attachmentIds: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          applicationIds: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          candidateIds: {
            comments: string;
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      attachmentTypeFilter: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      dateRangeFilters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          createdAtGte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          createdAtLte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          updatedAtGte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          updatedAtLte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
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
          perPage: {
            comments: string;
            clean: (value: unknown) => number | undefined;
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
          };
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
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
      data: V3Attachment[];
    }>;
    createAttachmentV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      applicationId: {
        required: boolean;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
        label: string;
        type: "string";
        placeholder: string;
      };
      filename: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attachmentType: {
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
      fileContent: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      fileUrl: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      visibility: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAttachmentV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      attachmentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
      };
    }>;
    listApplicationsV3: import("@prismatic-io/spectral").ActionDefinition<{
      idFilters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          ids: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          candidateIds: {
            comments: string;
            example: string;
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          jobIds: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          prospectiveJobIds: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          jobPostIds: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          sourceIds: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          referrerIds: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          stageIds: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      status: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      stageName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      prospect: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown) => boolean | undefined;
      };
      dateRangeFilters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          createdAtGte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          createdAtLte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          updatedAtGte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          updatedAtLte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          lastActivityAtGte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          lastActivityAtLte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
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
          perPage: {
            comments: string;
            clean: (value: unknown) => number | undefined;
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
          };
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
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
      data: V3Application[];
    }>;
    getApplicationV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      applicationId: {
        required: boolean;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: V3Application;
    }>;
    editApplicationV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      applicationId: {
        required: boolean;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
      };
      assignmentIds: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          sourceId: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          referrerId: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          recruiterId: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          coordinatorId: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          prospectPoolId: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          prospectStageId: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      rejectedAt: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      customFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteApplicationV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      applicationId: {
        required: boolean;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    rejectApplicationV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      applicationId: {
        required: boolean;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
      };
      rejectionReasonId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      rejectionNotes: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      rejectionEmail: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          sendEmailAt: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          emailTemplateId: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          emailFromUserId: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      customFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
      };
    }>;
    unrejectApplicationV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      applicationId: {
        required: boolean;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
      };
    }>;
    listCandidatesV3: import("@prismatic-io/spectral").ActionDefinition<{
      candidateIds: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
        example: string;
      };
      email: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      tag: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      isPrivate: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => boolean | undefined;
      };
      dateRangeFilters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          createdAtGte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          createdAtLte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          updatedAtGte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          updatedAtLte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
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
          perPage: {
            comments: string;
            clean: (value: unknown) => number | undefined;
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
          };
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
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
      data: V3Candidate[];
    }>;
    getCandidateV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      candidateId: {
        required: boolean;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: V3Candidate;
    }>;
    createCandidateV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      firstName: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      preferredName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      title: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      timeZone: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      canEmail: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown) => boolean | undefined;
      };
      contactInformation: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          phoneNumbers: {
            label: string;
            type: "code";
            required: false;
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
          };
          addresses: {
            label: string;
            type: "code";
            required: false;
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
          };
          emailAddresses: {
            label: string;
            type: "code";
            required: false;
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
          };
          websiteAddresses: {
            label: string;
            type: "code";
            required: false;
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
          };
          socialMediaAddresses: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => any;
          };
        };
      } & {
        type: "structuredObject";
      };
      tags: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        default: string[];
        clean: (value: unknown) => any[];
      };
      linkedUserIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number[] | undefined;
      };
      customFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      application: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    editCandidateV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      candidateId: {
        required: boolean;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
      };
      nameInformation: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          firstNameOptional: {
            required: boolean;
            comments: string;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
          };
          lastNameOptional: {
            required: boolean;
            comments: string;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
          };
          preferredName: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      contactInformation: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          phoneNumbers: {
            label: string;
            type: "code";
            required: false;
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
          };
          addresses: {
            label: string;
            type: "code";
            required: false;
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
          };
          emailAddresses: {
            label: string;
            type: "code";
            required: false;
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
          };
          websiteAddresses: {
            label: string;
            type: "code";
            required: false;
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
          };
          socialMediaAddresses: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => any;
          };
        };
      } & {
        type: "structuredObject";
      };
      company: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      title: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      timeZone: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      canEmail: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown) => boolean | undefined;
      };
      isPrivateCandidate: {
        type: "boolean";
        label: string;
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      tags: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        default: string[];
        clean: (value: unknown) => any[];
      };
      linkedUserIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number[] | undefined;
      };
      customFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteCandidateV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      candidateId: {
        required: boolean;
        dataSource: string;
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
    listUsersV3: import("@prismatic-io/spectral").ActionDefinition<{
      idFilters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          ids: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          officeIds: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          departmentIds: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      deactivated: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown) => boolean | undefined;
      };
      primaryEmail: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      showServiceAccounts: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      dateRangeFilters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          createdAtGte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          createdAtLte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          updatedAtGte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          updatedAtLte: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
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
          perPage: {
            comments: string;
            clean: (value: unknown) => number | undefined;
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
          };
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
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
      data: V3User[];
    }>;
    getUserV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: V3User;
    }>;
    createUserV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      firstName: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      primaryEmailRequired: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sendEmailInvite: {
        required: boolean;
        default: string;
        comments: string;
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      jobTitle: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      employeeId: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      officeIdsWrite: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
      externalOfficeIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
      departmentIdsWrite: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
      externalDepartmentIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
      interviewerTagIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
      customFields: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    editUserV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      firstNameOptional: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
      };
      lastNameOptional: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
      };
      primaryEmailOptional: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      jobTitle: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      employeeId: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      officeIdsWrite: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
      externalOfficeIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
      departmentIdsWrite: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
      externalDepartmentIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
      interviewerTagIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
      customFields: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    activateUserV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
      };
    }>;
    deactivateUserV3: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
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
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
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
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      user_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      template_job_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      number_of_openings: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      job_post_name: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      job_name: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      department_id: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      external_department_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      office_ids: {
        comments: string;
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        placeholder: string;
        example: string;
        default: string[];
        clean: (value: unknown) => any[];
        dataSource: string;
      };
      external_office_ids: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        default: string[];
        clean: (value: unknown) => any[];
      };
      requisition_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      opening_ids: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        default: string[];
        clean: (value: unknown) => any[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    editJob: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      job_id: {
        required: true;
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
      };
      user_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      name: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      notes: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      anywhere: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      requisition_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      team_and_responsibilities: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      how_to_sell_this_job: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      office_ids: {
        comments: string;
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        placeholder: string;
        example: string;
        default: string[];
        clean: (value: unknown) => any[];
        dataSource: string;
      };
      external_office_ids: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        default: string[];
        clean: (value: unknown) => any[];
      };
      department_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      external_department_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      custom_fields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => any;
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
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          per_page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      created_before: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      created_after: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      updated_before: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        example: string;
      };
      updated_after: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        example: string;
      };
      requisition_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      opening_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      status: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      department_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      external_department_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      office_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      external_office_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      custom_fields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => any;
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
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      job_id: {
        required: true;
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteApplication: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      application_id: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
      };
      user_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    editApplication: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      application_id: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
      };
      user_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      source_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      referrer: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      custom_fields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      prospect_pool_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      prospect_stage_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getApplication: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      application_id: {
        required: true;
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listApplications: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
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
          per_page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      job_id: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
      };
      created_before: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      created_after: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      status: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      last_activity_after: {
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
    listCandidates: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
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
          per_page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      email: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      job_id: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
      };
      created_before: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      created_after: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      updated_before: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        example: string;
      };
      updated_after: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        example: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      candidate_ids: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCandidate: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      candidate_id: {
        required: true;
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createCandidate: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      user_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      first_name: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      last_name: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      applications: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      company: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      title: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      phone_numbers: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      addresses: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      email_addresses: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      website_addresses: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      social_media_addresses: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      educations: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      employments: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      tags: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        default: string[];
        clean: (value: unknown) => any[];
      };
      custom_fields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteCandidate: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      user_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      candidate_id: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    editCandidate: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      user_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      candidate_id: {
        required: true;
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
      };
      first_name: {
        comments: string;
        required: false;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      last_name: {
        comments: string;
        required: false;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      company: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      title: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      is_private: {
        type: "boolean";
        label: string;
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      phone_numbers: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      addresses: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      email_addresses: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      website_addresses: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      social_media_addresses: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      tags: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        default: string[];
        clean: (value: unknown) => any[];
      };
      custom_fields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
      recruiter: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => any;
      };
      coordinator: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          per_page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          page: {
            label: string;
            type: "string";
            required: false;
            default: string;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      employee_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      created_before: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      created_after: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      updated_after: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        example: string;
      };
      updated_before: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        placeholder: string;
        example: string;
      };
      email: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      user_attributes: {
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
    getUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      user_id: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      user_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      first_name: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      last_name: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      email: {
        required: true;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      send_email_invite: {
        label: string;
        type: "boolean";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      employee_id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      office_ids: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        default: string[];
        clean: (value: unknown) => any[];
        dataSource: string;
      };
      external_office_ids: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        default: string[];
        clean: (value: unknown) => any[];
      };
      department_ids: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        default: string[];
        clean: (value: unknown) => any[];
        dataSource: string;
      };
      external_department_ids: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        default: string[];
        clean: (value: unknown) => any[];
      };
      custom_fields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    editUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        default: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      user_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      first_name: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      last_name: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      email: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      employee_id: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      office_ids: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        default: string[];
        clean: (value: unknown) => any[];
        dataSource: string;
      };
      external_office_ids: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        default: string[];
        clean: (value: unknown) => any[];
      };
      department_ids: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        default: string[];
        clean: (value: unknown) => any[];
        dataSource: string;
      };
      external_department_ids: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        example: string;
        default: string[];
        clean: (value: unknown) => any[];
      };
      custom_fields: {
        required: false;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    disableUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        default: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      user_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      email: {
        required: true;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    enableUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        default: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      user_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      email: {
        required: true;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{
      enabledEvents: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
      };
      secret_key: {
        label: string;
        type: "password";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      response: {
        statusCode: number;
        contentType: string;
        body: string;
      };
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
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
      polledNoChanges: boolean | undefined;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTriggerV3: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
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
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth2ClientCredentials";
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
        shown: false;
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
        example: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "oauth2ClientCredentials"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiToken";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      username: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        comments: string;
        example: string;
      };
    };
  }, "apiToken">)[];
  dataSources: {
    applications: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    users: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    offices: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    jobs: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    departments: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    customFields: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
      fieldType: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    candidates: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      version: {
        label: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown) => string;
        comments: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    applicationsV3: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    candidatesV3: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    customFieldsV3: import("@prismatic-io/spectral").DataSourceDefinition<{
      fieldType: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    departmentsV3: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    jobsV3: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    officesV3: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    rejectionReasonsV3: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    usersV3: import("@prismatic-io/spectral").DataSourceDefinition<{
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