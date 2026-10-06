import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../util";
import { connectionInput } from "./common";
const pollScopeType = input({
  label: "Scope",
  type: "string",
  required: true,
  model: [
    { label: "Team (Workspace)", value: "team" },
    { label: "List", value: "list" },
  ],
  clean: util.types.toString,
  comments:
    "Whether to poll tasks across an entire Team (Workspace) or scoped to a single List.",
});
const pollScopeId = input({
  label: "Scope ID",
  type: "string",
  required: true,
  example: "9010065123",
  placeholder: "Enter the Team or List ID",
  clean: util.types.toString,
  comments:
    "The Team ID or List ID to monitor for changes, depending on the Scope selected above.",
});
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
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
  comments:
    "When true, tasks created since the last poll are returned in the trigger payload.",
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
  comments:
    "When true, tasks updated since the last poll are returned in the trigger payload.",
});
export const pollChangesTriggerInputs = {
  connection: connectionInput,
  scopeType: pollScopeType,
  scopeId: pollScopeId,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
export const webhookInputs = {};
