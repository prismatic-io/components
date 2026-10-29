import { input, util } from "@prismatic-io/spectral";
import { driveOrSiteId, workbookId, worksheetId } from "../general";
import { address } from "./general";
import { mapModelArray } from "../../helpers";

const shift = input({
  label: "Shift",
  comments: "Specifies which way to shift the cells.",
  type: "string",
  required: true,
  model: mapModelArray(["Up", "Left"]),
  clean: util.types.toString,
});

export const deleteCellRangeInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to delete cells from.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID or name of the worksheet to delete cells from.",
  },
  address,
  shift,
};
