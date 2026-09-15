import {
  connection,
  uuid,
  returnUuidOnly,
  user,
  adminManaged,
  organization,
  userAvailabilitySchedule,
  active,
  sort,
  inviteeEmail,
  maxStartTime,
  minStartTime,
  status,
  email,
} from "./common";
export const selectEventInviteeInputs = {
  connection,
  uuid,
  returnUuidOnly,
};
export const eventTypesInputs = {
  connection,
  user: {
    ...user,
    comments:
      "View available personal, team, and organization event types associated with the user's URI.",
  },
  adminManaged,
  organization: {
    ...organization,
    comments:
      "View available personal, team, and organization event types associated with the organization's URI.",
  },
  userAvailabilitySchedule,
  active,
  sort: {
    ...sort,
    comments:
      "Order results by the specified field and direction. Accepts comma-separated list of {field}:{direction} values. Supported fields are: name. Sort direction is specified as: asc, desc.",
    default: "name:asc",
  },
  returnUuidOnly,
};
export const eventsInputs = {
  connection,
  inviteeEmail,
  maxStartTime,
  minStartTime,
  organization,
  returnUuidOnly,
  sort,
  status,
  user,
};
export const organizationMembershipsInputs = {
  connection,
  email: {
    ...email,
    comments: "Indicates if the results should be filtered by email address",
    example: "user@example.com",
  },
  organization: {
    ...organization,
    comments: "Indicates if the results should be filtered by organization",
  },
  user: {
    ...user,
    comments: "Indicates if the results should be filtered by user",
    example: "https://api.calendly.com/users/UR1234567890",
  },
  returnUuidOnly,
};
export const organizationsInputs = {
  connection,
};
export const routingFormsInputs = {
  connection,
  organization: {
    ...organization,
    required: true,
    comments:
      "View organization routing forms associated with the organization's URI.",
  },
  sort: {
    ...sort,
    comments:
      "Order results by the specified field and direction. Accepts comma-separated list of {field}:{direction} values. Supported fields are: created_at. Sort direction is specified as: asc, desc.",
    example: "created_at:desc",
  },
  returnUuidOnly,
};
