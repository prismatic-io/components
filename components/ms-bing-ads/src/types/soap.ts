export interface AccountInfo {
  Id: number;
  Name: string;
  Number: string;
  AccountLifeCycleStatus: string;
}

export interface GetAccountsInfoResponse {
  AccountsInfo: {
    AccountInfo: AccountInfo | AccountInfo[];
  };
}

export interface CustomerInfo {
  Id: number;
  Name: string;
}

export interface GetCustomersInfoResponse {
  CustomersInfo: {
    CustomerInfo: CustomerInfo | CustomerInfo[];
  };
}

export type GetLinkedAccountsAndCustomersInfoResponse =
  GetAccountsInfoResponse & GetCustomersInfoResponse;

export interface GetCustomerResponse {
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

export interface AdvertiserAccount {
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

export interface SearchAccountsResponse {
  Accounts: {
    AdvertiserAccount: AdvertiserAccount | AdvertiserAccount[];
  };
}

export interface OperationError {
  Code: number;
  Details: string;
  Message: string;
}

export interface AddClientLinksResponse {
  OperationErrors: {
    OperationError: OperationError | OperationError[];
  };
  PartialErrors: {
    ArrayOfOperationError: {
      OperationError: OperationError | OperationError[];
    };
  };
}

export type UpdateClientLinksResponse = AddClientLinksResponse;

export interface ClientLink {
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

export interface SearchClientLinksResponse {
  ClientLinks: {
    ClientLink: ClientLink | ClientLink[];
  };
}

export interface SendUserInvitationResponse {
  UserInvitationId: number;
}

export interface OfflineConversion {
  ConversionCurrencyCode: string;
  ConversionName: string;
  ConversionTime: string;
  ConversionValue?: number;
  ExternalAttributionCredit?: number;
  ExternalAttributionModel?: string;
  HashedEmailAddress?: string;
  HashedPhoneNumber?: string;
  MicrosoftClickId?: string;
}
