import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectColumnInputs } from "../inputs";

export const selectColumn = dataSource({
  display: {
    label: "Select Column",
    description: "Select a column from a specific sheet.",
  },
  dataSourceType: "picklist",
  inputs: selectColumnInputs,
  perform: async (_context, { connection, sheetId }) => {
    const client = createClient(connection, false);
    const {
      data: { data: columns },
    } = await client.get(`/sheets/${sheetId}/columns`);

    if (!columns || !Array.isArray(columns)) {
      return { result: [] };
    }

    const result: Element[] = columns.map(({ title: label, id: key }) => ({
      label,
      key: util.types.toString(key),
    }));

    return { result };
  },
});
