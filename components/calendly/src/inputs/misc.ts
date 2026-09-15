import { input, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { cleanString } from "../util";
import {
  connection,
  organization,
  uuid,
  eventType,
  startTime,
  endTime,
} from "./common";
import { LIVE_API_URL } from "../constants";
const maxEventCount = input({
  label: "Max Event Count",
  type: "string",
  comments:
    "The max number of events that can be scheduled using this scheduling link.",
  required: true,
  example: "1",
  placeholder: "Enter max event count",
  clean: util.types.toNumber,
});
const owner = input({
  label: "Owner",
  type: "string",
  comments:
    "A link to the resource that owns this Scheduling Link (currently, this is always an Event Type).",
  required: true,
  example: "https://api.calendly.com/event_types/012345678901234567890",
  placeholder: "Enter owner URI",
  clean: util.types.toString,
});
const ownerType = input({
  label: "Owner Type",
  type: "string",
  comments: "Resource type (currently, this is always EventType).",
  required: true,
  example: "EventType",
  placeholder: "Enter owner type",
  clean: util.types.toString,
});
const name = input({
  label: "Name",
  type: "string",
  required: false,
  comments: "The name of the resource.",
  placeholder: "Enter name",
  clean: cleanString,
  example: "15 Minute Meeting",
});
const duration = input({
  label: "Duration",
  type: "string",
  required: false,
  comments: "The duration of the event in minutes.",
  placeholder: "Enter duration in minutes",
  clean: cleanString,
  example: "60",
});
const periodType = input({
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
const startDate = input({
  label: "Start Date",
  type: "string",
  comments: "Required when period_type is 'fixed'. Format: YYYY-MM-DD.",
  required: false,
  placeholder: "Enter start date (YYYY-MM-DD)",
  clean: cleanString,
  example: "2019-01-02",
});
const endDate = input({
  label: "End Date",
  type: "string",
  comments: "Required when period_type is 'fixed'. Format: YYYY-MM-DD.",
  required: false,
  placeholder: "Enter end date (YYYY-MM-DD)",
  clean: cleanString,
  example: "2019-01-03",
});
const maxBookingTime = input({
  label: "Max Booking Time",
  type: "string",
  comments: "Required when period_type is 'moving' or 'available_moving'.",
  required: false,
  placeholder: "Enter max booking time",
  clean: cleanString,
  example: "300",
});
const hideLocation = input({
  label: "Hide Location",
  type: "boolean",
  comments:
    "When true, the location is hidden until the invitee books a spot. Only respected when there is a single custom location configured.",
  required: false,
  clean: util.types.toBool,
});
const locationConfigurations = input({
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
const availabilityRule = input({
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
export const createShareInputs = {
  connection,
  organization: { ...organization, dataSource: "organizations" },
  eventType,
  name,
  duration,
  periodType,
  startDate,
  endDate,
  maxBookingTime,
  hideLocation,
  locationConfigurations,
  availabilityRule,
};
export const createSingleUseSchedulingLinkInputs = {
  connection,
  maxEventCount,
  owner,
  ownerType,
};
export const getEventTypeInputs = {
  connection,
  organization: { ...organization, dataSource: "organizations" },
  uuid: { ...uuid, dataSource: "eventTypes" },
};
export const listEventTypeAvailableTimesInputs = {
  connection,
  organization: { ...organization, dataSource: "organizations" },
  endTime: {
    ...endTime,
    required: true,
    comments: "End time of the requested availability range.",
  },
  eventType,
  startTime: {
    ...startTime,
    required: true,
    comments: "Start time of the requested availability range.",
  },
};
const { debugRequest: _, ...httpRawInputs } = httpClientInputs;
export const rawRequestInputs = {
  connection,
  ...httpRawInputs,
  url: {
    ...httpRawInputs.url,
    comments: `Input the path only (/users/me), The base URL is already included (${LIVE_API_URL}). For example, to connect to ${LIVE_API_URL}/users/me, only /users/me is entered in this field.`,
    example: "/users/me",
  },
};
