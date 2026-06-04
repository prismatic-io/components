import { input, util } from "@prismatic-io/spectral";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Google Sheets connection to use.",
});

export const spreadsheetId = input({
  label: "Spreadsheet ID",
  placeholder: "Enter Spreadsheet ID",
  type: "string",
  required: true,
  example: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  dataSource: "selectSpreadsheet",
  comments:
    "The unique identifier of the spreadsheet. You can find the spreadsheet ID in the URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit",
  clean: util.types.toString,
});

export const offset = input({
  label: "Offset",
  placeholder: "Enter offset",
  type: "string",
  required: false,
  example: "0",
  default: "0",
  comments: "The number of rows to skip from the top of the worksheet.",
  clean: util.types.toNumber,
});

export const limit = input({
  label: "Limit",
  placeholder: "Enter limit",
  type: "string",
  required: false,
  example: "100",
  default: "100",
  comments: "The maximum number of rows to retrieve.",
  clean: util.types.toNumber,
});

export const rows = input({
  label: "Rows",
  placeholder: "Enter rows data",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    [
      { "Column 1": "a", "Column 2": "b", "Column 3": "c" },
      { "Column 1": "d", "Column 2": "e", "Column 3": "f" },
    ],
    null,
    2,
  ),
  comments:
    'An array of row data. Can be an array of arrays (e.g., [[1,2,3], [4,5,6]]) or an array of objects where keys are column headers (e.g., [{"Column 1": "a"}]).',
  clean: util.types.toObject,
});

export const values = input({
  label: "Values",
  placeholder: "Enter cell values",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    {
      1: { "Column 1": "a", "Column 2": "b", "Column 3": "c" },
      2: { "Column 1": "d", "Column 2": "e", "Column 3": "f" },
    },
    null,
    2,
  ),
  comments:
    "An object where keys are row numbers and values are objects mapping column names to cell values.",
  clean: util.types.toObject,
});

export const headers = input({
  label: "Column Headings",
  placeholder: "Enter column headings",
  type: "code",
  required: true,
  language: "json",
  example: JSON.stringify(["Column 1", "Column 2", "Column 3"], null, 2),
  comments: "An array of strings representing the column header names.",
  clean: util.types.toObject,
});

export const title = input({
  label: "Worksheet Title",
  placeholder: "Enter worksheet title",
  type: "string",
  required: true,
  example: "Sheet1",
  comments: "The title of the worksheet within the spreadsheet.",
  dataSource: "selectWorksheet",
  clean: util.types.toString,
});

export const storeRawValues = input({
  label: "Store Raw Values",
  type: "boolean",
  default: "false",
  required: true,
  comments:
    'When true, stores values exactly as provided without conversion. When false, values are converted as if typed into the spreadsheet (e.g., "=SUM(A1:A5)" becomes a formula).',
  clean: util.types.toBool,
});

export const worksheetReturnName = input({
  label: "Worksheet Return",
  type: "string",
  model: [
    { label: "ID", value: "false" },
    { label: "Name", value: "true" },
  ],
  required: true,
  default: "false",
  comments:
    "Select whether to return the worksheet ID (numeric) or name (title) in the response.",
  clean: util.types.toBool,
});

export const spreadsheetChangeEventsInputs = {
  connection: connectionInput,
  spreadsheetId: {
    ...spreadsheetId,
    comments: "The spreadsheet to monitor for changes.",
  },
};
