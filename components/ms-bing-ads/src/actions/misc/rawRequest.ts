import { action } from "@prismatic-io/spectral";
import { getClient, sendAsync } from "../../client";
import { BING_API, type WEB_SERVICE } from "../../constants";
import { rawRequestInputs } from "../../inputs/misc";

export const rawRequest = action({
  display: {
    label: "Raw Request (SOAP)",
    description:
      "Send a raw SOAP request to the Microsoft Advertising SOAP API.",
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
  inputs: rawRequestInputs,
});
