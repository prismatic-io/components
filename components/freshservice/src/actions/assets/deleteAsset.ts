import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { deleteAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteAssetInputs as inputs } from "../../inputs";
import { successOutputSchema } from "../../outputSchemas";
export const deleteAsset = action({
  display: {
    label: "Delete Asset (Deprecated)",
    description:
      "Deletes an asset by display ID. Applies to Freshservice accounts created before the March 31, 2026 IT Asset Management release.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, assetDisplayId }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    await client.delete(`/assets/${assetDisplayId}`);
    return SUCCESS_RESPONSE;
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: successOutputSchema,
  }),
  inputs,
  examplePayload,
});
