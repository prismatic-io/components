import { cleanString } from "../../helpers";
import { driveOrSiteId, workbookId, worksheetId } from "../general";
import { name, position, visibility } from "./general";

export const updateWorksheetsInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments: "The ID of the workbook that contains the worksheet to update.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID of the worksheet to update.",
  },
  name: {
    ...name,
    comments: "The new display name of the worksheet.",
    required: false,
    clean: cleanString,
  },
  position,
  visibility,
};
