import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { getCustomTableMetadataExamplePayload } from "../../examplePayloads";
import { getCustomTableMetadataInputs } from "../../inputs";

export const getCustomTableMetadata = action({
  display: {
    label: "Get Custom Table Metadata",
    description: "Retrieves metadata for a specific custom table.",
  },
  perform: async (context, { connection, customTableId }) => {
    const client = getClient(connection, context.debug.enabled);

    const { data } = await client.get(
      `/people/custom-tables/metadata/${customTableId}`,
    );
    return {
      data,
    };
  },
  inputs: getCustomTableMetadataInputs,
  examplePayload: getCustomTableMetadataExamplePayload,
});
