import { action } from "@prismatic-io/spectral";
import { getClient, sendAsync } from "../../client";
import { BING_API, SOAP_ACTION } from "../../constants";
import { getAccountsInfoExamplePayload } from "../../examplePayloads";
import { getAccountsInfoInputs } from "../../inputs/accounts";
import type { AccountInfo, GetAccountsInfoResponse } from "../../types";
import { toArray } from "../../util";

export const getAccountsInfo = action({
  display: {
    label: "Get Accounts Info",
    description:
      "Gets the identifiers, names, and numbers of accounts that are accessible from the specified customer. Utilizes the SOAP API.",
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
      soapAction: SOAP_ACTION.GetAccountsInfo,
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
  inputs: getAccountsInfoInputs,
  examplePayload: getAccountsInfoExamplePayload,
});
