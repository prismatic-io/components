import { driveOrSiteId, workbookId, worksheetId } from "../general";
import { tableId } from "./general";

export const getWorksheetsTablesInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to get the table from.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID or name of the worksheet to get the table from.",
  },
  tableId,
};
