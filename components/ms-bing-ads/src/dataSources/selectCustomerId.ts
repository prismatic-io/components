import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getClient, sendAsync } from "../client";
import { BING_API, PAGE_SIZE, SOAP_ACTION } from "../constants";
import { selectCustomerIdExamplePayload } from "../examplePayloads";
import { selectCustomerIdInputs } from "../inputs/customers";
import type { CustomerInfo, GetCustomersInfoResponse } from "../types";
import { toArray } from "../util";

export const selectCustomerId = dataSource({
  display: {
    label: "Select Customer ID",
    description:
      "Gets the customer identifiers that are accessible to the current authenticated user.",
  },
  perform: async (_context, { connection }) => {
    const client = await getClient({
      connection,
      wsdl: BING_API.CUSTOMER_MANAGEMENT_API.WSDL,
    });

    const response = await sendAsync<GetCustomersInfoResponse>({
      args: { CustomerNameFilter: "", TopN: PAGE_SIZE.customers },
      client,
      soapAction: SOAP_ACTION.GetCustomersInfo,
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
  inputs: selectCustomerIdInputs,
  dataSourceType: "picklist",
  examplePayload: selectCustomerIdExamplePayload,
});
