import { input, util } from "@prismatic-io/spectral";
import { SERVICES } from "../constants";
import { connection, paginationQueryStringInputs, params } from "./shared";

const eventId = input({
  label: "Event ID",
  comments: "Identifies the business process event.",
  type: "string",
  placeholder: "Enter event ID",
  example: "",
  required: true,
  clean: util.types.toString,
  dataSource: "selectEvent",
});

const listEventsParamsComments = `${params.comments} See optional (QUERY-STRING PARAMETERS) at https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#${SERVICES.businessProcess.slice(1)}/get-/events`;

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
  params: { ...params, comments: listEventsParamsComments },
};
