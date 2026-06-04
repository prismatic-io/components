import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, destinationMetadataId, region } from "../../inputs";
import { getDestinationMetadataExamplePayload } from "../../examplePayloads";

export const getDestinationMetadata = action({
  display: {
    label: "Get Destination Metadata",
    description: "Returns a Destination catalog item by its id.",
  },
  inputs: {
    connectionInput,
    region,
    destinationMetadataId,
  },
  perform: async (
    context,
    { connectionInput, region, destinationMetadataId },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get(
      `/catalog/destinations/${destinationMetadataId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getDestinationMetadataExamplePayload,
  },
});
