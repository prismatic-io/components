import { input, util } from "@prismatic-io/spectral";

export const invoiceDocumentEntry = input({
  label: "Doc Entry",
  type: "string",
  comments:
    "The document entry number (DocEntry) that uniquely identifies the invoice. This is an integer value.",
  example: "12345",
  placeholder: "Enter invoice document entry",
  required: true,
  clean: util.types.toString,
});
