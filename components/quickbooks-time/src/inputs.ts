import { input, util } from "@prismatic-io/spectral";
import { pollResourceModel } from "./constants";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const queryString = input({
  label: "Query String",
  placeholder: "Query String",
  comments:
    "Must be a valid query string as defined by the QuickBooks API. Single quotes must be escaped with a backslash.",
  type: "string",
  required: true,
  example: "select * from department",
});

export const perPage = input({
  label: "Per Page",
  type: "string",
  required: false,
  comments:
    "Represents how many results you'd like to retrieve per request (page). Default is 50. Max is 50",
});
export const page = input({
  label: "Page",
  type: "string",
  required: false,
  comments: "Represents the page of results you'd like to retrieve. Default is 1.",
});
export const active = input({
  label: "Active",
  type: "string",
  required: false,
  comments: "'yes', 'no', or 'both'. Default is 'yes'",
});
export const id = input({
  label: "ID",
  type: "string",
  required: false,
  comments: "The Id of the record to modify ",
});
export const timesheetId = input({
  label: "Timesheet ID",
  type: "string",
  required: true,
  comments: "The Id of the record to modify ",
  dataSource: "selectTimeSheet",
});
export const idReq = input({
  label: "User ID",
  type: "string",
  required: true,
  comments: "The Id of the record to modify ",
  dataSource: "selectUser",
});
export const jobcodeIdReq = input({
  label: "Jobcode ID",
  type: "string",
  required: true,
  comments: "The Jobcode Id",
  dataSource: "selectJobCode",
});
export const jobcodeId = input({
  label: "Jobcode ID",
  type: "string",
  required: false,
  comments: "The Jobcode Id",
  dataSource: "selectJobCode",
});

export const userNameReq = input({
  label: "Username",
  type: "string",
  required: true,
  comments: "Username of the user",
});
export const userName = input({
  label: "Username",
  type: "string",
  required: false,
  comments: "Username of the user",
});
export const userIds = input({
  label: "User IDs",
  type: "string",
  required: false,
  comments: "A comma separated list of User Ids to filter on",
  example: "123,456,789",
});
export const jobCodeIds = input({
  label: "Job Code IDs",
  type: "string",
  required: false,
  comments: "A comma separated list of Job Code Ids to filter on",
  example: "123,456,789",
});
export const jobCodeIdsReq = input({
  label: "Job Code IDs",
  type: "string",
  required: true,
  comments: "A comma separated list of Job Code Ids",
  example: "123,456,789",
});
export const additionalParams = input({
  label: "Additional Query Parameters",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "Additional query parameters to be provided for use in filtering result sets. For example, when filtering users it is possible to provide 'usernames' as the key and a comma separated list of one or more usernames to filter on.",
});
export const firstName = input({
  label: "First Name",
  type: "string",
  required: true,
  comments: "First name of the user",
});
export const lastName = input({
  label: "Last Name",
  type: "string",
  required: true,
  comments: "Last name of the user",
});
export const startDate = input({
  label: "Start Date",
  type: "string",
  required: false,
  comments: "YYYY-MM-DD formatted date",
});
export const endDate = input({
  label: "End Date",
  type: "string",
  required: false,
  comments: "YYYY-MM-DD formatted date",
});
export const startDateISO = input({
  label: "Start Date",
  type: "string",
  required: false,
  comments:
    "Start time of the timesheet, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). Time should reflect the user's local time.",
});
export const endDateISO = input({
  label: "End Date",
  type: "string",
  required: false,
  comments:
    "End time of the timesheet, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). Time should reflect the user's local time.",
});
export const startDateISOReq = input({
  label: "Start Date",
  type: "string",
  required: true,
  comments:
    "Start time of the timesheet, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). Time should reflect the user's local time.",
  example: "YYYY-MM-DDThh:mm:ss±hh:mm",
});
export const endDateISOReq = input({
  label: "End Date",
  type: "string",
  required: true,
  comments:
    "End time of the timesheet, in ISO 8601 format (YYYY-MM-DDThh:mm:ss±hh:mm). Time should reflect the user's local time.",
  example: "YYYY-MM-DDThh:mm:ss±hh:mm",
});

export const timesheetType = input({
  label: "Type",
  type: "string",
  required: true,
  model: [
    { label: "regular", value: "regular" },
    { label: "manual", value: "manual" },
  ],
});

export const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  comments: "The type of resource to poll for new records.",
  model: pollResourceModel,
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include newly created records in trigger results.",
  clean: util.types.toBool,
});

export default {
  active,
  perPage,
  page,
  additionalParams,
  id,
  userName,
  userNameReq,
  firstName,
  lastName,
  userIds,
  jobCodeIds,
  startDate,
  endDate,
  timesheetType,
  jobcodeId,
  jobcodeIdReq,
  startDateISO,
  endDateISO,
  startDateISOReq,
  endDateISOReq,
  jobCodeIdsReq,
  idReq,
  timesheetId,
};
