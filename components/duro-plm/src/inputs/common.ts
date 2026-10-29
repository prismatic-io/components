import { input } from "@prismatic-io/spectral";
import { cleanNumberInput } from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Duro PLM connection to use.",
});

export const first = input({
  label: "First N Items",
  comments: "The number of items to return.",
  example: "10",
  placeholder: "Enter number of items",
  type: "string",
  required: false,
  clean: cleanNumberInput,
});
