import { action } from "@prismatic-io/spectral";
import { getClient, sendAsync } from "../../client";
import { BING_API, PAGE_SIZE, SOAP_ACTION } from "../../constants";
import { searchAccountsExamplePayload } from "../../examplePayloads";
import { searchAccountsInputs } from "../../inputs/accounts";
import type {
  AdvertiserAccount,
  Args,
  SearchAccountsResponse,
} from "../../types";
import { toArray } from "../../util";

export const searchAccounts = action({
  display: {
    label: "Search Accounts",
    description:
      "Searches for accounts that match the request criteria. Utilizes the SOAP API.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      accountId,
      accountLifeCycleStatus,
      accountName,
      accountNumber,
      connection,
      ordering,
      customerId,
      userId,
    },
  ) => {
    const client = await getClient({
      connection,
      wsdl: BING_API.CUSTOMER_MANAGEMENT_API.WSDL,
    });

    const response = await sendAsync<SearchAccountsResponse>({
      debug,
      args: {
        'Predicates xmlns:v13e="https://bingads.microsoft.com/Customer/v13/Entities"':
          Object.entries({
            AccountId: accountId,
            AccountLifeCycleStatus: accountLifeCycleStatus,
            AccountName: accountName,
            AccountNumber: accountNumber,
            CustomerId: customerId,
            UserId: userId,
          }).reduce((acc, [field, value]) => {
            return value
              ? [
                  ...acc,
                  {
                    "v13e:Predicate": {
                      "v13e:Field": field,
                      "v13e:Operator": "Equals",
                      "v13e:Value": value,
                    },
                  },
                ]
              : acc;
          }, [] as Args[]),
        ...(ordering
          ? {
              'Ordering xmlns:v13e="https://bingads.microsoft.com/Customer/v13/Entities"':
                {
                  "v13e:OrderBy": {
                    "v13e:Field": ordering,
                    "v13e:Order": "Ascending",
                  },
                },
            }
          : {}),
        'PageInfo xmlns:v13e="https://bingads.microsoft.com/Customer/v13/Entities"':
          {
            "v13e:Index": 0,
            "v13e:Size": PAGE_SIZE.accounts,
          },
      },
      client,
      soapAction: SOAP_ACTION.SearchAccounts,
      targetNamespace: BING_API.CUSTOMER_MANAGEMENT_API.TN,
    });

    return {
      data: response?.Accounts?.AdvertiserAccount
        ? {
            Accounts: {
              AdvertiserAccount: toArray<AdvertiserAccount>(
                response.Accounts.AdvertiserAccount,
              ),
            },
          }
        : response,
    };
  },
  inputs: searchAccountsInputs,
  examplePayload: searchAccountsExamplePayload,
});
