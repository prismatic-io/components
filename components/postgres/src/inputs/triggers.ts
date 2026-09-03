import { input, util } from "@prismatic-io/spectral";
import { resolveRowCount } from "../util";
import { connectionInput } from "./common";
export const tableName = input({
  label: "Table Name",
  comments: "The name of the table to monitor for new and updated records.",
  placeholder: "Enter a table name",
  example: "people",
  type: "string",
  required: true,
  clean: util.types.toString,
});
export const cursorField = input({
  label: "Cursor Field",
  default: "updated_at",
  example: "updated_at",
  placeholder: "Enter a column name",
  comments:
    "The column used to track new results. If the table has an auto incrementing integer ID, that ID can be used. If it has a 'created at' or 'updated at' timestamp, those can be used. Each time this trigger runs, it checks for records with values greater than the largest value from the last run.",
  type: "string",
  required: true,
  clean: util.types.toString,
});
export const castTimestampsToString = input({
  label: "Cast Timestamps to Strings",
  default: "true",
  comments:
    "When true, timestamp values are cast to strings to retain precision. PostgreSQL tracks microseconds, but JavaScript dates are measured in milliseconds, so precision can be lost when fetching TIME, TIMETZ, TIMESTAMP, and TIMESTAMPTZ fields. Enable this when the cursor field is a timestamp.",
  type: "boolean",
  clean: util.types.toBool,
});
export const defaultCursorValue = input({
  label: "Default Cursor Value",
  type: "string",
  placeholder: "Enter a cursor value",
  comments:
    "The value to use for the cursor when the trigger is run for the first time, given in the units of the column named in Cursor Field: a timestamp for a timestamp column, an integer for an ID column. If present, the trigger fetches every record whose cursor value is greater than this one, so a lower value reaches further back and the table's current maximum reaches nothing. If omitted, the trigger notes the largest value of the cursor field on its first recurrence and fetches newer records from the next recurrence onward.",
  example: "1900-01-01 00:00:00",
  required: false,
  clean: util.types.toString,
});
export const maxRecordsPerRecurrence = input({
  label: "Max Records Per Recurrence",
  type: "string",
  placeholder: "Enter a number of records",
  comments:
    "The maximum number of records to fetch each time the trigger runs. Leave this empty to use the default of 1,000. Raising it drains a large backlog in fewer runs. On a flow with batching enabled the value is capped at 1,000 however high it is set, because a batched dispatch is bounded by size as well as by count and the platform limits one to 5 MB; lower it below that when the table has wide rows.",
  example: "1000",
  required: false,
  clean: resolveRowCount,
});
export const pollTableInputs = {
  postgresConnection: connectionInput,
  tableName,
  cursorField,
  castTimestampsToString,
  defaultCursorValue,
  maxRecordsPerRecurrence,
};
