import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, destinationId, region } from "../../inputs";
import { getDestinationExamplePayload } from "../../examplePayloads";

export const getDestination = action({
  display: {
    label: "Get Destination",
    description: "Returns a Destination by its id.",
  },
  inputs: {
    connectionInput,
    region,
    destinationId,
  },
  perform: async (context, { connectionInput, region, destinationId }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get(`/destinations/${destinationId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getDestinationExamplePayload,
  },
});
