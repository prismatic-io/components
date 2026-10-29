import { input } from "@prismatic-io/spectral";
import { timeEntryPayload } from "../exampleInputs";
import { cleanObject, cleanString } from "../util";
import {
  $count,
  $expand,
  $filter,
  $select,
  aoid,
  connection,
  fetchAll,
  pagination,
  queryParams,
} from "./common";

const badgeID = input({
  label: "Badge ID",
  type: "string",
  required: true,
  comments:
    "The badge identifier associated with the time punch being recorded.",
  placeholder: "Enter Badge ID",
  example: "123456",
  clean: cleanString,
});

const eventID = input({
  label: "Event ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the clocking transaction event.",
  placeholder: "Enter Event ID",
  example: "123456",
  clean: cleanString,
});

const clockingType = input({
  label: "Clocking Type",
  type: "string",
  model: [
    {
      label: "Punch",
      value: "punch",
    },
    {
      label: "Lunch Out",
      value: "lunchout",
    },
    {
      label: "Clock In",
      value: "clockin",
    },
    {
      label: "Clock Out",
      value: "clockout",
    },
  ],
  required: true,
  default: "punch",
  comments:
    "The type of time punch operation. Punch mode alternates between IN and OUT on each scan.",
  placeholder: "Select clocking type",
  clean: cleanString,
});

const events = input({
  label: "Events",
  type: "code",
  language: "json",
  required: true,
  comments: "The events to be processed",
  placeholder: "Enter time entry events JSON",
  example: JSON.stringify(timeEntryPayload, null, 2),
  clean: cleanObject,
});

export const createScanPunchInputs = {
  badgeID,
  clockingType,
  connection,
};

export const getClockingTransactionInputs = {
  eventID,
  connection,
};

export const getTimeCardsInputs = {
  aoid,
  pagination,
  $filter,
  $expand,
  connection,
};

export const getWorkerInputs = {
  aoid,
  $select,
  connection,
};

export const getWorkerDemographicsInputs = {
  aoid,
  $select,
  connection,
};

export const getWorkersMetadataInputs = {
  $filter,
  connection,
};

export const listWorkersInputs = {
  fetchAll,
  pagination,
  $count,
  $filter,
  $select,
  queryParams,
  connection,
};

export const listWorkersDemographicsInputs = {
  fetchAll,
  pagination,
  $filter,
  $select,
  queryParams,
  connection,
};

export const modifyTimeEntriesInputs = {
  events: {
    ...events,
    comments:
      "The new time entries to be added, modified or deleted. Refer to the [time entries API documentation](https://developers.adp.com/build/api-explorer/hcm-offrg-wfn/hcm-offrg-wfn-time-time-cards-v2-time-cards?operation=POST%2Fevents%2Ftime%2Fv2%2Ftime-entries.modify) for the structure of the time entries.",
  },
  connection,
};
