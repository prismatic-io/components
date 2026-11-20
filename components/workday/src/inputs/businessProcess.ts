import { input, util } from "@prismatic-io/spectral";
import { SERVICE_VERSIONS, WORKDAY_API_DOCS_URL } from "../constants";
import { cleanStringInput } from "../util";
import {
  connection,
  paginationQueryStringInputs,
  extraParameters,
  workerId,
} from "./common";

export const eventWorkerId = {
  ...workerId,
  comments:
    "Optional worker used to filter the Event ID dropdown; Workday lists events for one worker at a time. Not sent with this request.",
  required: false as const,
  clean: cleanStringInput,
};

const eventId = input({
  label: "Event ID",
  comments: "Identifies the business process event.",
  type: "string",
  placeholder: "Enter event ID",
  example: "5b1f8c2d3e4a4b6c9d7e8f0a1b2c3d4e",
  required: true,
  clean: util.types.toString,
  dataSource: "selectEvent",
});

const listEventsParamsComments = `${extraParameters.comments} See optional (QUERY-STRING PARAMETERS) in the [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICE_VERSIONS.businessProcess}/get-/events).`;

export const getEventAttachmentsInputs = {
  connection,
  workerId: eventWorkerId,
  eventId,
  ...paginationQueryStringInputs,
};

export const getEventByIdInputs = {
  connection,
  workerId: eventWorkerId,
  eventId,
};

export const listEventsInputs = {
  connection,
  workerId: {
    ...workerId,
    comments:
      "Identifies the worker whose business process events to list. Workday returns events for exactly one worker.",
  },
  ...paginationQueryStringInputs,
  extraParameters: { ...extraParameters, comments: listEventsParamsComments },
};
