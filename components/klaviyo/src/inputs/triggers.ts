import { input, util } from "@prismatic-io/spectral";
import {
  MESSAGE_CHANNEL_MODEL,
  PROFILE_OR_LIST_RESOURCE_CONFIG,
} from "../constants";
import { lookBackDateClean } from "../util";
import { connection } from "./common";
const profileOrListResourceModel = Object.entries(
  PROFILE_OR_LIST_RESOURCE_CONFIG,
).map(([value, { label }]) => ({ label, value }));
const pollProfileOrListResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  comments: "The type of resource to poll for new and updated records.",
  model: profileOrListResourceModel,
  clean: util.types.toString,
});
const pollMessageChannel = input({
  label: "Message Channel",
  type: "string",
  required: true,
  comments:
    "Klaviyo requires a channel filter to list campaigns. Select which channel's campaigns the trigger should return.",
  model: MESSAGE_CHANNEL_MODEL,
  clean: util.types.toString,
});
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: true,
  default: "true",
  comments:
    "When true, newly created records are included in the trigger output.",
  clean: util.types.toBool,
});
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record modified on or after this date once.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: true,
  default: "true",
  comments:
    "When true, records updated since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});
export const pollCampaignChangesInputs = {
  connection,
  pollMessageChannel,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
export const pollProfileAndListChangesInputs = {
  connection,
  pollProfileOrListResourceType,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
