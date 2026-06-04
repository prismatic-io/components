export const BASE_URL = "https://api.pagerduty.com";

export const EVENTS_URL = "https://events.pagerduty.com/v2";

export const PAGINATION_MAX_PAGE_SIZE = 100;

export const PAGINATION_MAX_RECORDS = 10000;

export const PAGINATION_MAX_OFFSET =
  PAGINATION_MAX_RECORDS - PAGINATION_MAX_PAGE_SIZE;

export const ENDPOINTS = {
  TEMPLATES: "/templates",
  USERS: "/users",
  SERVICES: "/services",
  WEBHOOK_SUBSCRIPTIONS: "/webhook_subscriptions",
  PRIORITIES: "/priorities",
  CHANGE_EVENTS: "/change_events",
  NOTIFICATIONS: "/notifications",
  INCIDENTS: "/incidents",
  INCIDENTS_ALERTS: (incidentId: string) => `/incidents/${incidentId}/alerts`,
  WEBHOOK_SUBSCRIPTIONS_BY_ID: (webhookId: string) =>
    `/webhook_subscriptions/${webhookId}`,
  CHANGE_EVENTS_BY_ID: (changeEventId: string) =>
    `/change_events/${changeEventId}`,
};

export const incidentEvents = [
  { label: "Incident Acknowledged", value: "incident.acknowledged" },
  { label: "Incident Annotated", value: "incident.annotated" },
  {
    label: "Incident Conference Bridge Updated",
    value: "incident.conference_bridge.updated",
  },
  { label: "Incident Delegated", value: "incident.delegated" },
  { label: "Incident Escalated", value: "incident.escalated" },
  { label: "Incident Priority Updated", value: "incident.priority_updated" },
  { label: "Incident Reassigned", value: "incident.reassigned" },
  { label: "Incident Reopened", value: "incident.reopened" },
  { label: "Incident Resolved", value: "incident.resolved" },
  { label: "Incident Responder Added", value: "incident.responder.added" },
  { label: "Incident Responder Replied", value: "incident.responder.replied" },
  { label: "Incident Service Updated", value: "incident.service_updated" },
  {
    label: "Incident Status Update Published",
    value: "incident.status_update_published",
  },
  { label: "Incident Triggered", value: "incident.triggered" },
  { label: "Incident Unacknowledged", value: "incident.unacknowledged" },
  { label: "Incident Workflow Started", value: "incident.workflow.started" },
  {
    label: "Incident Workflow Completed",
    value: "incident.workflow.completed",
  },
];

export const serviceEvents = [
  { label: "Service Created", value: "service.created" },
  { label: "Service Deleted", value: "service.deleted" },
  { label: "Service Updated", value: "service.updated" },
];
