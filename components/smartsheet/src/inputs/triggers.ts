import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";

const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
  comments:
    "When true, sheets created since the last poll are returned in the trigger payload.",
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
  comments:
    "When true, sheets modified since the last poll are returned in the trigger payload.",
});

export const pollChangesInputs = {
  connection: connectionInput,
  showNewRecords,
  showUpdatedRecords,
};


export const smartsheetWebhookInputs = {};
