import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean, toOptionalNumber } from "../util";
import { connectionInput } from "./common";
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record modified on or after this date once, ignoring the field and visibility filters.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
const retailerId = input({
  label: "Retailer ID",
  type: "string",
  required: false,
  example: "34",
  comments:
    "Optional Fluent retailer ID to scope the polling query. When omitted, the connection's default tenant scope applies.",
  clean: toOptionalNumber,
});
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, orders whose `createdOn` falls after the last poll will be emitted in the `created` array.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, orders whose `updatedOn` falls after the last poll but were created earlier will be emitted in the `updated` array.",
  clean: util.types.toBool,
});
export const pollChangesInputs = {
  connection: connectionInput,
  lookBackDate,
  retailerId,
  showNewRecords,
  showUpdatedRecords,
};
