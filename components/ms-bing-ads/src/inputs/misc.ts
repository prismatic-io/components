import { input, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";

import { MsAdsRestService, REST_BASE_URLS, WEB_SERVICE } from "../constants";
import { cleanModelValue } from "../util";
import { accountIdInput, connectionInput, customerIdInput } from "./common";

const webServicesModel = [
  {
    label: "Ad Insight API",
    value: WEB_SERVICE.AD_INSIGHT_API,
  },
  {
    label: "Bulk API",
    value: WEB_SERVICE.BULK_API,
  },
  {
    label: "Campaign Management API",
    value: WEB_SERVICE.CAMPAIGN_MANAGEMENT_API,
  },
  {
    label: "Customer Billing API",
    value: WEB_SERVICE.CUSTOMER_BILLING_API,
  },
  {
    label: "Customer Management API",
    value: WEB_SERVICE.CUSTOMER_MANAGEMENT_API,
  },
  {
    label: "Reporting API",
    value: WEB_SERVICE.REPORTING_API,
  },
];

const webServiceInput = input({
  label: "Web Service API",
  comments:
    "Microsoft Advertising API Version 13 includes the following web service addresses.",
  type: "string",
  model: webServicesModel,
  required: true,
  default: WEB_SERVICE.CUSTOMER_MANAGEMENT_API,
  clean: cleanModelValue(webServicesModel, "web service"),
});

const soapActionInput = input({
  label: "SOAP Action",
  placeholder: "Enter SOAP action",
  type: "string",
  required: true,
  comments:
    "After selecting the Microsoft Advertising API Web Service, the SOAP Action is the method or endpoint to call.",
  example: "GetCustomer",
  clean: util.types.toString,
});

const soapBodyRequestInput = input({
  label: "SOAP Body Request",
  placeholder: "Enter SOAP body XML",
  type: "code",
  language: "xml",
  required: true,
  comments:
    "The required SOAP Body element contains the actual SOAP message intended for the ultimate endpoint of the message. Immediate child elements of the SOAP Body element may be namespace-qualified.",
  clean: util.types.toString,
});

export const rawRequestInputs = {
  accountId: { ...accountIdInput, required: true },
  connection: connectionInput,
  customerId: { ...customerIdInput, required: true },
  soapAction: soapActionInput,
  soapBodyRequest: soapBodyRequestInput,
  webService: webServiceInput,
};

const { debugRequest: _debugRequest, ...rawHttpInputs } = httpClientInputs;

const REST_BASE_URL =
  REST_BASE_URLS[MsAdsRestService.CampaignManagement].production;

export const rawRestRequestInputs: {
  connection: typeof connectionInput;
} & Omit<typeof httpClientInputs, "debugRequest"> = {
  connection: connectionInput,
  ...rawHttpInputs,
  url: {
    ...rawHttpInputs.url,
    comments: `Input the path only (/Campaigns/QueryByAccountId), The base URL is already included (${REST_BASE_URL}). For example, to connect to ${REST_BASE_URL}/Campaigns/QueryByAccountId, only /Campaigns/QueryByAccountId is entered in this field.`,
    example: "/Campaigns/QueryByAccountId",
  },
};
