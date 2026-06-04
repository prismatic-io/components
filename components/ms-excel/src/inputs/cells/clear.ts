import { input } from "@prismatic-io/spectral";
import { driveOrSiteId, workbookId, worksheetId } from "../general";
import { address } from "./general";
import { cleanString, mapModelArray } from "../../helpers";

const applyTo = input({
  label: "Apply To",
  type: "string",
  comments: "Determines the type of clear action.",
  required: false,
  model: mapModelArray(["All", "Formats", "Contents"]),
  clean: cleanString,
});

export const clearCellInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to clear cells from.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID or name of the worksheet to clear cells from.",
  },
  address,
  applyTo,
};
