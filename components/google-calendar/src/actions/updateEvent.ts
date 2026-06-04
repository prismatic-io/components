import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  attendees,
  calendarId,
  connectionInput,
  description,
  endTime,
  eventId,
  eventLocation,
  remindMethod,
  remindMinutes,
  sendUpdates,
  startTime,
  summary,
  timeZone,
  useDefaultReminder,
} from "../inputs";
import { parseReturn } from "../parseReturn";

export const updateEvent = action({
  display: {
    label: "Update Event",
    description: "Update the information and metadata of an existing event",
  },
  perform: async (_context, params) => {
    const reminderMethod = util.types.toString(params.remindMethod);
    const remindMinutes = util.types.toInt(params.remindMinutes);
    const reminderInfoNeeded = reminderMethod && remindMinutes;

    const { config, ...base } = await createClient({
      connection: params.connection,
    }).events.update({
      calendarId: util.types.toString(params.calendarId),
      eventId: util.types.toString(params.eventId),
      requestBody: {
        summary: util.types.toString(params.summary) || undefined,
        location: util.types.toString(params.eventLocation) || undefined,
        description: util.types.toString(params.description) || undefined,
        start: {
          dateTime: util.types.toString(params.startTime),
          timeZone: util.types.toString(params.timeZone),
        },
        end: {
          dateTime: util.types.toString(params.endTime),
          timeZone: util.types.toString(params.timeZone),
        },
        attendees: params.attendees,
        reminders: {
          overrides:
            util.types.toBool(params.useDefaultReminder) !== true &&
            reminderInfoNeeded
              ? [
                  {
                    method: util.types.toString(params.remindMethod),
                    minutes: util.types.toInt(params.remindMinutes),
                  },
                ]
              : undefined,
          useDefault: util.types.toBool(params.useDefaultReminder),
        },
      },
      sendUpdates: params.sendUpdates || undefined,
    });

    return {
      data: { config: parseReturn(config), ...base },
    };
  },
  inputs: {
    calendarId,
    eventId,
    summary: { ...summary, required: false },
    description: { ...description, required: false },
    timeZone,
    startTime,
    endTime,
    eventLocation: { ...eventLocation, required: false },
    attendees,
    useDefaultReminder,
    remindMethod,
    remindMinutes,
    connection: connectionInput,
    sendUpdates: {
      ...sendUpdates,
      comments:
        "Guests who should receive notifications about the event update (for example, title changes, etc.).",
    },
  },
});
