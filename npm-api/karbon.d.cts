//#region src/interfaces/OdataObject.d.ts
interface OdataObject<T> {
  [key: string]: unknown;
  odata?: Record<string, unknown>;
  value?: T[];
}
//#endregion
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
//#region src/interfaces/WorkItem.d.ts
interface WorkItem {
  "@odata.type": "#KarbonService.WorkItemSummaryDTO";
  WorkItemKey: string;
  AssigneeEmailAddress: string;
  AssigneeKey: string;
  AssigneeName: string;
  Title: string;
  ClientKey: string;
  ClientName: string;
  ClientType: string;
  ClientUserDefinedIdentifier: string;
  RelatedClientGroupKey: string;
  ClientGroupKey: string;
  RelatedClientGroupName: string;
  StartDate: string;
  DueDate: string;
  DeadlineDate: string;
  CompletedDate: string;
  ToDoPeriod: string;
  WorkType: string;
  WorkStatus: string;
  PrimaryStatus: string;
  SecondaryStatus: string;
  WorkTemplateKey: string;
  WorkTemplateTile: string;
  WorkScheduleKey: string;
}
//#endregion
//#region src/interfaces/User.d.ts
interface User {
  Id: string;
  Name: string;
  EmailAddress: string;
}
//#endregion
//#region src/interfaces/Contact.d.ts
interface Contact {
  "@odata.type": "#KarbonService.ContactSummaryDTO";
  ContactKey: string;
  FullName: string;
  PreferredName: string;
  Salutation: string;
  ClientOwner: string;
  ClientManager: string;
  Address: string;
  EmailAddress: string | null;
  PhoneNumber: string;
  RoleOrTitle: string;
  UserDefinedIdentifier: string;
  LastModifiedDateTime: string;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "karbon";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/karbon/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  actions: {
    deleteAllWebhookSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    getWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webhookType: {
        label: string;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        required: true;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OdataObject<unknown>;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        placeholder: string;
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
      data: {
        data: OdataObject<unknown>;
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
    listWorkItems: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      $filter: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      $top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      $skip: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      $orderby: {
        model: {
          value: string;
          label: string;
        }[];
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      getAllData: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OdataObject<WorkItem>;
    }>;
    createWorkItem: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      assigneeEmailAddres: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
      };
      title: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
      };
      clientKey: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
      };
      clientType: {
        label: string;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        required: true;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      relatedClientGroupKey: {
        label: string;
        type: "string";
        comments: string;
        clean: (value: unknown) => string | undefined;
        example: string;
        required: false;
        placeholder: string;
      };
      startDate: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        example: string;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OdataObject<unknown>;
    }>;
    getWorkItem: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      workItemkey: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OdataObject<unknown>;
    }>;
    updateWorkItem: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      workItemkey: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      description: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      deadlineDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    createUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      userName: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
      };
      userEmail: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OdataObject<unknown>;
    }>;
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      $filter: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      $top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      $skip: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      getAllData: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OdataObject<User>;
    }>;
    getUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      userId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OdataObject<unknown>;
    }>;
    getInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      invoiceKey: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      includeLineItems: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OdataObject<unknown>;
    }>;
    listInvoices: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      includeLineItems: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      $orderby: {
        model: {
          value: string;
          label: string;
        }[];
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OdataObject<unknown>;
    }>;
    listContacts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      $filter: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      $top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      $skip: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      $orderby: {
        model: {
          value: string;
          label: string;
        }[];
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      getAllData: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OdataObject<Contact>;
    }>;
    createContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      firstName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
      };
      lastName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
      };
      additionalFields: {
        example: string;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OdataObject<unknown>;
    }>;
    getContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      contactkey: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      expandBusinessCards: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OdataObject<unknown>;
    }>;
    updateContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      contactkey: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      firstName: {
        required: false;
        label: string;
        comments: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
      };
      lastName: {
        required: false;
        label: string;
        comments: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
      };
      middleName: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
      };
      preferredName: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
      };
      salutation: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
      };
      suffix: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "karbonApiKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      applicationId: {
        type: "string";
        label: string;
        comments: string;
        example: string;
        required: true;
      };
      accessKey: {
        type: "password";
        label: string;
        comments: string;
        example: string;
        required: true;
      };
    };
  }, "karbonApiKey">[];
  dataSources: {
    selectWorkItem: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUser: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectInvoice: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectContact: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectOrganization: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    entityTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webhookType: {
        label: string;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        required: true;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, false, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      pollResourceType: {
        label: string;
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
            updated: Record<string, unknown>[];
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
}>;
export = _default;