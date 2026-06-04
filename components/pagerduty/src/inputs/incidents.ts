import { input, util } from "@prismatic-io/spectral";
import { toOptionalString, toOptionalStringArray } from "../util";
import { createIncidentExample, manageIncidentsExample } from "./examples";

export const dateRange = input({
  label: "Date Range",
  type: "string",
  required: false,
  model: [{ label: "All", value: "all" }],
  clean: toOptionalString,
  comments:
    "When set to 'all', the since and until parameters and defaults are ignored.",
});

export const incidentKey = input({
  label: "Incident Key",
  type: "string",
  required: false,
  placeholder: "Enter a de-duplication key",
  example: "baf7cf21b1da41b4b0221008339ff357",
  clean: toOptionalString,
  comments:
    "The de-duplication key used to prevent duplicate incidents from being created.",
});

export const serviceIds = input({
  label: "Service IDs",
  type: "string",
  placeholder: "Enter a service ID",
  example: "PIJ90N7",
  required: false,
  clean: toOptionalStringArray,
  collection: "valuelist",
  comments:
    "The unique identifiers of the services to filter incidents by. Only incidents associated with the listed services are returned.",
});

export const userIds = input({
  label: "User IDs",
  type: "string",
  required: false,
  placeholder: "Enter a user ID",
  example: "PXPGF42",
  collection: "valuelist",
  clean: toOptionalStringArray,
  comments:
    "The unique identifiers of the users currently assigned to the incidents to return.",
});

export const urgencies = input({
  label: "Urgencies",
  type: "string",
  required: false,
  collection: "valuelist",
  model: [
    { label: "High", value: "high" },
    { label: "Low", value: "low" },
  ],
  clean: toOptionalStringArray,
  comments: "The urgency levels to filter incidents by.",
});

export const statuses = input({
  label: "Statuses",
  type: "string",
  required: false,
  collection: "valuelist",
  model: [
    { label: "Triggered", value: "triggered" },
    { label: "Acknowledged", value: "acknowledged" },
    { label: "Resolved", value: "resolved" },
  ],
  clean: toOptionalStringArray,
  comments: "The statuses to filter incidents by.",
});

export const sortBy = input({
  label: "Sort By",
  type: "string",
  placeholder: "Enter a sort expression",
  example: "incident_number:desc",
  required: false,
  clean: toOptionalString,
  comments:
    "The field and direction used to sort results. Field options: incident_number, created_at, resolved_at, urgency. Direction: asc or desc. Example: 'incident_number:desc'.",
});

export const include = input({
  label: "Include",
  type: "string",
  required: false,
  collection: "valuelist",
  model: [
    { label: "Acknowledgers", value: "acknowledgers" },
    { label: "Agents", value: "agents" },
    { label: "Assignees", value: "assignees" },
    { label: "Conference Bridge", value: "conference_bridge" },
    { label: "Escalation Policies", value: "escalation_policies" },
    {
      label: "First Trigger Log Entries",
      value: "first_trigger_log_entries",
    },
    { label: "Priorities", value: "priorities" },
    { label: "Services", value: "services" },
    { label: "Teams", value: "teams" },
    { label: "Users", value: "users" },
  ],
  clean: toOptionalStringArray,
  comments: "The additional details to include in the response.",
});

export const incidents = input({
  label: "Incidents",
  type: "code",
  language: "json",
  required: true,
  example: manageIncidentsExample,
  clean: util.types.toObject,
  comments:
    "The JSON array of incidents to manage, including the parameters to update.",
});

export const incident = input({
  label: "Incident",
  type: "code",
  language: "json",
  example: createIncidentExample,
  required: true,
  clean: util.types.toObject,
  comments: "The JSON object body describing the incident to create.",
});

export const incidentId = input({
  label: "Incident ID",
  type: "string",
  placeholder: "Enter an incident ID",
  example: "PT4KHLK",
  required: true,
  clean: util.types.toString,
  comments: "The unique identifier for the incident.",
});

export const incidentAlertId = input({
  label: "Incident Alert ID",
  type: "string",
  placeholder: "Enter an incident alert ID",
  example: "PT4KHLK",
  required: true,
  clean: util.types.toString,
  comments: "The unique identifier for the incident alert.",
});

export const alertKey = input({
  label: "Alert Key",
  type: "string",
  placeholder: "Enter a de-duplication key",
  example: "baf7cf21b1da41b4b0221008339ff357",
  required: false,
  clean: toOptionalString,
  comments:
    "The de-duplication key used to prevent duplicate alerts from being created.",
});

export const includeGetIncidents = input({
  label: "Include",
  type: "string",
  required: false,
  model: [
    { label: "Acknowledgers", value: "acknowledgers" },
    { label: "Agents", value: "agents" },
    { label: "Assignees", value: "assignees" },
    { label: "Conference Bridge", value: "conference_bridge" },
    { label: "Custom Fields", value: "custom_fields" },
    { label: "Escalation Policies", value: "escalation_policies" },
    {
      label: "First Trigger Log Entries",
      value: "first_trigger_log_entries",
    },
    { label: "Priorities", value: "priorities" },
    { label: "Services", value: "services" },
    { label: "Teams", value: "teams" },
    { label: "Users", value: "users" },
  ],
  clean: toOptionalStringArray,
  comments: "The additional details to include in the response.",
});

export const updateIncidentObject = input({
  label: "Incident",
  type: "code",
  language: "json",
  required: true,
  clean: util.types.toObject,
  comments: "The JSON object containing the parameters of the incident to update.",
});

export const note = input({
  label: "Note",
  comments: "The JSON object containing the note content to attach to the incident.",
  example: JSON.stringify({
    note: "Firefighters are on the scene.",
  }),
  type: "code",
  language: "json",
  required: true,
  clean: util.types.toObject,
});


export const alertStatuses = input({
  label: "Statuses",
  type: "string",
  required: false,
  collection: "valuelist",
  model: [
    { label: "Triggered", value: "triggered" },
    { label: "Resolved", value: "resolved" },
  ],
  clean: toOptionalStringArray,
  comments: "The statuses to filter alerts by.",
});

export const alertSortBy = input({
  label: "Sort By",
  type: "string",
  required: false,
  model: [
    { label: "Created At", value: "created_at" },
    { label: "Resolved At", value: "resolved_at" },
    { label: "Created At Asc", value: "created_at:asc" },
    { label: "Created At Desc", value: "created_at:desc" },
    { label: "Resolved At Asc", value: "resolved_at:asc" },
    { label: "Resolved At Desc", value: "resolved_at:desc" },
  ],
  clean: toOptionalString,
  comments:
    "The field and direction used to sort results. Field options: created_at, resolved_at. Direction: asc or desc.",
});

export const alertInclude = input({
  label: "Include",
  type: "string",
  required: false,
  collection: "valuelist",
  model: [
    { label: "Services", value: "services" },
    {
      label: "First Trigger Log Entries",
      value: "first_trigger_log_entries",
    },
    { label: "Incidents", value: "incidents" },
  ],
  clean: toOptionalStringArray,
  comments: "The additional details to include in the response.",
});

export const alertsToUpdate = input({
  label: "Alerts",
  type: "code",
  language: "json",
  required: true,
  clean: util.types.toObject,
  comments:
    "The JSON array of alert objects, including the parameters to update for each alert.",
});
