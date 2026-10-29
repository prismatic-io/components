import { action } from "@prismatic-io/spectral";
import { spreadsheetId, title, headers, connectionInput } from "../inputs";
import { createClient } from "../client";
import { ensureList, ensureTitle, worksheetProperties } from "../util";

export const addSheet = action({
  display: {
    label: "Add Worksheet",
    description: "Add a new Worksheet to a Google Sheet Document",
  },
  perform: async (_context, { spreadsheetId, title, headers, connection }) => {
    const client = await createClient(spreadsheetId, connection);

    const sheet = await client.addSheet({
      title: ensureTitle(title),
      headerValues: ensureList(headers) as string[],
    });

    return {
      data: worksheetProperties(client, sheet),
    };
  },
  inputs: { spreadsheetId, title, headers, connection: connectionInput },
});

export default addSheet;
