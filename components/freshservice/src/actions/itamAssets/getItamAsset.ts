import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { getItamAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { getItamAssetInputs as inputs } from "../../inputs";
import { itamAssetOutputSchema } from "../../outputSchemas";
import { itamPath } from "../../util";
export const getItamAsset = action({
  display: {
    label: "Get Asset (ITAM)",
    description: "Retrieves details of an asset by its unique identifier.",
  },
  performSafety: "safe",
  perform: async (context, { connection, assetId, includeCols }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await client.get(
      itamPath("assets", { op: "read", id: assetId }),
      { params: { include_cols: includeCols } },
    );
    return { data };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itamAssetOutputSchema,
  }),
  inputs,
  examplePayload,
});
