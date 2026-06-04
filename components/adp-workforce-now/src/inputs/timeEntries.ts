import { input } from "@prismatic-io/spectral";
import { timeEntryPayload } from "../exampleInputs";
import { cleanObject } from "../util";
import { connection } from "./common";


export const events = input({
  label: "Events",
  type: "code",
  language: "json",
  required: true,
  comments: "The events to be processed",
  example: JSON.stringify(timeEntryPayload, null, 2),
  clean: cleanObject,
});


export const modifyTimeEntriesInputs = {
  connection,
  events,
};
