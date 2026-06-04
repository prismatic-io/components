import { input, util } from "@prismatic-io/spectral";

export const docEntry = input({
  label: "Purchase Order Document Entry",
  type: "string",
  comments:
    "The document entry number (DocEntry) that uniquely identifies the purchase order. This is an integer value.",
  example: "12345",
  placeholder: "Enter purchase order document entry",
  required: true,
  clean: util.types.toString,
});
