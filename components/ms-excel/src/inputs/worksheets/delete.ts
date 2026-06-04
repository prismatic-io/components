import { driveOrSiteId, workbookId, worksheetId } from "../general";

export const deleteWorksheetsInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments: "The ID of the workbook that contains the worksheet to delete.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID of the worksheet to delete.",
  },
};
