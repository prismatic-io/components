import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { calendarId, connectionInput, eventId, sendUpdates } from "../inputs";
import { parseReturn } from "../parseReturn";

export const deleteEvent = action({
  display: {
    label: "Delete Event",
    description: "Delete an event by an Id",
  },
  perform: async (_context, params) => {
    const { config, ...base } = await createClient({
      connection: params.connection,
    }).events.delete({
      calendarId: util.types.toString(params.calendarId),
      eventId: util.types.toString(params.eventId),
      sendUpdates: params.sendUpdates || undefined,
    });
    return {
      data: {
        config: parseReturn(config),
        ...base,
      },
    };
  },
  inputs: {
    calendarId,
    eventId,
    connection: connectionInput,
    sendUpdates: {
      ...sendUpdates,
      comments:
        "Guests who should receive notifications about the deletion of the event.",
    },
  },
});
