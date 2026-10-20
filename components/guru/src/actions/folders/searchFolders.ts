import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { searchFoldersPayload } from "../../examplePayloads";
import { searchFoldersInputs } from "../../inputs";
export const searchFolders = action({
  display: {
    label: "Search Folders",
    description: "Search for folders by title or description",
  },
  perform: async (context, { connection, searchTerms, collectionId }) => {
    const client = getGuruClient(connection, context.debug.enabled);
    const queryParams = {
      terms: searchTerms,
      collectionId,
    };
    const { data } = await client.get("/folders/search", {
      params: queryParams,
    });
    return { data };
  },
  inputs: searchFoldersInputs,
  examplePayload: searchFoldersPayload,
});
