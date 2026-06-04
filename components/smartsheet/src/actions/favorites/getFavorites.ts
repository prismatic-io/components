import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getFavoritesExamplePayload } from "../../examplePayloads";
import { getFavoritesInputs } from "../../inputs";

export const getFavorites = action({
  display: {
    label: "List Favorites",
    description: "Lists all favorite items for the authenticated user.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, includeAll, page, pageSize },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/favorites`, {
      params: { includeAll, page, pageSize },
    });
    return { data };
  },
  inputs: getFavoritesInputs,
  examplePayload: getFavoritesExamplePayload,
});
