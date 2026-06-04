import { cleanCode } from "../../helpers";
import { driveOrSiteId, workbookId, worksheetId } from "../general";
import { tableId } from "../tables/general";
import { rowId, values } from "./general";

export const updateRowInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to update the row from.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID or name of the worksheet to update the row from.",
  },
  tableId: {
    ...tableId,
    comments: "The ID or name of the table to update the row from.",
  },
  rowId: {
    ...rowId,
    comments: "The index of the row to update.",
  },
  values: {
    ...values,
    comments: "Represents the raw values of the specified range.",
    required: false,
    example: JSON.stringify(
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      null,
      2,
    ),
    clean: cleanCode,
  },
};
