//#region src/types/rest.d.ts
interface BatchError {
  Code: number;
  Details?: string;
  ErrorCode?: string;
  FieldPath?: string;
  Index?: number;
  Message?: string;
  Type?: string;
}
interface AddRestResponse {
  PartialErrors?: BatchError[];
  [key: string]: unknown;
}
interface MutateRestResponse {
  PartialErrors?: BatchError[];
}
interface QueryRestResponse {
  PartialErrors?: BatchError[];
  [key: string]: unknown;
}
//#endregion
//#region src/types/soap.d.ts
interface AccountInfo {
  Id: number;
  Name: string;
  Number: string;
  AccountLifeCycleStatus: string;
}
interface GetAccountsInfoResponse {
  AccountsInfo: {
    AccountInfo: AccountInfo | AccountInfo[];
  };
}
interface CustomerInfo {
  Id: number;
  Name: string;
}
interface GetCustomersInfoResponse {
  CustomersInfo: {
    CustomerInfo: CustomerInfo | CustomerInfo[];
  };
}
type GetLinkedAccountsAndCustomersInfoResponse = GetAccountsInfoResponse & GetCustomersInfoResponse;
interface GetCustomerResponse {
  Customer: {
    CustomerFinancialStatus: string;
    Id: number;
    Industry: string;
    LastModifiedByUserId: number;
    LastModifiedTime: string;
    MarketCountry: string;
    ForwardCompatibilityMap: {
      KeyValuePairOfstringstring: {
        key: string;
        value: number;
      }[];
      MarketLanguage: string;
      Name: string;
      ServiceLevel: string;
      CustomerLifeCycleStatus: string;
      TimeStamp: string;
      Number: string;
      CustomerAddress: {
        City: string;
        CountryCode: string;
        Id: number;
        Line1: string;
        Line2: string;
        PostalCode: number;
        StateOrProvince: string;
        TimeStamp: string;
      };
    };
  };
}
interface AdvertiserAccount {
  BillToCustomerId: number;
  CurrencyCode: string;
  AccountFinancialStatus: string;
  Id: number;
  Language: string;
  LastModifiedByUserId: number;
  LastModifiedTime: string;
  Name: string;
  Number: string;
  ParentCustomerId: number;
  PaymentMethodId: number;
  PaymentMethodType: string;
  PrimaryUserId: number;
  AccountLifeCycleStatus: string;
  TimeStamp: string;
  TimeZone: string;
  LinkedAgencies: {
    CustomerInfo: CustomerInfo | CustomerInfo[];
  };
  TaxInformation: {
    KeyValuePairOfstringstring: {
      key: string;
      value: number;
    }[];
  };
  BusinessAddress: {
    City: string;
    CountryCode: string;
    Id: number;
    Line1: string;
    Line2: string;
    PostalCode: number;
    StateOrProvince: string;
    BusinessName: string;
  };
  AutoTagType: string;
}
interface SearchAccountsResponse {
  Accounts: {
    AdvertiserAccount: AdvertiserAccount | AdvertiserAccount[];
  };
}
interface OperationError {
  Code: number;
  Details: string;
  Message: string;
}
interface AddClientLinksResponse {
  OperationErrors: {
    OperationError: OperationError | OperationError[];
  };
  PartialErrors: {
    ArrayOfOperationError: {
      OperationError: OperationError | OperationError[];
    };
  };
}
interface ClientLink {
  ClientEntityId: number;
  ClientEntityName: string;
  ClientEntityNumber: string;
  InviterEmail: string;
  InviterName: string;
  InviterPhone: string;
  IsBillToClient: boolean;
  LastModifiedByUserId: number;
  LastModifiedDateTime: string;
  ManagingCustomerId: number;
  ManagingCustomerName: string;
  ManagingCustomerNumber: string;
  Name: string;
  Note: string;
  StartDate: string;
  Status: string;
  SuppressNotification: boolean;
  Timestamp: string;
  Type: string;
}
interface SearchClientLinksResponse {
  ClientLinks: {
    ClientLink: ClientLink | ClientLink[];
  };
}
interface SendUserInvitationResponse {
  UserInvitationId: number;
}
//#endregion
//#region src/constants.d.ts
declare enum WEB_SERVICE {
  AD_INSIGHT_API = "AD_INSIGHT_API",
  BULK_API = "BULK_API",
  CAMPAIGN_MANAGEMENT_API = "CAMPAIGN_MANAGEMENT_API",
  CUSTOMER_BILLING_API = "CUSTOMER_BILLING_API",
  CUSTOMER_MANAGEMENT_API = "CUSTOMER_MANAGEMENT_API",
  REPORTING_API = "REPORTING_API"
}
//#endregion
//#region src/inputs/common.d.ts
declare const connectionInput: {
  label: string;
  type: "connection";
  required: true;
  comments: string;
};
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  documentationUrl: "https://prismatic.io/docs/components/ms-bing-ads/";
  key: "ms-bing-ads";
  public: true;
  display: {
    category: "Application Connectors";
    description: string;
    iconPath: string;
    label: string;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      authorizeUrl: {
        comments: string;
        default: string;
        label: string;
        placeholder: string;
        required: true;
        shown: false;
        type: "string";
      };
      tokenUrl: {
        comments: string;
        default: string;
        label: string;
        placeholder: string;
        required: true;
        shown: false;
        type: "string";
      };
      scopes: {
        comments: string;
        default: string;
        label: string;
        placeholder: string;
        required: false;
        shown: false;
        type: "string";
      };
      clientId: {
        comments: string;
        label: string;
        placeholder: string;
        required: true;
        shown: true;
        type: "string";
      };
      clientSecret: {
        comments: string;
        label: string;
        placeholder: string;
        required: true;
        shown: true;
        type: "password";
      };
      developerToken: {
        comments: string;
        label: string;
        placeholder: string;
        required: true;
        shown: true;
        type: "password";
      };
      useSandbox: {
        comments: string;
        label: string;
        type: "boolean";
        required: false;
        shown: true;
        default: string;
      };
    };
  }, "oauth">[];
  dataSources: {
    selectAccountId: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        dataSource: undefined;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectAdGroupId: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        dataSource: undefined;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customerId: {
        required: boolean;
        dataSource: undefined;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      campaignId: {
        dataSource: undefined;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCampaignId: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        dataSource: undefined;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customerId: {
        required: boolean;
        dataSource: undefined;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCustomerId: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  actions: {
    sendUserInvitation: import("@prismatic-io/spectral").ActionDefinition<{
      accountIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (values: unknown) => string[];
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        required: boolean;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      email: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firstName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lcid: {
        label: string;
        type: "string";
        required: true;
        default: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string;
      };
      roleId: {
        label: string;
        comments: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: SendUserInvitationResponse;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      soapAction: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      soapBodyRequest: {
        label: string;
        placeholder: string;
        type: "code";
        language: "xml";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webService: {
        label: string;
        comments: string;
        type: "string";
        model: {
          label: string;
          value: WEB_SERVICE;
        }[];
        required: true;
        default: WEB_SERVICE;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    rawRestRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connection: typeof connectionInput;
    } & Omit<{
      url: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
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
      debugRequest: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
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
    }, "debugRequest">, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addKeywords: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adGroupId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      keywords: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AddRestResponse;
    }>;
    deleteKeywords: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adGroupId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      keywordIds: {
        required: boolean;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        example: string;
        clean: (values: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: MutateRestResponse;
    }>;
    getKeywordsByAdGroupId: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adGroupId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      returnAdditionalFields: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: QueryRestResponse;
    }>;
    getKeywordsByIds: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adGroupId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      keywordIds: {
        required: boolean;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        example: string;
        clean: (values: unknown) => string[];
      };
      returnAdditionalFields: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: QueryRestResponse;
    }>;
    updateKeywords: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adGroupId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      keywords: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: MutateRestResponse;
    }>;
    getCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        comments: string;
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GetCustomerResponse;
    }>;
    getCustomersInfo: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerNameFilter: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      topN: {
        label: string;
        type: "string";
        default: string;
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GetCustomersInfoResponse;
    }>;
    getLinkedAccountsAndCustomersInfo: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        comments: string;
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      onlyParentAccounts: {
        label: string;
        type: "boolean";
        default: string;
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GetLinkedAccountsAndCustomersInfoResponse;
    }>;
    addOfflineConversionsGoal: import("@prismatic-io/spectral").ActionDefinition<{
      accountIdInput: {
        comments: string;
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      conversionGoalCategory: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customerIdInput: {
        required: boolean;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      conversionWindowInMinutes: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      countType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      excludeFromBidding: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      isEnhancedConversionsEnabled: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      conversionScope: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      conversionStatus: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      isExternallyAttributed: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    applyOfflineConversions: import("@prismatic-io/spectral").ActionDefinition<{
      offlineConversionsBody: {
        label: string;
        placeholder: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
      accountIdInput: {
        label: string;
        comments: string;
        required: boolean;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerIdInput: {
        required: boolean;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    addClientLinks: import("@prismatic-io/spectral").ActionDefinition<{
      clientEntityId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerLinkPermission: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        comments: string;
        clean: (value: unknown) => string;
      };
      inviterEmail: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      inviterName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      inviterPhone: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      isBillToClient: {
        label: string;
        type: "boolean";
        default: string;
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      managingCustomerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      note: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      suppressNotification: {
        label: string;
        type: "boolean";
        default: string;
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      type: {
        label: string;
        comments: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        default: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AddClientLinksResponse;
    }>;
    searchClientLinks: import("@prismatic-io/spectral").ActionDefinition<{
      clientAccountId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      clientCustomerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      directManagingCustomerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      managingCustomerId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ordering: {
        label: string;
        comments: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: SearchClientLinksResponse;
    }>;
    addCampaigns: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaigns: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AddRestResponse;
    }>;
    deleteCampaigns: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignIds: {
        required: boolean;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        example: string;
        clean: (values: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: MutateRestResponse;
    }>;
    getCampaignsByAccountId: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignType: {
        label: string;
        type: "string";
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        comments: string;
        clean: (values: unknown) => string | undefined;
      };
      returnAdditionalFields: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: QueryRestResponse;
    }>;
    getCampaignsByIds: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignIds: {
        required: boolean;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        example: string;
        clean: (values: unknown) => string[];
      };
      campaignType: {
        label: string;
        type: "string";
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        comments: string;
        clean: (values: unknown) => string | undefined;
      };
      returnAdditionalFields: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: QueryRestResponse;
    }>;
    updateCampaigns: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaigns: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: MutateRestResponse;
    }>;
    addBudgets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      budgets: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AddRestResponse;
    }>;
    deleteBudgets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      budgetIds: {
        required: boolean;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        example: string;
        clean: (values: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: MutateRestResponse;
    }>;
    getBudgetsByIds: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      budgetIds: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        clean: (values: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: QueryRestResponse;
    }>;
    updateBudgets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      budgets: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: MutateRestResponse;
    }>;
    addAudiences: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      audiences: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AddRestResponse;
    }>;
    deleteAudiences: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      audienceIds: {
        required: boolean;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        example: string;
        clean: (values: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: MutateRestResponse;
    }>;
    getAudiencesByIds: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      audienceIds: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        clean: (values: unknown) => string[];
      };
      audienceType: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      returnAdditionalFields: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: QueryRestResponse;
    }>;
    updateAudiences: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      audiences: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: MutateRestResponse;
    }>;
    addAds: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adGroupId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      ads: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AddRestResponse;
    }>;
    deleteAds: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adGroupId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adIds: {
        required: boolean;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        example: string;
        clean: (values: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: MutateRestResponse;
    }>;
    getAdsByAdGroupId: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adGroupId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adTypes: {
        label: string;
        type: "string";
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (values: unknown) => string[];
      };
      returnAdditionalFields: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: QueryRestResponse;
    }>;
    getAdsByIds: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adGroupId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adIds: {
        required: boolean;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        example: string;
        clean: (values: unknown) => string[];
      };
      adTypes: {
        label: string;
        type: "string";
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
        clean: (values: unknown) => string[];
      };
      returnAdditionalFields: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: QueryRestResponse;
    }>;
    updateAds: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adGroupId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      ads: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: MutateRestResponse;
    }>;
    addAdGroups: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adGroups: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AddRestResponse;
    }>;
    deleteAdGroups: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adGroupIds: {
        required: boolean;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        example: string;
        clean: (values: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: MutateRestResponse;
    }>;
    getAdGroupsByCampaignId: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      returnAdditionalFields: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: QueryRestResponse;
    }>;
    getAdGroupsByIds: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adGroupIds: {
        required: boolean;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        example: string;
        clean: (values: unknown) => string[];
      };
      returnAdditionalFields: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: QueryRestResponse;
    }>;
    updateAdGroups: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerId: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      campaignId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      adGroups: {
        comments: string;
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: true;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: MutateRestResponse;
    }>;
    getAccountsInfo: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GetAccountsInfoResponse;
    }>;
    searchAccounts: import("@prismatic-io/spectral").ActionDefinition<{
      accountId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      accountLifeCycleStatus: {
        label: string;
        comments: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (value: unknown) => string;
      };
      accountName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      accountNumber: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      ordering: {
        label: string;
        comments: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (value: unknown) => string;
      };
      customerId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      userId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: SearchAccountsResponse;
    }>;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;