import { input, util } from "@prismatic-io/spectral";
import { toOptionalArray, toOptionalNumber, toOptionalString } from "../util";
import {
  additionalFields,
  additionalQueryParams,
  connection,
  fetchAll,
} from "./common";

const opsAlertId = input({
  label: "Alert Identifier",
  type: "string",
  required: true,
  comments: "The identifier of the alert.",
  placeholder: "Enter alert identifier",
  example: "70413a06-38d6-4c85-92b8-5ebc900d42e2",
  clean: util.types.toString,
});

const opsAlertQuery = input({
  label: "Query",
  type: "string",
  required: false,
  comments:
    "Atlassian Ops query string used to filter the alert list (e.g. `status: open AND priority: P1`).",
  placeholder: "Enter query",
  example: "status: open",
  clean: toOptionalString,
});

const opsAlertOffset = input({
  label: "Offset",
  type: "string",
  required: false,
  default: "0",
  comments: "Index of the first result to return.",
  placeholder: "Enter offset",
  example: "0",
  clean: toOptionalNumber,
});

const opsAlertSize = input({
  label: "Size",
  type: "string",
  required: false,
  default: "20",
  comments: "Maximum number of results per page (Atlassian max: 100).",
  placeholder: "Enter size",
  example: "20",
  clean: toOptionalNumber,
});

const opsAlertSort = input({
  label: "Sort",
  type: "string",
  required: false,
  comments: "Field to sort the alerts by (e.g. `createdAt`, `priority`).",
  placeholder: "Enter sort field",
  example: "createdAt",
  clean: toOptionalString,
});

const opsAlertOrder = input({
  label: "Order",
  type: "string",
  required: false,
  default: "desc",
  model: [
    { label: "Descending", value: "desc" },
    { label: "Ascending", value: "asc" },
  ],
  comments: "Sort order applied alongside the Sort field.",
  clean: toOptionalString,
});

const opsAlertMessage = input({
  label: "Message",
  type: "string",
  required: true,
  comments: "Brief alert summary. Truncated to 130 characters by Atlassian.",
  placeholder: "Enter alert message",
  example: "Disk usage at 95% on web-prod-01",
  clean: util.types.toString,
});

const opsAlertDescription = input({
  label: "Description",
  type: "string",
  required: false,
  comments:
    "Detailed message body. Markdown is supported. Truncated to 15,000 characters by Atlassian.",
  placeholder: "Enter description",
  example: "Disk /var has crossed the 95% threshold and continues to grow.",
  clean: toOptionalString,
});

const opsAlertPriority = input({
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

const opsAlertAlias = input({
  label: "Alias",
  type: "string",
  required: false,
  comments:
    "Client-defined identifier for deduplication. Subsequent alerts with the same alias and OPEN status are de-duplicated to the first one.",
  placeholder: "Enter alias",
  example: "disk-usage-web-prod-01",
  clean: toOptionalString,
});

const opsAlertTags = input({
  label: "Tags",
  type: "code",
  language: "json",
  required: false,
  comments: "JSON array of string tags to attach to the alert.",
  placeholder: "Enter tags as JSON array",
  example: JSON.stringify(["production", "disk"], null, 2),
  clean: toOptionalArray,
});

const opsAlertSnoozeEndTime = input({
  label: "Snooze Until",
  type: "string",
  required: true,
  comments:
    "ISO-8601 timestamp until which the alert is snoozed (e.g. 2026-05-04T18:30:00Z).",
  placeholder: "Enter ISO-8601 timestamp",
  example: "2026-05-04T18:30:00Z",
  clean: util.types.toString,
});

export const listOpsAlertsInputs = {
  connection,
  opsAlertQuery,
  opsAlertSort,
  opsAlertOrder,
  fetchAll,
  opsAlertOffset,
  opsAlertSize,
  additionalQueryParams,
};

export const getOpsAlertInputs = {
  connection,
  opsAlertId,
};

export const deleteOpsAlertInputs = {
  connection,
  opsAlertId,
};

export const acknowledgeOpsAlertInputs = {
  connection,
  opsAlertId,
};

export const closeOpsAlertInputs = {
  connection,
  opsAlertId,
};

export const snoozeOpsAlertInputs = {
  connection,
  opsAlertId,
  opsAlertSnoozeEndTime,
};

export const createOpsAlertInputs = {
  connection,
  opsAlertMessage,
  opsAlertDescription,
  opsAlertPriority,
  opsAlertAlias,
  opsAlertTags,
  additionalFields,
};
