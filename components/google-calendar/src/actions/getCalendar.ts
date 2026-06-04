import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { calendarId, connectionInput } from "../inputs";
import { parseReturn } from "../parseReturn";

export const getCalendar = action({
  display: {
    label: "Get Calendar",
    description: "Get the information and metadata of a calendar by Id",
  },
  perform: async (_context, params) => {
    const { config, ...base } = await createClient({
      connection: params.connection,
    }).calendars.get({
      calendarId: util.types.toString(params.calendarId),
    });
    return {
      data: {
        config: parseReturn(config),
        ...base,
      },
    };
  },
  inputs: { connection: connectionInput, calendarId },
});
