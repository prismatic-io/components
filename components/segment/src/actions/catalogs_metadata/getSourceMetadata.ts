import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, region, sourceMetadataId } from "../../inputs";
import { getSourceMetadataExamplePayload } from "../../examplePayloads";

export const getSourceMetadata = action({
  display: {
    label: "Get Source Metadata",
    description: "Returns a Source catalog item by its id.",
  },
  inputs: {
    connectionInput,
    region,
    sourceMetadataId,
  },
  perform: async (context, { connectionInput, region, sourceMetadataId }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get(`/catalog/sources/${sourceMetadataId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getSourceMetadataExamplePayload,
  },
});
