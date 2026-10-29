import { input, util } from "@prismatic-io/spectral";
import { driveOrSiteId, workbookId, worksheetId } from "../general";
import { TABLE_STYLES } from "../../constants";
import { tableId } from "./general";
import { cleanString, mapModelArray } from "../../helpers";

const name = input({
  label: "Name",
  comments: "The display name of the table within the worksheet.",
  type: "string",
  required: false,
  example: "Table1",
  placeholder: "Enter table name",
  clean: cleanString,
});

const showHeaders = input({
  label: "Show Headers",
  comments: "When true, the header row of the table is visible.",
  type: "boolean",
  required: true,
  clean: util.types.toBool,
});

const showTotals = input({
  label: "Show Totals",
  comments: "When true, the totals row of the table is visible.",
  type: "boolean",
  required: true,
  clean: util.types.toBool,
});

const style = input({
  label: "Style",
  comments:
    "The Excel table style to apply. Controls visual formatting such as banding and header colors.",
  type: "string",
  required: false,
  model: mapModelArray(TABLE_STYLES),
  clean: cleanString,
});

export const updateWorksheetsTablesInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to update the table from.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID or name of the worksheet to update the table from.",
  },
  tableId: {
    ...tableId,
    comments: "The ID or name of the table to update.",
  },
  name,
  showHeaders,
  showTotals,
  style,
};
