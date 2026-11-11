//#region node_modules/axios/index.d.ts
type AxiosHeaderValue = AxiosHeaders | string | string[] | number | boolean | null;
type AxiosHeaderParameters = Record<string, string>;
interface RawAxiosHeaders {
  [key: string]: AxiosHeaderValue;
}
type AxiosHeaderMatcher = string | RegExp | ((this: AxiosHeaders, value: string, name: string) => boolean);
type AxiosHeaderParser = (this: AxiosHeaders, value: AxiosHeaderValue, header: string) => any;
declare class AxiosHeaders {
  constructor(headers?: RawAxiosHeaders | AxiosHeaders | string);
  [key: string]: any;
  set(headerName?: string, value?: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
  set(headers?: RawAxiosHeaders | AxiosHeaders | string, rewrite?: boolean): AxiosHeaders;
  set(headers?: Iterable<[string, AxiosHeaderValue]>, rewrite?: boolean): AxiosHeaders;
  get(headerName: string, parser: typeof AxiosHeaders.parseParameters): AxiosHeaderParameters;
  get(headerName: string, parser: RegExp): RegExpExecArray | null;
  get(headerName: string, matcher?: true | AxiosHeaderParser): AxiosHeaderValue;
  has(header: string, matcher?: AxiosHeaderMatcher): boolean;
  delete(header: string | string[], matcher?: AxiosHeaderMatcher): boolean;
  clear(matcher?: AxiosHeaderMatcher): boolean;
  normalize(format: boolean): AxiosHeaders;
  concat(...targets: Array<AxiosHeaders | RawAxiosHeaders | string | undefined | null>): AxiosHeaders;
  toJSON(asStrings: true): Record<string, string>;
  toJSON(asStrings?: false): Record<string, string | string[]>;
  toJSON(asStrings?: boolean): Record<string, string | string[]>;
  static from(thing?: AxiosHeaders | RawAxiosHeaders | string): AxiosHeaders;
  static parseParameters(value: AxiosHeaderValue): AxiosHeaderParameters;
  static accessor(header: string | string[]): AxiosHeaders;
  static concat(...targets: Array<AxiosHeaders | RawAxiosHeaders | string | undefined | null>): AxiosHeaders;
  setContentType(value: ContentType, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
  getContentType(parser?: RegExp): RegExpExecArray | null;
  getContentType(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
  hasContentType(matcher?: AxiosHeaderMatcher): boolean;
  setContentLength(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
  getContentLength(parser?: RegExp): RegExpExecArray | null;
  getContentLength(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
  hasContentLength(matcher?: AxiosHeaderMatcher): boolean;
  setAccept(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
  getAccept(parser?: RegExp): RegExpExecArray | null;
  getAccept(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
  hasAccept(matcher?: AxiosHeaderMatcher): boolean;
  setUserAgent(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
  getUserAgent(parser?: RegExp): RegExpExecArray | null;
  getUserAgent(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
  hasUserAgent(matcher?: AxiosHeaderMatcher): boolean;
  setContentEncoding(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
  getContentEncoding(parser?: RegExp): RegExpExecArray | null;
  getContentEncoding(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
  hasContentEncoding(matcher?: AxiosHeaderMatcher): boolean;
  setAuthorization(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
  getAuthorization(parser?: RegExp): RegExpExecArray | null;
  getAuthorization(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
  hasAuthorization(matcher?: AxiosHeaderMatcher): boolean;
  getSetCookie(): string[];
  toString(): string;
  [Symbol.iterator](): IterableIterator<[string, AxiosHeaderValue]>;
}
type ContentType = AxiosHeaderValue | 'text/html' | 'text/plain' | 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded' | 'application/octet-stream';
type CommonResponseHeadersList = 'Server' | 'Content-Type' | 'Content-Length' | 'Cache-Control' | 'Content-Encoding';
type CommonResponseHeaderKey = CommonResponseHeadersList | Lowercase<CommonResponseHeadersList>;
type RawCommonResponseHeaders = { [Key in CommonResponseHeaderKey]: AxiosHeaderValue } & {
  'set-cookie': string[];
};
type RawAxiosResponseHeaders = Partial<RawAxiosHeaders & RawCommonResponseHeaders>;
type AxiosResponseHeaders = RawAxiosResponseHeaders & AxiosHeaders;
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/util.d.ts
interface CursorEventItem {
  uuid: string;
  [key: string]: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "gusto";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/gusto/";
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
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
        required: true;
        type: "connection";
      };
      apiVersion: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: any;
        headers: AxiosResponseHeaders | Partial<RawAxiosHeaders & {
          "Content-Length": AxiosHeaderValue;
          "Content-Encoding": AxiosHeaderValue;
          "Content-Type": AxiosHeaderValue;
          Server: AxiosHeaderValue;
          "Cache-Control": AxiosHeaderValue;
          "content-length": AxiosHeaderValue;
          "content-encoding": AxiosHeaderValue;
          "content-type": AxiosHeaderValue;
          server: AxiosHeaderValue;
          "cache-control": AxiosHeaderValue;
        } & {
          'set-cookie': string[];
        }>;
      };
    }>;
    listWebhookSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          uuid: string;
          url: string;
          status: string;
          subscription_types: string[];
        }[];
        headers: {};
      };
    }>;
    getWebhookSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
      webhookSubscriptionUuid: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          uuid: string;
          url: string;
          status: string;
          subscription_types: string[];
        };
        headers: {};
      };
    }>;
    createWebhookSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
      webhookUrl: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionTypes: {
        label: string;
        required: true;
        type: "text";
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          uuid: string;
          url: string;
          status: string;
          subscription_types: string[];
        };
        headers: {};
      };
    }>;
    updateWebhookSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
      webhookSubscriptionUuid: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subscriptionTypes: {
        label: string;
        required: true;
        type: "text";
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          uuid: string;
          url: string;
          status: string;
          subscription_types: string[];
        };
        headers: {};
      };
    }>;
    deleteWebhookSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
      webhookSubscriptionUuid: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    getWebhookEvents: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
      resourceUuid: {
        label: string;
        required: false;
        type: "string";
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      eventType: {
        label: string;
        required: false;
        type: "string";
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      sortOrder: {
        label: string;
        required: false;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      startingAfterUuid: {
        label: string;
        required: false;
        type: "string";
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      limit: {
        label: string;
        required: false;
        type: "string";
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: CursorEventItem[];
        headers: {};
      };
    } | {
      data: {
        data: any;
        headers: AxiosResponseHeaders | Partial<RawAxiosHeaders & {
          "Content-Length": AxiosHeaderValue;
          "Content-Encoding": AxiosHeaderValue;
          "Content-Type": AxiosHeaderValue;
          Server: AxiosHeaderValue;
          "Cache-Control": AxiosHeaderValue;
          "content-length": AxiosHeaderValue;
          "content-encoding": AxiosHeaderValue;
          "content-type": AxiosHeaderValue;
          server: AxiosHeaderValue;
          "cache-control": AxiosHeaderValue;
        } & {
          'set-cookie': string[];
        }>;
      };
    }>;
    terminateEmployee: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
      employeeId: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      terminationDate: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      runTerminationPayroll: {
        label: string;
        required: true;
        type: "boolean";
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          uuid: string;
          employee_uuid: string;
          active: boolean;
          effective_date: string;
          run_termination_payroll: boolean;
        };
        headers: {};
      };
    }>;
    getPaySchedule: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
      companyId: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      payScheduleId: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          uuid: string;
          version: string;
          frequency: string;
          anchor_pay_date: string;
          anchor_end_of_pay_period: string;
          day_1: number;
          day_2: null;
          name: null;
          custom_name: string;
          auto_pilot: boolean;
          active: boolean;
          auto_payroll_enablement_blockers: null;
        }[];
        headers: {};
      };
    }>;
    listPaySchedules: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
      companyId: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
        required: false;
        type: "string";
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: unknown[];
        headers: {};
      };
    } | {
      data: {
        data: any;
        headers: AxiosResponseHeaders | Partial<RawAxiosHeaders & {
          "Content-Length": AxiosHeaderValue;
          "Content-Encoding": AxiosHeaderValue;
          "Content-Type": AxiosHeaderValue;
          Server: AxiosHeaderValue;
          "Cache-Control": AxiosHeaderValue;
          "content-length": AxiosHeaderValue;
          "content-encoding": AxiosHeaderValue;
          "content-type": AxiosHeaderValue;
          server: AxiosHeaderValue;
          "cache-control": AxiosHeaderValue;
        } & {
          'set-cookie': string[];
        }>;
      };
    }>;
    createEmployee: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
      companyId: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firstName: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      middleInitial: {
        label: string;
        required: false;
        type: "string";
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      lastName: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dateOfBirth: {
        label: string;
        required: false;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      email: {
        comments: string;
        label: string;
        required: false;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      ssn: {
        label: string;
        required: false;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      selfOnboarding: {
        label: string;
        required: false;
        type: "boolean";
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      additionalFields: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          uuid: string;
          first_name: string;
          middle_initial: null;
          last_name: string;
          email: string;
          company_uuid: string;
          manager_uuid: null;
          version: string;
          current_employment_status: string;
          onboarding_status: string;
          preferred_first_name: null;
          department_uuid: null;
          employee_code: string;
          payment_method: string;
          department: null;
          terminated: boolean;
          two_percent_shareholder: boolean;
          onboarded: boolean;
          historical: boolean;
          has_ssn: boolean;
          onboarding_documents_config: {
            uuid: null;
            i9_document: boolean;
          };
          jobs: {
            uuid: string;
            version: string;
            employee_uuid: string;
            current_compensation_uuid: string;
            payment_unit: string;
            primary: boolean;
            two_percent_shareholder: boolean;
            state_wc_covered: null;
            state_wc_class_code: null;
            title: string;
            compensations: {
              uuid: string;
              employee_uuid: string;
              version: string;
              payment_unit: string;
              flsa_status: string;
              adjust_for_minimum_wage: boolean;
              minimum_wages: never[];
              job_uuid: string;
              effective_date: string;
              rate: string;
            }[];
            rate: string;
            hire_date: string;
          }[];
          eligible_paid_time_off: never[];
          terminations: never[];
          garnishments: never[];
          date_of_birth: string;
          ssn: string;
          phone: null;
          work_email: null;
          current_home_address: {
            street_1: string;
            street_2: string;
            city: string;
            state: string;
            zip: string;
            country: string;
            active: boolean;
            uiud: string;
          };
          all_home_addresses: ({
            street_1: string;
            street_2: string;
            city: string;
            state: string;
            zip: string;
            country: string;
            active: boolean;
            uiud: string;
          } | {
            street_1: string;
            street_2: null;
            city: string;
            state: string;
            zip: string;
            country: string;
            active: boolean;
            uiud: string;
          })[];
          member_portal_invitation_status: {
            status: string;
            token_expired: boolean;
            welcome_email_sent_at: string;
            last_password_resent_at: null;
          };
          partner_portal_invitation_sent: boolean;
        };
        headers: {};
      };
    }>;
    findEmployeeByEmail: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
      companyId: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      email: {
        required: true;
        label: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    getEmployee: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
      employeeId: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          uuid: string;
          first_name: string;
          middle_initial: null;
          last_name: string;
          email: string;
          company_uuid: string;
          manager_uuid: null;
          version: string;
          current_employment_status: string;
          onboarding_status: string;
          preferred_first_name: null;
          department_uuid: null;
          employee_code: string;
          payment_method: string;
          department: null;
          terminated: boolean;
          two_percent_shareholder: boolean;
          onboarded: boolean;
          historical: boolean;
          has_ssn: boolean;
          onboarding_documents_config: {
            uuid: null;
            i9_document: boolean;
          };
          jobs: {
            uuid: string;
            version: string;
            employee_uuid: string;
            current_compensation_uuid: string;
            payment_unit: string;
            primary: boolean;
            two_percent_shareholder: boolean;
            state_wc_covered: null;
            state_wc_class_code: null;
            title: string;
            compensations: {
              uuid: string;
              employee_uuid: string;
              version: string;
              payment_unit: string;
              flsa_status: string;
              adjust_for_minimum_wage: boolean;
              minimum_wages: never[];
              job_uuid: string;
              effective_date: string;
              rate: string;
            }[];
            rate: string;
            hire_date: string;
          }[];
          eligible_paid_time_off: never[];
          terminations: never[];
          garnishments: never[];
          date_of_birth: string;
          ssn: string;
          phone: null;
          work_email: null;
          current_home_address: {
            street_1: string;
            street_2: string;
            city: string;
            state: string;
            zip: string;
            country: string;
            active: boolean;
            uiud: string;
          };
          all_home_addresses: ({
            street_1: string;
            street_2: string;
            city: string;
            state: string;
            zip: string;
            country: string;
            active: boolean;
            uiud: string;
          } | {
            street_1: string;
            street_2: null;
            city: string;
            state: string;
            zip: string;
            country: string;
            active: boolean;
            uiud: string;
          })[];
          member_portal_invitation_status: {
            status: string;
            token_expired: boolean;
            welcome_email_sent_at: string;
            last_password_resent_at: null;
          };
          partner_portal_invitation_sent: boolean;
        };
        headers: {};
      };
    }>;
    listEmployees: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
      companyId: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
        required: false;
        type: "string";
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: unknown[];
        headers: {};
      };
    } | {
      data: {
        data: any;
        headers: AxiosResponseHeaders | Partial<RawAxiosHeaders & {
          "Content-Length": AxiosHeaderValue;
          "Content-Encoding": AxiosHeaderValue;
          "Content-Type": AxiosHeaderValue;
          Server: AxiosHeaderValue;
          "Cache-Control": AxiosHeaderValue;
          "content-length": AxiosHeaderValue;
          "content-encoding": AxiosHeaderValue;
          "content-type": AxiosHeaderValue;
          server: AxiosHeaderValue;
          "cache-control": AxiosHeaderValue;
        } & {
          'set-cookie': string[];
        }>;
      };
    }>;
    getCompany: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
      companyId: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          uuid: string;
          name: string;
          trade_name: string;
          is_partner_managed: boolean;
          tier: string;
          locations: {
            street_1: string;
            street_2: string;
            city: string;
            state: string;
            zip: string;
            country: string;
            active: boolean;
          }[];
          ein: string;
          entity_type: string;
          pay_schedule_type: string;
          join_date: string;
          funding_type: string;
          slug: string;
          is_suspended: boolean;
          company_status: string;
          is_high_risk_business: boolean;
          is_marijuana_business: boolean;
          contractor_only: boolean;
          compensations: {
            hourly: {
              uuid: string;
              name: string;
              multiple: number;
            }[];
            fixed: ({
              uuid: string;
              name: string;
            } | {
              uuid: null;
              name: string;
            })[];
            paid_time_off: ({
              uuid: string;
              name: string;
            } | {
              uuid: null;
              name: string;
            })[];
          };
          primary_signatory: {
            uuid: string;
            first_name: string;
            middle_initial: string;
            last_name: string;
            phone: string;
            email: string;
            home_address: {
              street_1: string;
              street_2: string;
              city: string;
              state: string;
              zip: string;
              country: string;
            };
          };
          primary_payroll_admin: {
            first_name: string;
            last_name: string;
            phone: string;
            email: string;
          };
        };
        headers: {};
      };
    }>;
    listCompanies: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
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
        required: false;
        type: "string";
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: unknown[];
        headers: {};
      };
    } | {
      data: {
        data: any;
        headers: AxiosResponseHeaders | Partial<RawAxiosHeaders & {
          "Content-Length": AxiosHeaderValue;
          "Content-Encoding": AxiosHeaderValue;
          "Content-Type": AxiosHeaderValue;
          Server: AxiosHeaderValue;
          "Cache-Control": AxiosHeaderValue;
          "content-length": AxiosHeaderValue;
          "content-encoding": AxiosHeaderValue;
          "content-type": AxiosHeaderValue;
          server: AxiosHeaderValue;
          "cache-control": AxiosHeaderValue;
        } & {
          'set-cookie': string[];
        }>;
      };
    }>;
    listCompanyAdmins: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
      companyId: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
        required: false;
        type: "string";
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: unknown[];
        headers: {};
      };
    } | {
      data: {
        data: any;
        headers: AxiosResponseHeaders | Partial<RawAxiosHeaders & {
          "Content-Length": AxiosHeaderValue;
          "Content-Encoding": AxiosHeaderValue;
          "Content-Type": AxiosHeaderValue;
          Server: AxiosHeaderValue;
          "Cache-Control": AxiosHeaderValue;
          "content-length": AxiosHeaderValue;
          "content-encoding": AxiosHeaderValue;
          "content-type": AxiosHeaderValue;
          server: AxiosHeaderValue;
          "cache-control": AxiosHeaderValue;
        } & {
          'set-cookie': string[];
        }>;
      };
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "gustoOauth";
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
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
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
  }, "gustoOauth">[];
  dataSources: {
    selectCompany: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectEmployee: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
      companyId: {
        dataSource: undefined;
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPaySchedule: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
      companyId: {
        dataSource: undefined;
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    gustoWebhookTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        required: true;
        type: "connection";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      response: {
        statusCode: number;
        contentType: string;
      };
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;