import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { calendarId, connectionInput, eventId } from "../inputs";
import { parseReturn } from "../parseReturn";

export const getEvent = action({
  display: {
    label: "Get Event",
    description: "Get the information and metadata of an event by Id",
  },
  perform: async (_context, params) => {
    const { config, ...base } = await createClient({
      connection: params.connection,
    }).events.get({
      calendarId: util.types.toString(params.calendarId),
      eventId: util.types.toString(params.eventId),
    });
    return {
      data: {
        config: parseReturn(config),
        ...base,
      },
    };
  },
  inputs: { calendarId, eventId, connection: connectionInput },
});
