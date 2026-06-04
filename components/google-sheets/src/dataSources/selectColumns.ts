import {
  dataSource,
  type Element,
  type ObjectSelection,
} from "@prismatic-io/spectral";
import { connectionInput, spreadsheetId, title } from "../inputs";
import { worksheetWithTitle } from "../util";
import { createClient } from "../client";
import { selectColumnsResponse } from "../examplePayloads";

export const selectColumns = dataSource({
  display: {
    label: "Select Columns",
    description: "Select Columns from a Worksheet",
  },
  inputs: {
    spreadsheetId: {
      ...spreadsheetId,
      dataSource: undefined,
    },
    title: {
      ...title,
      dataSource: undefined,
    },
    connection: connectionInput,
  },
  dataSourceType: "objectSelection",
  perform: async (_context, { connection, spreadsheetId, title }) => {
    const client = await createClient(spreadsheetId, connection);

    const spreadsheet = worksheetWithTitle(client, title);

    const options = { limit: 1, offset: 0 };
    await spreadsheet.getRows(options);

    const columns = spreadsheet.headerValues;
    const objects: ObjectSelection = columns.map((column) => {
      const object: Element = { key: column, label: column };
      return { object };
    });

    return { result: objects };
  },
  examplePayload: { result: selectColumnsResponse },
});
