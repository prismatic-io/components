import { action, util } from "@prismatic-io/spectral";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "../client";
import {
  addConferenceEvent,
  attendees,
  calendarId,
  connectionInput,
  description,
  endTime,
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

export const createEvent = action({
  display: {
    label: "Create Event",
    description: "Create a new event in a given calendar",
  },
  perform: async (_context, params) => {
    const useDefaultReminder = util.types.toBool(params.useDefaultReminder);
    const remindMethod = util.types.toString(params.remindMethod);
    const remindMinutes = util.types.toString(params.remindMinutes);

    const { config, ...base } = await createClient({
      connection: params.connection,
    }).events.insert({
      calendarId: util.types.toString(params.calendarId),
      ...(params.addConferenceEvent && { conferenceDataVersion: 1 }),
      requestBody: {
        ...(params.addConferenceEvent && {
          conferenceData: {
            createRequest: {
              requestId: uuidv4(),
              conferenceSolutionKey: {
                type: "hangoutsMeet",
              },
            },
          },
        }),
        summary: util.types.toString(params.summary),
        location: util.types.toString(params.eventLocation),
        description: util.types.toString(params.description),
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
          ...(!useDefaultReminder &&
            remindMethod &&
            remindMinutes && {
              overrides: [
                {
                  method: remindMethod,
                  minutes: util.types.toInt(remindMinutes),
                },
              ],
            }),

          useDefault: useDefaultReminder,
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
    summary,
    description,
    timeZone,
    startTime,
    endTime,
    eventLocation,
    attendees,
    remindMethod,
    useDefaultReminder,
    remindMinutes,
    addConferenceEvent,
    connection: connectionInput,
    sendUpdates,
  },
});
