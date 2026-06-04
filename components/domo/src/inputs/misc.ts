import { input, util } from "@prismatic-io/spectral";
import { connection, fetchAll, limit, offset } from "./common";

export const start = input({
  label: "Start",
  type: "string",
  required: true,
  comments: "The start time in milliseconds for the activity log query range.",
  placeholder: "Enter start time (milliseconds)",
  example: "1609459200000",
  clean: util.types.toString,
});

export const end = input({
  label: "End",
  type: "string",
  required: false,
  comments: "The end time in milliseconds for the activity log query range.",
  placeholder: "Enter end time (milliseconds)",
  example: "1640995200000",
  clean: util.types.toString,
});

export const user = input({
  label: "User",
  type: "string",
  required: false,
  comments:
    "The unique identifier for the user to filter activity log entries by.",
  placeholder: "Enter User ID",
  example: "959463190",
  clean: util.types.toString,
});

export const getActivityLogEntriesInputs = {
  connection,
  start,
  end,
  fetchAll,
  limit,
  offset,
  user,
};
