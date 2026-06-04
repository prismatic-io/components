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

export const eventUuid = input({
  label: "Event UUID",
  type: "string",
  comments: "The event's unique identifier.",
  required: true,
  placeholder: "Enter event UUID",
  dataSource: "events",
  clean: util.types.toString,
});

export const inviteeUuid = input({
  label: "Invitee UUID",
  type: "string",
  comments: "The invitee's unique identifier.",
  required: true,
  placeholder: "Enter invitee UUID",
  clean: util.types.toString,
  dataSource: "selectEventInvitee",
});

export const reason = input({
  label: "Reason",
  type: "string",
  comments: "The reason for canceling the event.",
  required: false,
  placeholder: "Enter cancellation reason",
  clean: cleanString,
});

export const maxEventCount = input({
  label: "Max Event Count",
  type: "string",
  comments:
    "The max number of events that can be scheduled using this scheduling link.",
  required: true,
  example: "1",
  placeholder: "Enter max event count",
  clean: util.types.toNumber,
});

export const owner = input({
  label: "Owner",
  type: "string",
  comments:
    "A link to the resource that owns this Scheduling Link (currently, this is always an Event Type).",
  required: true,
  example: "https://api.calendly.com/event_types/012345678901234567890",
  placeholder: "Enter owner URI",
  clean: util.types.toString,
});

export const ownerType = input({
  label: "Owner Type",
  type: "string",
  comments: "Resource type (currently, this is always EventType).",
  required: true,
  example: "EventType",
  placeholder: "Enter owner type",
  clean: util.types.toString,
});

