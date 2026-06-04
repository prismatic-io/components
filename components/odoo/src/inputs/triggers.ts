import { input, util } from "@prismatic-io/spectral";
import { connection, model } from "./common";





const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, records whose `create_date` falls after the last poll will be emitted on the `created` branch.",
  clean: util.types.toBool,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, records whose `write_date` falls after the last poll but were created earlier will be emitted on the `updated` branch.",
  clean: util.types.toBool,
});

export const pollChangesInputs = {
  connection,
  model,
  showNewRecords,
  showUpdatedRecords,
};
