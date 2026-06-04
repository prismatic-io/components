import { action } from "@prismatic-io/spectral";
import { spreadsheetId, title, connectionInput } from "../inputs";
import { createClient } from "../client";
import { worksheetWithTitle } from "../util";
import { getColumnResponse } from "../examplePayloads";

export const listColumns = action({
  display: {
    label: "List Columns",
    description: "Get the headers of a Worksheet",
  },
  perform: async (_context, { spreadsheetId, title, connection }) => {
    const client = await createClient(spreadsheetId, connection);

    const sheet = worksheetWithTitle(client, title);

    const options = { limit: 1, offset: 0 };
    await sheet.getRows(options);
    const headers = sheet.headerValues;

    return {
      data: headers,
    };
  },
  inputs: { spreadsheetId, title, connection: connectionInput },
  examplePayload: {
    data: getColumnResponse,
  },
});

export default listColumns;
