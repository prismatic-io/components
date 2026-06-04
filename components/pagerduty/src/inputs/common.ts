import { input, util } from "@prismatic-io/spectral";
import {
  toOptionalBoolean,
  toOptionalNumber,
  toOptionalString,
  toOptionalStringArray,
} from "../util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The PagerDuty connection to use.",
});

export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  placeholder: "Enter the maximum number of results to return",
  example: "10",
  clean: toOptionalNumber,
  comments: "The maximum number of results to return per page.",
});

export const offset = input({
  label: "Offset",
  type: "string",
  required: false,
  placeholder: "Enter the pagination offset",
  example: "18",
  clean: toOptionalNumber,
  comments:
    "The number of results to skip before starting to return results. Used for pagination.",
});

export const total = input({
  label: "Total",
  type: "boolean",
  required: false,
  model: ["True", "False"].map((value) => ({ value, label: value })),
  clean: toOptionalBoolean,
  comments:
    "When true, the total field in pagination responses is populated. By default this field is null to provide the fastest possible response times.",
});

export const teamIds = input({
  label: "Team IDs",
  type: "string",
  placeholder: "Enter a team ID",
  example: "PEYSGVF",
  required: false,
  collection: "valuelist",
  clean: toOptionalStringArray,
  comments: "The unique identifiers of the teams to filter results by.",
});

export const since = input({
  label: "Since",
  type: "string",
  placeholder: "Enter a UTC ISO 8601 datetime string",
  example: "2020-07-17T07:42:58Z",
  required: false,
  clean: toOptionalString,
  comments:
    "The start of the date range over which to search, as a UTC ISO 8601 datetime string.",
});

export const until = input({
  label: "Until",
  type: "string",
  placeholder: "Enter a UTC ISO 8601 datetime string",
  example: "2020-07-17T07:42:58Z",
  required: false,
  clean: toOptionalString,
  comments:
    "The end of the date range over which to search, as a UTC ISO 8601 datetime string.",
});

export const eventId = input({
  label: "Event ID",
  type: "string",
  placeholder: "Enter a change event ID",
  example: "12",
  required: true,
  clean: util.types.toString,
  comments: "The unique identifier for the change event.",
});

export const event = input({
  label: "Event to Send",
  type: "code",
  language: "json",
  required: true,
  comments: "The JSON object describing the event payload to send.",
  clean: util.types.toObject,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
  comments:
    "When true, automatically fetches all pages of results. When false, only the first page is returned.",
  example: "false",
});
