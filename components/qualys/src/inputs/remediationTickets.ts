import { input, util } from "@prismatic-io/spectral";
import { asStringArray, toOptionalString } from "../util";
import { connection } from "./common";
const ticketNumbers = input({
  label: "Ticket Numbers",
  type: "string",
  required: false,
  collection: "valuelist",
  comments: "Specific ticket numbers to retrieve or act on.",
  clean: asStringArray,
  placeholder: "Enter ticket number",
  example: "12345",
});
const assignee = input({
  label: "Assignee",
  type: "string",
  required: false,
  comments: "Filter tickets assigned to this user's email address.",
  clean: toOptionalString,
  placeholder: "user@example.com",
  example: "user@example.com",
});
const ticketState = input({
  label: "Ticket State",
  type: "string",
  required: false,
  comments: "Filter tickets by their current workflow state.",
  clean: toOptionalString,
  placeholder: "Select a ticket state",
  example: "OPEN",
  model: [
    { label: "Open", value: "OPEN" },
    { label: "Resolved", value: "RESOLVED" },
    { label: "Closed/Fixed", value: "CLOSED" },
    { label: "Closed/Ignored", value: "IGNORED" },
  ],
});
const severity = input({
  label: "Severity",
  type: "string",
  required: false,
  comments: "Filter tickets by vulnerability severity (1-5).",
  clean: toOptionalString,
  placeholder: "Enter severity level",
  example: "4",
});
const modifiedSinceDatetime = input({
  label: "Modified Since",
  type: "string",
  required: false,
  comments:
    "Return tickets modified on or after this date/time. Format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ.",
  clean: toOptionalString,
  placeholder: "2024-01-01",
  example: "2024-01-01",
});
const since = input({
  label: "Since",
  type: "string",
  required: false,
  comments:
    "Return tickets updated on or after this date/time. Format: YYYY-MM-DDTHH:MM:SSZ.",
  clean: toOptionalString,
  placeholder: "2024-01-01T00:00:00Z",
  example: "2024-01-01T00:00:00Z",
});
const newAssignee = input({
  label: "New Assignee",
  type: "string",
  required: false,
  comments: "Reassign selected tickets to this user.",
  clean: toOptionalString,
  placeholder: "user@example.com",
  example: "user@example.com",
});
const newState = input({
  label: "New State",
  type: "string",
  required: false,
  comments:
    "Change the state of selected tickets. A Closed/Fixed or Closed/Ignored ticket cannot be changed to Resolved.",
  clean: toOptionalString,
  placeholder: "Select a state",
  example: "OPEN",
  model: [
    { label: "Open", value: "OPEN" },
    { label: "Resolved", value: "RESOLVED" },
    { label: "Closed/Ignored", value: "IGNORED" },
  ],
});
const comment = input({
  label: "Comment",
  type: "text",
  required: false,
  comments: "Add a comment to the selected tickets.",
  clean: toOptionalString,
  placeholder: "Enter comment text",
  example: "Patch applied, awaiting verification.",
});
const dryRun = input({
  label: "Dry Run",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true (default), returns the tickets that would be deleted without actually deleting them. Set to false to perform the deletion. There is no undo.",
  clean: util.types.toBool,
});
export const listRemediationTicketsInputs = {
  connection,
  assignee,
  ticketState,
  severity,
  modifiedSinceDatetime,
};
export const getRemediationTicketInfoInputs = {
  connection,
  ticketNumbers,
  since,
};
export const editRemediationTicketsInputs = {
  connection,
  ticketNumbers: { ...ticketNumbers, required: true },
  newAssignee,
  newState,
  comment,
};
export const deleteRemediationTicketsInputs = {
  connection,
  ticketNumbers,
  assignee,
  ticketState,
  severity,
  dryRun,
};
