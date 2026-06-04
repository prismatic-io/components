import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, destinationId, region } from "../../inputs";
import { deleteExamplePayload } from "../../examplePayloads";

export const deleteDestination = action({
  display: {
    label: "Delete Destination",
    description: "Deletes an existing Destination.",
  },
  inputs: {
    connectionInput,
    region,
    destinationId,
  },
  perform: async (context, { connectionInput, region, destinationId }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.delete(`/destinations/${destinationId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: deleteExamplePayload,
  },
});
