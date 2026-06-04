import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { company, connection, site } from "../inputs/general";

export const selectCustomerContact = dataSource({
  display: {
    label: "Select Customer Contact",
    description: "Select a customer contact from a dropdown list.",
  },
  perform: async (_context, { connection, site, company }) => {
    const client = getClient(connection, false, site, company);
    const { data } =
      await client.get<{ id: number; name: string; default_email: string }[]>("/customer_contacts");

    const objects = data.map<Element>((contact) => ({
      key: util.types.toString(contact.id),
      label: contact.default_email ? `${contact.name} (${contact.default_email})` : contact.name,
    }));

    return {
      result: objects.sort((a, b) => (a.label ?? "").localeCompare(b.label ?? "")),
    };
  },
  dataSourceType: "picklist",
  inputs: {
    connection,
    site,
    company,
  },
  examplePayload: {
    result: [
      {
        label: "Art Vandelay Dalkin (newbusinessadvice@sage.com)",
        key: "27914",
      },
    ],
  },
});
