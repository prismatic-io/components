import { input, util } from "@prismatic-io/spectral";
import { connection } from "./common";
const staticOnly = input({
  label: "Static Only",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, only return static tags (excludes dynamic tags with a rule type).",
  clean: util.types.toBool,
});
export const selectTagInputs = { connection, staticOnly };
export const selectAssetGroupInputs = { connection };
export const selectScannerApplianceInputs = { connection };
