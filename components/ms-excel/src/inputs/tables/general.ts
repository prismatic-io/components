import { input, util } from "@prismatic-io/spectral";

export const tableId = input({
  label: "Table ID",
  comments: "The unique identifier or name of the table within the worksheet.",
  type: "string",
  required: true,
  example: "{12B25C6E-59A4-4316-BE2E-325B2C8EDD50}",
  placeholder: "Enter Table ID",
  dataSource: "selectTable",
  clean: util.types.toString,
});
