import { input } from "@prismatic-io/spectral";
import {
  connectionInput,
  eventAction,
  eventObject,
  httpAuthPassword,
  httpAuthUser,
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
  webhookUserId,
  webhookVersion,
} from "./common";
import { lookBackDateClean } from "../util";

const lookBackDate = input({
  label: "Look-back Date",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record modified on or after this date once, ignoring the trigger's visibility filters.",
  example: "2026-01-01",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  clean: lookBackDateClean,
});

export const pipedriveTriggerInputs = {
  connection: connectionInput,
  version: webhookVersion,
  eventAction,
  eventObject,
  userId: webhookUserId,
  httpAuthUser,
  httpAuthPassword,
};

export const pollChangesTriggerInputs = {
  connection: connectionInput,
  resourceType: pollResourceType,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
