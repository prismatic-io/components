import { input, util } from "@prismatic-io/spectral";
import { toOptionalArray, toOptionalObject, toOptionalString } from "../util";
import { connection } from "./common";

const alertMessage = input({
  label: "Message",
  type: "string",
  required: true,
  comments:
    "The alert message that summarises what happened. Truncated to 130 characters by Atlassian.",
  placeholder: "Enter alert message",
  example: "Disk usage at 95% on web-prod-01",
  clean: util.types.toString,
});

const alertAlias = input({
  label: "Alias",
  type: "string",
  required: false,
  comments:
    "Client-defined identifier for deduplication. Subsequent alerts with the same alias and OPEN status are de-duplicated to the first one.",
  placeholder: "Enter alias",
  example: "disk-usage-web-prod-01",
  clean: toOptionalString,
});

const alertDescription = input({
  label: "Description",
  type: "string",
  required: false,
  comments:
    "Detailed message body. Markdown is supported. Truncated to 15,000 characters by Atlassian.",
  placeholder: "Enter description",
  example: "Disk /var has crossed the 95% threshold and continues to grow.",
  clean: toOptionalString,
});

const alertResponders = input({
  label: "Responders",
  type: "code",
  language: "json",
  required: false,
  comments:
    "JSON array of responder objects to assign. Each item must include `type` (team, user, escalation, schedule) and one of `id`, `name`, or `username`.",
  placeholder: "Enter responders as JSON array",
  example: JSON.stringify(
    [
      { type: "team", name: "Platform" },
      { type: "user", username: "oncall@example.com" },
    ],
    null,
    2,
  ),
  clean: toOptionalArray,
});

const alertVisibleTo = input({
  label: "Visible To",
  type: "code",
  language: "json",
  required: false,
  comments:
    "JSON array restricting alert visibility to specific teams or users. Same shape as Responders.",
  placeholder: "Enter visibleTo as JSON array",
  example: JSON.stringify([{ type: "team", name: "Platform" }], null, 2),
  clean: toOptionalArray,
});

const alertActions = input({
  label: "Actions",
  type: "code",
  language: "json",
  required: false,
  comments:
    "JSON array of custom action names that can later be invoked on the alert.",
  placeholder: "Enter actions as JSON array",
  example: JSON.stringify(["restart", "ping"], null, 2),
  clean: toOptionalArray,
});

const alertTags = input({
  label: "Tags",
  type: "code",
  language: "json",
  required: false,
  comments: "JSON array of string tags to attach to the alert.",
  placeholder: "Enter tags as JSON array",
  example: JSON.stringify(["production", "disk"], null, 2),
  clean: toOptionalArray,
});

const alertDetails = input({
  label: "Details",
  type: "code",
  language: "json",
  required: false,
  comments:
    "JSON object of arbitrary key/value pairs stored alongside the alert.",
  placeholder: "Enter details as JSON",
  example: JSON.stringify(
    { region: "us-east-1", host: "web-prod-01" },
    null,
    2,
  ),
  clean: toOptionalObject,
});

const alertEntity = input({
  label: "Entity",
  type: "string",
  required: false,
  comments:
    "Optional entity field used to specify which domain the alert is related to (e.g. a server name).",
  placeholder: "Enter entity",
  example: "web-prod-01",
  clean: toOptionalString,
});

const alertSource = input({
  label: "Source",
  type: "string",
  required: false,
  comments:
    "Source of the alert. Defaults to the IP address of the request when omitted.",
  placeholder: "Enter source",
  example: "Datadog",
  clean: toOptionalString,
});

const alertPriority = input({
  label: "Priority",
  type: "string",
  required: false,
  default: "P3",
  model: [
    { label: "P1 — Critical", value: "P1" },
    { label: "P2 — High", value: "P2" },
    { label: "P3 — Moderate", value: "P3" },
    { label: "P4 — Low", value: "P4" },
    { label: "P5 — Informational", value: "P5" },
  ],
  comments: "Priority level of the alert. Defaults to P3.",
  clean: toOptionalString,
});

const alertUser = input({
  label: "User",
  type: "string",
  required: false,
  comments:
    "Display name of the user performing the action. Used to attribute the alert action in audit history.",
  placeholder: "Enter user name",
  example: "Monica Geller",
  clean: toOptionalString,
});

const alertNote = input({
  label: "Note",
  type: "string",
  required: false,
  comments: "Additional note posted alongside the alert action.",
  placeholder: "Enter note",
  example: "Acknowledged from monitoring runbook",
  clean: toOptionalString,
});

const alertNoteRequired = input({
  label: "Note",
  type: "string",
  required: true,
  comments: "The note content to add to the alert.",
  placeholder: "Enter note",
  example: "Investigating now — engaging the on-call engineer.",
  clean: util.types.toString,
});

const alertIdentifier = input({
  label: "Alert Identifier",
  type: "string",
  required: true,
  comments:
    "The alert identifier — by default the alert ID. To use the tiny ID or alias, set Identifier Type accordingly.",
  placeholder: "Enter alert identifier",
  example: "70413a06-38d6-4c85-92b8-5ebc900d42e2",
  clean: util.types.toString,
});

const alertIdentifierType = input({
  label: "Identifier Type",
  type: "string",
  required: false,
  default: "id",
  model: [
    { label: "ID", value: "id" },
    { label: "Tiny ID", value: "tiny" },
    { label: "Alias", value: "alias" },
  ],
  comments:
    "Format of the alert identifier. Use `alias` only when the alert is in OPEN status — closed alerts cannot be referenced by alias.",
  clean: toOptionalString,
});

const requestId = input({
  label: "Request ID",
  type: "string",
  required: true,
  comments:
    "The async request ID returned by a previous Ops Integration Events action.",
  placeholder: "Enter request ID",
  example: "8eb01b62-04a5-4d57-a4a8-602e6ef5deaf",
  clean: util.types.toString,
});

export const createIntegrationAlertInputs = {
  connection,
  alertMessage,
  alertAlias,
  alertDescription,
  alertResponders,
  alertVisibleTo,
  alertActions,
  alertTags,
  alertDetails,
  alertEntity,
  alertSource,
  alertPriority,
  alertUser,
  alertNote,
};

export const acknowledgeIntegrationAlertInputs = {
  connection,
  alertIdentifier,
  alertIdentifierType,
  alertUser,
  alertSource,
  alertNote,
};

export const closeIntegrationAlertInputs = {
  connection,
  alertIdentifier,
  alertIdentifierType,
  alertUser,
  alertSource,
  alertNote,
};

export const addIntegrationAlertNoteInputs = {
  connection,
  alertIdentifier,
  alertIdentifierType,
  alertNote: alertNoteRequired,
  alertUser,
  alertSource,
};

export const getIntegrationAlertRequestInputs = {
  connection,
  requestId,
};
