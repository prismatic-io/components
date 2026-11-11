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
//#region src/types.d.ts
interface SapRecord {
  [key: string]: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "sapS4Hana";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/sapS4Hana/";
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
  };
  actions: {
    addAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      requestBody: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      documentInfoRecordDocumentType: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      documentInfoRecordDocumentNumber: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      documentInfoRecordDocumentVersion: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      documentInfoRecordDocumentPart: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      inlinecount: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attachOrderBy: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attachSelect: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      documentInfoRecordDocumentType: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      documentInfoRecordDocumentNumber: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      documentInfoRecordDocumentVersion: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      documentInfoRecordDocumentPart: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      logicalDocument: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      archiveDocumentId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      linkedSapObjectKey: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      businessObjectTypeName: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      skip: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      inlinecount: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderBy: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      select: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      requestBodyCode: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      busEventSubscriberCode: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sapObjectType: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sapObjectTaskCode: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      requestBodyCode: {
        required: true;
        default: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
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
      filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      inlinecount: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderBy: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      select: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expand: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProject: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      projectId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projectSelect: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
      };
      projectExpand: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProject: import("@prismatic-io/spectral").ActionDefinition<{
      requestBodyCode: {
        required: true;
        default: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProject: import("@prismatic-io/spectral").ActionDefinition<{
      requestBodyCode: {
        required: true;
        default: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      projectId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTimesheetEntryCollection: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      skip: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      inlinecount: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderBy: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      select: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateTimesheetEntryCollection: import("@prismatic-io/spectral").ActionDefinition<{
      requestBodyCode: {
        required: true;
        default: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listFiles: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      filter: {
        required: true;
        label: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      inlinecount: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      select: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listChangeRecords: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      skip: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      inlinecount: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      changeRecordOrderBy: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      changeRecordSelect: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      changeRecordExpand: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getChangerecord: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      changeRecordUuid: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      changerecordSelect: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
      };
      changerecordExpand: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createChangeRecord: import("@prismatic-io/spectral").ActionDefinition<{
      requestBodyCode: {
        required: true;
        default: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      projectId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateChangeRecord: import("@prismatic-io/spectral").ActionDefinition<{
      requestBodyCode: {
        required: true;
        default: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      changeRecordUuid: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: any;
        headers: AxiosResponseHeaders | Partial<RawAxiosHeaders & {
          Server: AxiosHeaderValue;
          "Content-Type": AxiosHeaderValue;
          "Content-Length": AxiosHeaderValue;
          "Cache-Control": AxiosHeaderValue;
          "Content-Encoding": AxiosHeaderValue;
          server: AxiosHeaderValue;
          "content-type": AxiosHeaderValue;
          "content-length": AxiosHeaderValue;
          "cache-control": AxiosHeaderValue;
          "content-encoding": AxiosHeaderValue;
        } & {
          'set-cookie': string[];
        }>;
      };
    }>;
    rawRequestOdata: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      url: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      skip: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      inlinecount: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderBy: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      select: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expand: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPurchaseRequisition: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      select: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expand: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      purchaseRequisitionNumber: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPurchaseRequisitions: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      skip: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      inlinecount: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderBy: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      select: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expand: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createPurchaseRequisition: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      requestBodyCode: {
        required: true;
        default: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updatePurchaseRequisition: import("@prismatic-io/spectral").ActionDefinition<{
      requestBodyCode: {
        required: true;
        default: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      purchaseRequisitionNumberInput: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPurchaseRequisitionItemDetails: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      skip: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      inlinecount: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderBy: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      select: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expand: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      purchaseRequisitionNumber: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addItemToPurchaseRequisition: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      purchaseRequisitionNumberInput: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      requestBodyCode: {
        required: true;
        default: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listRecords: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      skip: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      inlinecount: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderBy: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => string[];
      };
      select: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => string[];
      };
      expand: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => string[];
      };
      recordType: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      recordType: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recordId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      skip: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      inlinecount: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderBy: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      select: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expand: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      recordType: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      requestBodyCode: {
        required: true;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateRecord: import("@prismatic-io/spectral").ActionDefinition<{
      requestBodyCode: {
        required: true;
        example: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      recordType: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recordId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
      };
      recordType: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recordId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
            created: SapRecord[];
            updated: SapRecord[];
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
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "sapOAuth";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    oauth2PkceMethod: import("@prismatic-io/spectral").OAuth2PkceMethod.S256;
    inputs: {
      tenantId: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: false;
        shown: false;
        default: string;
        comments: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        shown: true;
        default: string;
        comments: string;
      };
    } & Partial<import("@prismatic-io/spectral").OAuth2AuthorizationCodeInputs> & {
      [key: string]: import("@prismatic-io/spectral").ConnectionInput;
    } & {
      tokenUrl: import("@prismatic-io/spectral").ConnectionTemplateInputField;
      authorizeUrl: import("@prismatic-io/spectral").ConnectionTemplateInputField;
    } & {
      [key: string]: import("@prismatic-io/spectral").ConnectionTemplateInputField;
    };
  }, "sapOAuth"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "sapBasicAuth";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      tenantUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      username: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      password: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "sapBasicAuth"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      apiKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      baseUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        default: string;
        comments: string;
        example: string;
      };
    };
  }, "apiKey">)[];
  dataSources: {
    selectChangeRecord: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProject: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPurchaseRequisition: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
}>;
export = _default;