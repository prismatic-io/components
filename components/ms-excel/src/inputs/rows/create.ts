import { cleanString } from "../../helpers";
import { driveOrSiteId, workbookId, worksheetId } from "../general";
import { tableId } from "../tables/general";
import { rowId, values } from "./general";

export const createRowInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to create the row in.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID or name of the worksheet to create the row in.",
  },
  tableId: {
    ...tableId,
    comments: "The ID or name of the table to create the row in.",
  },
  values,
  rowId: {
    ...rowId,
    comments:
      "Specifies the relative position of the new row. If null, the addition happens at the end. Any rows below the inserted row are shifted downwards. Zero-indexed.",
    required: false,
    clean: cleanString,
  },
};
