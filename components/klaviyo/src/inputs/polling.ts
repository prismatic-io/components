import { input, util } from "@prismatic-io/spectral";
import {
  MESSAGE_CHANNEL_MODEL,
  PROFILE_OR_LIST_RESOURCE_CONFIG,
} from "../constants";
import { connection } from "./shared";

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
  showNewRecords,
  showUpdatedRecords,
};

export const pollProfileAndListChangesInputs = {
  connection,
  pollProfileOrListResourceType,
  showNewRecords,
  showUpdatedRecords,
};
