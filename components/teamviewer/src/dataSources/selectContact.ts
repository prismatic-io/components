import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs/general";
import { selectContactDataSourceExamplePayload } from "../examplePayloads/dataSources";

export const selectContact = dataSource({
  display: {
    label: "Select Contact",
    description: "Select a contact from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const { data } = await client.get(`/contacts`);
    const result = (data.contacts as []).map<Element>(
      ({ name, contact_id }) => ({
        label: name,
        key: contact_id,
      }),
    );
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: selectContactDataSourceExamplePayload,
  },
});
