import { connection, driveOrSiteId, oDataParams, workbookId } from "../general";

export const listWorksheetsInputs = {
  driveOrSiteId,
  workbookId,
  ...oDataParams,
};

export const selectWorksheetInputs = {
  connection,
  driveOrSiteId: { ...driveOrSiteId, dataSource: undefined },
  workbookId: {
    ...workbookId,
    dataSource: undefined,
  },
};
