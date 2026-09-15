import { input } from "@prismatic-io/spectral";
import {
  connection,
  uuid,
  user,
  startTime,
  endTime,
  adminManaged,
  userAvailabilitySchedule,
  active,
  organization,
  sort,
} from "./common";
const emails = input({
  label: "Email",
  type: "string",
  collection: "valuelist",
  comments: "Invitee email to delete.",
  required: true,
  placeholder: "Enter email addresses",
  clean: (value) => value as string[],
});
export const deleteInviteeDataInputs = {
  connection,
  emails,
};
export const getCurrentUserInputs = {
  connection,
};
export const getUserInputs = {
  connection,
  uuid,
};
export const getUserAvailabilityScheduleInputs = {
  connection,
  uuid: { ...uuid, comments: "The UUID of the availability schedule." },
};
export const listUserAvailabilitySchedulesInputs = {
  connection,
  user: {
    ...user,
    required: true,
    comments: "A URI reference to a user",
  },
};
export const listUserBusyTimesInputs = {
  connection,
  user: {
    ...user,
    required: true,
    comments: "The uri associated with the user",
  },
  endTime: {
    ...endTime,
    comments: "End time of the requested availability range",
  },
  startTime: {
    ...startTime,
    comments: "Start time of the requested availability range",
  },
};
export const listUserEventTypesInputs = {
  connection,
  adminManaged,
  userAvailabilitySchedule,
  active,
  organization: {
    ...organization,
    dataSource: "organizations",
    comments:
      "View available personal, team, and organization event types associated with the organization's URI.",
  },
  user: {
    ...user,
    comments:
      "View available personal, team, and organization event types associated with the user's URI.",
  },
  sort: {
    ...sort,
    comments:
      "Order results by the specified field and direction. Accepts comma-separated list of {field}:{direction} values. Supported fields are: name. Sort direction is specified as: asc, desc.",
    default: "name:asc",
  },
};
