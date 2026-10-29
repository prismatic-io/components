import { action } from "@prismatic-io/spectral";
import {
  spreadsheetId,
  title,
  limit,
  offset,
  connectionInput,
} from "../inputs";
import { createClient } from "../client";
import { worksheetWithTitle } from "../util";
import { getRowResponse } from "../examplePayloads";

export const getRows = action({
  display: {
    label: "List Rows",
    description: "List the cell values of rows in a Worksheet",
  },
  perform: async (
    _context,
    { spreadsheetId, title, limit, offset, connection },
  ) => {
    const client = await createClient(spreadsheetId, connection);

    const sheet = worksheetWithTitle(client, title);

    const rows = await sheet.getRows({
      limit,
      offset,
    });

    const cellValues = rows.map((row) => row.toObject());

    return {
      data: cellValues,
    };
  },
  inputs: {
    spreadsheetId,
    title,
    limit,
    offset,
    connection: connectionInput,
  },
  examplePayload: {
    data: getRowResponse,
  },
});

export default getRows;
