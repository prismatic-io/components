import type { Element } from "@prismatic-io/spectral";
import { dataSource, util } from "@prismatic-io/spectral";
import { createSimpleClient } from "../client";
import { selectPersonalContactExamplePayload } from "../examplePayloads";
import { $select, aoid, connection } from "../inputs";
import type { PersonalContact } from "../types";
import { fetchAllRecords } from "../util";

export const selectPersonalContact = dataSource({
  display: {
    label: "Select Personal Contact",
    description: "Select a personal contact from a worker's contacts",
  },
  inputs: {
    aoid: {
      ...aoid,
      dataSource: undefined,
    },
    $select,
    connection,
  },
  perform: async (_context, { connection, $select, aoid }) => {
    const client = await createSimpleClient(connection);
    const { data } = await fetchAllRecords<PersonalContact>(
      client,
      `/hr/v2/associates/${aoid}/personal-contacts`,
      "personalContacts",
      true,
      {
        $select,
      },
    );

    const result: Element[] = data.map((contact) => ({
      label: contact.personName.formattedName,
      key: util.types.toString(contact.itemID),
    }));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectPersonalContactExamplePayload,
});
