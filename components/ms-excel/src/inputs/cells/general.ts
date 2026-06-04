import { input, util } from "@prismatic-io/spectral";

export const column = input({
  label: "Column Index",
  comments:
    "The zero-based index of the column to access within the worksheet.",
  type: "string",
  required: true,
  example: "0",
  placeholder: "Enter column index",
  dataSource: "selectColumn",
  clean: util.types.toNumber,
});

export const row = input({
  label: "Row Index",
  comments: "The zero-based index of the row to access within the worksheet.",
  type: "string",
  required: true,
  example: "0",
  placeholder: "Enter row index",
  clean: util.types.toNumber,
});

export const values = input({
  label: "Values",
  comments:
    "Represents the raw values of the specified range. The data returned could be of type string, number, or a Boolean. Cell that contains an error returns the error string.",
  type: "code",
  language: "json",
  required: true,
  placeholder: "Enter 2D array of cell values as JSON",
  example: JSON.stringify(
    [
      [1, 2, 3],
      [4, 5, 6],
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});

export const address = input({
  label: "Address",
  comments: "The address of the range to update.",
  type: "string",
  required: true,
  example: "A1:B2",
  placeholder: "Enter cell range address",
  clean: util.types.toString,
});
