import { driveOrSiteId, workbookId, worksheetId } from "../general";
import { tableId } from "../tables/general";
import { rowId } from "./general";

export const deleteRowsInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to delete the row from.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID or name of the worksheet to delete the row from.",
  },
  tableId: {
    ...tableId,
    comments: "The ID or name of the table to delete the row from.",
  },
  rowId: {
    ...rowId,
    comments: "The index of the row to delete.",
  },
};
