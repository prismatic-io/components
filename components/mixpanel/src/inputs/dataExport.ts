import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  connectionInput,
  dataAndDomain,
  project_id,
  from_date,
  to_date,
  limit,
  where,
} from "./common";
export const event = input({
  label: "Event Name",
  type: "string",
  clean: toOptionalString,
  comments: "The name of the event to filter data by.",
  placeholder: "Enter event name",
  required: false,
  example: "Page View",
});
export const gzipEncoding = input({
  label: "Gzip Encoding",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, the response will be compressed with gzip and Content-Encoding will be set to gzip.",
  required: false,
  example: "false",
});
export const filters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments:
    "Optional query controls to refine the exported events: a result limit, an event-name filter, a segmentation filter expression, and gzip response encoding.",
  inputs: {
    limit,
    event,
    where: {
      ...where,
      comments:
        "An expression to filter events by. See [segmentation expressions](https://docs.mixpanel.com/reference/segmentation-expressions) for syntax details.",
    },
    gzipEncoding,
  },
});
export const downloadDataInputs = {
  connection: connectionInput,
  dataAndDomain,
  from_date,
  to_date,
  project_id,
  filters,
};
