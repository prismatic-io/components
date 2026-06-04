import { input } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import { connection, odataQueryInputs, paginationInputs } from "./common";


export const aoid = input({
  label: "Associate OID",
  type: "string",
  required: true,
  comments: "The unique Associate OID identifier of the worker.",
  placeholder: "Enter Associate OID",
  example: "G3STHDEHFMJ3BY3N",
  clean: cleanString,
  dataSource: "selectWorker",
});

export const badgeID = input({
  label: "Badge ID",
  type: "string",
  required: true,
  comments:
    "The badge identifier associated with the time punch being recorded.",
  placeholder: "Enter Badge ID",
  example: "123456",
  clean: cleanString,
});

export const eventID = input({
  label: "Event ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the clocking transaction event.",
  placeholder: "Enter Event ID",
  example: "123456",
  clean: cleanString,
});

export const clockingType = input({
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


export const getWorkerInputs = {
  connection,
  aoid,
  ...odataQueryInputs,
};

export const listWorkersInputs = {
  connection,
  ...paginationInputs,
  ...odataQueryInputs,
};
