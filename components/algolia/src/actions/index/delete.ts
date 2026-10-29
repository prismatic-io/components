import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAlgoliaClient } from "../../client";
import { deleteIndexExamplePayload } from "../../examplePayloads";
import { connectionInput, indexName } from "../../inputs";

export const deleteIndex = action({
  display: {
    label: "Delete Index",
    description: "Delete an index.",
  },
  perform: async (context, { algoliaConnection, indexName }) => {
    const client = createAlgoliaClient({
      algoliaConnection,
      isGoingToRead: false,
      debug: context.debug.enabled,
    });

    try {
      const { data } = await client.delete(`/1/indexes/${indexName}`);
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    algoliaConnection: connectionInput,
    indexName: {
      ...indexName,
      comments: "The index name to delete.",
    },
  },
  examplePayload: deleteIndexExamplePayload,
});
