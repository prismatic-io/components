import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean, toOptionalString } from "../util";
import { boardId, connectionInput } from "./common";
import { webhookConfig, webhookEvent } from "./webhooks";
const signingSecret = input({
  label: "Signing Secret",
  type: "password",
  required: false,
  comments:
    "The Signing Secret from the Monday.com app. When provided, webhook payloads are verified against this secret. See [Monday.com Authorization docs](https://developer.monday.com/apps/docs/integration-authorization#authorization-header) for details.",
  placeholder: "Enter signing secret",
  clean: toOptionalString,
});
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, newly created items are included in the trigger output.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, items updated since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});
export const webhookInputs = {
  connection: connectionInput,
  boardId,
  webhookEvent,
  webhookConfig,
  signingSecret,
};
export const pollChangesInputs = {
  connection: connectionInput,
  boardId,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