export const emails = input({
  label: "Email",
  type: "string",
  collection: "valuelist",
  comments: "Invitee email to delete.",
  required: true,
  placeholder: "Enter email addresses",
  clean: (value) => value as string[],
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

export const name = input({
  label: "Name",
  type: "string",
  required: false,
  comments: "The name of the resource.",
  placeholder: "Enter name",
  clean: cleanString,
  example: "15 Minute Meeting",
});

export const duration = input({
  label: "Duration",
  type: "string",
  required: false,
  comments: "The duration of the event in minutes.",
  placeholder: "Enter duration in minutes",
  clean: cleanString,
  example: "60",
});

export const periodType = input({
  label: "Period Type",
  type: "string",
  required: false,
  comments: "The type of scheduling period for the event type.",
  model: [
    {
      label: "",
      value: "",
    },
    {
      label: "Available Moving",
      value: "available_moving",
    },
    {
      label: "Moving",
      value: "moving",
    },
    {
      label: "Fixed",
      value: "fixed",
    },
    {
      label: "Unlimited",
      value: "unlimited",
    },
  ],

  clean: cleanString,
});

export const startDate = input({
  label: "Start Date",
  type: "string",
  comments: "Required when period_type is 'fixed'. Format: YYYY-MM-DD.",
  required: false,
  placeholder: "Enter start date (YYYY-MM-DD)",
  clean: cleanString,
  example: "2019-01-02",
});

export const endDate = input({
  label: "End Date",
  type: "string",
  comments: "Required when period_type is 'fixed'. Format: YYYY-MM-DD.",
  required: false,
  placeholder: "Enter end date (YYYY-MM-DD)",
  clean: cleanString,
  example: "2019-01-03",
});

export const maxBookingTime = input({
  label: "Max Booking Time",
  type: "string",
  comments: "Required when period_type is 'moving' or 'available_moving'.",
  required: false,
  placeholder: "Enter max booking time",
  clean: cleanString,
  example: "300",
});

export const hideLocation = input({
  label: "Hide Location",
  type: "boolean",
  comments:
    "When true, the location is hidden until the invitee books a spot. Only respected when there is a single custom location configured.",
  required: false,
  clean: util.types.toBool,
});

export const locationConfigurations = input({
  label: "Location Configurations",
  type: "code",
  language: "json",
  comments: "Array of location configurations for the event type.",
  default: JSON.stringify([
    {
      location: "123 Abc St.",
      additional_info: "Example additional info",
      phone_number: "+1 888-888-8888",
      position: 0,
      kind: "physical",
    },
  ]),
  required: false,
  clean: util.types.toObject,
});

export const availabilityRule = input({
  label: "Availability Rule",
  type: "code",
  language: "json",
  comments: "Availability rules defining when the event type can be scheduled.",
  default: JSON.stringify({
    rules: [
      {
        type: "wday",
        wday: "friday",
        date: "2019-01-02",
        intervals: [
          {
            from: "07:00",
            to: "11:00",
          },
        ],
      },
    ],
    timezone: "America/New_York",
  }),
  required: false,
  clean: util.types.toObject,
});

export const url = input({
  label: "URL",
  type: "string",
  comments:
    "The URL where you want to receive POST requests for events you are subscribed to.",
  required: true,
  placeholder: "Enter webhook URL",
  clean: util.types.toString,
});

export const event = input({
  label: "Event",
  type: "string",
  collection: "valuelist",
  comments: "Event to subscribe to.",
  required: true,
  example: [
    "invitee.canceled",
    "invitee.created",
    "invitee_no_show.created",
    "routing_form_submission.created",
  ].join(", "),
  clean: (value) => value as string[],
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

export const webhookUuid = input({
  label: "Webhook UUID",
  type: "string",
  required: true,
  comments: "The webhook's unique identifier.",
  placeholder: "Enter webhook UUID",
  clean: util.types.toString,
});

export const orgUuid = input({
  label: "Organization UUID",
  type: "string",
  comments: "The organization's unique identifier.",
  required: true,
  placeholder: "Enter organization UUID",
  clean: util.types.toString,
});

export const action = input({
  label: "Action",
  type: "string",
  collection: "valuelist",
  comments: "The action associated with the entries.",
  required: false,
  clean: (value) => value as string[],
});

export const actor = input({
  label: "Actor",
  type: "string",
  collection: "valuelist",
  comments: "Return entries from the user associated with the provided URI.",
  required: false,
  clean: (value) => value as string[],
});

export const maxOccurredAt = input({
  label: "Max Occurred At",
  type: "string",
  comments:
    "Include entries that occurred prior to this time. This time should use the UTC timezone. Format: ISO 8601 datetime.",
  required: false,
  placeholder: "Enter max occurred at (ISO 8601)",
  example: "2020-01-02T03:04:05.678Z",
  clean: cleanString,
});

export const minOccurredAt = input({
  label: "Min Occurred At",
  type: "string",
  comments:
    "Include entries that occurred after this time. This time should use the UTC timezone. Format: ISO 8601 datetime.",
  required: false,
  placeholder: "Enter min occurred at (ISO 8601)",
  example: "2020-01-02T03:04:05.678Z",
  clean: cleanString,
});

export const namespace = input({
  label: "Namespace",
  type: "string",
  collection: "valuelist",
  comments: "The category of the entry.",
  required: false,
  clean: (value) => value as string[],
});

export const searchTerm = input({
  label: "Search Term",
  type: "string",
  comments: "Filters entries based on the search term.",
  required: false,
  example: "compliance",
  placeholder: "Enter search term",
  clean: cleanString,
});

export const sortList = input({
  label: "Sort",
  type: "string",
  collection: "valuelist",
  comments:
    "Order results by the specified field and direction. {field}:{direction} value.",
  required: false,
  model: [
    {
      label: "Action Ascending",
      value: "action:asc",
    },
    {
      label: "Action Descending",
      value: "action:desc",
    },
    {
      label: "Actor Display Name Ascending",
      value: "actor.display_name:asc",
    },
    {
      label: "Actor Display Name Descending",
      value: "actor.display_name:desc",
    },
    {
      label: "Actor URI Ascending",
      value: "actor.uri:asc",
    },
    {
      label: "Actor URI Descending",
      value: "actor.uri:desc",
    },
    {
      label: "Namespace Ascending",
      value: "namespace:asc",
    },
    {
      label: "Namespace Descending",
      value: "namespace:desc",
    },
    {
      label: "Occurred At Ascending",
      value: "occurred_at:asc",
    },
    {
      label: "Occurred At Descending",
      value: "occurred_at:desc",
    },
  ],
  clean: (value) => value as string[],
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

export const returnUuidOnly = input({
  label: "Return UUID Only",
  type: "boolean",
  comments:
    "When enabled, returns only the UUID from the URI instead of the full URI.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});
