import { dataSource, Element, util } from "@prismatic-io/spectral";

import { BING_API, toArray } from "../util";
import { connectionInput, customerIdInput } from "../inputs";
import { getClient, sendAsync } from "../client";
import {
  AccountInfo,
  GetAccountsInfoResponse,
} from "../actions/getAccountsInfo";
import { selectAccountIdExamplePayload } from "../examplePayloads";

const SOAP_ACTION = "GetAccountsInfo";

export const selectAccountId = dataSource({
  display: {
    label: "Select Account ID",
    description:
      "Gets the account identifiers that are accessible from the specified customer.",
  },
  perform: async (context, { connection, customerId }) => {
    const client = await getClient({
      connection,
      wsdl: BING_API.CUSTOMER_MANAGEMENT_API.WSDL,
    });

    const response = await sendAsync<GetAccountsInfoResponse>({
      args: {
        ...(customerId ? { CustomerId: customerId } : {}),
      },
      client,
      soapAction: SOAP_ACTION,
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
  inputs: {
    connection: connectionInput,
    customerId: {
      ...customerIdInput,
      dataSource: undefined,
    },
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: selectAccountIdExamplePayload,
  },
});
