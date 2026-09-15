import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCustomersContactExamplePayload } from "../../examplePayloads";
import { listCustomersContactInputs } from "../../inputs";
import { listCustomersContactOutputSchema } from "../../outputSchemas";
import type { ContactCustomer } from "../../types";
import { fetchAllRecords } from "../../util";
export const listCustomersContact = action({
  display: {
    label: "List Customer Contacts",
    description: "Gets a list of contacts for the specified customer.",
  },
  inputs: listCustomersContactInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCustomersContactOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      includeTotal,
      pagination,
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
        page: pagination.page,
        pageSize: pagination.pageSize,
        modifiedBefore,
        modifiedOnOrAfter,
      },
    });
    return {
      data,
    };
  },
  examplePerform: async () => listCustomersContactExamplePayload,
  examplePayload: listCustomersContactExamplePayload,
});
