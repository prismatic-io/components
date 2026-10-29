import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDestinationExamplePayload } from "../../examplePayloads/notifications";
import { connectionInput, destinationId } from "../../inputs";

export const deleteDestination = action({
  display: {
    label: "Delete Destination",
    description: "Deletes the destination that you specify.",
  },
  examplePayload: deleteDestinationExamplePayload,
  inputs: {
    connectionInput,
    destinationId: {
      ...destinationId,
      required: true,
      comments: "The identifier for the destination that you want to delete.",
    },
  },
  perform: async (context, { connectionInput, destinationId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete(
      `/notifications/v1/destinations/${destinationId}`,
    );
    return {
      data,
    };
  },
});
