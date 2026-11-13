import { input, util } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput, toStringArray } from "../util";
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

const calendarIdInput = input({
  label: "Calendar ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the calendar.",
  example: "AAMkAGI2TGuLAAA=",
  placeholder: "Enter a calendar ID",
  dataSource: "selectCalendar",
  clean: util.types.toString,
});

const calendarNameInput = input({
  label: "Name",
  type: "string",
  required: true,
  comments: "The display name shown for the calendar.",
  example: "Project Calendar",
  placeholder: "Enter calendar name",
  clean: util.types.toString,
});

const calendarColorInput = input({
  label: "Color",
  type: "string",
  required: true,
  default: "auto",
  example: "lightRed",
  placeholder: "Enter a calendar color",
  comments:
    "The color of the calendar. See the `color` property in the [Microsoft Graph calendar resource documentation](https://learn.microsoft.com/en-us/graph/api/resources/calendar?view=graph-rest-1.0#properties) for the supported values.",
  clean: util.types.toString,
});

const availabilityViewIntervalInput = input({
  label: "Availability View Interval",
  type: "string",
  required: false,
  example: "60",
  default: "30",
  placeholder: "Enter interval in minutes",
  comments: "The duration of each time slot used to check availability, in minutes.",
  clean: cleanNumberInput,
});

const schedulesInput = input({
  label: "Schedules",
  type: "string",
  collection: "valuelist",
  example: '["adele.vance@example.com", "conference.room@example.com"]',
  required: true,
  placeholder: "Enter SMTP addresses",
  comments:
    "The collection of SMTP addresses of users, distribution lists, or resources to get availability information for.",
  clean: toStringArray,
});

export const listCalendarsInputs = {
  connection: connectionInput,
  fetchAll: fetchAllInput,
  pagination,
};

export const createCalendarInputs = {
  connection: connectionInput,
  name: calendarNameInput,
  color: calendarColorInput,
};

export const updateCalendarInputs = {
  connection: connectionInput,
  id: calendarIdInput,
  color: calendarColorInput,
  name: { ...calendarNameInput, required: false, clean: cleanStringInput },
};

export const deleteCalendarInputs = {
  connection: connectionInput,
  id: calendarIdInput,
};

export const getScheduleInputs = {
  connection: connectionInput,
  schedules: schedulesInput,
  start: startInput,
  startTimezone: startTimezoneInput,
  end: endInput,
  endTimezone: endTimezoneInput,
  availabilityViewInterval: availabilityViewIntervalInput,
};

export const getCalendarEventInputs = {
  connection: connectionInput,
  eventId: eventIdInput,
};
