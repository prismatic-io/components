import { input } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../utils";
import { connectionInput } from "./common";
import { dataSourceIdInput } from "./notionDataSources";
const lookBackDateInput = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the first recurrence returns every record created or last edited on or after this date.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
export const pagesPollingTriggerInputs = {
  connection: connectionInput,
  lookBackDate: lookBackDateInput,
};
export const dataSourcesPollingTriggerInputs = {
  connection: connectionInput,
  lookBackDate: lookBackDateInput,
};
export const dataSourceItemsPollingTriggerInputs = {
  connection: connectionInput,
  dataSourceId: dataSourceIdInput,
  lookBackDate: lookBackDateInput,
};
