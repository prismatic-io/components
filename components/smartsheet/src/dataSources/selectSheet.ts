import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectSheetInputs } from "../inputs";

export const selectSheet = dataSource({
  display: {
    label: "Select Sheet",
    description: "Select a sheet from the Smartsheet account.",
  },
  dataSourceType: "picklist",
  inputs: selectSheetInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { data: sheets },
    } = await client.get("/sheets", {
      params: {
        include: "sheetVersion",
        includeAll: true,
      },
    });

    if (!sheets || !Array.isArray(sheets)) {
      return { result: [] };
    }

    const result: Element[] = sheets.map(({ name: label, id: key }) => ({
      label,
      key: util.types.toString(key),
    }));

    return { result };
  },
});
