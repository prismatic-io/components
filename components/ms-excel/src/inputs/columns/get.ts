import { driveOrSiteId, workbookId, worksheetId } from "../general";
import { tableId } from "../tables/general";
import { columnId } from "./general";

export const getColumnInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to list column from.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID or name of the worksheet to list column from.",
  },
  tableId: {
    ...tableId,
    comments: "The ID or name of the table to list column from.",
  },
  columnId,
};
