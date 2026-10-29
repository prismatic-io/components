import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAlgoliaClient } from "../../client";
import { updateBatchIndicesExamplePayload } from "../../examplePayloads";
import { connectionInput, requests } from "../../inputs";

export const updateBatchIndices = action({
  display: {
    label: "Update Batch Indices",
    description:
      "This method enables you to batch multiple different indexing operations in one API call, like add or delete objects, potentially targeting multiple indices.",
  },
  perform: async (context, { algoliaConnection, requests }) => {
    const client = createAlgoliaClient({
      algoliaConnection,
      isGoingToRead: false,
      debug: context.debug.enabled,
    });

    try {
      const { data } = await client.post(`/1/indexes/*/batch`, {
        requests,
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
    requests,
  },
  examplePayload: updateBatchIndicesExamplePayload,
});
