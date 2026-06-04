import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput, cleanValueListInput } from "../utils";
import { connection, restaurantExternalId } from "./shared";

const timeEntryId = input({
  label: "Time Entry ID",
  type: "string",
  comments:
    "The Toast platform GUID or an external identifier for the time entry.",
  required: true,
  example: "12345678-1234-1234-1234-123456789012",
  placeholder: "12345678-1234-1234-1234-123456789012",
  clean: util.types.toString,
});

const includeArchived = input({
  label: "Include Archived",
  type: "boolean",
  comments: "Controls whether the response includes an archived time entry.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const includeMissedBreaks = input({
  label: "Include Missed Breaks",
  type: "boolean",
  comments:
    "Indicate whether missed breaks should be returned in the breaks array for the time entries.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const getTimeEntryInputs = {
  connection,
  restaurantExternalId,
  timeEntryId,
  includeArchived,
  includeMissedBreaks,
};

const businessDate = input({
  label: "Business Date",
  type: "string",
  comments:
    "The business date the cash entries were created, in the format yyyymmdd.",
  required: true,
  example: "20180228",
  placeholder: "20180228",
  clean: util.types.toString,
});

export const listCashEntriesInputs = {
  connection,
  restaurantExternalId,
  businessDate,
};

const endDate = input({
  label: "End Date",
  type: "string",
  comments:
    "The end date and time of the time period to match time entries. A time entry matches the time period if its clock-in inDate is after (inclusive) the specified Start Date and before (exclusive) the End Date. The specified period cannot be longer than one month.",
  required: false,
  example: "2018-02-28T23:59:59Z",
  placeholder: "2018-02-28T23:59:59Z",
  clean: cleanStringInput,
});

const modifiedEndDate = input({
  label: "Modified End Date",
  type: "string",
  comments:
    "The end date and time of the time period to match modified time entries. A time entry matches the time period if that entry was modified before (exclusive) the Modified End Date. If you include this parameter, you must also include the Modified Start Date parameter. The specified period cannot be longer than one month.",
  required: false,
  example: "2018-02-28T23:59:59Z",
  placeholder: "2018-02-28T23:59:59Z",
  clean: cleanStringInput,
});

const modifiedStartDate = input({
  label: "Modified Start Date",
  type: "string",
  comments:
    "The start date and time of the time period to match modified time entries. A time entry matches the time period if that entry was modified after (inclusive) the Modified Start Date. If you include this parameter, you must also include the Modified End Date parameter. The specified period cannot be longer than one month.",
  required: false,
  example: "2018-02-28T00:00:00Z",
  placeholder: "2018-02-28T00:00:00Z",
  clean: cleanStringInput,
});

const startDate = input({
  label: "Start Date",
  type: "string",
  comments:
    "The start date and time of the time period to match time entries. A time entry matches the time period if its clock-in inDate is after (inclusive) the specified Start Date and before (exclusive) the End Date. The specified period cannot be longer than one month.",
  required: false,
  example: "2018-02-28T00:00:00Z",
  placeholder: "2018-02-28T00:00:00Z",
  clean: cleanStringInput,
});

const timeEntryIds = input({
  label: "Time Entry IDs",
  type: "string",
  collection: "valuelist",
  comments:
    "A time entry identifier, either the Toast platform GUID or an external identifier.",
  required: false,
  example: "12345678-1234-1234-1234-123456789012",
  placeholder: "12345678-1234-1234-1234-123456789012",
  clean: cleanValueListInput,
});

export const listTimeEntriesInputs = {
  connection,
  restaurantExternalId,
  businessDate: input({
    ...businessDate,
    required: false,
    comments:
      "Optional date to match time entries. A time entry matches the business date if its clock-in inDate is during the business date. The cutoff from one Business Date to the next is the Closeout Hour for the restaurant.",
  }),
  startDate,
  endDate,
  includeArchived: input({
    ...includeArchived,
    comments:
      "Controls whether the response includes archived time entries, when using the Start Date and End Date parameters.",
  }),
  includeMissedBreaks: input({
    ...includeMissedBreaks,
    comments:
      "Indicate whether missed breaks should be returned in the breaks array for the time entries.",
  }),
  modifiedEndDate,
  modifiedStartDate,
  timeEntryIds,
};
