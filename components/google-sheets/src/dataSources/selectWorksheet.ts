import { dataSource, type Element } from "@prismatic-io/spectral";
import { connectionInput, spreadsheetId, worksheetReturnName } from "../inputs";
import { worksheetProperties } from "../util";
import { createClient } from "../client";
import { selectWorksheetResponse } from "../examplePayloads";

export const selectWorksheet = dataSource({
  display: {
    label: "Select Worksheet",
    description: "Select a Worksheet",
  },
  inputs: {
    spreadsheetId: {
      ...spreadsheetId,
      dataSource: undefined,
    },
    worksheetReturnName,
    connection: connectionInput,
  },
  dataSourceType: "picklist",
  perform: async (
    _context,
    { connection, spreadsheetId, worksheetReturnName },
  ) => {
    const client = await createClient(spreadsheetId, connection);
    const sheets = client.sheetsByIndex.map((sheet) => {
      return worksheetProperties(client, sheet);
    });

    const result = sheets.map<Element>((sheet) => ({
      key: worksheetReturnName
        ? sheet.title.toString()
        : sheet.worksheetId.toString(),
      label: sheet.title as string,
    }));

    return {
      result,
    };
  },
  examplePayload: {
    result: selectWorksheetResponse,
  },
});
