import { driveOrSiteId, workbookId, worksheetId } from "../general";
import { tableId } from "../tables/general";
import { rowId } from "./general";

export const getRowsInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to list rows from.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID or name of the worksheet to list rows from.",
  },
  tableId: {
    ...tableId,
    comments: "The ID or name of the table to list rows from.",
  },
  rowId,
};
