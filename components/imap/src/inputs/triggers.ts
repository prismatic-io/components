import { input, util } from "@prismatic-io/spectral";
import { connection, mailbox } from "./general";
import { lookBackDateClean } from "../util/polling";

const fetchContent = input({
  label: "Fetch Content",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When enabled, downloads and parses the full message body for each new email.",
  clean: util.types.toBool,
});

const markAsRead = input({
  label: "Mark as Read",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When enabled, sets the Seen flag on new emails after polling.",
  clean: util.types.toBool,
});

const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync delivers each email received on or after this date once.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});

export const newEmailsPollingTriggerInputs = {
  connection,
  mailbox,
  lookBackDate,
  fetchContent,
  markAsRead,
};
