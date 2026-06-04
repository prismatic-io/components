import { driveOrSiteId, workbookId } from "../general";
import { name } from "./general";

export const createWorksheetsInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments: "The ID of the workbook that contains the worksheet to update.",
  },
  name,
};
