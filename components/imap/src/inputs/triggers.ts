import { input, util } from "@prismatic-io/spectral";
import { connection, mailbox } from "./general";

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

export const newEmailsPollingTriggerInputs = {
  connection,
  mailbox,
  fetchContent,
  markAsRead,
};
