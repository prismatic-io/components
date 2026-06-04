import { cleanCode } from "../../helpers";
import { driveOrSiteId, workbookId, worksheetId } from "../general";
import { tableId } from "../tables/general";
import { columnId, values } from "./general";

export const updateColumnInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to update the column from.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID or name of the worksheet to update the column from.",
  },
  tableId: {
    ...tableId,
    comments: "The ID or name of the table to update the column from.",
  },
  columnId: {
    ...columnId,
    comments: "The id or name of the column to update.",
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
