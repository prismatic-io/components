import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectContactInputs } from "../inputs";

export const selectContact = dataSource({
  display: {
    label: "Select Contact",
    description: "Select a contact from the Smartsheet account.",
  },
  dataSourceType: "picklist",
  inputs: selectContactInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { data: contacts },
    } = await client.get("/contacts", {
      params: { includeAll: true },
    });

    if (!contacts || !Array.isArray(contacts)) {
      return { result: [] };
    }

    const result: Element[] = contacts.map(
      ({ name: label, id: key }: { name: string; id: string | number }) => ({
        label,
        key: util.types.toString(key),
      }),
    );

    return { result };
  },
});
