import { input } from "@prismatic-io/spectral";
import { cleanString, validateDate } from "../util";
import { connectionInput, employeeId } from "./common";

const startDate = input({
  label: "Start Date",
  type: "string",
  required: true,
  comments:
    "The first date of the time off range to query or create. Format: YYYY-MM-DD.",
  placeholder: "Enter start date (YYYY-MM-DD)",
  example: "2024-01-01",
  clean: validateDate,
});

const endDate = input({
  label: "End Date",
  type: "string",
  required: true,
  comments:
    "The last date of the time off range to query or create. Format: YYYY-MM-DD.",
  placeholder: "Enter end date (YYYY-MM-DD)",
  example: "2024-01-31",
  clean: validateDate,
});

const timeOffRecordId = input({
  label: "Time Off Record ID",
  type: "string",
  required: false,
  comments: "The unique identifier for a specific time off request record.",
  placeholder: "Enter time off record ID",
  clean: cleanString,
  example: "42",
});

const timeOffStatus = input({
  label: "Status",
  type: "string",
  required: false,
  comments: "The time off request status to filter by.",
  model: [
    { label: "Approved", value: "approved" },
    { label: "Denied", value: "denied" },
    { label: "Superceded", value: "superceded" },
    { label: "Canceled", value: "canceled" },
    { label: "Requested", value: "requested" },
  ],
  clean: cleanString,
});

const whosOutStartDate = input({
  label: "Start Date",
  type: "string",
  required: false,
  comments:
    "The first date of the range to query. Defaults to today's date if omitted. Format: YYYY-MM-DD.",
  placeholder: "Enter start date (YYYY-MM-DD)",
  example: "2024-01-01",
  clean: cleanString,
});

const whosOutEndDate = input({
  label: "End Date",
  type: "string",
  required: false,
  comments:
    "The last date of the range to query. Defaults to 14 days from the start date if omitted. Format: YYYY-MM-DD.",
  placeholder: "Enter end date (YYYY-MM-DD)",
  example: "2024-01-15",
  clean: cleanString,
});

export const getTimeOffRequestsInputs = {
  connection: connectionInput,
  startDate,
  endDate,
  timeOffRecordId,
  employeeId: { ...employeeId, required: false, clean: cleanString },
  timeOffStatus,
};

export const whosOutInputs = {
  connection: connectionInput,
  startDate: whosOutStartDate,
  endDate: whosOutEndDate,
};
