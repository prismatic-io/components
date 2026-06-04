import {
  connection,
  driveOrSiteId,
  oDataParams,
  workbookId,
  worksheetId,
} from "../general";
import { tableId } from "../tables/general";

export const listColumnsInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to list columns from.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID or name of the worksheet to list columns from.",
  },
  tableId: {
    ...tableId,
    comments: "The ID or name of the table to list columns from.",
  },
  ...oDataParams,
};

export const selectColumnInputs = {
  connection,
  driveOrSiteId: { ...driveOrSiteId, dataSource: undefined },
  workbookId: { ...listColumnsInputs.workbookId, dataSource: undefined },
  worksheetId: {
    ...listColumnsInputs.worksheetId,
    dataSource: undefined,
  },
  tableId: { ...listColumnsInputs.tableId, dataSource: undefined },
};
