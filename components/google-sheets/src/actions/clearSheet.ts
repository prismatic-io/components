import { action } from "@prismatic-io/spectral";
import { spreadsheetId, title, connectionInput } from "../inputs";
import { createClient } from "../client";
import { worksheetWithTitle, worksheetProperties } from "../util";

export const clearSheet = action({
  display: {
    label: "Clear Worksheet",
    description: "Clear all data in the a Worksheet",
  },
  perform: async (_context, { spreadsheetId, title, connection }) => {
    const client = await createClient(spreadsheetId, connection);

    const sheet = worksheetWithTitle(client, title);
    await sheet.clear();

    return {
      data: worksheetProperties(client, sheet),
    };
  },
  inputs: { spreadsheetId, title, connection: connectionInput },
});

export default clearSheet;
