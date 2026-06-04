import type { Element } from "@prismatic-io/spectral";
import type { GetAccountsInfoResponse } from "./actions/getAccountsInfo";
import type {
  GetCustomersInfoResponse,
  CustomerInfo,
} from "./actions/getCustomersInfo";
import type { GetLinkedAccountsAndCustomersInfoResponse } from "./actions/getLinkedAccountsAndCustomersInfo";
import type { SearchClientLinksResponse } from "./actions/searchClientLinks";
import type { SearchAccountsResponse } from "./actions/searchAccounts";
import type { GetCustomerResponse } from "./actions/getCustomer";
import type { SendUserInvitationResponse } from "./actions/sendUserInvitation";
import type { AddClientLinksResponse } from "./actions/addClientLinks";

export const getAccountsInfoExamplePayload: GetAccountsInfoResponse = {
  AccountsInfo: {
    AccountInfo: [
      {
        Id: 156089854,
        Name: "Contoso Advertising",
        Number: "F168K7MC",
        AccountLifeCycleStatus: "Active",
      },
      {
        Id: 156089912,
        Name: "Fabrikam Marketing",
        Number: "F107RHVU",
        AccountLifeCycleStatus: "Active",
      },
    ],
  },
};

export const getCustomersInfoExamplePayload: GetCustomersInfoResponse = {
  CustomersInfo: {
    CustomerInfo: [
      {
        Id: 169592807,
        Name: "Contoso Ltd",
      },
      {
        Id: 169593041,
        Name: "Fabrikam Inc",
      },
    ],
  },
};

export const searchClientLinksExamplePayload: SearchClientLinksResponse = {
  ClientLinks: {
    ClientLink: [
      {
        ClientEntityId: 144015218,
        ClientEntityName: "Contoso Advertising",
        ClientEntityNumber: "F113T5TB",
        InviterEmail: "admin@contoso.com",
        InviterName: "Jane Smith",
        InviterPhone: "null",
        IsBillToClient: false,
        LastModifiedByUserId: 134084676,
        LastModifiedDateTime: "2022-11-11T15:26:49.357",
        ManagingCustomerId: 169592807,
        ManagingCustomerName: "contoso.com",
        ManagingCustomerNumber: "F145006C7T",
        Name: "Contoso Agency Link",
        Note: "null",
        StartDate: "2022-11-11T15:26:49.24Z",
        Status: "LinkPending",
        SuppressNotification: false,
        Timestamp: "AAAAAAAAAAA=",
        Type: "AccountLink",
      },
      {
        ClientEntityId: 138108451,
        ClientEntityName: "Fabrikam Marketing",
        ClientEntityNumber: "F107RHVU",
        InviterEmail: "john.doe@fabrikam.com",
        InviterName: "John Doe",
        InviterPhone: "425-555-0100",
        IsBillToClient: true,
        LastModifiedByUserId: 134080686,
        LastModifiedDateTime: "2022-11-10T01:10:11.55",
        ManagingCustomerId: 169592807,
        ManagingCustomerName: "fabrikam.com",
        ManagingCustomerNumber: "F145006C7T",
        Name: "Fabrikam Client Link",
        Note: "Agency management link for Q4 campaigns",
        StartDate: "2022-11-10T01:10:11.423Z",
        Status: "LinkPending",
        SuppressNotification: false,
        Timestamp: "AAAAAAAAAAA=",
        Type: "AccountLink",
      },
    ],
  },
};

export const addClientLinksExamplePayload: AddClientLinksResponse = {
  OperationErrors: {
    OperationError: [
      {
        Code: 0,
        Details: "",
        Message: "No errors occurred.",
      },
    ],
  },
  PartialErrors: {
    ArrayOfOperationError: {
      OperationError: [
        {
          Code: 515,
          Details: "ClientEntityId 144015218 is invalid for this operation.",
          Message: "The client entity ID is not valid.",
        },
      ],
    },
  },
};

export const updateClientLinksExamplePayload: AddClientLinksResponse = {
  OperationErrors: {
    OperationError: [
      {
        Code: 0,
        Details: "",
        Message: "No errors occurred.",
      },
    ],
  },
  PartialErrors: {
    ArrayOfOperationError: {
      OperationError: [
        {
          Code: 515,
          Details: "ClientEntityId 144015218 is invalid for this operation.",
          Message: "The client entity ID is not valid.",
        },
      ],
    },
  },
};

export const addOfflineConversionGoalExamplePayload: AddClientLinksResponse = {
  OperationErrors: {
    OperationError: [
      {
        Code: 0,
        Details: "",
        Message: "No errors occurred.",
      },
    ],
  },
  PartialErrors: {
    ArrayOfOperationError: {
      OperationError: [
        {
          Code: 4803,
          Details:
            "The conversion goal name already exists for the given account.",
          Message: "Duplicate conversion goal name.",
        },
      ],
    },
  },
};

