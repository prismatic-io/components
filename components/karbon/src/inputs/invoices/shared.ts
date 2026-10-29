import { input, util } from "@prismatic-io/spectral";

export const includeLineItems = input({
  label: "Include Line Items",
  type: "boolean",
  required: false,
  default: "false",
  comments: "Include additional lineitems invoice properties.",
  clean: util.types.toBool,
});
