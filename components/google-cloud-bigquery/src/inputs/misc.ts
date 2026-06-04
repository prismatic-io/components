import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";

export const version = input({
  label: "API Version",
  type: "string",
  clean: util.types.toString,
  default: "v2",
  comments:
    "The API version to use. This is used to construct the base URL for the request.",
  example: "v2",
  placeholder: "Enter API version",
  required: false,
});

export const formatOptions = input({
  label: "Format Options",
  type: "boolean",
  clean: util.types.toBool,
  comments: "When true, applies output format adjustments.",
  required: false,
});


export const rawRequestInputs = {
  connection: connectionInput,
  version,
};