export const applyOfflineConversionsExamplePayload: AddClientLinksResponse = {
  OperationErrors: {
    OperationError: [
      {
        Code: 0,
        Details: "",
        Message: "No errors occurred.",
      },
    ],
  },
  PartialErrors: {
    ArrayOfOperationError: {
      OperationError: [
        {
          Code: 4806,
          Details:
            "The offline conversion for click ID ABC123 could not be applied.",
          Message: "Offline conversion application failed.",
        },
      ],
    },
  },
};

export const sendUserInvitationExamplePayload: SendUserInvitationResponse = {
  UserInvitationId: 134015178,
};

export const searchAccountsExamplePayload: SearchAccountsResponse = {
  Accounts: {
    AdvertiserAccount: [
      {
        BillToCustomerId: 369545927,
        CurrencyCode: "USD",
        AccountFinancialStatus: "ClearFinancialStatus",
        Id: 156089854,
        Language: "English",
        LastModifiedByUserId: 3,
        LastModifiedTime: "2022-10-26T18:6:8.443",
        Name: "Contoso Advertising",
        Number: "F168K7MC",
        ParentCustomerId: 1696874121,
        PaymentMethodId: 1268789111,
        PaymentMethodType: "CreditCard",
        PrimaryUserId: 168125418,
        AccountLifeCycleStatus: "Active",
        TimeStamp: "AAAAADlTWUc=",
        TimeZone: "CentralTimeUSCanada",
        LinkedAgencies: {
          CustomerInfo: [
            {
              Id: 169592807,
              Name: "Contoso Agency",
            },
            {
              Id: 169593041,
              Name: "Fabrikam Partners",
            },
          ],
        },
        TaxInformation: {
          KeyValuePairOfstringstring: [
            {
              key: "ManagedByCustomerId",
              value: 0,
            },
          ],
        },
        BusinessAddress: {
          City: "Sioux Falls",
          CountryCode: "US",
          Id: 135264777,
          Line1: "4516 S 50th St",
          Line2: "Suite 220",
          PostalCode: 37108,
          StateOrProvince: "SD",
          BusinessName: "Contoso Software Inc.",
        },
        AutoTagType: "Inactive",
      },
    ],
  },
};

export const getCustomerExamplePayload: GetCustomerResponse = {
  Customer: {
    CustomerFinancialStatus: "ClearFinancialStatus",
    Id: 169592807,
    Industry: "NA",
    LastModifiedByUserId: 2,
    LastModifiedTime: "2022-10-26T13:35:34.957",
    MarketCountry: "US",
    ForwardCompatibilityMap: {
      KeyValuePairOfstringstring: [
        {
          key: "ManagedByCustomerId",
          value: 0,
        },
      ],
      MarketLanguage: "English",
      Name: "Contoso Ltd",
      ServiceLevel: "SelfServe",
      CustomerLifeCycleStatus: "Active",
      TimeStamp: "AAAAADlQGFU=",
      Number: "F145006C7T",
      CustomerAddress: {
        City: "Sioux Falls",
        CountryCode: "US",
        Id: 135264702,
        Line1: "1235 W 12th St",
        Line2: "Suite 202",
        PostalCode: 27108,
        StateOrProvince: "SD",
        TimeStamp: "AAAAADlQGE4=",
      },
    },
  },
};

export const getLinkedAccountsAndCustomersInfoExamplePayload: GetLinkedAccountsAndCustomersInfoResponse =
  {
    AccountsInfo: {
      AccountInfo: [
        {
          Id: 156089854,
          Name: "Contoso Advertising",
          Number: "F168K7MC",
          AccountLifeCycleStatus: "Active",
        },
        {
          Id: 156089912,
          Name: "Fabrikam Marketing",
          Number: "F107RHVU",
          AccountLifeCycleStatus: "Active",
        },
      ],
    },
    CustomersInfo: {
      CustomerInfo: [
        {
          Id: 169592807,
          Name: "Contoso Ltd",
        },
      ],
    },
  };

export const selectCustomerIdExamplePayload: Element[] = [
  { key: "169592807", label: "Contoso Ltd (id: 169592807)" },
  { key: "169593041", label: "Fabrikam Inc (id: 169593041)" },
  { key: "169594112", label: "Northwind Traders (id: 169594112)" },
];

export const selectAccountIdExamplePayload: Element[] = [
  { key: "156089854", label: "Contoso Advertising (id: 156089854)" },
  { key: "156089912", label: "Fabrikam Marketing (id: 156089912)" },
  { key: "156090045", label: "Northwind Campaigns (id: 156090045)" },
];
