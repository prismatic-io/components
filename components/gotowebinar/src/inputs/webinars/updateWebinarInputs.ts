import { connection, locale, timezone, webinarKey } from "../general";
import { input, util } from "@prismatic-io/spectral";
import {
  absenteeFollowUpEmail,
  attendeeFollowUpEmail,
  confirmationEmail,
  description,
  reminderEmail,
  subject,
  times,
} from "./createWebinarInputs";
import { toOptionalObject, toOptionalString } from "../../utils";

export const notifyParticipants = input({
  label: "Notify Participants",
  comments: "Notify participants of the webinar.",
  type: "boolean",
  required: true,
  clean: util.types.toBool,
});

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
  confirmationEmail,
  reminderEmail,
  absenteeFollowUpEmail,
  attendeeFollowUpEmail,
};
