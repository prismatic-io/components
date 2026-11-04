import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";

const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "When true, newly created records are included in trigger results.",
  clean: util.types.toBool,
});

export const pollChangesTriggerInputs = {
  connection: connectionInput,
  showNewRecords,
};
