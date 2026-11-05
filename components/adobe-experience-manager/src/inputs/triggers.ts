import { input } from "@prismatic-io/spectral";
import {
  AEM_ASSETS_EVENT_TYPES,
  AEM_SITES_EVENT_TYPES,
  CONTENT_FRAGMENT_STATUSES,
  DEFAULT_TRIGGER_FRAGMENT_STATUSES,
} from "../constants";
import {
  cleanOptionalHttpsUrl,
  cleanRequiredString,
  cleanStringList,
  lookBackDateClean,
} from "../utils/clean";
import { folderIds, mimeTypes } from "./assets";
import { connection } from "./common";
import { fragmentPath, locales, modelIds, tags } from "./contentFragments";

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

const publishBaseUrl = input({
  label: "Publish Base URL",
  placeholder: "Enter publish base URL",
  type: "string",
  required: false,
  comments:
    "The public base URL of the published site, used to build each record's URL from its path. Leave empty to omit URLs.",
  example: "https://www.example.com",
  clean: cleanOptionalHttpsUrl,
});

const triggerStatuses = input({
  label: "Statuses",
  type: "string",
  collection: "valuelist",
  required: false,
  default: DEFAULT_TRIGGER_FRAGMENT_STATUSES,
  model: CONTENT_FRAGMENT_STATUSES,
  comments:
    "Only emit content fragments in one of these statuses. The default covers live content: Published, and Modified (published, then edited).",
  clean: cleanStringList,
});

const consumerOrgId = input({
  label: "Consumer Organization ID",
  placeholder: "Enter consumer organization ID",
  type: "string",
  required: true,
  comments: "The Adobe Developer Console consumer organization ID that owns the project.",
  example: "123456",
  clean: cleanRequiredString,
});

const projectId = input({
  label: "Project ID",
  placeholder: "Enter project ID",
  type: "string",
  required: true,
  comments: "The ID of the Adobe Developer Console project with AEM Events enabled.",
  example: "4566206088344794931",
  clean: cleanRequiredString,
});

const workspaceId = input({
  label: "Workspace ID",
  placeholder: "Enter workspace ID",
  type: "string",
  required: true,
  comments: "The ID of the Adobe Developer Console workspace within the project.",
  example: "4566206088344853970",
  clean: cleanRequiredString,
});

const providerId = input({
  label: "Event Provider ID",
  placeholder: "Enter AEM Sites event provider ID",
  type: "string",
  required: true,
  comments:
    "The ID of the environment's AEM Sites event provider. Adobe creates one AEM Sites provider and one AEM Assets provider per environment once AEM Events is enabled for it.",
  example: "61378e83-878f-409c-ade1-0e3482aa90a7",
  clean: cleanRequiredString,
});

const sitesEventTypes = input({
  label: "Event Types",
  type: "string",
  collection: "valuelist",
  required: true,
  default: AEM_SITES_EVENT_TYPES.map((eventType) => eventType.value),
  model: AEM_SITES_EVENT_TYPES,
  comments: "The AEM Sites content fragment and page events to subscribe to.",
  clean: cleanStringList,
});

const assetsEventTypes = input({
  label: "Event Types",
  type: "string",
  collection: "valuelist",
  required: true,
  default: AEM_ASSETS_EVENT_TYPES.map((eventType) => eventType.value),
  model: AEM_ASSETS_EVENT_TYPES,
  comments: "The AEM Assets events to subscribe to.",
  clean: cleanStringList,
});

export const contentFragmentChangesInputs = {
  connection,
  lookBackDate: {
    ...lookBackDate,
    comments:
      "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each content fragment modified on or after this date once.",
  },
  path: fragmentPath,
  statuses: triggerStatuses,
  modelIds,
  tags,
  locales,
  publishBaseUrl,
};

export const assetChangesInputs = {
  connection,
  lookBackDate: {
    ...lookBackDate,
    comments:
      "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each asset modified on or after this date once.",
  },
  folderIds,
  mimeTypes,
  publishBaseUrl,
};

export const aemSitesEventWebhookInputs = {
  connection,
  consumerOrgId,
  projectId,
  workspaceId,
  providerId,
  eventTypes: sitesEventTypes,
  publishBaseUrl,
};

export const aemAssetsEventWebhookInputs = {
  connection,
  consumerOrgId,
  projectId,
  workspaceId,
  providerId: {
    ...providerId,
    placeholder: "Enter AEM Assets event provider ID",
    comments:
      "The ID of the environment's AEM Assets event provider. Adobe creates one AEM Sites provider and one AEM Assets provider per environment once AEM Events is enabled for it.",
    example: "5b0beec8-725f-4881-97f4-bfb8bfb4b6d5",
  },
  eventTypes: assetsEventTypes,
  publishBaseUrl,
};
