import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import { ASSETS_API_PATH } from "../../constants";
import { deleteAssetExamplePayload } from "../../examplePayloads";
import { deleteAssetInputs } from "../../inputs";
import { deleteAssetOutputSchema } from "../../outputSchemas";
import type { AemJob, DeletedAsset } from "../../types";

export const deleteAsset = action({
  display: {
    label: "Delete Asset",
    description:
      "Delete an asset. Usually completes immediately; when AEM runs the delete as a job, returns a job ID to check with Get Asset Job Status.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, assetId, force }) => {
    const client = createAemClient(connection, context.debug.enabled);
    const { data, status } = await client.delete<AemJob>(
      `${ASSETS_API_PATH}/${encodeURIComponent(assetId)}`,
      { params: { force } },
    );
    const result: AemJob | DeletedAsset = status === 204 ? { assetId, deleted: true } : data;
    return { data: result };
  },
  inputs: deleteAssetInputs,
  outputSchema: outputSchema({ type: "actionOutput", schema: deleteAssetOutputSchema }),
  examplePerform: async () => deleteAssetExamplePayload,
  examplePayload: deleteAssetExamplePayload,
});
