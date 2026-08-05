import { input, util } from "@prismatic-io/spectral";
import { validateId } from "../util";
import { connectionInput, optFields, pagination } from "./common";
const statusId = input({
  label: "Status ID",
  type: "string",
  example: "375893453",
  placeholder: "Enter status update ID",
  comments: "The unique identifier for the status update.",
  required: true,
  clean: validateId,
});
const statusParentIdInput = input({
  label: "Project, Portfolio, or Goal ID",
  comments:
    "The unique identifier for the parent project, portfolio, or goal the status update belongs to.",
  type: "string",
  example: "375893453",
  placeholder: "Enter project, portfolio, or goal ID",
  required: true,
  clean: validateId,
});
const statusUpdateTitle = input({
  label: "Status Title",
  type: "string",
  comments: "The title of the project status update.",
  example: "Example Status Update - Jun 15",
  required: true,
  clean: util.types.toString,
});
const statusUpdateText = input({
  label: "Status Text",
  type: "string",
  comments: "The text content of the status update.",
  example: "The project is moving forward according to plan.",
  required: true,
  clean: util.types.toString,
});
const statusType = input({
  label: "This represents the current state of the object",
  type: "string",
  default: "on_track",
  required: true,
  model: [
    { label: "On Track", value: "on_track" },
    { label: "Off Track", value: "off_track" },
    { label: "At Risk", value: "at_risk" },
    { label: "On Hold", value: "on_hold" },
    { label: "Complete", value: "complete" },
  ],
  clean: util.types.toString,
});
export const createStatusUpdateInputs = {
  asanaConnection: connectionInput,
  parent: statusParentIdInput,
  statusUpdateTitle,
  statusUpdateText,
  statusType,
  pagination,
};
export const getStatusUpdateInputs = {
  asanaConnection: connectionInput,
  statusId,
};
export const deleteStatusInputs = {
  asanaConnection: connectionInput,
  statusId,
};
export const getStatusesForObjectInputs = {
  asanaConnection: connectionInput,
  optFields: {
    ...optFields,
    default: "resource_subtype,title,text,status_type,parent,created_at",
  },
  pagination,
  parent: statusParentIdInput,
};
