import { action } from "@prismatic-io/spectral";

import {
  connectionInput,
  orderingInput,
  clientAccountIdInput,
  clientCustomerIdInput,
  directManagingCustomerIdInput,
  managingCustomerIdInput,
} from "../inputs";
import { Args, getClient, sendAsync } from "../client";
import { BING_API, toArray } from "../util";
import { searchClientLinksExamplePayload } from "../examplePayloads";

const SOAP_ACTION = "SearchClientLinks";
const MAX_SIZE = 100;

interface ClientLink {
  ClientEntityId: number;
  ClientEntityName: string;
  ClientEntityNumber: string;
  InviterEmail: string;
  InviterName: string;
  InviterPhone: string;
  IsBillToClient: boolean;
  LastModifiedByUserId: number;
  LastModifiedDateTime: string;
  ManagingCustomerId: number;
  ManagingCustomerName: string;
  ManagingCustomerNumber: string;
  Name: string;
  Note: string;
  StartDate: string;
  Status: string;
  SuppressNotification: boolean;
  Timestamp: string;
  Type: string;
}

export interface SearchClientLinksResponse {
  ClientLinks: {
    ClientLink: ClientLink | ClientLink[];
  };
}

export const searchClientLinks = action({
  display: {
    label: "Search Client Links",
    description:
      "Searches for the client links for the customer of the current authenticated user, filtered by the search criteria. The operation returns the most recent link for each unique combination of agency customer and client account.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      clientAccountId,
      clientCustomerId,
      connection,
      directManagingCustomerId,
      managingCustomerId,
      ordering,
    },
  ) => {
    const client = await getClient({
      connection,
      wsdl: BING_API.CUSTOMER_MANAGEMENT_API.WSDL,
    });

    const response = await sendAsync<SearchClientLinksResponse>({
      debug,
      args: {
        'Predicates xmlns:v13e="https://bingads.microsoft.com/Customer/v13/Entities"':
          Object.entries({
            ClientAccountId: clientAccountId,
            ClientCustomerId: clientCustomerId,
            DirectManagingCustomerId: directManagingCustomerId,
            ManagingCustomerId: managingCustomerId,
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
      data: response?.ClientLinks?.ClientLink
        ? {
            ClientLinks: {
              ClientLink: toArray<ClientLink>(response.ClientLinks.ClientLink),
            },
          }
        : response,
    };
  },
  inputs: {
    clientAccountId: clientAccountIdInput,
    clientCustomerId: clientCustomerIdInput,
    connection: connectionInput,
    directManagingCustomerId: directManagingCustomerIdInput,
    managingCustomerId: {
      ...managingCustomerIdInput,
      comments:
        "Search for advertiser account ClientLink objects by the agency's managing customer identifier. If other customers also link to the client advertiser account, the results will include those client links. This predicate value is deprecated in favor of the DirectManagingCustomerId predicate.",
    },
    ordering: orderingInput,
  },
  examplePayload: {
    data: searchClientLinksExamplePayload,
  },
});
