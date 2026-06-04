import { action } from "@prismatic-io/spectral";

import { connectionInput, customerNameFilterInput, topNInput } from "../inputs";
import { getClient, sendAsync } from "../client";
import { BING_API, toArray } from "../util";
import { getCustomersInfoExamplePayload } from "../examplePayloads";

const SOAP_ACTION = "GetCustomersInfo";

export interface CustomerInfo {
  Id: number;
  Name: string;
}

export interface GetCustomersInfoResponse {
  CustomersInfo: {
    CustomerInfo: CustomerInfo | CustomerInfo[];
  };
}

export const getCustomersInfo = action({
  display: {
    label: "Get Customers Info",
    description:
      "Gets the identifiers and names of customers that are accessible to the current authenticated user. The results are filtered by customer name.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, customerNameFilter, topN },
  ) => {
    const client = await getClient({
      connection,
      wsdl: BING_API.CUSTOMER_MANAGEMENT_API.WSDL,
    });

    const response = await sendAsync<GetCustomersInfoResponse>({
      debug,
      args: { CustomerNameFilter: customerNameFilter, TopN: topN },
      client,
      soapAction: SOAP_ACTION,
      targetNamespace: BING_API.CUSTOMER_MANAGEMENT_API.TN,
    });

    return {
      data: response?.CustomersInfo?.CustomerInfo
        ? {
            CustomersInfo: {
              CustomerInfo: toArray<CustomerInfo>(
                response.CustomersInfo.CustomerInfo,
              ),
            },
          }
        : response,
    };
  },
  inputs: {
    connection: connectionInput,
    customerNameFilter: customerNameFilterInput,
    topN: topNInput,
  },
  examplePayload: {
    data: getCustomersInfoExamplePayload,
  },
});
