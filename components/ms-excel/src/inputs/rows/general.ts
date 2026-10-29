import { input, util } from "@prismatic-io/spectral";

export const rowId = input({
  label: "Row Index",
  comments: "The zero-based index of the row within the table.",
  type: "string",
  required: true,
  example: "0",
  placeholder: "Enter row index",
  clean: util.types.toString,
});

export const values = input({
  label: "Values",
  comments: "A 2D array of values for the row cells.",
  type: "code",
  language: "json",
  required: true,
  placeholder: "Enter 2D array of row values as JSON",
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
