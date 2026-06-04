import { driveOrSiteId, workbookId, worksheetId } from "../general";
import { tableId } from "../tables/general";
import { columnId, values } from "./general";
import { cleanCode, cleanString } from "../../helpers";

export const createColumnInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to create the column in.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID or name of the worksheet to create the column in.",
  },
  tableId: {
    ...tableId,
    comments: "The ID or name of the table to create the column in.",
  },
  values: {
    ...values,
    comments:
      "A two-dimensional array of unformatted values of the table column.",
    required: false,
    clean: cleanCode,
  },
  columnId: {
    ...columnId,
    comments:
      "Specifies the relative position of the new column. The previous column at this position is shifted to the right. The index value should be equal to or less than the last column's index value, so it can't be used to append a column at the end of the table. Zero-indexed.",
    required: false,
    clean: cleanString,
  },
};
