import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";
import { fetchAllData } from "../util";
import type { Form } from "../interfaces/forms";
import { selectFormExample } from "../examplePayloads/datasources";

export const selectForm = dataSource({
  display: {
    label: "Select Form",
    description: "Allow a user to select one of their forms",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await fetchAllData<Form>(client, `/forms`, {}, true);
    const result = data.items.map<Element>(({ title, id }) => ({
      label: title,
      key: id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: selectFormExample,
  },
});
