import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, description, summary, timeZone } from "../inputs";
import { parseReturn } from "../parseReturn";

export const createCalendar = action({
  display: {
    label: "Create Calendar",
    description: "Create a new calendar",
  },
  perform: async (_context, params) => {
    const { config, ...base } = await createClient({
      connection: params.googleConnection,
    }).calendars.insert({
      requestBody: {
        summary: util.types.toString(params.summary),
        timeZone: util.types.toString(params.timeZone),
        description: util.types.toString(params.description),
      },
    });
    return {
      data: {
        config: parseReturn(config),
        ...base,
      },
    };
  },
  inputs: { summary, description, timeZone, googleConnection: connectionInput },
});
