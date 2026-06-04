import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";
import { surveyId } from "./surveys";








const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "Include newly created survey responses in the results, emitted on the created branch.",
  clean: util.types.toBool,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "Include previously created survey responses that were modified since the last poll, emitted on the updated branch.",
  clean: util.types.toBool,
});

export const pollChangesInputs = {
  connection: connectionInput,
  surveyId,
  showNewRecords,
  showUpdatedRecords,
};
