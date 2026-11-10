import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteEventExamplePayload } from "../../examplePayloads";
import { deleteEventInputs } from "../../inputs";
import { computeEndpointBasedOnConnection } from "../../util";

export const deleteEvent = action({
  display: {
    label: "Delete Event",
    description: "Deletes an event.",
  },
  inputs: deleteEventInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const url = computeEndpointBasedOnConnection(params.connection, `/me/events/${params.eventId}`);
    const { data } = await client.delete(url);
    return { data };
  },
  examplePerform: async () => deleteEventExamplePayload,
  examplePayload: deleteEventExamplePayload,
});
