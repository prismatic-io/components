import { input, util } from "@prismatic-io/spectral";
import { boardId, connectionInput } from "./common";

const columnId = input({
  label: "Column ID",
  type: "string",
  required: true,
  example: "status",
  comments:
    "The ID of the column to filter by. For possible values see the [Monday.com column types reference](https://developer.monday.com/api-reference/reference/column-types-reference#supported-columns).",
  placeholder: "Enter Column ID",
  clean: util.types.toString,
});

const getAllItems = input({
  label: "Get All Items",
  type: "boolean",
  required: false,
  comments:
    "When true, automatically fetches all pages of items matching the column value. When false, a maximum of 500 items will be returned.",
  default: "false",
  clean: util.types.toBool,
});

const columnValue = input({
  label: "Column Value",
  type: "string",
  required: true,
  comments:
    "The value to match against the specified column when searching for items.",
  placeholder: "Enter column value",
  example: "Done",
  clean: util.types.toString,
});

export const getItemsByColumnValueInputs = {
  connection: connectionInput,
  boardId,
  columnId,
  columnValue,
};

export const getItemsByColumnValueNewInputs = {
  connection: connectionInput,
  boardId,
  columnId,
  columnValue,
  getAllItems,
};
