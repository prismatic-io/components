import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import type { Attendee, AttendeeType } from "@microsoft/microsoft-graph-types";
import {
  connectionInput,
  endInput,
  endTimezoneInput,
  eventIdInput,
  fetchAllInput,
  pageLimitInput,
  pageSkipInput,
  startInput,
  startTimezoneInput,
} from "./common";

export const eventCalendarIdInput = input({
  label: "Calendar ID",
  type: "string",
  required: false,
  dataSource: "selectCalendar",
  comments:
    "The unique identifier of the calendar to list events from. Lists all events for the current user if unspecified.",
  example: "AAMkAGI2TGuLAAA=",
  placeholder: "Select a calendar",
  clean: util.types.toString,
});

export const locationNameInput = input({
  label: "Location Name",
  type: "string",
  required: true,
  comments: "The name of the event location.",
  example: "Conference Room A",
  placeholder: "Enter location name",
  clean: util.types.toString,
});

export const subjectInput = input({
  label: "Subject",
  type: "string",
  required: true,
  comments: "The subject of the calendar event.",
  example: "Team Meeting",
  placeholder: "Enter event subject",
  clean: util.types.toString,
});

export const bodyInput = input({
  label: "Body (HTML)",
  type: "string",
  required: true,
  comments: "The HTML body content of the event.",
  example: "<p>Please join us for the team meeting.</p>",
  placeholder: "Enter event body (HTML)",
  clean: util.types.toString,
});

export const attendeesDataInput = input({
  label: "Attendees Data Collection",
  type: "data",
  example:
    "[{ emailAddress: { address: 'john.doe@example.com', name: 'John Doe' }, type: 'required' }]",
  placeholder: "Output data from previous step",
  comments:
    "A reference to data structures representing attendees. Merged with Attendees if both are specified.",
});

export const attendeesInput = input({
  label: {
    key: "Email",
    value: "Type",
  },
  type: "string",
  collection: "keyvaluelist",
  model: [
    { label: "Required", value: "required" },
    { label: "Optional", value: "optional" },
    { label: "Resource", value: "resource" },
  ],
  comments:
    "The event attendees as key-value pairs. Specify the email address as the key and the attendee type (required, optional, or resource) as the value.",
  example: '{"john.doe@example.com": "required", "jane.smith@example.com": "optional"}',
  placeholder: "Enter attendee email addresses",
  clean: (rawValue) => {
    if (!Array.isArray(rawValue)) {
      throw new Error("Unexpected format of attendees collection.");
    }

    const payload = (rawValue as KeyValuePair<unknown>[]).map<Attendee>(({ key, value }) => ({
      emailAddress: { address: util.types.toString(key) },
      type: util.types.toString(value) as AttendeeType,
    }));
    return payload;
  },
});

const cancelCommentInput = input({
  label: "Comment",
  type: "string",
  required: false,
  example: "Meeting rescheduled to next week.",
  placeholder: "Enter cancellation comment",
  comments: "An optional comment about the cancellation sent to all attendees.",
  clean: util.types.toString,
});

export const listEventsInputs = {
  connection: connectionInput,
  fetchAll: fetchAllInput,
  pageLimit: pageLimitInput,
  pageSkip: pageSkipInput,
  calendarId: eventCalendarIdInput,
};

export const createEventInputs = {
  connection: connectionInput,
  locationName: locationNameInput,
  subject: subjectInput,
  body: bodyInput,
  start: startInput,
  startTimezone: startTimezoneInput,
  end: endInput,
  endTimezone: endTimezoneInput,
  calendarId: eventCalendarIdInput,
  attendeesData: attendeesDataInput,
  attendees: attendeesInput,
};

export const updateEventInputs = {
  connection: connectionInput,
  eventId: eventIdInput,
  locationName: { ...locationNameInput, required: false },
  subject: { ...subjectInput, required: false },
  body: { ...bodyInput, required: false },
  start: { ...startInput, required: false },
  startTimezone: { ...startTimezoneInput, required: false },
  end: { ...endInput, required: false },
  endTimezone: { ...endTimezoneInput, required: false },
  attendeesData: { ...attendeesDataInput, required: false },
  attendees: { ...attendeesInput, required: false },
};

export const deleteEventInputs = {
  connection: connectionInput,
  eventId: eventIdInput,
};

export const cancelEventInputs = {
  connection: connectionInput,
  eventId: eventIdInput,
  comment: cancelCommentInput,
};
