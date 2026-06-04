import { driveOrSiteId, workbookId, worksheetId } from "../general";

export const getCellRangeInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to list cells from.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID or name of the worksheet to list cells from.",
  },
};
