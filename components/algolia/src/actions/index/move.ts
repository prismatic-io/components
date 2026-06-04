import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAlgoliaClient } from "../../client";
import { moveIndexExamplePayload } from "../../examplePayloads";
import { connectionInput, indexName } from "../../inputs";

export const moveIndex = action({
  display: {
    label: "Move Index",
    description: "Move or rename an index.",
  },
  perform: async (context, { algoliaConnection, indexFrom, indexTo }) => {
    const client = createAlgoliaClient({
      algoliaConnection,
      isGoingToRead: false,
      debug: context.debug.enabled,
    });

    try {
      const { data } = await client.post(`/1/indexes/${indexFrom}/operation`, {
        operation: "move",
        destination: indexTo,
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
    indexFrom: {
      ...indexName,
      label: "Index From",
      comments: "The index to move from.",
    },
    indexTo: {
      ...indexName,
      label: "Index To",
      comments: "The index to move to.",
    },
  },
  examplePayload: moveIndexExamplePayload,
});
