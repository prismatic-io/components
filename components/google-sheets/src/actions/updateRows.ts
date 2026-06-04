import { action, util } from "@prismatic-io/spectral";
import {
  spreadsheetId,
  title,
  values,
  storeRawValues,
  connectionInput,
} from "../inputs";
import { createClient } from "../client";
import { worksheetWithTitle, ensureRowMap, worksheetProperties } from "../util";

export const updateRows = action({
  display: {
    label: "Update Rows",
    description: "Update call values of rows in a Worksheet",
  },
  perform: async (
    _context,
    { spreadsheetId, title, values, storeRawValues, connection },
  ) => {
    const client = await createClient(spreadsheetId, connection);

    const sheet = worksheetWithTitle(client, title);

    
    const rows = await sheet.getRows();
    const headers = sheet.headerValues.reduce(
      (prev, header) => {
        prev[header] = true;
        return prev;
      },
      {} as Record<string, boolean>,
    );
    for (const [strRowNumber, cellValues] of Object.entries(
      ensureRowMap(values),
    )) {
      const rowNumber = util.types.toNumber(strRowNumber);
      if (rowNumber <= 0) {
        throw new Error(`Row number must be 1 or greater: ${rowNumber}.`);
      }

      const rowToUpdate = rowNumber - 1;
      for (const [colHeading, value] of Object.entries(cellValues)) {
        if (!(colHeading in headers)) {
          throw new Error(
            `Unable to set values for unknown column: ${colHeading}`,
          );
        }
        rows[rowToUpdate].set(colHeading, value);
      }
      await rows[rowToUpdate].save({
        raw: util.types.toBool(storeRawValues, false),
      });
    }

    return {
      data: worksheetProperties(client, sheet),
    };
  },
  inputs: {
    spreadsheetId,
    title,
    values,
    storeRawValues,
    connection: connectionInput,
  },
});

export default updateRows;
