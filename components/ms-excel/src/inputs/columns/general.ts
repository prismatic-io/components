import { input, util } from "@prismatic-io/spectral";

export const columnId = input({
  label: "Column ID",
  comments: "The ID or name of the column to retrieve.",
  type: "string",
  required: true,
  example: "1",
  placeholder: "Enter column ID",
  dataSource: "selectColumn",
  clean: util.types.toString,
});

export const values = input({
  label: "Values",
  comments: "A 2D array of values for the column cells.",
  type: "code",
  language: "json",
  required: true,
  placeholder: "Enter 2D array of column values as JSON",
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
