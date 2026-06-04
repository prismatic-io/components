import { action } from "@prismatic-io/spectral";
import { listAllCalendars } from "../helpers/listAllCalendars";
import { connectionInput, fetchAll, maxResults, pageToken } from "../inputs";
import { parseReturn } from "../parseReturn";

export const listCalendar = action({
  display: {
    label: "List Calendars",
    description: "List all calendars",
  },
  perform: async (_context, params) => {
    const { config, ...base } = await listAllCalendars(params);
    return {
      data: {
        config: parseReturn(config),
        ...base,
      },
    };
  },
  inputs: {
    pageToken,
    maxResults,
    connection: connectionInput,
    fetchAll,
  },
});
