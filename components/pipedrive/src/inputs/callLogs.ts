import { input, util } from "@prismatic-io/spectral";
import {
  callLogIdInput,
  connectionInput,
  paginationLimitInput,
  paginationStartInput,
} from "./common";
import { cleanNumber, cleanString } from "../util";

const userIdOptional = input({
  label: "User ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The unique identifier of the user who owns the call log.",
  example: "123",
  placeholder: "Enter User ID",
});

const activityIdOptional = input({
  label: "Activity ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments:
    "If specified, the existing activity with this ID is converted into a call log using the information provided.",
  example: "123",
  placeholder: "Enter Activity ID",
});

const subject = input({
  label: "Subject",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The name of the activity that the call is attached to.",
  example: "Discovery call with prospect",
  placeholder: "Enter call subject",
});

const duration = input({
  label: "Duration",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The length of the call, in seconds.",
  example: "300",
  placeholder: "Enter duration in seconds",
});

const outcome = input({
  label: "Outcome",
  type: "string",
  required: true,
  model: [
    { label: "Connected", value: "connected" },
    { label: "No Answer", value: "no_answer" },
    { label: "Left Message", value: "left_message" },
    { label: "Left Voicemail", value: "left_voicemail" },
    { label: "Wrong Number", value: "wrong_number" },
    { label: "Busy", value: "busy" },
  ],
  clean: util.types.toString,
  comments: "The result of the call attempt.",
  example: "connected",
  placeholder: "Select call outcome",
});

const fromPhoneNumber = input({
  label: "From Phone Number",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The phone number that originated the call.",
  example: "+15551234567",
  placeholder: "Enter origin phone number",
});

const toPhoneNumber = input({
  label: "To Phone Number",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The phone number that received the call.",
  example: "+15557654321",
  placeholder: "Enter destination phone number",
});

const startTime = input({
  label: "Start Time",
  type: "string",
  required: true,
  clean: cleanString,
  comments: "The date and time when the call started, in UTC. Format: ISO 8601.",
  example: "2024-01-15T10:30:00Z",
  placeholder: "Enter start time (ISO 8601)",
});

const endTime = input({
  label: "End Time",
  type: "string",
  required: true,
  clean: cleanString,
  comments: "The date and time when the call ended, in UTC. Format: ISO 8601.",
  example: "2024-01-15T10:35:00Z",
  placeholder: "Enter end time (ISO 8601)",
});

const personIdOptional = input({
  label: "Person ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The unique identifier of the person linked to this call.",
  example: "123",
  placeholder: "Enter Person ID",
});

const orgIdOptional = input({
  label: "Org ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The unique identifier of the organization linked to this call.",
  example: "123",
  placeholder: "Enter Organization ID",
});

const dealIdOptional = input({
  label: "Deal ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The unique identifier of the deal linked to this call.",
  example: "123",
  placeholder: "Enter Deal ID",
});

const note = input({
  label: "Note",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The note attached to the call log, formatted as HTML.",
  example: "<p>Discussed pricing and next steps.</p>",
  placeholder: "Enter call note (HTML)",
});

export const addCallLogInputs = {
  connection: connectionInput,
  userId: userIdOptional,
  activityId: activityIdOptional,
  subject,
  duration,
  outcome,
  fromPhoneNumber,
  toPhoneNumber,
  startTime,
  endTime,
  personId: personIdOptional,
  orgId: orgIdOptional,
  dealId: dealIdOptional,
  note,
};

export const getUserCallLogsInputs = {
  connection: connectionInput,
  start: paginationStartInput,
  limit: paginationLimitInput,
};

export const deleteCallLogInputs = {
  connection: connectionInput,
  id: callLogIdInput,
};

export const getCallLogInputs = {
  connection: connectionInput,
  id: callLogIdInput,
};
