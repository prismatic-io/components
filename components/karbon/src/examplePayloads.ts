import { SUCCESS_MESSAGE } from "./constants";
import type { Contact } from "./interfaces/Contact";
import type { OdataObject } from "./interfaces/OdataObject";
import type { WorkItem } from "./interfaces/WorkItem";

export const createContactExamplePayload: { data: OdataObject<unknown> } = {
  data: {
    odata: {
      context:
        "https://api.karbonhq.com/v3/$metadata#Contacts/KarbonService.ContactDTO/$entity",
      type: "#KarbonService.ContactDTO",
    },
    ContactKey: "67zlxNyJSr8e",
    FirstName: "William",
    MiddleName: "John",
    LastName: "Connor",
    PreferredName: "Bill",
    Salutation: "Mr",
    Suffix: "Jr.",
    ClientOwner: "rodney.muller@samplecompany.com",
    ClientManager: "jessica.tse@samplecompany.com",
    ContactType: "Client",
    UserDefinedIdentifier: "BILLJR",
    RestrictionLevel: "Public",
    AvatarUrl:
      "https://az.karbonemail.com/images/e4ae96c1-8d17-4c6e-af8a-8040482176fc",
    LastModifiedDateTime: "2022-07-05T07:30:13.7188114Z",
    EntityDescription: {
      Text: "Birthday on June 23.",
    },
    AccountingDetail: {
      ContactPermaKey: "4XHEn8T3J4Y6",
      OrganizationPermaKey: null,
      BirthDate: "1969-08-05T00:00:00Z",
      DeathDate: null,
      Salutation: "Mr",
      Sex: "M",
      FinancialYearEndDay: 8,
      FinancialYearEndMonth: 30,
      IncorporationDate: null,
      IncorporationState: null,
      LegalName: null,
      LineOfBusiness: null,
      EntityType: null,
      TaxCountryCode: "US",
      TradingName: null,
      AnnualRevenue: null,
      BaseCurrency: null,
      GstBasis: null,
      GstPeriod: null,
      IncomeTaxInstallmentPeriod: "Yearly",
      IsVATRegistered: null,
      OrganizationValuation: null,
      PaysTax: null,
      PrepareGST: null,
      ProvisionaTaxBasic: null,
      ProvisionalTaxRatio: null,
      RevenueModel: null,
      SalesTaxBasis: null,
      SalesTaxPeriod: null,
      Sells: null,
      RegistrationNumbers: {
        RegistrationNumber: "12-3456789",
        Type: "Social Security Number (SSN)",
      },
      Notes: {
        Body: "This is a sample note text.",
        Type: "Basic",
      },
    },
    BusinessCards: {
      BusinessCardKey: "2tBHyXtJBxBy",
      IsPrimaryCard: true,
      WebSites: ["www.website.one", "www.website.two"],
      EmailAddresses: ["sample@example.com", "sample.two@example.com"],
      OrganizationKey: "ZGNmtYyLm4z",
      RoleOrTitle: "COO",
      FacebookLink: "facebook.com/sampleName",
      LinkedInLink: "linkedin.com/sampleName",
      TwitterLink: "twitter.com/sampleName",
      SkypeLink: "skype.com/sampleName",
      Addresses: {
        AddressKey: "e150a05a-2dea-4292-8bc8-03398c9384e4",
        AddressLines: "45 Sample Street",
        City: "Alexandria",
        StateProvinceCounty: "NSW",
        ZipCode: "2015",
        CountryCode: "AU",
        Label: "Physical",
      },
      PhoneNumbers: {
        PhoneNumberKey: "6e0b9ace-24b1-4328-a922-3b8be5ef5052",
        Number: 1234567890,
        CountryCode: 61,
        Label: "Work",
      },
    },
  },
};

export const listContactsExamplePayload: { data: OdataObject<Contact> } = {
  data: {
    odata: {
      context:
        "https://api.karbonhq.com/v3/$metadata#Contacts/KarbonService.ContactSummaryDTO",
      count: 323,
    },
    value: [
      {
        "@odata.type": "#KarbonService.ContactSummaryDTO",
        ContactKey: "29YXnqWcqCf3",
        FullName: "William John Connor",
        PreferredName: "Bill",
        Salutation: "Mr",
        ClientOwner: "rodney.muller@samplecompany.com",
        ClientManager: "jessica.tse@samplecompany.com",
        Address: "42 Galaxy Way, London",
        EmailAddress: "william.connor@samplecompany.com",
        PhoneNumber: "0987888686",
        RoleOrTitle: "COO",
        UserDefinedIdentifier: "73YEnqFcqCf3",
        LastModifiedDateTime: "2021-12-29T07:01:53Z",
      },
    ],
  },
};

