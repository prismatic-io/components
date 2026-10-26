import { input, util } from "@prismatic-io/spectral";
import { SERVICES, WORKDAY_API_DOCS_URL } from "../constants";
import {
  connection,
  paginationQueryStringInputs,
  extraParameters,
} from "./common";
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
const listEventsParamsComments = `${extraParameters.comments} See optional (QUERY-STRING PARAMETERS) in the [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICES.businessProcess.slice(1)}/get-/events).`;
export const getEventAttachmentsInputs = {
  connection,
  eventId,
  ...paginationQueryStringInputs,
};
export const getEventByIdInputs = {
  connection,
  eventId,
};
export const listEventsInputs = {
  connection,
  ...paginationQueryStringInputs,
  extraParameters: { ...extraParameters, comments: listEventsParamsComments },
};
