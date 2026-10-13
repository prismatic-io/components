import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean, pollResourceModel } from "../util";
import { connection } from "./common";
const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  default: "Devices",
  model: pollResourceModel,
  comments:
    "Select the PDQ resource to poll for newly added records. Choose Devices or Groups. Required.",
  clean: util.types.toString,
});
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
export const pollChangesInputs = { connection, pollResourceType, lookBackDate };
