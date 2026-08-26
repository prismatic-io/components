import { action, outputSchema } from "@prismatic-io/spectral";
import { gatewayRequest } from "../../client";
import { syncAssetExamplePayload } from "../../examplePayloads";
import { syncAssetInputs } from "../../inputs";
import { syncAssetOutputSchema } from "../../outputSchemas";
import type { SyncAssetsResponse } from "../../types";
export const syncAsset = action({
  display: {
    label: "Sync Asset",
    description:
      "Import third-party assets into Qualys by pushing data through the Gateway connector sync endpoint. Provide the connector metadata (including the Connector UUID from the Qualys Connectors UI) and an array of asset objects with identity and core attributes. Qualys runs identification rules to match or create each asset.",
  },
  inputs: syncAssetInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: syncAssetOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, connectorMetaData, assetData }) => {
    const metadata = Object.fromEntries(
      Object.entries(connectorMetaData).filter(([, v]) => v !== undefined),
    );
    const response = await gatewayRequest(
      connection,
      context.debug.enabled,
      (client) =>
        client.post<SyncAssetsResponse>(
          "/rest/2.0/am/connector/asset/data/sync",
          {
            connectorMetaData: metadata,
            assetData,
          },
        ),
    );
    return { data: response.data };
  },
  examplePayload: syncAssetExamplePayload,
});
