import { createKarbonClient } from "../../client";
import { dataSource, type Element } from "@prismatic-io/spectral";
import type { Contact } from "../../interfaces/Contact";
import { connection } from "../../inputs/shared";
import { getPaginatedData } from "../../utils";

export const selectContact = dataSource({
  display: {
    label: "Select Contact",
    description: "Select a Contact from a dropdown menu",
  },
  inputs: { connection },
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
    const client = createKarbonClient(connection, false);
    const data = await getPaginatedData<Contact>({
      client,
      endpoint: "/v3/Contacts",
      getAllData: true,
      pagination: {},
    });
    const contacts = data.value || [];
    const objects = contacts.map<Element>((contact) => ({
      key: contact.ContactKey,
      label: `${contact.FullName || "No Name"} ${contact.EmailAddress || ""}`,
    }));

    return { result: objects };
  },
});
