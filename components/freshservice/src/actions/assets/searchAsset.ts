import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { searchAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { searchAssetInputs as inputs } from "../../inputs";
import { assetsListOutputSchema } from "../../outputSchemas";
export const searchAsset = action({
  display: {
    label: "Search Asset (Deprecated)",
    description:
      "Searches for assets matching a query. Applies to Freshservice accounts created before the March 31, 2026 IT Asset Management release.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, searchQuery, additionalQueryParams },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await client.get(`/assets`, {
      params: { ...additionalQueryParams, search: searchQuery },
    });
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: assetsListOutputSchema,
  }),
  inputs,
  examplePayload,
});
