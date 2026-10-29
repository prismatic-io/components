import { input, util } from "@prismatic-io/spectral";
import { connectionInput, sheetIdOptional } from "./common";

const query = input({
  label: "Search Query",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The text to search for across sheets, rows, and cells.",
  placeholder: "Enter search text",
});

export const searchSheetInputs = {
  connection: connectionInput,
  sheetId: {
    ...sheetIdOptional,
    comments:
      "The unique identifier of the sheet to search within. Omit to search across all sheets.",
  },
  query,
};
