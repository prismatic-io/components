import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../util";
import {
  connectionInput,
  objectType,
  propertyChangeProperties,
} from "./common";
import { searchEndpoint, searchProperties } from "./search";
import { eventTypes, overwriteWebhookSettings } from "./webhook";
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, includes new records in the results.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, includes updated records in the results.",
  clean: util.types.toBool,
});
export const lookBackDate = input({
  label: "Look-back Date",
  type: "string",
  required: false,
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  example: "2026-01-01",
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record created on or after this date once, ignoring the visibility toggles.",
  clean: lookBackDateClean,
});
export const webhookTriggerInputs = {
  hubspotConnection: connectionInput,
};
export const eventTypeSubscriptionInputs = {
  hubspotConnection: connectionInput,
  eventTypes,
  propertyChangeProperties,
  overwriteWebhookSettings,
};
export const pollChangesTriggerInputs = {
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
  hubspotConnection: connectionInput,
  searchEndpoint: {
    ...searchEndpoint,
    model: searchEndpoint.model.filter(
      (input) => input.label !== "Custom objects",
    ),
  },
  searchProperties,
};
export const pollChangesCustomObjectsTriggerInputs = {
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
  hubspotConnection: connectionInput,
  objectType: {
    ...objectType,
    comments: "The type of custom object to search for.",
  },
  searchProperties,
};