export const getInvoiceExamplePayload: { data: OdataObject<unknown> } = {
  data: {
    odata: {
      context: "https://api.karbonhq.com/v3/$metadata#Invoices/$entity",
    },
    InvoiceKey: "M2dVbCt4RHk",
    InvoiceNumber: "KIN-1001",
    TotalAmountDue: 1607.13,
    InvoiceTotal: 1607.13,
    InvoiceSubTotal: 1397.5,
    InvoiceTaxTotal: 209.63,
    InvoiceDate: "2023-07-21T00:00:00Z",
    PaymentDueDate: "2023-07-28T00:00:00Z",
    UpdatedAt: "2023-07-20T23:52:11Z",
    CurrencyCode: "AUD",
    PaymentInstructions: "Payment due 7 days from invoice date",
    InvoiceStatus: "AwaitingPayment",
    Client: {
      ClientKey: "2xxnBLyCP4Ts",
      ClientType: "Organization",
      Name: "Acme Corp",
      AddressLine: "15 Example Street",
      City: "Sydney",
      StateProvinceCounty: "NSW",
      ZipCode: "4004",
      Country: "Australia",
      EmailAddress: "acme@example.com",
    },
    TaxLineItems: [
      {
        TaxName: "GST",
        TaxValue: 209.63,
      },
    ],
  },
};

export const listInvoicesExamplePayload = {
  data: {
    odata: {
      context: "https://api.karbonhq.com/v3/$metadata#Invoices(LineItems())",
      count: 1,
    },
    value: [
      {
        InvoiceKey: "2F8bb4Xk4N1T",
        InvoiceNumber: "KIN-1000",
        TotalAmountDue: 5.0,
        InvoiceTotal: 5.0,
        InvoiceSubTotal: 5.0,
        InvoiceTaxTotal: 0.0,
        InvoiceDate: "2024-05-23T00:00:00Z",
        PaymentDueDate: "2024-05-30T00:00:00Z",
        UpdatedAt: "2024-05-23T16:44:29Z",
        CurrencyCode: "USD",
        PaymentInstructions: null,
        InvoiceStatus: "Approved",
        Client: {
          ClientKey: "4hFn8Czrnw4v",
          ClientType: "Organization",
          Name: "Example Sandbox",
          AddressLine: null,
          City: null,
          StateProvinceCounty: null,
          ZipCode: null,
          Country: null,
          EmailAddress: null,
        },
        TaxLineItems: [],
        LineItems: [
          {
            LineItemKey: "3aebacb913b44aaa81b1cb2acf958b1b",
            BillableItemEntityKey: "2SFw2p31285T",
            BillableItemType: "Expense",
            Description: "My Services",
            Quantity: 1,
            UnitPrice: 5.0,
            Amount: 5.0,
            TaxRate: 0.0,
            TaxRateName: "No Tax Set",
          },
        ],
      },
    ],
  },
};

export const createUserExamplePayload: { data: OdataObject<unknown> } = {
  data: {
    odata: {
      context: "https://api.karbonhq.com/v3/$metadata#Users/$entity",
    },
    Id: "4LR9qmR5NQ6T",
    Name: "Joe Min",
    EmailAddress: "joe@samplecompany.com",
  },
};

export const listWorkItemsExamplePayload: { data: OdataObject<WorkItem> } = {
  data: {
    value: [
      {
        "@odata.type": "#KarbonService.WorkItemSummaryDTO",
        WorkItemKey: "2LPSrkzbYrn4",
        AssigneeEmailAddress: "joe@samplecompany.com",
        AssigneeKey: "4gHCvnbFFqsq",
        AssigneeName: "Joe Min",
        Title: "Payroll 31 Aug - 15 Sep 2022",
        ClientKey: "4ncPZ7q96SGc",
        ClientName: "Acme Corporation",
        ClientType: "Organization",
        ClientUserDefinedIdentifier: "ACMECORP",
        RelatedClientGroupKey: "3LCPr987gNrc",
        ClientGroupKey: "3LCPr987gNrc",
        RelatedClientGroupName: "Smith Family Group",
        StartDate: "2021-12-29T00:00:00Z",
        DueDate: "2022-01-30T00:00:00Z",
        DeadlineDate: "2022-01-31T00:00:00Z",
        CompletedDate: "2022-02-01T00:00:00Z",
        ToDoPeriod: "2021-12-29T00:00:00Z",
        WorkType: "Payroll",
        WorkStatus: "Ready To Start - Send client requests",
        PrimaryStatus: "Ready To Start",
        SecondaryStatus: "Send client requests",
        WorkTemplateKey: "p56mtcBhwb9",
        WorkTemplateTile: "Payroll processing",
        WorkScheduleKey: "4f3gHnLC323",
      },
    ],

    odata: {
      count: 323,
      context:
        "https://api.karbonhq.com/v3/$metadata#WorkItems/KarbonService.WorkItemSummaryDTO",
      nextLink: "https://api.karbonhq.com/v3/WorkItems?$skip=100",
    },
  },
};

