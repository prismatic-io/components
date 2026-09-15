import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import {
  connection,
  organization,
  uuid,
  email,
  sort,
  status,
  inviteeEmail,
  maxStartTime,
  minStartTime,
  startTime,
  endTime,
  user,
} from "./common";
const eventUuid = input({
  label: "Event UUID",
  type: "string",
  comments: "The event's unique identifier.",
  required: true,
  placeholder: "Enter event UUID",
  dataSource: "events",
  clean: util.types.toString,
});
const inviteeUuid = input({
  label: "Invitee UUID",
  type: "string",
  comments: "The invitee's unique identifier.",
  required: true,
  placeholder: "Enter invitee UUID",
  clean: util.types.toString,
  dataSource: "selectEventInvitee",
});
const reason = input({
  label: "Reason",
  type: "string",
  comments: "The reason for canceling the event.",
  required: false,
  placeholder: "Enter cancellation reason",
  clean: cleanString,
});
export const cancelEventInputs = {
  connection,
  organization: { ...organization, dataSource: "organizations" },
  uuid: { ...uuid, dataSource: "events" },
  reason,
};
export const deleteScheduledEventDataInputs = {
  connection,
  startTime,
  endTime,
};
export const getEventInputs = {
  connection,
  organization: { ...organization, dataSource: "organizations" },
  uuid: { ...uuid, dataSource: "events" },
};
export const getEventInviteeInputs = {
  connection,
  organization: { ...organization, dataSource: "organizations" },
  eventUuid,
  inviteeUuid,
};
export const listEventInviteesInputs = {
  connection,
  organization: { ...organization, dataSource: "organizations" },
  uuid: { ...uuid, dataSource: "events" },
  email,
  sort,
  status,
};
export const listEventsInputs = {
  connection,
  inviteeEmail,
  maxStartTime,
  minStartTime,
  organization: { ...organization, dataSource: "organizations" },
  sort,
  status,
  user,
};
