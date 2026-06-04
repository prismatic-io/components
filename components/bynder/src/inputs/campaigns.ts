import { input } from "@prismatic-io/spectral";
import { cleanString } from "../util";

export const key = input({
  label: "Key",
  type: "string",
  required: true,
  comments: "A 4-character key representing the campaign.",
  example: "CAMP",
  placeholder: "Enter campaign key",
  clean: cleanString,
});

export const responsibleId = input({
  label: "Responsible ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the user responsible for the campaign.",
  example: "00000000-0000-0000-0000-000000000000",
  placeholder: "Enter responsible user ID",
  clean: cleanString,
});
