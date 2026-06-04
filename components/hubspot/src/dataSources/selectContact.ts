import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { selectContactInputs } from "../inputs";
import type { Contact } from "../types/Contact";
import { getAllPaginatedData } from "../util";

export const selectContact = dataSource({
  display: {
    label: "Select Contact",
    description: "Select a contact from the list of contacts.",
  },
  inputs: selectContactInputs,
  perform: async (_context, { connection }) => {
    const client = getHubspotClient({
      hubspotConnection: connection,
      debugRequest: false,
    });

    const contacts = (await getAllPaginatedData<Contact>(
      client,
      "/crm/v3/objects/contacts",
      true,
      true,
    )) as Contact[];

    const result = contacts.map<Element>((contact) => ({
      label: `${contact.properties.firstname ? contact.properties.firstname : ""} ${contact.properties.lastname ? contact.properties.lastname : ""} ${contact.properties.email ? `(${contact.properties.email})` : ""}`,
      key: util.types.toString(contact.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
