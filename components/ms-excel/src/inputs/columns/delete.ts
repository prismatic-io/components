import { driveOrSiteId, workbookId, worksheetId } from "../general";
import { tableId } from "../tables/general";
import { columnId } from "./general";

export const deleteColumnInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to delete the column from.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID or name of the worksheet to delete the column from.",
  },
  tableId: {
    ...tableId,
    comments: "The ID or name of the table to delete the column from.",
  },
  columnId: {
    ...columnId,
    comments: "The id or name of the column to delete.",
  },
};
