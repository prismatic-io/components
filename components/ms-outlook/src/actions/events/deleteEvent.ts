import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteEventOutputSchema } from "../../outputSchemas";
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
    await client.delete(url);
    return { data: { success: true, id: params.eventId, message: "Event deleted successfully" } };
  },
  examplePerform: async () => deleteEventExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteEventOutputSchema,
  }),
  examplePayload: deleteEventExamplePayload,
});
