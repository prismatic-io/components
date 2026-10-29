import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput, lookBackDateClean } from "../util";
import {
  allowDuplicatesInput,
  changeTypesInput,
  connectionInput,
  expirationDateTimeInput,
  folderIdInput,
} from "./common";

export const createWebhookSubscriptionInputs = {
  connection: connectionInput,
  expirationDateTime: expirationDateTimeInput,
  allowDuplicates: allowDuplicatesInput,
};

export const createMailFolderWebhookInputs = {
  connection: connectionInput,
  changeTypes: changeTypesInput,
  folderId: {
    ...folderIdInput,
    comments:
      "The unique identifier of the mail folder to monitor for changes. Leave empty to monitor the entire mailbox.",
  },
  expirationDateTime: expirationDateTimeInput,
  allowDuplicates: allowDuplicatesInput,
};

const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each message created or updated on or after this date once, ignoring the visibility filters.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});

const pollFolderId = input({
  label: "Mail Folder ID",
  type: "string",
  required: false,
  example: "AAMkAGI2TGuLAAA=",
  comments:
    "The unique identifier of a mail folder to limit polling to (e.g., Inbox). Leave empty to poll all folders in the mailbox.",
  placeholder: "Select a folder",
  dataSource: "selectMailFolder",
  clean: cleanStringInput,
});

const showNewMessages = input({
  label: "Show New Messages",
  type: "boolean",
  required: false,
  default: "true",
  example: "true",
  comments:
    "When true, messages created since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});

const showUpdatedMessages = input({
  label: "Show Updated Messages",
  type: "boolean",
  required: false,
  default: "true",
  example: "true",
  comments:
    "When true, messages updated since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});

export const pollChangesInputs = {
  connection: connectionInput,
  lookBackDate,
  pollFolderId,
  showNewMessages,
  showUpdatedMessages,
};
