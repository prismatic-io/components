import { dataSource, type Element } from "@prismatic-io/spectral";
import { getXeroClient } from "../client";
import { connectionInput } from "../inputs";
import { type Contact } from "../interfaces/Contact";
import { fetchAllData } from "../util";

export const selectContact = dataSource({
  display: {
    label: "Select Contact",
    description: "Select a contact from the list",
  },
  inputs: { xeroConnection: connectionInput },
  dataSourceType: "picklist",
  perform: async (context, { xeroConnection }) => {
    const client = await getXeroClient(xeroConnection, false);
    const data = await fetchAllData<Contact, "Contacts">({
      client,
      path: "/contacts",
      key: "Contacts",
      queryParams: {},
      headers: {},
      fetchAll: true,
    });

    const result = (data.Contacts || []).map<Element>((contact) => ({
      label: contact.Name,
      key: contact.ContactID,
    }));
    return { result };
  },
});
