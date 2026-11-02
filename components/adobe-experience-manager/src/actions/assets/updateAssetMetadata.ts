import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import { ASSETS_API_PATH } from "../../constants";
import { updateAssetMetadataExamplePayload } from "../../examplePayloads";
import { updateAssetMetadataInputs } from "../../inputs";
import { getAssetMetadataOutputSchema } from "../../outputSchemas";
import { buildMetadataPatch } from "../../utils";

export const updateAssetMetadata = action({
  display: {
    label: "Update Asset Metadata",
    description:
      "Set or remove asset metadata fields, such as dc:title, on an asset.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, assetId, metadataValues, removeFields },
  ) => {
    const operations = buildMetadataPatch(metadataValues, removeFields);
    const client = createAemClient(connection, context.debug.enabled);
    const path = `${ASSETS_API_PATH}/${encodeURIComponent(assetId)}/metadata`;
    const { data } = await client.patch(path, operations, {
      headers: {
        "If-Match": "*",
        "Content-Type": "application/json-patch+json",
      },
    });
    return { data };
  },
  inputs: updateAssetMetadataInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getAssetMetadataOutputSchema,
  }),
  examplePerform: async () => updateAssetMetadataExamplePayload,
  examplePayload: updateAssetMetadataExamplePayload,
});
