import { input, util } from "@prismatic-io/spectral";
import { driveOrSiteId, workbookId, worksheetId } from "../general";

const address = input({
  label: "Address",
  comments:
    "Address or name of the range object representing the data source. If the address doesn't contain a sheet name, the currently active sheet is used.",
  type: "string",
  required: true,
  example: "A1",
  placeholder: "Enter cell range address",
  clean: util.types.toString,
});

const hasHeaders = input({
  label: "Has Headers",
  comments:
    "When true, indicates the data being imported has column labels. When false, Excel generates a header row and shifts data down by one row.",
  type: "boolean",
  required: true,
  clean: util.types.toBool,
});

export const createWorksheetsTablesInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to create the table in.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID of the worksheet to create the table in.",
  },
  address,
  hasHeaders,
};
