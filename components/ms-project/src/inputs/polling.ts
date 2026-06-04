import { input, util } from "@prismatic-io/spectral";
import { connection } from "../inputs";


const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, newly created records are included in the trigger output.",
  clean: util.types.toBool,
});


const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, records updated after the last poll are included in the trigger output.",
  clean: util.types.toBool,
});

export const pollChangesInputs = {
  connection,
  showNewRecords,
  showUpdatedRecords,
};
