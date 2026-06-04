import { action } from "@prismatic-io/spectral";

import { connectionInput, customerIdInput } from "../inputs";
import { getClient, sendAsync } from "../client";
import { BING_API } from "../util";
import { getCustomerExamplePayload } from "../examplePayloads";

const SOAP_ACTION = "GetCustomer";

export interface GetCustomerResponse {
  Customer: {
    CustomerFinancialStatus: string;
    Id: number;
    Industry: string;
    LastModifiedByUserId: number;
    LastModifiedTime: string;
    MarketCountry: string;
    ForwardCompatibilityMap: {
      KeyValuePairOfstringstring: {
        key: string;
        value: number;
      }[];
      MarketLanguage: string;
      Name: string;
      ServiceLevel: string;
      CustomerLifeCycleStatus: string;
      TimeStamp: string;
      Number: string;
      CustomerAddress: {
        City: string;
        CountryCode: string;
        Id: number;
        Line1: string;
        Line2: string;
        PostalCode: number;
        StateOrProvince: string;
        TimeStamp: string;
      };
    };
  };
}

export const getCustomer = action({
  display: {
    label: "Get Customer",
    description: "Gets the details of a customer.",
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
      soapAction: SOAP_ACTION,
      targetNamespace: BING_API.CUSTOMER_MANAGEMENT_API.TN,
    });

    return {
      data: response,
    };
  },
  inputs: {
    connection: connectionInput,
    customerId: {
      ...customerIdInput,
      comments:
        "The identifier of the customer whose information you want to get.",
      required: true,
    },
  },
  examplePayload: {
    data: getCustomerExamplePayload,
  },
});
