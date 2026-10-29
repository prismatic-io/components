import type { Element } from "@prismatic-io/spectral";
import type {
  Ad,
  AddClientLinksResponse,
  AddRestResponse,
  AdGroup,
  Audience,
  Budget,
  Campaign,
  GetAccountsInfoResponse,
  GetCustomerResponse,
  GetCustomersInfoResponse,
  GetLinkedAccountsAndCustomersInfoResponse,
  Keyword,
  MutateRestResponse,
  QueryRestResponse,
  SearchAccountsResponse,
  SearchClientLinksResponse,
  SendUserInvitationResponse,
} from "./types";

export const getAccountsInfoExamplePayload: { data: GetAccountsInfoResponse } =
  {
    data: {
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
    },
  };

export const getCustomersInfoExamplePayload: {
  data: GetCustomersInfoResponse;
} = {
  data: {
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
  },
};

export const searchClientLinksExamplePayload: {
  data: SearchClientLinksResponse;
} = {
  data: {
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
  },
};

export const addClientLinksExamplePayload: { data: AddClientLinksResponse } = {
  data: {
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
  },
};

export const updateClientLinksExamplePayload: { data: AddClientLinksResponse } =
  {
    data: {
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
              Details:
                "ClientEntityId 144015218 is invalid for this operation.",
              Message: "The client entity ID is not valid.",
            },
          ],
        },
      },
    },
  };

export const addOfflineConversionGoalExamplePayload: {
  data: AddClientLinksResponse;
} = {
  data: {
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
  },
};

export const applyOfflineConversionsExamplePayload: {
  data: AddClientLinksResponse;
} = {
  data: {
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
  },
};

export const sendUserInvitationExamplePayload: {
  data: SendUserInvitationResponse;
} = {
  data: {
    UserInvitationId: 134015178,
  },
};

export const searchAccountsExamplePayload: { data: SearchAccountsResponse } = {
  data: {
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
  },
};

export const getCustomerExamplePayload: { data: GetCustomerResponse } = {
  data: {
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
  },
};

export const getLinkedAccountsAndCustomersInfoExamplePayload: {
  data: GetLinkedAccountsAndCustomersInfoResponse;
} = {
  data: {
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
  },
};

export const selectCustomerIdExamplePayload: { result: Element[] } = {
  result: [
    { key: "169592807", label: "Contoso Ltd (id: 169592807)" },
    { key: "169593041", label: "Fabrikam Inc (id: 169593041)" },
    { key: "169594112", label: "Northwind Traders (id: 169594112)" },
  ],
};

export const selectAccountIdExamplePayload: { result: Element[] } = {
  result: [
    { key: "156089854", label: "Contoso Advertising (id: 156089854)" },
    { key: "156089912", label: "Fabrikam Marketing (id: 156089912)" },
    { key: "156090045", label: "Northwind Campaigns (id: 156090045)" },
  ],
};

const exampleCampaigns: Campaign[] = [
  {
    Id: 542512145,
    Name: "Spring Sale",
    CampaignType: "Search",
    BudgetType: "DailyBudgetStandard",
    DailyBudget: 50.0,
    BudgetId: 8901234,
    Status: "Active",
    TimeZone: "PacificTimeUSCanadaTijuana",
  },
  {
    Id: 542512146,
    Name: "Holiday Shopping",
    CampaignType: "Shopping",
    BudgetType: "DailyBudgetStandard",
    DailyBudget: 100.0,
    BudgetId: 8901235,
    Status: "Paused",
    TimeZone: "PacificTimeUSCanadaTijuana",
  },
];

export const addCampaignsExamplePayload: { data: AddRestResponse } = {
  data: {
    CampaignIds: [542512145, 542512146],
    PartialErrors: [],
  },
};

export const updateCampaignsExamplePayload: { data: MutateRestResponse } = {
  data: {
    PartialErrors: [],
  },
};

export const deleteCampaignsExamplePayload: { data: MutateRestResponse } = {
  data: {
    PartialErrors: [],
  },
};

export const getCampaignsByAccountIdExamplePayload: {
  data: QueryRestResponse;
} = {
  data: {
    Campaigns: exampleCampaigns,
  },
};

export const getCampaignsByIdsExamplePayload: { data: QueryRestResponse } = {
  data: {
    Campaigns: exampleCampaigns,
    PartialErrors: [],
  },
};

export const selectCampaignIdExamplePayload: { result: Element[] } = {
  result: [
    { key: "542512145", label: "Spring Sale (id: 542512145)" },
    { key: "542512146", label: "Holiday Shopping (id: 542512146)" },
  ],
};

const exampleAdGroups: AdGroup[] = [
  {
    Id: 9012345,
    Name: "Footwear",
    Status: "Active",
    CpcBid: { Amount: 0.65 },
  },
  {
    Id: 9012346,
    Name: "Accessories",
    Status: "Paused",
    CpcBid: { Amount: 0.45 },
  },
];

export const addAdGroupsExamplePayload: { data: AddRestResponse } = {
  data: {
    AdGroupIds: [9012345, 9012346],
    PartialErrors: [],
  },
};

