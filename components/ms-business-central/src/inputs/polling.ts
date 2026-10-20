import { input, util } from "@prismatic-io/spectral";
import {
  cleanStringInput,
  lookBackDateClean,
  pollResourceModel,
} from "../utils";
import { companyId } from "./accounts/getAccountsInputs";
import { connectionInput } from "./general";
const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  comments: "The Business Central entity to poll for changes.",
  clean: util.types.toString,
});
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record modified on or after this date once, ignoring the visibility filter.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
const additionalFilter = input({
  label: "Additional Filter",
  type: "string",
  required: false,
  placeholder: "Enter optional OData filter",
  example: "type eq 'Inventory'",
  comments:
    "Optional OData filter to combine (AND) with the modification-time filter applied by the trigger.",
  clean: cleanStringInput,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, records modified after the last poll are included in the trigger output.",
  clean: util.types.toBool,
});
export const pollChangesInputs = {
  connection: connectionInput,
  companyId,
  pollResourceType,
  lookBackDate,
  additionalFilter,
  showUpdatedRecords,
};
