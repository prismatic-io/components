import { action } from "@prismatic-io/spectral";

import {
  connectionInput,
  customerIdInput,
  onlyParentAccountsInput,
} from "../inputs";
import { getClient, sendAsync } from "../client";
import { BING_API, toArray } from "../util";
import { CustomerInfo, GetCustomersInfoResponse } from "./getCustomersInfo";
import { AccountInfo, GetAccountsInfoResponse } from "./getAccountsInfo";
import { getLinkedAccountsAndCustomersInfoExamplePayload } from "../examplePayloads";

const SOAP_ACTION = "GetLinkedAccountsAndCustomersInfo";

export type GetLinkedAccountsAndCustomersInfoResponse =
  GetAccountsInfoResponse & GetCustomersInfoResponse;

export const getLinkedAccountsAndCustomersInfo = action({
  display: {
    label: "Get Linked Accounts And Customers Info",
    description:
      "Gets the customer and account hierarchy under the specified customer.",
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
        soapAction: SOAP_ACTION,
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
  inputs: {
    connection: connectionInput,
    customerId: {
      ...customerIdInput,
      comments:
        "The identifier of the customer whose hierarchy you want to get.",
      required: true,
    },
    onlyParentAccounts: onlyParentAccountsInput,
  },
  examplePayload: {
    data: getLinkedAccountsAndCustomersInfoExamplePayload,
  },
});
