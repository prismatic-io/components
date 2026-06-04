import { action } from "@prismatic-io/spectral";
import {
  spreadsheetId,
  title,
  rows,
  storeRawValues,
  connectionInput,
} from "../inputs";
import { createClient } from "../client";
import { worksheetWithTitle, ensureList, worksheetProperties } from "../util";

export const appendRows = action({
  display: {
    label: "Append Rows",
    description: "Append new rows to a Worksheet",
  },
  perform: async (
    _context,
    { spreadsheetId, title, rows, storeRawValues, connection },
  ) => {
    const client = await createClient(spreadsheetId, connection);

    const sheet = worksheetWithTitle(client, title);

    // @ts-expect-error google-spreadsheet types are too restrictive; accepts array of objects or arrays
    await sheet.addRows(ensureList(rows), {
      raw: storeRawValues,
    });

    return {
      data: worksheetProperties(client, sheet),
    };
  },
  inputs: {
    spreadsheetId,
    title,
    rows,
    storeRawValues,
    connection: connectionInput,
  },
});

export default appendRows;
