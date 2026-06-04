import { action } from "@prismatic-io/spectral";
import { spreadsheetId, title, connectionInput } from "../inputs";
import { createClient } from "../client";
import { worksheetWithTitle, worksheetProperties } from "../util";

export const removeSheet = action({
  display: {
    label: "Remove Worksheet",
    description: "Remove a Worksheet from a Google Sheet Document",
  },
  perform: async (_context, { spreadsheetId, title, connection }) => {
    const client = await createClient(spreadsheetId, connection);

    const sheet = worksheetWithTitle(client, title);

    
    const properties = worksheetProperties(client, sheet);

    await client.deleteSheet(sheet.sheetId);

    return {
      data: properties,
    };
  },
  inputs: { spreadsheetId, title, connection: connectionInput },
});

export default removeSheet;
