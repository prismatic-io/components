import { action, outputSchema } from "@prismatic-io/spectral";
import { cancelEventOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { cancelEventExamplePayload } from "../../examplePayloads";
import { cancelEventInputs } from "../../inputs";
import { computeEndpointBasedOnConnection } from "../../util";

export const cancelEvent = action({
  display: {
    label: "Cancel Event",
    description: "Cancels an event.",
  },
  inputs: cancelEventInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const url = computeEndpointBasedOnConnection(
      params.connection,
      `/me/events/${params.eventId}/cancel`,
    );
    await client.post(url, {
      comment: params.comment,
    });
    return {
      data: { success: true, id: params.eventId, message: "Event cancelled successfully" },
    };
  },
  examplePerform: async () => cancelEventExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: cancelEventOutputSchema,
  }),
  examplePayload: cancelEventExamplePayload,
});
