import { input, util } from "@prismatic-io/spectral";
import { jsonCheck } from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The DocuSign connection to use.",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, automatically fetches all pages of results using startPosition/count pagination. Start Position and Count inputs are ignored when this is enabled.",
  required: false,
  default: "false",
});

export const jsonInput = input({
  label: "JSON Input",
  type: "code",
  language: "json",
  comments: "A JSON object containing the request body.",
  placeholder: "Enter request body as JSON",
  required: false,
  clean: jsonCheck,
});
