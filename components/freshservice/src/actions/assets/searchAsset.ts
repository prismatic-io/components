import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { searchAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { searchAssetInputs as inputs } from "../../inputs/assets";

export const searchAsset = action({
  display: {
    label: "Search Asset",
    description: "Searches for assets matching a query.",
  },
  perform: async (
    context,
    { connection, searchQuery, additionalQueryParams },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);
    
    const { data } = await client.get(`/assets`, {
      params: { ...additionalQueryParams, search: searchQuery },
    });

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
