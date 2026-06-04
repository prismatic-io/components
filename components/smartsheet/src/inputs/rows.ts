import { input, util } from "@prismatic-io/spectral";
import { cleanObjectInput } from "../util";
import {
  connectionInput,
  includeAll,
  page,
  pageSize,
  rowId,
  rowIdOptional,
  sheetId,
  validateId,
} from "./common";

const dynamicColumns = input({
  label: "Dynamic Columns Values",
  type: "code",
  language: "json",
  required: false,
  comments:
    "A JSON array of objects mapping column titles to cell values for the row. Use this when column titles are easier to reference than column IDs.",
  example: JSON.stringify(
    [
      { key: "My First Column", value: "123" },
      { key: "My Second Column", value: "456" },
    ],
    null,
    2,
  ),
  clean: cleanObjectInput,
});

const sourceSheetId = input({
  label: "Source Sheet ID",
  type: "string",
  required: true,
  clean: validateId,
  comments: "The unique identifier of the sheet to copy or move rows from.",
  example: "4583173393803140",
  placeholder: "Enter source sheet ID",
});

const rowIds = input({
  label: "Row IDs",
  type: "string",
  required: true,
  collection: "valuelist",
  example: "6830028284938",
  clean: (values) =>
    ((values as string[]) || []).map((value) => validateId(value)),
  comments:
    "The unique identifiers of the rows to move or copy from the source sheet.",
  placeholder: "Enter row ID",
});

const toSheetId = input({
  label: "Destination Sheet ID",
  type: "string",
  required: true,
  clean: validateId,
  comments: "The unique identifier of the sheet to move or copy rows into.",
  example: "4583173393803140",
  placeholder: "Enter destination sheet ID",
});

const columnValues = input({
  label: "Column Values",
  placeholder: "Enter column values",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "A list of column names mapped to the values to write into them.",
});

const position = input({
  label: "Row Position (for new rows)",
  type: "string",
  required: false,
  default: "toBottom",
  model: [
    { label: "Bottom of Sheet", value: "toBottom" },
    { label: "Top of Sheet", value: "toTop" },
  ],
  clean: util.types.toString,
  comments: "The position where new rows are added to the sheet.",
});

const allowPartialSuccess = input({
  label: "Allow Partial Success",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
  comments:
    "When true, allows the bulk operation to partially succeed if some rows fail validation rather than failing the entire request.",
});

const overrideValidation = input({
  label: "Override Validation",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
  comments:
    "When true, allows cell values outside of the validation limits defined on the column.",
});

export const attachmentsListOnRowInputs = {
  connection: connectionInput,
  sheetId,
  rowId,
  includeAll,
  page,
  pageSize,
};

export const copyRowsInputs = {
  connection: connectionInput,
  sheetId: sourceSheetId,
  rowIds,
  toSheetId,
};

export const deleteRowInputs = {
  connection: connectionInput,
  sheetId,
  rowId,
};

export const moveRowsInputs = {
  connection: connectionInput,
  sheetId,
  rowIds: { ...rowIds, required: false },
  toSheetId,
};

export const rowGetInputs = {
  connection: connectionInput,
  sheetId,
  rowId,
};

export const rowsAddToSheetInputs = {
  connection: connectionInput,
  sheetId,
  updateIdentifier: {
    ...rowIdOptional,
    comments:
      "The unique identifier of an existing row to update. Omit to add a new row instead.",
  },
  dynamicColumns,
  columnValues,
  position,
  allowPartialSuccess,
  overrideValidation,
};
