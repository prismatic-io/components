import { dataSource, Element, util } from "@prismatic-io/spectral";

import { connectionInput } from "../inputs";
import { getClient, sendAsync } from "../client";
import { BING_API, toArray } from "../util";
import {
  CustomerInfo,
  GetCustomersInfoResponse,
} from "../actions/getCustomersInfo";
import { selectCustomerIdExamplePayload } from "../examplePayloads";

const SOAP_ACTION = "GetCustomersInfo";
const MAX_SIZE = 1000;

export const selectCustomerId = dataSource({
  display: {
    label: "Select Customer ID",
    description:
      "Gets the customer identifiers that are accessible to the current authenticated user.",
  },
  perform: async (context, { connection }) => {
    const client = await getClient({
      connection,
      wsdl: BING_API.CUSTOMER_MANAGEMENT_API.WSDL,
    });

    const response = await sendAsync<GetCustomersInfoResponse>({
      args: { CustomerNameFilter: "", TopN: MAX_SIZE },
      client,
      soapAction: SOAP_ACTION,
      targetNamespace: BING_API.CUSTOMER_MANAGEMENT_API.TN,
    });

    const standardizedResponse = response?.CustomersInfo?.CustomerInfo
      ? {
          CustomersInfo: {
            CustomerInfo: toArray<CustomerInfo>(
              response.CustomersInfo.CustomerInfo,
            ),
          },
        }
      : response;

    const customerIds = (
      Array.isArray(standardizedResponse?.CustomersInfo?.CustomerInfo)
        ? standardizedResponse.CustomersInfo.CustomerInfo
        : []
    )
      .sort((a, b) => (a.Name < b.Name ? -1 : 1))
      .map<Element>((customer) => ({
        key: util.types.toString(customer.Id),
        label: `${customer.Name} (id: ${customer.Id})`,
      }));

    return {
      result: customerIds,
    };
  },
  inputs: {
    connection: connectionInput,
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: selectCustomerIdExamplePayload,
  },
});
