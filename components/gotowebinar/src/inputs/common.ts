import { input, util } from "@prismatic-io/spectral";
import {
  AVAILABLE_LOCALES_FOR_WEBINAR_MODEL,
  MAX_PAGE_SIZE,
  WEBINAR_TYPE_MODEL,
} from "../constants";
import { toOptionalNumber, toOptionalString } from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const pageNumber = input({
  label: "Page Number",
  comments: "The zero-based index of the page to return. The first page is 0.",
  type: "string",
  required: false,
  example: "0",
  placeholder: "Enter a page number",
  clean: toOptionalNumber,
});

export const pageSize = input({
  label: "Page Size",
  comments:
    "The maximum number of results to return per page. The maximum value is 200.",
  type: "string",
  required: false,
  example: "200",
  placeholder: "Enter a page size",
  clean: (value: unknown) => {
    const size = toOptionalNumber(value);
    if (!size) {
      return size;
    }

    return size > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : size;
  },
});

export const fromTime = input({
  label: "From Time",
  comments:
    "The start of the date/time range to query, in ISO 8601 UTC format. Format: YYYY-MM-DDThh:mm:ssZ.",
  type: "string",
  required: true,
  example: "2020-03-13T10:00:00Z",
  placeholder: "Enter a start date/time",
  clean: util.types.toString,
});

export const toTime = input({
  label: "To Time",
  comments:
    "The end of the date/time range to query, in ISO 8601 UTC format. Format: YYYY-MM-DDThh:mm:ssZ.",
  type: "string",
  required: true,
  example: "2020-03-13T10:00:00Z",
  placeholder: "Enter an end date/time",
  clean: util.types.toString,
});

export const accountKey = input({
  label: "Account Key",
  comments: "The unique identifier for the account.",
  type: "string",
  required: true,
  example: "1234567890",
  placeholder: "Enter an account key",
  clean: util.types.toString,
});

export const webinarKey = input({
  label: "Webinar Key",
  comments: "The unique identifier for the webinar.",
  type: "string",
  required: true,
  example: "1234567890",
  placeholder: "Enter a webinar key",
  clean: util.types.toString,
  dataSource: "selectWebinar",
});

export const timezone = input({
  label: "Timezone",
  comments:
    "The time zone where the webinar is taking place" +
    " (must be a valid time zone ID). If this parameter is not passed, " +
    "the timezone of the organizer's profile will be used.",
  type: "string",
  required: false,
  example: "America/Chicago",
  placeholder: "Enter a time zone ID",
  clean: toOptionalString,
});

export const webinarType = input({
  label: "Webinar Type",
  comments:
    "The scheduling format for the webinar. Select 'Single Session' for a" +
    " one-time event, 'Series' for multiple related sessions, or 'Sequence'" +
    " for an ordered set of sessions.",
  type: "string",
  required: true,
  model: WEBINAR_TYPE_MODEL,
  clean: util.types.toString,
});

export const locale = input({
  label: "Locale",
  comments: "The language and region used for the webinar's display text.",
  type: "string",
  required: false,
  model: AVAILABLE_LOCALES_FOR_WEBINAR_MODEL,
  example: "en_US",
  placeholder: "Enter a locale",
  clean: toOptionalString,
});

export const registrantKey = input({
  label: "Registrant Key",
  comments: "The unique identifier for the registrant.",
  type: "string",
  required: true,
  example: "1234567890",
  placeholder: "Enter a registrant key",
  clean: util.types.toString,
  dataSource: "selectRegistrant",
});

export const sessionKey = input({
  label: "Session Key",
  comments: "The unique identifier for the webinar session.",
  type: "string",
  required: true,
  example: "1234567890",
  placeholder: "Enter a session key",
  clean: util.types.toString,
});

export const userSubscriptionKey = input({
  label: "User Subscription Key",
  comments: "The unique identifier for the user subscription.",
  type: "string",
  required: true,
  example: "1234567890",
  placeholder: "Enter a user subscription key",
  clean: util.types.toString,
  dataSource: "selectWebhook",
});

export const fetchAll = input({
  label: "Fetch All",
  comments:
    "When true, automatically fetches all pages of results using pagination. When false, only the first page is fetched.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});
