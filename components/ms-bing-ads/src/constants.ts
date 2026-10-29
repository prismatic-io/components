export enum BingAdsBaseUrl {
  Production = "api.bingads.microsoft.com",
  Sandbox = "api.sandbox.bingads.microsoft.com",
}

export const SOAP_NAMESPACE = "tns";

export const PAGE_SIZE = {
  accounts: 1000,
  customers: 1000,
  clientLinks: 100,
} as const;

export const SOAP_ACTION = {
  GetAccountsInfo: "GetAccountsInfo",
  GetCustomersInfo: "GetCustomersInfo",
  GetCustomer: "GetCustomer",
  GetLinkedAccountsAndCustomersInfo: "GetLinkedAccountsAndCustomersInfo",
  SearchAccounts: "SearchAccounts",
  AddClientLinks: "AddClientLinks",
  SearchClientLinks: "SearchClientLinks",
  UpdateClientLinks: "UpdateClientLinks",
  AddConversionGoals: "AddConversionGoals",
  ApplyOfflineConversions: "ApplyOfflineConversions",
  SendUserInvitation: "SendUserInvitation",
} as const;

export enum MsAdsRestService {
  CampaignManagement = "CampaignManagement",
}

export enum WEB_SERVICE {
  AD_INSIGHT_API = "AD_INSIGHT_API",
  BULK_API = "BULK_API",
  CAMPAIGN_MANAGEMENT_API = "CAMPAIGN_MANAGEMENT_API",
  CUSTOMER_BILLING_API = "CUSTOMER_BILLING_API",
  CUSTOMER_MANAGEMENT_API = "CUSTOMER_MANAGEMENT_API",
  REPORTING_API = "REPORTING_API",
}

export const BING_API = {
  [WEB_SERVICE.AD_INSIGHT_API]: {
    WSDL: "https://adinsight.api.bingads.microsoft.com/Api/Advertiser/AdInsight/v13/AdInsightService.svc?wsdl",
    TN: "https://bingads.microsoft.com/AdInsight/v13",
  },
  [WEB_SERVICE.BULK_API]: {
    WSDL: "https://bulk.api.bingads.microsoft.com/Api/Advertiser/CampaignManagement/v13/BulkService.svc?wsdl",
    TN: "https://bingads.microsoft.com/CampaignManagement/v13",
  },
  [WEB_SERVICE.CAMPAIGN_MANAGEMENT_API]: {
    WSDL: "https://campaign.api.bingads.microsoft.com/Api/Advertiser/CampaignManagement/v13/CampaignManagementService.svc?singleWsdl",
    TN: "https://bingads.microsoft.com/CampaignManagement/v13",
  },
  [WEB_SERVICE.CUSTOMER_BILLING_API]: {
    WSDL: "https://clientcenter.api.bingads.microsoft.com/Api/Billing/v13/CustomerBillingService.svc?wsdl",
    TN: "https://bingads.microsoft.com/Billing/v13",
  },
  [WEB_SERVICE.CUSTOMER_MANAGEMENT_API]: {
    WSDL: "https://clientcenter.api.bingads.microsoft.com/Api/CustomerManagement/v13/CustomerManagementService.svc?wsdl",
    TN: "https://bingads.microsoft.com/Customer/v13",
  },
  [WEB_SERVICE.REPORTING_API]: {
    WSDL: "https://reporting.api.bingads.microsoft.com/Api/Advertiser/Reporting/v13/ReportingService.svc?wsdl",
    TN: "https://bingads.microsoft.com/Reporting/v13",
  },
};

export const REST_BASE_URLS: Record<
  MsAdsRestService,
  { production: string; sandbox: string }
> = {
  [MsAdsRestService.CampaignManagement]: {
    production:
      "https://campaign.api.bingads.microsoft.com/CampaignManagement/v13",
    sandbox:
      "https://campaign.api.sandbox.bingads.microsoft.com/CampaignManagement/v13",
  },
};

export const CONVERSION_GOALS_CATEGORIES = [
  "AddToCart",
  "BeginCheckout",
  "BookAppointment",
  "Contact",
  "GetDirections",
  "Other",
  "OutboundClick",
  "PageView",
  "Purchase",
  "RequestQuote",
  "Signup",
  "SubmitLeadForm",
  "Subscribe",
];

export const COUNT_TYPE = ["All", "Unique"];

export const CONVERSION_SCOPE = ["Account", "Customer"];

export const CONVERSION_STATUS = ["Active", "Paused", "Deleted"];

export const ACCOUNT_LIFE_CYCLE_STATUS_MODEL = [
  { label: "Active", value: "Active" },
  { label: "Draft", value: "Draft" },
  { label: "Inactive", value: "Inactive" },
  { label: "Pause", value: "Pause" },
  { label: "Pending", value: "Pending" },
  { label: "Suspended", value: "Suspended" },
];

export const ORDERING_MODEL = [
  { label: "Id", value: "Id" },
  { label: "Name", value: "Name" },
  { label: "Number", value: "Number" },
];
