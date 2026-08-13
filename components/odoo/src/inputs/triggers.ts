import { input, util } from "@prismatic-io/spectral";
import { connection, model } from "./common";
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records whose `create_date` falls after the last poll are emitted in the `created` bucket.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records whose `write_date` falls after the last poll but were created earlier are emitted in the `updated` bucket.",
  clean: util.types.toBool,
});
export const pollChangesInputs = {
  connection,
  model,
  showNewRecords,
  showUpdatedRecords,
};
