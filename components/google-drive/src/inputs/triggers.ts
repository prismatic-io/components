import { input } from "@prismatic-io/spectral";
import { cleanArrayInput, lookBackDateClean } from "../util";
export const triggerEvents = input({
  label: "Trigger Events",
  type: "string",
  placeholder: "Select event types",
  comments: "The event types the trigger will poll.",
  collection: "valuelist",
  model: [
    { value: "CREATE", label: "Create" },
    { value: "COMMENT", label: "Comment" },
    { value: "DELETE", label: "Delete" },
    { value: "EDIT", label: "Update" },
    { value: "MOVE", label: "Move" },
    { value: "REFERENCE", label: "Reference" },
    { value: "RENAME", label: "Rename" },
    { value: "RESTORE", label: "Restore" },
  ],
  required: false,
  clean: cleanArrayInput,
});
export const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each file modified on or after this date once, then hands off to incremental polling.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
export const pushNotificationWebhookInputs = {};
