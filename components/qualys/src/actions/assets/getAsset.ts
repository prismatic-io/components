import { action, outputSchema } from "@prismatic-io/spectral";
import { gatewayRequest } from "../../client";
import { getAssetExamplePayload } from "../../examplePayloads";
import { getAssetInputs } from "../../inputs";
import { getAssetOutputSchema } from "../../outputSchemas";
import type { GatewayAssetResponse } from "../../types";
export const getAsset = action({
  display: {
    label: "Get Asset",
    description:
      "Retrieve a single asset by ID from the Qualys inventory using the Gateway asset search API.",
  },
  inputs: getAssetInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getAssetOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, assetId }) => {
    const response = await gatewayRequest(
      connection,
      context.debug.enabled,
      (client) =>
        client.get<GatewayAssetResponse>("/rest/2.0/get/am/asset", {
          params: { assetId },
        }),
    );
    return { data: response.data };
  },
  examplePayload: getAssetExamplePayload,
});
