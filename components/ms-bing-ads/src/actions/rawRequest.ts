import { action } from "@prismatic-io/spectral";

import {
  accountIdInput,
  connectionInput,
  customerIdInput,
  soapActionInput,
  soapBodyRequestInput,
  webServiceInput,
} from "../inputs";
import { getClient, sendAsync } from "../client";
import { BING_API, WEB_SERVICE } from "../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to Microsoft Bing Ads.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      accountId,
      connection,
      customerId,
      soapAction,
      soapBodyRequest,
      webService,
    },
  ) => {
    const client = await getClient({
      connection,
      soapHeaders: {
        CustomerId: customerId,
        CustomerAccountId: accountId,
      },
      wsdl:
        BING_API?.[webService as WEB_SERVICE].WSDL ??
        BING_API.CUSTOMER_MANAGEMENT_API.WSDL,
    });

    const response = await sendAsync<unknown>({
      debug,
      args: { CustomerId: customerId },
      client,
      rawXml: soapBodyRequest,
      soapAction: soapAction,
    });

    return {
      data: response,
    };
  },
  inputs: {
    accountId: { ...accountIdInput, required: true },
    connection: connectionInput,
    customerId: { ...customerIdInput, required: true },
    soapAction: soapActionInput,
    soapBodyRequest: soapBodyRequestInput,
    webService: webServiceInput,
  },
});
