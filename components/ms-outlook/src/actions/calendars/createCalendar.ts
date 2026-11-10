import { action, outputSchema } from "@prismatic-io/spectral";
import { createCalendarOutputSchema } from "../../outputSchemas";
import type { Calendar } from "@microsoft/microsoft-graph-types";
import { createClient } from "../../client";
import { createCalendarExamplePayload } from "../../examplePayloads";
import { createCalendarInputs } from "../../inputs";
import type { ODataAttrs } from "../../types";
import { computeEndpointBasedOnConnection } from "../../util";

export const createCalendar = action({
  display: {
    label: "Create Calendar",
    description: "Creates a new calendar.",
  },
  inputs: createCalendarInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.post<Calendar & ODataAttrs>(
      computeEndpointBasedOnConnection(params.connection, "/me/calendars"),
      {
        name: params.name,
        color: params.color,
      },
    );
    return { data };
  },
  examplePerform: async () => createCalendarExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createCalendarOutputSchema,
  }),
  examplePayload: createCalendarExamplePayload,
});