export const updateAdGroupsExamplePayload: { data: MutateRestResponse } = {
  data: {
    PartialErrors: [],
  },
};

export const deleteAdGroupsExamplePayload: { data: MutateRestResponse } = {
  data: {
    PartialErrors: [],
  },
};

export const getAdGroupsByCampaignIdExamplePayload: {
  data: QueryRestResponse;
} = {
  data: {
    AdGroups: exampleAdGroups,
  },
};

export const getAdGroupsByIdsExamplePayload: { data: QueryRestResponse } = {
  data: {
    AdGroups: exampleAdGroups,
    PartialErrors: [],
  },
};

export const selectAdGroupIdExamplePayload: { result: Element[] } = {
  result: [
    { key: "9012345", label: "Footwear (id: 9012345)" },
    { key: "9012346", label: "Accessories (id: 9012346)" },
  ],
};

const exampleAds: Ad[] = [
  {
    Id: 7012345,
    Type: "ResponsiveSearch",
    Status: "Active",
    EditorialStatus: "Active",
    FinalUrls: ["https://www.contoso.com"],
  },
  {
    Id: 7012346,
    Type: "ExpandedText",
    Status: "Paused",
    EditorialStatus: "Active",
    FinalUrls: ["https://www.contoso.com/sale"],
  },
];

export const addAdsExamplePayload: { data: AddRestResponse } = {
  data: {
    AdIds: [7012345, 7012346],
    PartialErrors: [],
  },
};

export const updateAdsExamplePayload: { data: MutateRestResponse } = {
  data: {
    PartialErrors: [],
  },
};

export const deleteAdsExamplePayload: { data: MutateRestResponse } = {
  data: {
    PartialErrors: [],
  },
};

export const getAdsByAdGroupIdExamplePayload: { data: QueryRestResponse } = {
  data: {
    Ads: exampleAds,
  },
};

export const getAdsByIdsExamplePayload: { data: QueryRestResponse } = {
  data: {
    Ads: exampleAds,
    PartialErrors: [],
  },
};

const exampleKeywords: Keyword[] = [
  {
    Id: 6012345,
    Text: "running shoes",
    MatchType: "Exact",
    Status: "Active",
    Bid: { Amount: 0.75 },
  },
  {
    Id: 6012346,
    Text: "trail runners",
    MatchType: "Phrase",
    Status: "Active",
    Bid: { Amount: 0.6 },
  },
];

export const addKeywordsExamplePayload: { data: AddRestResponse } = {
  data: {
    KeywordIds: [6012345, 6012346],
    PartialErrors: [],
  },
};

export const updateKeywordsExamplePayload: { data: MutateRestResponse } = {
  data: {
    PartialErrors: [],
  },
};

export const deleteKeywordsExamplePayload: { data: MutateRestResponse } = {
  data: {
    PartialErrors: [],
  },
};

export const getKeywordsByAdGroupIdExamplePayload: { data: QueryRestResponse } =
  {
    data: {
      Keywords: exampleKeywords,
    },
  };

export const getKeywordsByIdsExamplePayload: { data: QueryRestResponse } = {
  data: {
    Keywords: exampleKeywords,
    PartialErrors: [],
  },
};

const exampleBudgets: Budget[] = [
  {
    Id: 8901234,
    Name: "Shared Search Budget",
    Amount: 50.0,
    BudgetType: "DailyBudgetStandard",
    AssociationCount: 3,
  },
  {
    Id: 8901235,
    Name: "Shopping Budget",
    Amount: 100.0,
    BudgetType: "DailyBudgetStandard",
    AssociationCount: 1,
  },
];

export const addBudgetsExamplePayload: { data: AddRestResponse } = {
  data: {
    BudgetIds: [8901234, 8901235],
    PartialErrors: [],
  },
};

export const updateBudgetsExamplePayload: { data: MutateRestResponse } = {
  data: {
    PartialErrors: [],
  },
};

export const deleteBudgetsExamplePayload: { data: MutateRestResponse } = {
  data: {
    PartialErrors: [],
  },
};

export const getBudgetsByIdsExamplePayload: { data: QueryRestResponse } = {
  data: {
    Budgets: exampleBudgets,
    PartialErrors: [],
  },
};

const exampleAudiences: Audience[] = [
  {
    Id: 5012345,
    Name: "Site Visitors",
    Type: "RemarketingList",
    Scope: "Account",
    MembershipDuration: 30,
  },
  {
    Id: 5012346,
    Name: "VIP Customers",
    Type: "CustomerList",
    Scope: "Account",
    MembershipDuration: 180,
  },
];

export const addAudiencesExamplePayload: { data: AddRestResponse } = {
  data: {
    AudienceIds: [5012345, 5012346],
    PartialErrors: [],
  },
};

export const updateAudiencesExamplePayload: { data: MutateRestResponse } = {
  data: {
    PartialErrors: [],
  },
};

export const deleteAudiencesExamplePayload: { data: MutateRestResponse } = {
  data: {
    PartialErrors: [],
  },
};

export const getAudiencesByIdsExamplePayload: { data: QueryRestResponse } = {
  data: {
    Audiences: exampleAudiences,
    PartialErrors: [],
  },
};
