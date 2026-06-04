import { action } from "@prismatic-io/spectral";

import {
  accountIdInput,
  accountLifeCycleStatusInput,
  accountNameInput,
  accountNumberInput,
  connectionInput,
  orderingInput,
  customerIdInput,
  userIdInput,
} from "../inputs";
import { Args, getClient, sendAsync } from "../client";
import { BING_API, toArray } from "../util";
import { CustomerInfo } from "./getCustomersInfo";
import { searchAccountsExamplePayload } from "../examplePayloads";

const SOAP_ACTION = "SearchAccounts";
const MAX_SIZE = 1000;

interface AdvertiserAccount {
  BillToCustomerId: number;
  CurrencyCode: string;
  AccountFinancialStatus: string;
  Id: number;
  Language: string;
  LastModifiedByUserId: number;
  LastModifiedTime: string;
  Name: string;
  Number: string;
  ParentCustomerId: number;
  PaymentMethodId: number;
  PaymentMethodType: string;
  PrimaryUserId: number;
  AccountLifeCycleStatus: string;
  TimeStamp: string;
  TimeZone: string;
  LinkedAgencies: {
    CustomerInfo: CustomerInfo | CustomerInfo[];
  };
  TaxInformation: {
    KeyValuePairOfstringstring: {
      key: string;
      value: number;
    }[];
  };
  BusinessAddress: {
    City: string;
    CountryCode: string;
    Id: number;
    Line1: string;
    Line2: string;
    PostalCode: number;
    StateOrProvince: string;
    BusinessName: string;
  };
  AutoTagType: string;
}

export interface SearchAccountsResponse {
  Accounts: {
    AdvertiserAccount: AdvertiserAccount | AdvertiserAccount[];
  };
}

export const searchAccounts = action({
  display: {
    label: "Search Accounts",
    description: "Searches for accounts that match the request criteria.",
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
            "v13e:Size": MAX_SIZE,
          },
      },
      client,
      soapAction: SOAP_ACTION,
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
  inputs: {
    accountId: {
      ...accountIdInput,
      comments:
        "Use this field to search the Id element of the AdvertiserAccount.",
    },
    accountLifeCycleStatus: accountLifeCycleStatusInput,
    accountName: accountNameInput,
    accountNumber: accountNumberInput,
    connection: connectionInput,
    ordering: orderingInput,
    customerId: {
      ...customerIdInput,
      comments: "Use this field to search the Id element of the Customer.",
    },
    userId: userIdInput,
  },
  examplePayload: {
    data: searchAccountsExamplePayload,
  },
});
