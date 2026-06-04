import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCalendarEventExamplePayload } from "../../examplePayloads";
import { getCalendarEventInputs } from "../../inputs";
import { computeEndpointBasedOnConnection } from "../../util";

export const getCalendarEvent = action({
  display: {
    label: "Get Calendar Event",
    description: "Gets information about a specific calendar event.",
  },
  inputs: getCalendarEventInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.get(
      computeEndpointBasedOnConnection(params.connection, `/me/events/${params.eventId}`),
    );
    return { data };
  },
  examplePayload: getCalendarEventExamplePayload,
});
