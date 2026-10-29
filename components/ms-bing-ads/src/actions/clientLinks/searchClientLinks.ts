import { action } from "@prismatic-io/spectral";
import { getClient, sendAsync } from "../../client";
import { BING_API, PAGE_SIZE, SOAP_ACTION } from "../../constants";
import { searchClientLinksExamplePayload } from "../../examplePayloads";
import { searchClientLinksInputs } from "../../inputs/clientLinks";
import type { Args, ClientLink, SearchClientLinksResponse } from "../../types";
import { toArray } from "../../util";

export const searchClientLinks = action({
  display: {
    label: "Search Client Links",
    description:
      "Searches for the client links for the customer of the current authenticated user, filtered by the search criteria. The operation returns the most recent link for each unique combination of agency customer and client account. Utilizes the SOAP API.",
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
            "v13e:Size": PAGE_SIZE.clientLinks,
          },
      },
      client,
      soapAction: SOAP_ACTION.SearchClientLinks,
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
  inputs: searchClientLinksInputs,
  examplePayload: searchClientLinksExamplePayload,
});
