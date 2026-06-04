import {
  connection,
  driveOrSiteId,
  oDataParams,
  workbookId,
  worksheetId,
} from "../general";

export const listWorksheetsTablesInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to list tables from.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID or name of the worksheet to list tables from.",
  },
  ...oDataParams,
};

export const selectTableInputs = {
  connection,
  driveOrSiteId: { ...driveOrSiteId, dataSource: undefined },
  workbookId: {
    ...listWorksheetsTablesInputs.workbookId,
    dataSource: undefined,
  },
  worksheetId: {
    ...listWorksheetsTablesInputs.worksheetId,
    dataSource: undefined,
  },
};
