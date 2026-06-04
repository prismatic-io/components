




import { input } from "@prismatic-io/spectral";
import {
  activityIdInput,
  connectionInput,
  cursor,
  paginationLimitInput,
  sortBy,
  sortDirection,
} from "./common";
import { cleanNumber, cleanString } from "../util";

const filterIdOptional = input({
  label: "Filter ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments:
    'The unique identifier of the filter to apply (narrows results when combined with the "user_id" parameter).',
  example: "123",
  placeholder: "Enter Filter ID",
});

const updatedSince = input({
  label: "Updated Since",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "If set, only activities with an update_time at or after this timestamp are returned. Format: ISO 8601.",
  example: "2024-01-01T10:00:00Z",
  placeholder: "Enter date (ISO 8601 format)",
});

const updatedUntil = input({
  label: "Updated Until",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "If set, only activities with an update_time at or before this timestamp are returned. Format: ISO 8601.",
  example: "2024-12-31T23:59:59Z",
  placeholder: "Enter date (ISO 8601 format)",
});

export const getActivitiesInputs = {
  connection: connectionInput,
  limit: paginationLimitInput,
  cursor,
  filterId: filterIdOptional,
  updatedSince,
  updatedUntil,
  sortBy,
  sortDirection: { ...sortDirection, default: "desc" },
};

export const deleteActivityInputs = {
  connection: connectionInput,
  id: activityIdInput,
};

export const getActivityInputs = {
  connection: connectionInput,
  id: activityIdInput,
};
