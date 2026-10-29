import { action } from "@prismatic-io/spectral";
import { getClient, sendAsync } from "../../client";
import { BING_API, SOAP_ACTION } from "../../constants";
import { getCustomerExamplePayload } from "../../examplePayloads";
import { getCustomerInputs } from "../../inputs/customers";
import type { GetCustomerResponse } from "../../types";

export const getCustomer = action({
  display: {
    label: "Get Customer",
    description: "Gets the details of a customer. Utilizes the SOAP API.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, customerId },
  ) => {
    const client = await getClient({
      connection,
      wsdl: BING_API.CUSTOMER_MANAGEMENT_API.WSDL,
    });

    const response = await sendAsync<GetCustomerResponse>({
      debug,
      args: { CustomerId: customerId },
      client,
      soapAction: SOAP_ACTION.GetCustomer,
      targetNamespace: BING_API.CUSTOMER_MANAGEMENT_API.TN,
    });

    return {
      data: response,
    };
  },
  inputs: getCustomerInputs,
  examplePayload: getCustomerExamplePayload,
});
