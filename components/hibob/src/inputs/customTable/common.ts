import { input, util } from "@prismatic-io/spectral";
import { cleanArrayCodeInput, cleanCodeInput } from "../../util";

export const customTableId = input({
  label: "Custom Table ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the custom table.",
  example: "custom_table_123",
  placeholder: "Enter custom table ID",
  clean: util.types.toString,
});

export const entryId = input({
  label: "Entry ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the custom table entry.",
  example: "entry_123",
  placeholder: "Enter entry ID",
  clean: util.types.toString,
});

export const entryDataCreate = input({
  label: "Entry Data",
  type: "code",
  language: "json",
  required: true,
  comments: "The data for the custom table entry in JSON format.",
  example: JSON.stringify(
    [
      {
        "Certification Name": "AWS Solutions Architect",
        "Issuing Organization": "Amazon Web Services",
        "Issue Date": "2023-01-15",
        "Expiration Date": "2026-01-15",
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Entry Data"),
});

export const entryDataUpdate = input({
  label: "Entry Data",
  type: "code",
  language: "json",
  required: true,
  comments: "The updated data for the custom table entry in JSON format.",
  example: JSON.stringify(
    {
      "Certification Name": "AWS Solutions Architect Professional",
      "Issuing Organization": "Amazon Web Services",
      "Issue Date": "2023-01-15",
      "Expiration Date": "2026-01-15",
    },
    null,
    2,
  ),
  clean: (value: unknown) => cleanCodeInput(value, "Entry Data"),
});
