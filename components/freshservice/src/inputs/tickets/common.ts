import { input, util } from "@prismatic-io/spectral";
import { BOOLEAN_INPUT_MODEL } from "../../constants";
import {
  cleanArrayCodeInput,
  cleanBooleanInput,
  cleanNumberInput,
  cleanStringInput,
} from "../../util";
import { additionalFields } from "../common";

const ticketsDocumentationComments =
  "See [Freshservice API documentation](https://api.freshservice.com/#ticket_attributes) for more information.";

export const ticketsAdditionalFields = input({
  ...additionalFields,
  comments: `${additionalFields.comments} ${ticketsDocumentationComments}`,
});

const sourceOptions = [
  { label: "Email", value: "1" },
  { label: "Portal", value: "2" },
  { label: "Phone", value: "3" },
  { label: "Chat", value: "4" },
  { label: "Feedback widget", value: "5" },
  { label: "Yammer", value: "6" },
  { label: "AWS Cloudwatch", value: "7" },
  { label: "Pagerduty", value: "8" },
  { label: "Walkup", value: "9" },
  { label: "Slack", value: "10" },
];

const statusOptions = [
  { label: "Open", value: "2" },
  { label: "Pending", value: "3" },
  { label: "Resolved", value: "4" },
  { label: "Closed", value: "5" },
];

const priorityOptions = [
  { label: "Low", value: "1" },
  { label: "Medium", value: "2" },
  { label: "High", value: "3" },
  { label: "Urgent", value: "4" },
];

const filterOptions = [
  { label: "New and My Open", value: "new_and_my_open" },
  { label: "Watching", value: "watching" },
  { label: "Spam", value: "spam" },
  { label: "Deleted", value: "deleted" },
];

export const description = input({
  label: "Description",
  type: "code",
  language: "html",
  required: true,
  comments: "The HTML body content displayed in the ticket detail view.",
  example: "<p>Description of the ticket...</p>",
  placeholder: "Enter ticket description in HTML",
  clean: util.types.toString,
});

export const subject = input({
  label: "Subject",
  type: "string",
  required: true,
  comments: "The brief summary line shown in ticket listings.",
  example: "Support Needed...",
  placeholder: "Enter ticket subject",
  clean: util.types.toString,
});

export const email = input({
  label: "Email",
  type: "string",
  required: true,
  comments: "The email address of the person who submitted the ticket.",
  example: "tom@outerspace.com",
  placeholder: "Enter requester email",
  clean: util.types.toString,
});

export const priority = input({
  label: "Priority",
  type: "string",
  required: true,
  model: priorityOptions,
  comments: "The urgency level that determines the ticket's resolution order.",
  example: "1",
  placeholder: "Enter priority level",
  clean: util.types.toNumber,
});

export const status = input({
  label: "Status",
  type: "string",
  required: true,
  model: statusOptions,
  comments: "The current lifecycle stage of the ticket.",
  example: "2",
  placeholder: "Enter status",
  clean: util.types.toNumber,
});

export const ccEmails = input({
  label: "CC Emails",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Email addresses added in the 'cc' field of the incoming ticket email. The value should be an array of strings.",
  example: JSON.stringify(["ex1@email.com", "ex2@email.com"], null, 2),
  clean: (value) => cleanArrayCodeInput(value, "CC Emails"),
});

export const workspaceId = input({
  label: "Workspace ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the workspace the ticket belongs to.",
  example: "3",
  placeholder: "Enter workspace ID",
  dataSource: "selectWorkspace",
  clean: cleanNumberInput,
});

export const filter = input({
  label: "Filter",
  type: "string",
  required: false,
  comments: "The predefined view used to narrow down the ticket list.",
  example: "new_and_my_open",
  placeholder: "Enter filter",
  model: filterOptions,
  clean: cleanStringInput,
});

export const ticketId = input({
  label: "Ticket ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the ticket.",
  example: "264",
  placeholder: "Enter ticket ID",
  dataSource: "selectTicket",
  clean: util.types.toNumber,
});

export const source = input({
  label: "Source",
  type: "string",
  required: true,
  model: sourceOptions,
  comments: "The channel through which the ticket was created.",
  example: "1",
  placeholder: "Enter source",
  clean: util.types.toNumber,
});

export const bypassMandatory = input({
  label: "Bypass Mandatory",
  type: "string",
  required: false,
  comments:
    "To bypass mandatory fields check while updating the ticket except for requester_id, source. Any business rules trying to mandate certain fields will also be bypassed. All fields configured as mandatory upon closing or resolving the ticket will be skipped while updating the ticket. This can only be passed by an admin.",
  example: "true",
  model: BOOLEAN_INPUT_MODEL,
  clean: cleanBooleanInput,
});

export const groupId = input({
  label: "Group ID",
  type: "string",
  required: false,
  comments:
    "The unique identifier for the agent group to assign the ticket to.",
  example: "3",
  placeholder: "Enter group ID",
  clean: cleanNumberInput,
});

export const responderId = input({
  label: "Responder ID",
  type: "string",
  required: false,
  comments:
    "The unique identifier for the agent to assign as the ticket responder.",
  example: "4",
  placeholder: "Enter responder ID",
  clean: cleanNumberInput,
});
