import { action, input, util } from "@prismatic-io/spectral";
import { listAllEvents } from "../helpers/listAllEvents";
import {
  calendarId,
  connectionInput,
  fetchAll,
  maxResults,
  pageToken,
  syncToken,
} from "../inputs";
import { parseReturn } from "../parseReturn";

export const listEvents = action({
  display: {
    label: "List Events",
    description: "List all events in a given calendar",
  },
  perform: async (_context, params) => {
    const { config, ...base } = await listAllEvents(params);

    return {
      data: {
        config: parseReturn(config),
        ...base,
      },
    };
  },
  inputs: {
    googleConnection: connectionInput,
    calendarId,
    fetchAll,
    maxResults,
    pageToken,
    syncToken,
    maxAttendees: input({
      label: "Max Attendees",
      type: "string",
      required: false,
      placeholder: "Enter maximum attendees",
      example: "10",
      comments:
        "Maximum number of attendees to include in the response. If there are more attendees, only the participant is returned.",
      clean: (value) => (value !== "" ? util.types.toInt(value) : undefined),
    }),
    orderBy: input({
      label: "Order By",
      type: "string",
      model: [
        { label: "Start Time", value: "startTime" },
        { label: "Updated", value: "updated" },
      ],
      required: false,
      placeholder: "Select sort order",
      comments:
        "The order of events returned in the result. Default is an unspecified, stable order.",
      clean: (value) => (value !== "" ? util.types.toString(value) : undefined),
    }),
    q: input({
      label: "Query",
      type: "string",
      required: false,
      placeholder: "Enter search terms",
      example: "team meeting",
      comments:
        "Free text search terms to find events matching in summary, description, location, or attendee fields.",
      clean: (value) => (value !== "" ? util.types.toString(value) : undefined),
    }),
    showDeleted: input({
      label: "Show Deleted",
      type: "boolean",
      default: "false",
      required: false,
      comments: "When true, includes deleted events in the response.",
      clean: util.types.toBool,
    }),
    showHiddenInvitations: input({
      label: "Show Hidden Invitations",
      type: "boolean",
      required: false,
      comments: "When true, includes hidden invitations in the response.",
      clean: util.types.toBool,
    }),
    singleEvents: input({
      label: "Single Events",
      type: "boolean",
      default: "false",
      required: false,
      comments:
        "When true, expands recurring events into instances and returns only single one-off events and instances, not the underlying recurring events.",
      clean: util.types.toBool,
    }),
    timeMin: input({
      label: "Time Min",
      type: "string",
      required: false,
      placeholder: "Enter start time (ISO 8601 format)",
      example: "2026-06-03T10:00:00-07:00",
      comments:
        "Lower bound for filtering events by end time. Must be in ISO 8601 format with timezone offset.",
      clean: (value) => (value !== "" ? util.types.toString(value) : undefined),
    }),
    timeMax: input({
      label: "Time Max",
      type: "string",
      required: false,
      placeholder: "Enter end time (ISO 8601 format)",
      example: "2026-06-03T10:00:00-07:00",
      comments:
        "Upper bound for filtering events by start time. Must be in ISO 8601 format with timezone offset.",
      clean: (value) => (value !== "" ? util.types.toString(value) : undefined),
    }),
    updatedMin: input({
      label: "Updated Min",
      type: "string",
      required: false,
      placeholder: "Enter minimum update time (RFC 3339)",
      example: "2026-01-01T00:00:00Z",
      comments:
        "Lower bound for filtering by last modification time (RFC 3339 format). Deleted entries since this time are always included regardless of 'Show Deleted' setting.",
      clean: (value) => (value !== "" ? util.types.toString(value) : undefined),
    }),
    timeZone: input({
      label: "Time Zone",
      type: "string",
      required: false,
      placeholder: "Enter timezone (IANA format)",
      example: "America/Chicago",
      comments: "Time zone used in the response.",
      clean: (value) => (value !== "" ? util.types.toString(value) : undefined),
    }),
  },
});
