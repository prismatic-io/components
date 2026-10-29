import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDestinationExamplePayload } from "../../examplePayloads/notifications";
import { connectionInput, destinationId } from "../../inputs";

export const getDestination = action({
  display: {
    label: "Get Destination",
    description: "Returns information about the destination that you specify.",
  },
  examplePayload: getDestinationExamplePayload,
  inputs: {
    connectionInput,
    destinationId: {
      ...destinationId,
      required: true,
      comments: "The identifier generated when you created the destination.",
    },
  },
  perform: async (context, { connectionInput, destinationId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/notifications/v1/destinations/${destinationId}`,
    );
    return {
      data,
    };
  },
});
