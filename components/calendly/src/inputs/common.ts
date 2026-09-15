import { input, util } from "@prismatic-io/spectral";
import { cleanOrganizationInput, cleanString } from "../util";
export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Calendly connection to use.",
});
export const uuid = input({
  label: "UUID",
  type: "string",
  required: true,
  comments: "The unique identifier in UUID format.",
  example: "9f53ccd3-88e6-4c62-ad9e-91ea57d2187d",
  placeholder: "Enter UUID",
  clean: util.types.toString,
});
export const count = input({
  label: "Count",
  type: "string",
  comments: "The number of rows to return.",
  required: false,
  placeholder: "Enter count",
  clean: util.types.toNumber,
});
export const email = input({
  label: "Email",
  type: "string",
  comments: "Indicates if the results should be filtered by email address.",
  example: "bob@example.com",
  placeholder: "Enter email address",
  required: false,
  clean: cleanString,
});
export const pageToken = input({
  label: "Page Token",
  type: "string",
  comments:
    "The token to pass to get the next or previous portion of the collection.",
  required: false,
  placeholder: "Enter page token",
  clean: cleanString,
});
export const sort = input({
  label: "Sort",
  type: "string",
  comments:
    "Order results by the created_at field and direction specified: ascending ('asc') or descending ('desc').",
  required: false,
  placeholder: "Enter sort expression",
  clean: cleanString,
});
export const status = input({
  label: "Status",
  type: "string",
  comments: "Indicates if the invitee 'canceled' or still 'active'.",
  required: false,
  example: "active",
  placeholder: "Enter status",
  clean: cleanString,
});
export const inviteeEmail = input({
  label: "Invitee Email",
  type: "string",
  comments:
    "Return events scheduled with the invitee associated with this email address.",
  example: "alice@example.com",
  placeholder: "Enter invitee email address",
  required: false,
  clean: cleanString,
});
export const maxStartTime = input({
  label: "Max Start Time",
  type: "string",
  comments:
    "Include events with start times prior to this time. Format: ISO 8601 datetime.",
  example: "2020-01-02T12:30:00.000000Z",
  placeholder: "Enter max start time (ISO 8601)",
  required: false,
  clean: cleanString,
});
export const minStartTime = input({
  label: "Min Start Time",
  type: "string",
  comments:
    "Include events with start times after this time. Format: ISO 8601 datetime.",
  example: "2020-01-02T12:30:00.000000Z",
  placeholder: "Enter min start time (ISO 8601)",
  required: false,
  clean: cleanString,
});
export const organization = input({
  label: "Organization",
  type: "string",
  comments:
    "Return events scheduled with the organization associated with this URI.",
  example: "https://api.calendly.com/organizations/EBHAAFHDCAEQTSEZ",
  placeholder: "Enter organization URI",
  required: false,
  clean: cleanOrganizationInput,
});
export const user = input({
  label: "User",
  type: "string",
  comments: "Return events scheduled with the user associated with this URI.",
  example: "https://api.calendly.com/users/EBHAAFHDCAEQTSEZ",
  placeholder: "Enter user URI",
  required: false,
  clean: cleanString,
});
export const startTime = input({
  label: "Start Time",
  type: "string",
  comments:
    "The scheduled events UTC timestamp at which data deletion should begin. Format: ISO 8601 datetime.",
  required: true,
  example: "2019-01-02T03:04:05.678123Z",
  placeholder: "Enter start time (ISO 8601)",
  clean: util.types.toString,
});
export const endTime = input({
  label: "End Time",
  type: "string",
  comments:
    "The scheduled events UTC timestamp at which data deletion should end. Format: ISO 8601 datetime.",
  required: true,
  example: "2021-01-01T02:04:05.678123Z",
  placeholder: "Enter end time (ISO 8601)",
  clean: util.types.toString,
});
export const adminManaged = input({
  label: "Admin Managed",
  type: "boolean",
  comments:
    "When true, returns only admin managed event types. When false, excludes admin managed event types.",
  required: false,
  clean: util.types.toBool,
});
export const userAvailabilitySchedule = input({
  label: "User Availability Schedule",
  type: "string",
  comments:
    "Used in conjunction with user parameter, returns a filtered list of Event Types that use the given primary availability schedule.",
  required: false,
  placeholder: "Enter user availability schedule",
  clean: cleanString,
});
export const active = input({
  label: "Active",
  type: "boolean",
  comments:
    "When true, returns only active event types. When false, returns only inactive event types.",
  required: false,
  clean: util.types.toBool,
});
export const eventType = input({
  label: "Event Type",
  type: "string",
  comments: "The URI associated with the event type.",
  required: true,
  placeholder: "Enter event type URI",
  dataSource: "eventTypes",
  clean: util.types.toString,
});
export const form = input({
  label: "Form",
  type: "string",
  comments:
    "View routing form submissions associated with the routing form's URI.",
  example: "https://api.calendly.com/routing_forms/AAAAAAAAAAAAAAAA",
  placeholder: "Enter routing form URI",
  required: true,
  dataSource: "routingForms",
  clean: util.types.toString,
});
export const scope = input({
  label: "Scope",
  type: "string",
  comments:
    "Indicates if the webhook subscription scope will be 'organization' or 'user'.",
  required: true,
  model: [
    {
      label: "Organization",
      value: "organization",
    },
    {
      label: "User",
      value: "user",
    },
  ],
  clean: util.types.toString,
});
export const signingKey = input({
  label: "Signing Key",
  type: "password",
  comments:
    "Optional secret key shared between your application and Calendly. See [Calendly API documentation](https://developer.calendly.com/api-docs/ZG9jOjM2MzE2MDM4-webhook-signatures) for additional information.",
  required: false,
  placeholder: "Enter signing key",
  clean: cleanString,
});
export const returnUuidOnly = input({
  label: "Return UUID Only",
  type: "boolean",
  comments:
    "When enabled, returns only the UUID from the URI instead of the full URI.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});
export const triggerInviteeCreated = input({
  label: "Invitee Created",
  type: "boolean",
  comments: "When true, triggers when an invitee is created.",
  required: false,
  clean: util.types.toBool,
});
export const triggerInviteeCanceled = input({
  label: "Invitee Canceled",
  type: "boolean",
  comments: "When true, triggers when an invitee is canceled.",
  required: false,
  clean: util.types.toBool,
});
export const triggerInviteeNoShowCreated = input({
  label: "Invitee No Show Created",
  type: "boolean",
  comments: "When true, triggers when an invitee no show is created.",
  required: false,
  clean: util.types.toBool,
});
export const triggerRoutingFormSubmissionCreated = input({
  label: "Routing Form Submission Created",
  type: "boolean",
  comments:
    "When true, triggers when a routing form submission is created. Important: this event only works with the 'organization' scope.",
  required: false,
  clean: util.types.toBool,
});
export const eventNamesInput = input({
  label: "Webhook Event Name",
  type: "string",
  collection: "valuelist",
  comments: "The webhook event types to subscribe to.",
  model: [
    { label: "Invitee Created", value: "invitee.created" },
    { label: "Invitee Canceled", value: "invitee.canceled" },
    { label: "Invitee No Show Created", value: "invitee_no_show.created" },
    {
      label: "Routing Form Submission Created",
      value: "routing_form_submission.created",
    },
  ],
  required: true,
  clean: (events) =>
    Array.isArray(events)
      ? events.map((event) => util.types.toString(event))
      : [],
});
export const lookBackDate = input({
  label: "Look-Back Date",
  type: "string",
  required: false,
  comments:
    "Optional ISO 8601 date used as the initial cursor on first deploy, allowing pre-existing events created or updated after this date to be included. When omitted the first poll seeds the cursor to now and emits nothing.",
  example: "2026-01-01",
  placeholder: "2026-01-01",
  clean: cleanString,
});
export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, events created since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});
export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, events updated since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});
