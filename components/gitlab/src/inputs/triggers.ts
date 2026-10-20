import { input, util } from "@prismatic-io/spectral";
import { WEBHOOK_EVENTS } from "../constants";
import {
  cleanString,
  lookBackDateClean,
  pollResourceModel,
  toEventList,
  toPollResourceType,
} from "../utils";
import { connectionInput, project, projects } from "./common";
const secretToken = input({
  label: "Secret Token",
  placeholder: "Enter secret token",
  type: "password",
  required: false,
  comments:
    "The Secret token configured on the GitLab webhook. When set, requests whose X-Gitlab-Token header does not match are rejected.",
  example: "4f9c2a7e1b3d5f6a8c0e2b4d6f8a0c2e",
  clean: cleanString,
});
const events = input({
  label: "Events",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "The GitLab events that start this flow.",
  model: WEBHOOK_EVENTS.map(({ label, value }) => ({ label, value })),
  clean: toEventList,
});
const branchFilter = input({
  label: "Branch Filter",
  placeholder: "Enter branch filter",
  type: "string",
  required: false,
  comments:
    "Limit push events to branches matching this name or wildcard pattern, such as main or release/*. Leave empty for all branches.",
  example: "main",
  clean: cleanString,
});
export const webhookInputs = { secretToken };
export const webhookEventsInputs = {
  connection: connectionInput,
  projects,
  events,
  branchFilter,
};
const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  default: "issues",
  comments: "The kind of record to poll for changes.",
  model: pollResourceModel,
  clean: toPollResourceType,
});
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record modified on or after this date once, ignoring the visibility filters.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records created since the last poll are returned in the trigger payload.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records updated since the last poll are returned in the trigger payload.",
  clean: util.types.toBool,
});
export const pollChangesInputs = {
  connection: connectionInput,
  project,
  pollResourceType,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