export const getContactExamplePayload: { data: OdataObject<unknown> } = {
  data: {
    odata: {
      context:
        "https://api.karbonhq.com/v3/$metadata#Contacts/KarbonService.ContactDTO/$entity",
      type: "#KarbonService.ContactDTO",
    },
    ContactKey: "67zlxNyJSr8e",
    FirstName: "William",
    MiddleName: "John",
    LastName: "Connor",
    PreferredName: "Bill",
    Salutation: "Mr",
    Suffix: "Jr.",
    ClientOwner: "rodney.muller@samplecompany.com",
    ClientManager: "jessica.tse@samplecompany.com",
    ContactType: "Client",
    UserDefinedIdentifier: "BILLJR",
    RestrictionLevel: "Public",
    AvatarUrl:
      "https://az.karbonemail.com/images/e4ae96c1-8d17-4c6e-af8a-8040482176fc",
    LastModifiedDateTime: "2022-07-05T07:30:13.7188114Z",
    EntityDescription: {
      Text: "Birthday on June 23.",
    },
    AccountingDetail: {
      ContactPermaKey: "4XHEn8T3J4Y6",
      OrganizationPermaKey: null,
      BirthDate: "1969-08-05T00:00:00Z",
      DeathDate: null,
      Salutation: "Mr",
      Sex: "M",
      FinancialYearEndDay: 8,
      FinancialYearEndMonth: 30,
      IncorporationDate: null,
      IncorporationState: null,
      LegalName: null,
      LineOfBusiness: null,
      EntityType: null,
      TaxCountryCode: "US",
      TradingName: null,
      AnnualRevenue: null,
      BaseCurrency: null,
      GstBasis: null,
      GstPeriod: null,
      IncomeTaxInstallmentPeriod: "Quaterly",
      IsVATRegistered: null,
      OrganizationValuation: null,
      PaysTax: null,
      PrepareGST: null,
      ProvisionaTaxBasic: null,
      ProvisionalTaxRatio: null,
      RevenueModel: null,
      SalesTaxBasis: null,
      SalesTaxPeriod: null,
      Sells: null,
      RegistrationNumbers: {
        RegistrationNumber: "12-3456789",
        Type: "Social Security Number (SSN)",
      },
      Notes: {
        Body: "This is a sample note text.",
        Type: "Basic",
      },
    },
    BusinessCards: {
      BusinessCardKey: "2tBHyXtJBxBy",
      EntityType: "Contact",
      EntityKey: "67zlxNyJSr8e",
      IsPrimaryCard: true,
      WebSites: ["www.website.one", "www.website.two"],
      EmailAddresses: ["sample@example.com", "sample.two@example.com"],
      OrganizationKey: "ZGNmtYyLm4z",
      RoleOrTitle: "COO",
      FacebookLink: "facebook.com/sampleName",
      LinkedInLink: "linkedin.com/sampleName",
      TwitterLink: "twitter.com/sampleName",
      SkypeLink: "skype.com/sampleName",
      Addresses: {
        AddressKey: "e150a05a-2dea-4292-8bc8-03398c9384e4",
        AddressLines: "45 Sample Street",
        City: "Alexandria",
        StateProvinceCounty: "NSW",
        ZipCode: "2015",
        CountryCode: "AU",
        Label: "Physical",
      },
      PhoneNumbers: {
        PhoneNumberKey: "6e0b9ace-24b1-4328-a922-3b8be5ef5052",
        Number: 1234567890,
        CountryCode: 61,
        Label: "Work",
      },
    },
  },
};

export const updateContactExamplePayload = {
  data: SUCCESS_MESSAGE,
};

export const listUsersExamplePayload = {
  data: {
    odata: {
      context: "https://api.karbonhq.com/v3/$metadata#Users",
      count: 1,
      nextLink: "https://api.karbonhq.com/v3/Users?$skip=100",
    },

    value: [
      {
        Id: "4LR9qmR5NQ6T",
        Name: "Joe Min",
        EmailAddress: "joe@samplecompany.com",
      },
    ],
  },
};

