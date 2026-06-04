import { action } from "@prismatic-io/spectral";
import { spreadsheetId, title, headers, connectionInput } from "../inputs";
import { createClient } from "../client";
import { worksheetWithTitle, ensureList, worksheetProperties } from "../util";

export const setHeaderRow = action({
  display: {
    label: "Set Header Row",
    description: "Set the column headings in a Worksheet",
  },
  perform: async (_context, { spreadsheetId, title, headers, connection }) => {
    const client = await createClient(spreadsheetId, connection);

    const sheet = worksheetWithTitle(client, title);
    await sheet.setHeaderRow(ensureList(headers) as string[]);

    return {
      data: worksheetProperties(client, sheet),
    };
  },
  inputs: { spreadsheetId, title, headers, connection: connectionInput },
});

export default setHeaderRow;
