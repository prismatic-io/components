import { dataSource, type Element, input } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";
import type { ContactCustomer } from "../interfaces";

const customerId = input({
  label: "Customer ID",
  type: "string",
  required: true,
  comments: "The customer ID to fetch contacts for.",
  clean: (value: unknown) => value as string,
});

export const selectCustomerContact = dataSource({
  display: {
    label: "Select Customer Contact",
    description:
      "Select a customer contact from a dropdown menu (up to 10,000 contacts)",
  },
  inputs: {
    connection,
    customerId,
  },
  perform: async (_context, { connection, customerId }) => {
    const client = createClient(connection, "crm");
    let contacts: ContactCustomer[] = [];
    let cursor = false;
    let page = 1;

    do {
      const { data } = await client.get(`/customers/${customerId}/contacts`, {
        params: {
          includeTotal: true,
          page,
          pageSize: 1000,
        },
      });
      contacts = [...contacts, ...data.data];
      cursor = data.hasMore;
      page++;
    } while (cursor && page < 10);

    const objects = contacts.map<Element>((contact) => ({
      key: contact.id.toString(),
      label: `${contact.type}: ${contact.value}`,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Phone: 555-1234", key: "12345" }],
  },
});
