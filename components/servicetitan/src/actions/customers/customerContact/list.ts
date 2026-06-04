import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { listCustomerContactsResponse } from "../../../examplePayloads";
import {
  connection,
  customerId,
  fetchAll,
  includeTotal,
  modifiedBefore,
  modifiedOnOrAfter,
  page,
  pageSize,
} from "../../../inputs";
import type { ContactCustomer } from "../../../interfaces";
import { fetchAllRecords } from "../../../util";

export const listCustomersContact = action({
  display: {
    label: "List Customer Contacts",
    description: "Gets a list of contacts for the specified customer",
  },
  inputs: {
    connection,
    customerId,
    fetchAll,
    page,
    pageSize,
    includeTotal,
    modifiedBefore,
    modifiedOnOrAfter,
  },
  perform: async (
    context,
    {
      connection,
      includeTotal,
      page,
      pageSize,
      customerId,
      modifiedBefore,
      modifiedOnOrAfter,
      fetchAll,
    },
  ) => {
    const CUSTOMER_CONTACT_URL =
      modifiedBefore || modifiedOnOrAfter
        ? `/customers/contacts?customerIds=${customerId}`
        : `/customers/${customerId}/contacts`;
    const client = createClient(connection, "crm", context.debug.enabled);

    if (fetchAll) {
      const data = await fetchAllRecords<ContactCustomer>(
        client,
        CUSTOMER_CONTACT_URL,
        {
          includeTotal,
          modifiedBefore,
          modifiedOnOrAfter,
        },
      );
      return {
        data,
      };
    }
    const { data } = await client.get(CUSTOMER_CONTACT_URL, {
      params: {
        includeTotal,
        page,
        pageSize,
        modifiedBefore,
        modifiedOnOrAfter,
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: listCustomerContactsResponse,
  },
});
