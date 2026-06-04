import { action } from "@prismatic-io/spectral";

import { connectionInput, customerIdInput } from "../inputs";
import { getClient, sendAsync } from "../client";
import { BING_API, toArray } from "../util";
import { getAccountsInfoExamplePayload } from "../examplePayloads";

const SOAP_ACTION = "GetAccountsInfo";

export interface AccountInfo {
  Id: number;
  Name: string;
  Number: string;
  AccountLifeCycleStatus: string;
}

export interface GetAccountsInfoResponse {
  AccountsInfo: {
    AccountInfo: AccountInfo | AccountInfo[];
  };
}

export const getAccountsInfo = action({
  display: {
    label: "Get Account Info",
    description:
      "Gets the identifiers, names, and numbers of accounts that are accessible from the specified customer.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { customerId, connection },
  ) => {
    const client = await getClient({
      connection,
      wsdl: BING_API.CUSTOMER_MANAGEMENT_API.WSDL,
    });

    const response = await sendAsync<GetAccountsInfoResponse>({
      debug,
      args: {
        ...(customerId ? { CustomerId: customerId } : {}),
      },
      client,
      soapAction: SOAP_ACTION,
      targetNamespace: BING_API.CUSTOMER_MANAGEMENT_API.TN,
    });

    return {
      data: response?.AccountsInfo?.AccountInfo
        ? {
            AccountsInfo: {
              AccountInfo: toArray<AccountInfo>(
                response.AccountsInfo.AccountInfo,
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
        "The identifier of the customer used to get the account information. This request element is optional. If not set, the user's credentials are used to determine the customer.",
    },
  },
  examplePayload: {
    data: getAccountsInfoExamplePayload,
  },
});
