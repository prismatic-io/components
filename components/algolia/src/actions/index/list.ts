import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAlgoliaClient } from "../../client";
import { listIndexesExamplePayload } from "../../examplePayloads";
import { connectionInput, page } from "../../inputs";

export const listIndexes = action({
  display: {
    label: "List Indices",
    description: "Get a list of indices with their associated metadata.",
  },
  perform: async (context, { algoliaConnection, page }) => {
    const client = createAlgoliaClient({
      algoliaConnection,
      isGoingToRead: true,
      debug: context.debug.enabled,
    });

    try {
      const { data } = await client.get(`/1/indexes`, {
        params: {
          page: page || undefined,
        },
      });
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    algoliaConnection: connectionInput,
    page,
  },
  examplePayload: listIndexesExamplePayload,
});
