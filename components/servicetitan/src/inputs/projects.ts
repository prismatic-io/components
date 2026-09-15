import { input, structuredObjectInput } from "@prismatic-io/spectral";
import {
  cleanNumberInput,
  cleanNumberValueListInput,
  cleanStringInput,
} from "../util";
import {
  connection,
  customerId,
  customFields,
  customQueryParams,
  externalData,
  fetchAll,
  includeTotal,
  locationId,
  name,
  pagination,
  projectId,
  sort,
  start,
  summary,
} from "./common";
const projectManagerIds = input({
  label: "Project Manager IDs",
  type: "string",
  collection: "valuelist",
  example: "1088",
  required: false,
  comments: "IDs of the project's managers",
  placeholder: "Enter a project manager ID",
  clean: cleanNumberValueListInput,
});
const statusId = input({
  label: "Status ID",
  type: "string",
  required: false,
  comments: "The ID of the project status to set.",
  example: "1088",
  placeholder: "Enter a project status ID",
  clean: cleanStringInput,
});
const subStatusId = input({
  label: "Sub Status ID",
  type: "string",
  required: false,
  comments: "The ID of the project sub-status to set.",
  example: "1088",
  placeholder: "Enter a project sub-status ID",
  clean: cleanStringInput,
});
const targetCompletionDate = input({
  label: "Target Completion Date",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Target completion date of the project",
  placeholder: "Enter the target completion date and time in UTC",
  clean: cleanStringInput,
});
const actualCompletionDate = input({
  label: "Actual Completion Date",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Actual completion date of the project",
  placeholder: "Enter the actual completion date and time in UTC",
  clean: cleanStringInput,
});
const jobsIds = input({
  label: "Job IDs",
  type: "string",
  collection: "valuelist",
  example: "1088",
  required: false,
  comments: "IDs of the project's jobs",
  placeholder: "Enter a job ID",
  clean: cleanNumberValueListInput,
  dataSource: "selectJob",
});
export const createProjectInputs = {
  connection,
  locationId,
  customerId: {
    ...customerId,
    required: false,
    comments: "ID of the project's customer",
  },
  projectManagerIds,
  name: {
    ...name,
    required: false,
    comments: "Name of the project",
  },
  summary: {
    ...summary,
    required: false,
    comments: "Summary of the project",
  },
  statusId,
  subStatusId,
  startDate: { ...start, comments: "Start date of the project" },
  targetCompletionDate,
  actualCompletionDate,
  customFields: {
    ...customFields,
    comments: "Custom fields for the project",
  },
  externalData: {
    ...externalData,
    comments:
      "External data items to attach to the project, grouped under an application GUID.",
  },
};
export const getProjectInputs = {
  connection,
  projectId: {
    ...projectId,
    required: true,
    comments: "The ID of the project to retrieve",
  },
};
export const listProjectsInputs = {
  connection,
  fetchAll,
  pagination,
  includeTotal,
  sort,
  customQueryParams,
};
export const updateProjectInputs = {
  connection,
  projectId: {
    ...projectId,
    required: true,
    comments: "ID of the project to update",
  },
  projectManagerIds,
  jobsIds,
  name: {
    ...name,
    required: false,
    comments: "Name of the project",
  },
  summary: {
    ...summary,
    required: false,
    comments: "Summary of the project",
  },
  statusId,
  subStatusId,
  startDate: { ...start, comments: "Start date of the project" },
  targetCompletionDate,
  actualCompletionDate,
  customFields: {
    ...customFields,
    comments: "Custom fields for the project",
  },
  externalData: {
    ...externalData,
    comments:
      "External data items to attach to the project, grouped under an application GUID.",
  },
};
