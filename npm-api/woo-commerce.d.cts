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
interface WooCommerceRecord {
  id: number;
  date_created_gmt?: string | null;
  [key: string]: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "woo-commerce";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/woo-commerce/";
  display: {
    label: string;
    category: "Application Connectors";
    description: string;
    iconPath: string;
  };
  actions: {
    listCustomers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      resultsPerPage: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      page: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      offset: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      before: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      after: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      params: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          id: number;
          date_created: string;
          date_created_gmt: string;
          date_modified: string;
          date_modified_gmt: string;
          email: string;
          first_name: string;
          last_name: string;
          role: string;
          username: string;
          billing: {
            first_name: string;
            last_name: string;
            company: string;
            address_1: string;
            address_2: string;
            city: string;
            state: string;
            postcode: string;
            country: string;
            email: string;
            phone: string;
          };
          shipping: {
            first_name: string;
            last_name: string;
            company: string;
            address_1: string;
            address_2: string;
            city: string;
            state: string;
            postcode: string;
            country: string;
          };
          is_paying_customer: boolean;
          avatar_url: string;
          meta_data: never[];
        }[];
        headers: any;
      };
    }>;
    createCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      email: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      phone: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      username: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      firstName: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      lastName: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      billingAddress1: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      billingAddress2: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      city: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      state: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      country: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      postalcode: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingAddress1: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingAddress2: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingCity: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingState: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingCountry: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingPostalCode: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      values: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      customerId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      customerId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      customerId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      email: {
        required: false;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      phone: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      username: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      firstName: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      lastName: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      billingAddress1: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      billingAddress2: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      billingCity: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      billingState: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      billingPostalCode: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      billingCountry: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingAddress1: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingAddress2: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingCity: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingState: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingCountry: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingPostalCode: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
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
        comments: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      productName: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      productType: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      price: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      description: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      summary: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      categories: {
        label: string;
        type: "code";
        comments: string;
        required: false;
        language: "json";
        placeholder: string;
        example: string;
      };
      images: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      values: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      productId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      productId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listProducts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      resultsPerPage: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      page: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      offset: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      before: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      after: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      params: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          id: number;
          name: string;
          slug: string;
          permalink: string;
          date_created: string;
          date_created_gmt: string;
          date_modified: string;
          date_modified_gmt: string;
          type: string;
          status: string;
          featured: boolean;
          catalog_visibility: string;
          description: string;
          short_description: string;
          sku: string;
          price: string;
          regular_price: string;
          sale_price: string;
          on_sale: boolean;
          purchasable: boolean;
          total_sales: number;
          virtual: boolean;
          downloadable: boolean;
          downloads: never[];
          tax_status: string;
          manage_stock: boolean;
          stock_quantity: null;
          stock_status: string;
          categories: {
            id: number;
            name: string;
            slug: string;
          }[];
          images: {
            id: number;
            date_created: string;
            date_created_gmt: string;
            date_modified: string;
            date_modified_gmt: string;
            src: string;
            name: string;
            alt: string;
          }[];
          attributes: never[];
          meta_data: never[];
        }[];
        headers: any;
      };
    }>;
    updateProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      productId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
      };
      productName: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      productType: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      price: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      description: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      summary: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      categories: {
        label: string;
        type: "code";
        comments: string;
        required: false;
        language: "json";
        placeholder: string;
        example: string;
      };
      images: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      values: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getCouponTotalsReport: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      period: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        model: {
          label: string;
          value: string;
        }[];
      };
      minDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      maxDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getCustomerTotalsReport: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      period: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        model: {
          label: string;
          value: string;
        }[];
      };
      maxDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      minDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getOrderTotalsReport: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getProductTotalsReport: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getReviewTotalsReport: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getSalesReport: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      period: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        model: {
          label: string;
          value: string;
        }[];
      };
      minDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      maxDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getTopSellersReport: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      period: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        model: {
          label: string;
          value: string;
        }[];
      };
      minDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      maxDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listReports: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      after: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      before: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      page: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      resultsPerPage: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      offset: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      params: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
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
    deleteOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      orderId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      orderId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listOrders: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      resultsPerPage: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      page: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      offset: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      before: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      after: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      params: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          id: number;
          parent_id: number;
          number: string;
          order_key: string;
          created_via: string;
          version: string;
          status: string;
          currency: string;
          date_created: string;
          date_created_gmt: string;
          date_modified: string;
          date_modified_gmt: string;
          discount_total: string;
          discount_tax: string;
          shipping_total: string;
          shipping_tax: string;
          cart_tax: string;
          total: string;
          total_tax: string;
          prices_include_tax: boolean;
          customer_id: number;
          customer_note: string;
          billing: {
            first_name: string;
            last_name: string;
            company: string;
            address_1: string;
            address_2: string;
            city: string;
            state: string;
            postcode: string;
            country: string;
            email: string;
            phone: string;
          };
          shipping: {
            first_name: string;
            last_name: string;
            company: string;
            address_1: string;
            address_2: string;
            city: string;
            state: string;
            postcode: string;
            country: string;
          };
          payment_method: string;
          payment_method_title: string;
          line_items: {
            id: number;
            name: string;
            product_id: number;
            variation_id: number;
            quantity: number;
            tax_class: string;
            subtotal: string;
            total: string;
            total_tax: string;
            sku: string;
            price: number;
          }[];
          shipping_lines: {
            id: number;
            method_title: string;
            method_id: string;
            total: string;
            total_tax: string;
          }[];
          fee_lines: never[];
          coupon_lines: never[];
          refunds: never[];
          meta_data: never[];
        }[];
        headers: any;
      };
    }>;
    getRefund: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      orderId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
      };
      refundId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listRefunds: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      orderId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
      };
      resultsPerPage: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      page: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      offset: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      before: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      after: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      params: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
    createOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      lineItems: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingLines: {
        label: string;
        type: "code";
        comments: string;
        required: false;
        language: "json";
        placeholder: string;
        example: string;
      };
      paymentMethod: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      paymentMethodTitle: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      isPaid: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
      };
      email: {
        required: false;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      phone: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      firstName: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      lastName: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      billingAddress1: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      billingAddress2: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      billingCity: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      billingState: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      billingPostalCode: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      billingCountry: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingAddress1: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingAddress2: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingCity: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingState: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingCountry: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      shippingPostalCode: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      values: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createProductCategory: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      categoryName: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
      };
      imageLink: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      description: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteProductCategory: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      categoryId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getProductCategory: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      categoryId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listProductCategories: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      resultsPerPage: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      page: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      offset: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      before: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      after: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      params: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
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
    createRefund: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      orderId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
      };
      refundAmount: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
      };
      lineItems: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteRefund: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      orderId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
      };
      refundId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
  };
  dataSources: {
    selectOrder: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      resultsPerPage: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      before: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      after: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCustomer: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      resultsPerPage: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      before: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      after: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProduct: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      resultsPerPage: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      before: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      after: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProductCategory: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      resultsPerPage: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      before: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      after: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectRefund: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      resultsPerPage: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      before: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      after: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    pollNewRecordsTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        comments: string;
        required: true;
      };
      resourceType: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        model: {
          label: string;
          value: string;
        }[];
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
            created: WooCommerceRecord[];
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
  hooks: {
    error: (error: unknown) => unknown;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "Basic";
    display: {
      description: string;
      label: string;
    };
    inputs: {
      username: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
      };
      password: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
      };
      domain: {
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        shown: true;
      };
    };
  }, "Basic">[];
}>;
export = _default;