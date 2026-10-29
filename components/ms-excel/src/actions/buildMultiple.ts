import { action } from "@prismatic-io/spectral";
import { build as buildXlsx } from "node-xlsx";
import {
  multiSheetData,
  sheetNames,
  createOptions,
  alternativeSheetNames,
} from "../inputs/general";
import { buildExampleResponse } from "../examplePayloads/general";
import { buildMultidimensionalSheet } from "../helpers";

export const buildMultiple = action({
  display: {
    label: "Build Spreadsheet with Multiple Sheets",
    description:
      "Creates a buffer containing multiple spreadsheets made from a 3D JavaScript array.",
  },
  perform: async (
    _context,
    { sheetNames, multiSheetData, alternativeSheetNames, createOptions },
  ) => {
    const sheetNameInputToUse = alternativeSheetNames
      ? alternativeSheetNames
      : sheetNames;

    if (sheetNameInputToUse.length === 0) {
      throw new Error(
        "Either sheetNames or alternativeSheetNames must be provided.",
      );
    }

    const multipleSheets = buildMultidimensionalSheet<unknown[][]>(
      multiSheetData as unknown[][][],
      sheetNameInputToUse,
      createOptions,
    );

    const data = await Promise.resolve(buildXlsx(multipleSheets));

    return {
      data,
    };
  },
  inputs: { multiSheetData, sheetNames, alternativeSheetNames, createOptions },
  examplePayload: { data: buildExampleResponse },
});
