import { input, util } from "@prismatic-io/spectral";
import {
  toOptionalBoolean,
  toOptionalEmailSetting,
  toOptionalString,
} from "../../utils";
import { connection, locale, timezone, webinarType } from "../general";
import {
  AVAILABLE_EXPERIENCES_MODEL,
  MODEL_FOR_OPTIONAL_BOOLEAN_INPUTS,
} from "../../constants";

export const subject = input({
  label: "Subject",
  comments: "The subject of the webinar",
  type: "string",
  required: true,
  example: "How to Create a Webinar",
  placeholder: "Your Subject",
  clean: util.types.toString,
});

export const description = input({
  label: "Description",
  comments: "The description of the webinar",
  type: "string",
  required: false,
  example: "Learn how to create a webinar from scratch",
  placeholder: "Your Description",
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
  placeholder: "your-recording-asset-key",
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
  label: "Should Send Seminder Email",
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

export const createWebinarInputs = {
  connection,
  subject,
  description,
  webinarType,
  experienceType,
  times,
  timeZone: timezone,
  locale,
  recordingAssetKey,
  isOndemand,
  isBreakout,
  isPasswordProtected,
  confirmationEmail,
  reminderEmail,
  absenteeFollowUpEmail,
  attendeeFollowUpEmail,
};
