import { action } from "@prismatic-io/spectral";
import { getClient, sendAsync } from "../../client";
import { BING_API, SOAP_ACTION } from "../../constants";
import { getCustomersInfoExamplePayload } from "../../examplePayloads";
import { getCustomersInfoInputs } from "../../inputs/customers";
import type { CustomerInfo, GetCustomersInfoResponse } from "../../types";
import { toArray } from "../../util";

export const getCustomersInfo = action({
  display: {
    label: "Get Customers Info",
    description:
      "Gets the identifiers and names of customers that are accessible to the current authenticated user. The results are filtered by customer name. Utilizes the SOAP API.",
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
      soapAction: SOAP_ACTION.GetCustomersInfo,
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
  inputs: getCustomersInfoInputs,
  examplePayload: getCustomersInfoExamplePayload,
});
