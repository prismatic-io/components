import { action } from "@prismatic-io/spectral";
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
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const url = computeEndpointBasedOnConnection(
      params.connection,
      `/me/events/${params.eventId}/cancel`,
    );
    const { data } = await client.post(url, {
      comment: params.comment,
    });
    return { data };
  },
  examplePayload: cancelEventExamplePayload,
});
