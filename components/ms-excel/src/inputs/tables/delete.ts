import { driveOrSiteId, workbookId, worksheetId } from "../general";
import { tableId } from "./general";

export const deleteWorksheetsTablesInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to delete the table from.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID or name of the worksheet to delete the table from.",
  },
  tableId: {
    ...tableId,
    comments: "The ID or name of the table to delete.",
  },
};
