import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";
import { lookBackDateClean } from "../util";
import { surveyId } from "./surveys";

const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each response modified on or after this date once, ignoring the visibility filters.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});

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
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
