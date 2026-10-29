import { input, util } from "@prismatic-io/spectral";
import { cleanNumber, cleanString } from "../../helpers";

export const name = input({
  label: "Worksheet Name",
  type: "string",
  required: true,
  comments:
    "The name shown on the worksheet tab in the workbook. Must be unique within the workbook.",
  example: "Sheet1",
  placeholder: "Enter worksheet name",
  clean: util.types.toString,
});

export const position = input({
  label: "Position",
  type: "string",
  required: false,
  comments: "The zero-based position of the worksheet within the workbook.",
  example: "0",
  placeholder: "Enter position",
  clean: cleanNumber,
});

export const visibility = input({
  label: "Worksheet Visibility",
  type: "string",
  required: false,
  comments:
    "The visibility state of the worksheet. Visible worksheets appear in the tab bar. Hidden worksheets can be unhidden from the UI. VeryHidden worksheets require code to unhide.",
  model: [
    {
      label: "Visible",
      value: "Visible",
    },
    {
      label: "Hidden",
      value: "Hidden",
    },
    {
      label: "VeryHidden",
      value: "VeryHidden",
    },
  ],
  clean: cleanString,
});
