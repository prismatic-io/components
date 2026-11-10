import { input, type KeyValuePair, structuredObjectInput, util } from "@prismatic-io/spectral";
import type { Attendee, AttendeeType } from "@microsoft/microsoft-graph-types";
import { cleanStringInput } from "../util";
import {
  connectionInput,
  endInput,
  endTimezoneInput,
  eventIdInput,
  fetchAllInput,
  pagination,
  startInput,
  startTimezoneInput,
} from "./common";

const eventCalendarIdInput = input({
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

const locationNameInput = input({
  label: "Location Name",
  type: "string",
  required: true,
  comments: "Where the event takes place, such as a meeting room name or a street address.",
  example: "Conference Room A",
  placeholder: "Enter location name",
  clean: util.types.toString,
});

const subjectInput = input({
  label: "Subject",
  type: "string",
  required: true,
  comments: "The title shown for the event in calendars and meeting invitations.",
  example: "Team Meeting",
  placeholder: "Enter event subject",
  clean: util.types.toString,
});

const bodyInput = input({
  label: "Body (HTML)",
  type: "string",
  required: true,
  comments: "The event description shown to attendees in the invitation, formatted as HTML.",
  example: "<p>Please join us for the team meeting.</p>",
  placeholder: "Enter event body (HTML)",
  clean: util.types.toString,
});

const attendeesDataInput = input({
  label: "Attendees Data Collection",
  type: "data",
  example:
    "[{ emailAddress: { address: 'john.doe@example.com', name: 'John Doe' }, type: 'required' }]",
  placeholder: "Output data from previous step",
  comments:
    "A reference to data structures representing attendees. Merged with Attendees if both are specified.",
});

const attendeesInput = input({
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

const updateEventScheduleInput = structuredObjectInput({
  label: "Schedule",
  required: false,
  comments: "Start and end times of the event and the timezone applied to each.",
  inputs: {
    start: { ...startInput, required: false, clean: cleanStringInput },
    startTimezone: { ...startTimezoneInput, required: false, clean: cleanStringInput },
    end: { ...endInput, required: false, clean: cleanStringInput },
    endTimezone: { ...endTimezoneInput, required: false, clean: cleanStringInput },
  },
});

export const listEventsInputs = {
  connection: connectionInput,
  fetchAll: fetchAllInput,
  pagination,
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
  locationName: { ...locationNameInput, required: false, clean: cleanStringInput },
  subject: { ...subjectInput, required: false, clean: cleanStringInput },
  body: { ...bodyInput, required: false, clean: cleanStringInput },
  schedule: updateEventScheduleInput,
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
