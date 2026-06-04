import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../../utils";
import {
  AVAILABLE_LOCALES_FOR_WEBINAR_MODEL,
  MAX_PAGE_SIZE,
  WEBINAR_TYPE_MODEL,
} from "../../constants";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const pageNumber = input({
  label: "Page Number",
  comments: "The page number to be displayed. The first page is 0.",
  type: "string",
  required: false,
  example: "0",
  placeholder: "0",
  clean: toOptionalNumber,
});

export const pageSize = input({
  label: "Page Size",
  comments: "The page size to use in pagination, Maximum value is 200.",
  type: "string",
  required: false,
  example: "200",
  placeholder: "200",
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
  comments: "Start of the datetime range in ISO8601 UTC format. ",
  type: "string",
  required: true,
  example: "2020-03-13T10:00:00Z",
  placeholder: "2020-03-13T10:00:00Z",
  clean: util.types.toString,
});

export const toTime = input({
  label: "From Time",
  comments: "End of the datetime range in ISO8601 UTC format. ",
  type: "string",
  required: true,
  example: "2020-03-13T10:00:00Z",
  placeholder: "2020-03-13T10:00:00Z",
  clean: util.types.toString,
});

export const accountKey = input({
  label: "Account Key",
  comments: "The key of the account.",
  type: "string",
  required: true,
  example: "123456790",
  placeholder: "1234567890",
  clean: util.types.toString,
});

export const webinarKey = input({
  label: "Webinar Key",
  comments: "The key identifier of the webinar.",
  type: "string",
  required: true,
  example: "123456790",
  placeholder: "1234567890",
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
  placeholder: "America/Chicago",
  clean: toOptionalString,
});

export const webinarType = input({
  label: "Webinar Type",
  comments:
    "The type of the webinar." +
    " if 'Single Session' is selected, the webinar will be a single session." +
    " if 'Series' is selected, the webinar will be a series." +
    " if 'Sequence' is selected, the webinar will be a sequence.",
  type: "string",
  required: true,
  model: WEBINAR_TYPE_MODEL,
  clean: util.types.toString,
});

export const locale = input({
  label: "Locale",
  comments: "The locale to use.",
  type: "string",
  required: false,
  model: AVAILABLE_LOCALES_FOR_WEBINAR_MODEL,
  example: "en_US",
  placeholder: "en_US",
  clean: toOptionalString,
});

export const registrantKey = input({
  label: "Registrant Key",
  comments: "The key of the registrant.",
  type: "string",
  required: true,
  example: "123456790",
  placeholder: "1234567890",
  clean: util.types.toString,
  dataSource: "selectRegistrant",
});

export const sessionKey = input({
  label: "Session Key",
  comments: "The key of the webinar session.",
  type: "string",
  required: true,
  example: "123456790",
  placeholder: "1234567890",
  clean: util.types.toString,
});

export const userSubscriptionKey = input({
  label: "User Subscription Key",
  comments: "The unique identifier of the user subscription.",
  type: "string",
  required: true,
  example: "123456790",
  placeholder: "1234567890",
  clean: util.types.toString,
  dataSource: "selectWebhook",
});

export const fetchAll = input({
  label: "Fetch All",
  comments:
    "If true, all pages will be fetched. If false, only the first page will be fetched.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});
