import type { Arg, Args } from "../client";

export const toArray = <T>(responseItem: T | T[]): T[] =>
  Array.isArray(responseItem)
    ? responseItem
    : responseItem
      ? [responseItem]
      : [];

const isArgs = (arg: Arg) => typeof arg === "object";

export const objectToXML = (args: Args): string =>
  Object.entries(args).reduce((acc, [key, value]) => {
    return (
      acc +
      `<${key}>${
        Array.isArray(value)
          ? value.reduce(
              (acc, curr) =>
                isArgs(curr as Arg) ? acc + objectToXML(curr as Args) : acc,
              "",
            )
          : isArgs(value)
            ? objectToXML(value as Args)
            : value
      }</${key.split(" ")[0]}>`
    );
  }, "");

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

export const mapModel = (values: string[]) => {
  return values.map((value) => {
    return {
      value,
      label: value,
    };
  });
};
