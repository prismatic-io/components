import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { deleteItamAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteItamAssetInputs as inputs } from "../../inputs";
import { successOutputSchema } from "../../outputSchemas";
import { itamPath } from "../../util";
export const deleteItamAsset = action({
  display: {
    label: "Delete Asset (ITAM)",
    description: "Deletes an asset by its unique identifier.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, assetId }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    await client.delete(itamPath("assets", { op: "delete", id: assetId }));
    return SUCCESS_RESPONSE;
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: successOutputSchema,
  }),
  inputs,
  examplePayload,
});
