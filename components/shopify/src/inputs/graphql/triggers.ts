import { input } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../../util";
import { shopifyConnection } from "./common";

export const lookBackDate = input({
  label: "Look-back Date",
  type: "string",
  required: false,
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  example: "2026-01-01",
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync reports every record updated on or after this date.",
  clean: lookBackDateClean,
});

export const pollingTriggerInputs = {
  shopifyConnection,
  lookBackDate,
};
