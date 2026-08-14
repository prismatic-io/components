import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ASSETS_PATH } from "../../constants";
import { createAssetExamplePayload } from "../../examplePayloads";
import { createAssetInputs } from "../../inputs";
import { assetOutputSchema } from "../../outputSchemas";
export const createAsset = action({
  examplePayload: createAssetExamplePayload,
  display: {
    label: "Create Asset",
    description: "Create a new Content Builder asset.",
  },
  inputs: createAssetInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: assetOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      assetName,
      assetDescription,
      assetTypeId,
      categoryId,
      assetContent,
      assetExtraBody,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body = {
      name: assetName,
      assetType: { id: assetTypeId },
      description: assetDescription,
      category: categoryId ? { id: categoryId } : undefined,
      content: assetContent,
      ...assetExtraBody,
    };
    const { data } = await client.post(ASSETS_PATH, body);
    return { data };
  },
  examplePerform: async (
    _context,
    { assetName, assetDescription, assetTypeId, categoryId },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createAssetExamplePayload.data,
      name: assetName,
      description: assetDescription ?? "",
      assetType: {
        ...createAssetExamplePayload.data.assetType,
        id: assetTypeId,
      },
      category: categoryId
        ? { ...createAssetExamplePayload.data.category, id: categoryId }
        : createAssetExamplePayload.data.category,
    },
  }),
});
