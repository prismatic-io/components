import { input } from "@prismatic-io/spectral";
import { cleanFunctionForBoolean } from "../util";
import { connection } from "./common";

const strictValidation = input({
  label: "Perform Strict Validation",
  type: "boolean",
  required: false,
  comments:
    "When true, performs strict validation on each webhook notification.",
  clean: cleanFunctionForBoolean,
});



const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, newly created agreements are included in the trigger output.",
  clean: cleanFunctionForBoolean,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, agreements updated since the last poll are included in the trigger output.",
  clean: cleanFunctionForBoolean,
});

export const adobeSignTriggerInputs = {
  connection,
  strictValidation,
};

export const pollChangesInputs = {
  connection,
  showNewRecords,
  showUpdatedRecords,
};
