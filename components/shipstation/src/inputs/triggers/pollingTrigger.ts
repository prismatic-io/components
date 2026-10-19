import { input } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../../util";
import { connectionInput } from "../common";
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record on or after this date once.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
export const pollingTriggerInputs = {
  connection: connectionInput,
  lookBackDate,
};
