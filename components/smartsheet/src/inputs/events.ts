import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";

const since = input({
  label: "Since",
  type: "string",
  required: false,
  default: "2010-01-01T00:00:00Z",
  clean: (value) => util.types.toString(value) || undefined,
  comments:
    "The starting timestamp for events to return. Format: ISO 8601 (e.g. 2010-01-01T00:00:00Z).",
  example: "2010-01-01T00:00:00Z",
  placeholder: "Enter start date",
});

const streamPosition = input({
  label: "Stream Position",
  type: "string",
  required: false,
  example: "XyzAb1234cdefghijklmnofpq",
  clean: (value) => util.types.toString(value) || undefined,
  comments:
    "The pagination cursor used to retrieve the next set of events. Returned by a previous request.",
  placeholder: "Enter stream position",
});

const maxCount = input({
  label: "Max Count",
  type: "string",
  required: false,
  clean: (value) => util.types.toNumber(value) || undefined,
  comments: "The maximum number of events to return in a single response.",
  example: "100",
  placeholder: "Enter max count",
});

export const listEventsInputs = {
  connection: connectionInput,
  since,
  streamPosition,
  maxCount,
};
