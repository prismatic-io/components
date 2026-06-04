import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAlgoliaClient } from "../../client";
import { copyIndexExamplePayload } from "../../examplePayloads";
import { connectionInput, indexName } from "../../inputs";

export const copyIndex = action({
  display: {
    label: "Copy Index",
    description:
      "Copy an index, including its records, Synonyms, Rules, and settings (except for enableReRanking).",
  },
  perform: async (context, { algoliaConnection, indexFrom, indexTo }) => {
    const client = createAlgoliaClient({
      algoliaConnection,
      isGoingToRead: false,
      debug: context.debug.enabled,
    });

    try {
      const { data } = await client.post(`/1/indexes/${indexFrom}/operation`, {
        operation: "copy",
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
      comments: "The index to copy from.",
    },
    indexTo: {
      ...indexName,
      label: "Index To",
      comments: "The index to copy to.",
    },
  },
  examplePayload: copyIndexExamplePayload,
});
