import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  AVAILABLE_EXPERIENCES_MODEL,
  MODEL_FOR_OPTIONAL_BOOLEAN_INPUTS,
} from "../constants";
import {
  toOptionalBoolean,
  toOptionalEmailSetting,
  toOptionalObject,
  toOptionalString,
} from "../util";
import {
  accountKey,
  connection,
  fetchAll,
  fromTime,
  locale,
  pageNumber,
  pageSize,
  timezone,
  toTime,
  webinarKey,
  webinarType,
} from "./common";
export const subject = input({
  label: "Subject",
  comments: "The title displayed for the webinar.",
  type: "string",
  required: true,
  example: "How to Create a Webinar",
  placeholder: "Enter a subject",
  clean: util.types.toString,
});
export const description = input({
  label: "Description",
  comments: "A summary of what the webinar covers.",
  type: "string",
  required: false,
  example: "Learn how to create a webinar from scratch",
  placeholder: "Enter a description",
  clean: toOptionalString,
});
export const times = input({
  label: "Time Range for Webinar",
  comments:
    "Time Range Array for the webinar. Please note that the" +
    " examples provided describe the expected payload given all webinar types." +
    " Only one array should be used based on the webinar type.",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify([
    {
      single_session_webinar_type_example: [
        { startTime: "2020-03-13T10:00:00Z", endTime: "2020-03-13T11:00:00Z" },
      ],
    },
    {
      series_webinar_type_example: [
        { startTime: "2020-03-13T10:00:00Z", endTime: "2020-03-13T11:00:00Z" },
        { startTime: "2020-03-20T10:00:00Z", endTime: "2020-03-20T11:00:00Z" },
      ],
    },
    {
      sequence_webinar_type_example: [
        { startTime: "2020-03-13T10:00:00Z", endTime: "2020-03-13T11:00:00Z" },
      ],
    },
  ]),
  clean: util.types.toObject,
});
export const isPasswordProtected = input({
  label: "Is Password Protected",
  comments: "Indicates if the webinar is password protected.",
  type: "string",
  required: false,
  model: MODEL_FOR_OPTIONAL_BOOLEAN_INPUTS,
  default: "false",
  clean: toOptionalBoolean,
});
export const recordingAssetKey = input({
  label: "Recording Asset Key",
  comments:
    "The recording asset with which the simulive webinar should be created" +
    " from. In case the recordingasset was created as an online recording the" +
    " simulive webinar settings, poll and surveys would be copied from " +
    "the webinar whose session was recorded.",
  type: "string",
  required: false,
  example: "your-recording-asset-key",
  placeholder: "Enter a recording asset key",
  clean: toOptionalString,
});
export const isOndemand = input({
  label: "Is On Demand",
  comments: "A boolean flag indicating if the webinar should be On-Demand.",
  type: "string",
  required: false,
  model: MODEL_FOR_OPTIONAL_BOOLEAN_INPUTS,
  default: "false",
  clean: toOptionalBoolean,
});
export const isBreakout = input({
  label: "Is Breakout",
  comments: "A boolean flag indicating if the webinar should be breakout.",
  type: "string",
  required: false,
  model: MODEL_FOR_OPTIONAL_BOOLEAN_INPUTS,
  default: "false",
  clean: toOptionalBoolean,
});
export const experienceType = input({
  label: "Experience Type",
  comments: "The experience type of the webinar.",
  type: "string",
  required: false,
  default: AVAILABLE_EXPERIENCES_MODEL[0].value,
  model: AVAILABLE_EXPERIENCES_MODEL,
  clean: toOptionalString,
});
export const confirmationEmail = input({
  label: "Should Send Confirmation Email",
  comments: "Whether or not to send a confirmation email to the registrants.",
  type: "string",
  required: false,
  model: MODEL_FOR_OPTIONAL_BOOLEAN_INPUTS,
  clean: toOptionalEmailSetting,
});
export const reminderEmail = input({
  label: "Should Send Reminder Email",
  comments: "Whether or not to send a reminder email to the registrants.",
  type: "string",
  required: false,
  model: MODEL_FOR_OPTIONAL_BOOLEAN_INPUTS,
  clean: toOptionalEmailSetting,
});
export const absenteeFollowUpEmail = input({
  label: "Should Send Absentee Follow Up Email",
  comments:
    "Whether or not to send an absentee follow up email to the registrants.",
  type: "string",
  required: false,
  model: MODEL_FOR_OPTIONAL_BOOLEAN_INPUTS,
  clean: toOptionalEmailSetting,
});
export const attendeeFollowUpEmail = input({
  label: "Should Send Attendee Follow Up Email",
  comments:
    "Whether or not to send an attendee follow up email to the registrants.",
  type: "string",
  required: false,
  model: MODEL_FOR_OPTIONAL_BOOLEAN_INPUTS,
  clean: toOptionalEmailSetting,
});
export const sendCancellationEmail = input({
  label: "Send Cancellation Email",
  comments:
    "Indicates whether cancellation notice emails should be sent. " +
    "Default behavior is false.",
  type: "string",
  model: MODEL_FOR_OPTIONAL_BOOLEAN_INPUTS,
  required: false,
  clean: toOptionalBoolean,
});
export const deleteAll = input({
  label: "Delete All",
  comments:
    "Specifies whether all scheduled sessions should be deleted" +
    " if the webinar is part of a series. Default behavior is true.",
  type: "string",
  model: MODEL_FOR_OPTIONAL_BOOLEAN_INPUTS,
  required: false,
  default: "false",
  clean: toOptionalBoolean,
});
export const notifyParticipants = input({
  label: "Notify Participants",
  comments: "Notify participants of the webinar.",
  type: "boolean",
  required: true,
  clean: util.types.toBool,
});
const emailSettings = structuredObjectInput({
  label: "Email Settings",
  required: false,
  comments:
    "Configure which automated emails are sent to registrants for the webinar.",
  inputs: {
    confirmationEmail,
    reminderEmail,
    absenteeFollowUpEmail,
    attendeeFollowUpEmail,
  },
});
const createWebinarAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Recording Asset Key, Is On Demand, Is Breakout, Is Password Protected, and Locale.",
  inputs: {
    recordingAssetKey,
    isOndemand,
    isBreakout,
    isPasswordProtected,
    locale,
  },
});
export const createWebinarInputs = {
  connection,
  subject,
  webinarType,
  times,
  description,
  experienceType,
  timeZone: timezone,
  emailSettings,
  additionalFields: createWebinarAdditionalFields,
};
const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page number and page size for paginated results.",
  inputs: { page: pageNumber, size: pageSize },
});
export const getWebinarInputs = {
  connection,
  fromTime,
  toTime,
  accountKey: {
    ...accountKey,
    clean: toOptionalString,
    required: false,
    comments:
      "The key of the account. If using this input instead of " +
      "the organizer key, the action will retrieve the webinars by Account Key",
  },
  fetchAll,
  pagination,
};
export const updateWebinarInputs = {
  connection,
  webinarKey,
  notifyParticipants,
  subject: {
    ...subject,
    required: false,
    clean: toOptionalString,
  },
  description,
  times: {
    ...times,
    required: false,
    comments: "The time range of the webinar.",
    clean: toOptionalObject,
    example: JSON.stringify([
      { startTime: "2020-03-13T10:00:00Z", endTime: "2020-03-13T11:00:00Z" },
    ]),
  },
  timeZone: timezone,
  locale,
  emailSettings,
};
export const deleteWebinarInputs = {
  connection,
  webinarKey,
  sendCancellationEmail,
  deleteAll,
};
