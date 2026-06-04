import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectContactInputs } from "../inputs";
import type { Contact } from "../interfaces";
import { paginateRecords } from "../util";

export const selectContact = dataSource({
  display: {
    label: "Select Contact",
    description: "A Picklist of Intercom contacts",
  },
  dataSourceType: "picklist",
  inputs: selectContactInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data: contacts } = await paginateRecords<Contact>(
      client,
      {
        order: "asc",
      },
      true,
      "/contacts",
    );

    const result = contacts.map(({ id, name, email }): Element => {
      return {
        label: name || email,
        key: id,
      };
    });

    return {
      result,
    };
  },
});
