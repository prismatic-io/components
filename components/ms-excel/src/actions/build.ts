import { action } from "@prismatic-io/spectral";
import { build as buildXlsx } from "node-xlsx";
import { sheetData, fileName, createOptions } from "../inputs/general";
import { buildExampleResponse } from "../examplePayloads/general";

export const build = action({
  display: {
    label: "Build Spreadsheet",
    description:
      "Creates a buffer containing a spreadsheet made from a 2D JavaScript array.",
  },
  perform: async (_context, { fileName, sheetData, createOptions }) => {
    
    const data = await Promise.resolve(
      buildXlsx(
        [{ name: fileName, data: sheetData as unknown[][] }],
        createOptions,
      ),
    );

    return {
      data,
    };
  },
  inputs: { sheetData, fileName, createOptions },
  examplePayload: { data: buildExampleResponse },
});
