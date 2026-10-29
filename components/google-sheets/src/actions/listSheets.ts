import { action } from "@prismatic-io/spectral";
import { spreadsheetId, connectionInput } from "../inputs";
import { createClient } from "../client";
import { worksheetProperties } from "../util";
import { listSheetsResponse } from "../examplePayloads";

export const listSheets = action({
  display: {
    label: "List Worksheets",
    description:
      "List information about all Worksheets in a Google Sheet Document",
  },
  perform: async (_context, { spreadsheetId, connection }) => {
    const client = await createClient(spreadsheetId, connection);

    return {
      data: client.sheetsByIndex.map((sheet) => {
        return worksheetProperties(client, sheet);
      }),
    };
  },
  inputs: { spreadsheetId, connection: connectionInput },
  examplePayload: {
    data: listSheetsResponse,
  },
});

export default listSheets;
