import { input } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { connectionInput, fetchAllInput, pagination } from "./common";
const dateTimeFromInput = input({
  label: "Date Time From",
  type: "string",
  required: false,
  placeholder: "Enter start date/time",
  comments: "Filter by date/time from (ISO format).",
  example: "2023-01-01T00:00:00Z",
  clean: toOptionalString,
});
const dateTimeToInput = input({
  label: "Date Time To",
  type: "string",
  required: false,
  placeholder: "Enter end date/time",
  comments: "Filter by date/time to (ISO format).",
  example: "2023-12-31T23:59:59Z",
  clean: toOptionalString,
});
export const listApiUsagesInputs = {
  connection: connectionInput,
  dateTimeFrom: dateTimeFromInput,
  dateTimeTo: dateTimeToInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const listRecentActivityExportsInputs = {
  connection: connectionInput,
  dateTimeFrom: dateTimeFromInput,
  dateTimeTo: dateTimeToInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const listRecentActivityFileAccessesInputs = {
  connection: connectionInput,
  dateTimeFrom: dateTimeFromInput,
  dateTimeTo: dateTimeToInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const listRecentActivityReportRunsInputs = {
  connection: connectionInput,
  dateTimeFrom: dateTimeFromInput,
  dateTimeTo: dateTimeToInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const listRecentActivityUserAccessesInputs = {
  connection: connectionInput,
  dateTimeFrom: dateTimeFromInput,
  dateTimeTo: dateTimeToInput,
  fetchAll: fetchAllInput,
  pagination,
};
