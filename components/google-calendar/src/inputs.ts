import type { calendar_v3 } from "@googleapis/calendar/build/v3";
import { input, util } from "@prismatic-io/spectral";

export const calendarId = input({
  label: "Calendar ID",
  type: "string",
  required: true,
  placeholder: "Enter Calendar ID",
  example: "en.usa#holiday@group.v.calendar.google.com",
  comments:
    "The unique identifier of the calendar. Use 'primary' for the user's primary calendar.",
  clean: util.types.toString,
  dataSource: "selectCalendar",
});

export const startTime = input({
  label: "Start Time",
  type: "string",
  required: true,
  placeholder: "Enter start time (ISO 8601 format)",
  example: "2026-05-28T17:00:00-07:00",
  comments:
    "The start time of the event in ISO 8601 format with timezone offset.",
});

export const timeZone = input({
  label: "Time Zone",
  type: "string",
  required: true,
  placeholder: "Enter timezone (IANA format)",
  example: "America/Chicago",
  comments:
    "The timezone of the event in IANA Time Zone Database format. See [IANA timezone list](https://www.iana.org/time-zones).",
});

export const endTime = input({
  label: "End Time",
  type: "string",
  required: true,
  placeholder: "Enter end time (ISO 8601 format)",
  example: "2026-05-28T19:00:00-07:00",
  comments:
    "The end time of the event in ISO 8601 format with timezone offset.",
});

export const summary = input({
  label: "Summary",
  type: "string",
  required: true,
  placeholder: "Enter event summary",
  example: "Team Standup Meeting",
  comments: "The title or summary of the event.",
});

export const description = input({
  label: "Description",
  type: "string",
  required: true,
  placeholder: "Enter event description",
  example: "Discuss sprint progress and blockers",
  comments: "A detailed description of the event.",
});

export const attendees = input({
  label: "Attendees",
  type: "code",
  default: JSON.stringify(
    [
      { email: "john.doe@example.com", optional: false },
      { email: "jane.smith@example.com", optional: true },
    ],
    null,
    2
  ),
  language: "json",
  required: false,
  comments:
    "Array of attendee objects with email addresses and optional flags. See [Google Calendar Events API](https://developers.google.com/calendar/api/v3/reference/events/insert) for full schema.",
  clean: (value) =>
    value
      ? (util.types.toObject(value) as calendar_v3.Schema$EventAttendee[])
      : undefined,
});

export const remindMethod = input({
  label: "Remind Method",
  type: "string",
  model: [
    {
      label: "Email",
      value: "email",
    },
    {
      label: "Popup",
      value: "popup",
    },
  ],
  required: false,
  placeholder: "Select reminder method",
  comments:
    "How to send the event reminder. Only used when 'Default Reminder' is false.",
});

export const remindMinutes = input({
  label: "Remind Before (minutes)",
  type: "string",
  required: false,
  placeholder: "Enter minutes before event",
  example: "30",
  comments:
    "Number of minutes before the event to send the reminder. Only used when 'Default Reminder' is false.",
});

export const eventLocation = input({
  label: "Event Location",
  type: "string",
  required: false,
  placeholder: "Enter event location",
  example: "Conference Room A, Building 3",
  comments: "The physical or virtual location of the event.",
});

export const eventId = input({
  label: "Event ID",
  type: "string",
  required: true,
  placeholder: "Enter Event ID",
  dataSource: "selectEvent",
  example: "20260101_q8ue475rr4p7opsd4c0lr7g5pg",
  comments: "The unique identifier of the event.",
});

export const useDefaultReminder = input({
  label: "Default Reminder",
  type: "boolean",
  required: true,
  comments:
    "When true, the event uses the default reminder settings from the calendar.",
});

export const maxResults = input({
  label: "Max Results",
  type: "string",
  required: false,
  placeholder: "Enter maximum number of results (1-250)",
  comments: "Maximum number of results to return (1-250).",
  example: "50",
  clean: (value) => (value !== "" ? util.types.toInt(value) : undefined),
});

export const pageToken = input({
  label: "Page Token",
  type: "string",
  required: false,
  placeholder: "Enter page token from previous response",
  comments:
    "Pagination token returned from a previous request to retrieve the next page of results.",
  example: "lslTXFcbLQKkb0vP9Kgh5hy0Y0OnC7Z9ZPHPwPmMnxSk3eiDRMkct7D8E",
  clean: (value) => (value !== "" ? util.types.toString(value) : undefined),
});

export const syncToken = input({
  label: "Sync Token",
  type: "string",
  required: false,
  placeholder: "Enter sync token from previous response",
  comments:
    "Token for retrieving only resources modified since the last sync request.",
  example: "lslTXFcbLQKkb0vP9Kgh5hy0Y0OnC7Z9ZPHPwPmMnxSk3eiDRMkct7D8E",
  clean: (value) => (value !== "" ? util.types.toString(value) : undefined),
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Google Calendar connection to use.",
});

export const addConferenceEvent = input({
  label: "Add Conference Event",
  type: "boolean",
  default: "false",
  required: false,
  comments: "When true, creates a Google Meet conference link for the event.",
  clean: util.types.toBool,
});

export const sendUpdates = input({
  label: "Send Updates",
  type: "string",
  model: [
    {
      label: "",
      value: "",
    },
    {
      label: "All",
      value: "all",
    },
    {
      label: "External Only",
      value: "externalOnly",
    },
    {
      label: "None",
      value: "none",
    },
  ],
  required: false,
  default: "",
  comments:
    "Whether to send notifications about the creation of the new event. Note that some emails might still be sent. The default is false.",
  clean: util.types.toString,
});

export const selectCalendarInputs = { connection: connectionInput };

export const selectEventInputs = {
  connection: connectionInput,
  calendarId: {
    ...calendarId,
    comments: "Calendar ID to get events from.",
    dataSource: undefined,
  },
};

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments:
    "When true, fetches all pages of results, ignoring the 'Max Results' and 'Page Token' inputs.",
  clean: util.types.toBool,
});

export const calendarChangeEventsInputs = {
  connection: connectionInput,
  calendarId: {
    ...calendarId,
    comments: "The calendar to monitor for changes.",
  },
};

export const pollEventsTriggerInputs = {
  connection: connectionInput,
  calendarId: {
    ...calendarId,
    comments: "The calendar to poll for event changes.",
  },
};
