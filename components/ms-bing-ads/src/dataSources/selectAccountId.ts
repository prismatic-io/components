import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getClient, sendAsync } from "../client";
import { BING_API, SOAP_ACTION } from "../constants";
import { selectAccountIdExamplePayload } from "../examplePayloads";
import { selectAccountIdInputs } from "../inputs/accounts";
import type { AccountInfo, GetAccountsInfoResponse } from "../types";
import { toArray } from "../util";

export const selectAccountId = dataSource({
  display: {
    label: "Select Account ID",
    description:
      "Gets the account identifiers that are accessible from the specified customer.",
  },
  perform: async (_context, { connection, customerId }) => {
    const client = await getClient({
      connection,
      wsdl: BING_API.CUSTOMER_MANAGEMENT_API.WSDL,
    });

    const response = await sendAsync<GetAccountsInfoResponse>({
      args: {
        ...(customerId ? { CustomerId: customerId } : {}),
      },
      client,
      soapAction: SOAP_ACTION.GetAccountsInfo,
      targetNamespace: BING_API.CUSTOMER_MANAGEMENT_API.TN,
    });

    const standardizedResponse = response?.AccountsInfo?.AccountInfo
      ? {
          AccountsInfo: {
            AccountInfo: toArray<AccountInfo>(
              response.AccountsInfo.AccountInfo,
            ),
          },
        }
      : response;

    const accountIds = (
      Array.isArray(standardizedResponse?.AccountsInfo?.AccountInfo)
        ? standardizedResponse.AccountsInfo.AccountInfo
        : []
    )
      .sort((a, b) => (a.Name < b.Name ? -1 : 1))
      .map<Element>((account) => ({
        key: util.types.toString(account.Id),
        label: `${account.Name} (id: ${account.Id})`,
      }));

    return {
      result: accountIds,
    };
  },
  inputs: selectAccountIdInputs,
  dataSourceType: "picklist",
  examplePayload: selectAccountIdExamplePayload,
});