export const getUserExamplePayload: { data: OdataObject<unknown> } = {
  data: {
    odata: {
      context:
        "https://api.karbonhq.com/v3/$metadata#Users/KarbonService.UserProfileDTO/$entity",
      type: "#KarbonService.UserProfileDTO",
    },
    Id: "2bYxtn94ZSdY",
    Name: "Janet Smith",
    EmailAddress: "janet@example.com",
    BillableRate: 0,
    CapacityMinutesPerWeek: 2400,
    Permissions: ["User"],
    Roles: ["Accountant", "Bookkeeper"],
    Teams: ["Accountants", "Bookkeepers"],
  },
};

export const createWorkItemExamplePayload: { data: OdataObject<unknown> } = {
  data: {
    odata: {
      context:
        "https://api.karbonhq.com/v3/$metadata#WorkItems/KarbonService.WorkItemDTO/$entity",
      type: "#KarbonService.WorkItemDTO",
    },
    WorkItemKey: "2LPSrkzbYrn4",
    AssigneeEmailAddress: "joe@samplecompany.com",
    AssigneeKey: "4gHCvnbFFqsq",
    AssigneeName: "Joe Min",
    Title: "Payroll 31 Aug - 15 Sep 2022",
    ClientKey: "4ncPZ7q96SGc",
    ClientName: "Acme Corporation",
    ClientType: "Organization",
    ClientUserDefinedIdentifier: "ACMECORP",
    RelatedClientGroupKey: "3LCPr987gNrc",
    ClientGroupKey: "3LCPr987gNrc",
    RelatedClientGroupName: "Smith Family Group",
    StartDate: "2021-12-29T00:00:00Z",
    DueDate: "2022-01-30T00:00:00Z",
    DeadlineDate: "2022-01-31T00:00:00Z",
    CompletedDate: "2022-02-01T00:00:00Z",
    ToDoPeriod: "2021-12-29T00:00:00Z",
    WorkType: "Payroll",
    WorkStatus: "Ready To Start - Send client requests",
    PrimaryStatus: "Ready To Start",
    SecondaryStatus: "Send client requests",
    WorkTemplateKey: "p56mtcBhwb9",
    WorkTemplateTile: "Payroll processing",
    WorkScheduleKey: "4f3gHnLC323",
    FeeSettings: {
      FeeType: "FixedFee",
      FeeValue: 5150.2,
    },
    Description: "Send to Jo for review",
    ClientTaskRecipient: null,
  },
};

export const getWorkItemExamplePayload: { data: OdataObject<unknown> } = {
  data: {
    odata: {
      context:
        "https://api.karbonhq.com/v3/$metadata#WorkItems/KarbonService.WorkItemDTO/$entity",
      type: "#KarbonService.WorkItemDTO",
    },
    WorkItemKey: "2LPSrkzbYrn4",
    AssigneeEmailAddress: "joe@samplecompany.com",
    AssigneeKey: "4gHCvnbFFqsq",
    AssigneeName: "Joe Min",
    Title: "Payroll 31 Aug - 15 Sep 2022",
    ClientKey: "4ncPZ7q96SGc",
    ClientName: "Acme Corporation",
    ClientType: "Organization",
    ClientUserDefinedIdentifier: "ACMECORP",
    RelatedClientGroupKey: "3LCPr987gNrc",
    ClientGroupKey: "3LCPr987gNrc",
    RelatedClientGroupName: "Smith Family Group",
    StartDate: "2021-12-29T00:00:00Z",
    DueDate: "2022-01-30T00:00:00Z",
    DeadlineDate: "2022-01-31T00:00:00Z",
    CompletedDate: "2022-02-01T00:00:00Z",
    ToDoPeriod: "2021-12-29T00:00:00Z",
    WorkType: "Payroll",
    WorkStatus: "Ready To Start - Send client requests",
    PrimaryStatus: "Ready To Start",
    SecondaryStatus: "Send client requests",
    WorkTemplateKey: "p56mtcBhwb9",
    WorkTemplateTile: "Payroll processing",
    WorkScheduleKey: "4f3gHnLC323",
    FeeSettings: {
      FeeType: "FixedFee",
      FeeValue: 5150.2,
    },
    Description: "Send to Jo for review",
    ClientTaskRecipient: null,
  },
};

export const updateWorkItemExamplePayload = {
  data: SUCCESS_MESSAGE,
};

export const deleteAllWebhookSubscriptionsExamplePayload = {
  data: SUCCESS_MESSAGE,
};

export const getWebhookExamplePayload: { data: OdataObject<unknown> } = {
  data: {
    odata: {
      context:
        "https://api.karbonhq.com/v3/$metadata#WebhookSubscriptions/$entity",
    },
    TargetUrl: "https://evelyn.info/hooks/catch/3550924/ovsbqn4/",
    WebhookType: "Contact",
  },
};
