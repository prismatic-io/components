import { action } from "@prismatic-io/spectral";
import { getClient, sendAsync } from "../../client";
import { BING_API, SOAP_ACTION } from "../../constants";
import { getLinkedAccountsAndCustomersInfoExamplePayload } from "../../examplePayloads";
import { getLinkedAccountsAndCustomersInfoInputs } from "../../inputs/customers";
import type {
  AccountInfo,
  CustomerInfo,
  GetLinkedAccountsAndCustomersInfoResponse,
} from "../../types";
import { toArray } from "../../util";

export const getLinkedAccountsAndCustomersInfo = action({
  display: {
    label: "Get Linked Accounts And Customers Info",
    description:
      "Gets the customer and account hierarchy under the specified customer. Utilizes the SOAP API.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, customerId, onlyParentAccounts },
  ) => {
    const client = await getClient({
      connection,
      wsdl: BING_API.CUSTOMER_MANAGEMENT_API.WSDL,
    });

    const response = await sendAsync<GetLinkedAccountsAndCustomersInfoResponse>(
      {
        debug,
        args: {
          CustomerId: customerId,
          OnlyParentAccounts: onlyParentAccounts,
        },
        client,
        soapAction: SOAP_ACTION.GetLinkedAccountsAndCustomersInfo,
        targetNamespace: BING_API.CUSTOMER_MANAGEMENT_API.TN,
      },
    );

    return {
      data:
        response?.AccountsInfo?.AccountInfo ||
        response?.CustomersInfo?.CustomerInfo
          ? {
              AccountsInfo: {
                AccountInfo: toArray<AccountInfo>(
                  response?.AccountsInfo?.AccountInfo,
                ),
              },
              CustomersInfo: {
                CustomerInfo: toArray<CustomerInfo>(
                  response?.CustomersInfo?.CustomerInfo,
                ),
              },
            }
          : response,
    };
  },
  inputs: getLinkedAccountsAndCustomersInfoInputs,
  examplePayload: getLinkedAccountsAndCustomersInfoExamplePayload,
});
