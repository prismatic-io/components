import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { calendarId, connectionInput } from "../inputs";
import { parseReturn } from "../parseReturn";

export const deleteCalendar = action({
  display: {
    label: "Delete Calendar",
    description: "Delete an existing calendar by Id",
  },
  perform: async (_context, params) => {
    const { config, ...base } = await createClient({
      connection: params.connection,
    }).calendarList.delete({
      calendarId: util.types.toString(params.calendarId),
    });
    return {
      data: {
        config: parseReturn(config),
        ...base,
      },
    };
  },
  inputs: { calendarId, connection: connectionInput },
});
