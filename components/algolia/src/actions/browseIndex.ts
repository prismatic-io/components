import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAlgoliaClient } from "../client";
import {
  connectionInput,
  cursorInput,
  indexName,
  paramsInput,
} from "../inputs";

export const browseIndex = action({
  display: {
    label: "Browse Index",
    description: "Retrieve all objects from an index.",
  },
  perform: async (
    context,
    { algoliaConnection, indexName, params, cursor },
  ) => {
    const client = createAlgoliaClient({
      algoliaConnection,
      isGoingToRead: true,
      debug: context.debug.enabled,
    });
    try {
      const response = await client.post(`/1/indexes/${indexName}/browse`, {
        params: params,
        cursor: cursor,
      });
      return { data: response.data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    algoliaConnection: connectionInput,
    indexName: indexName,
    params: paramsInput,
    cursor: cursorInput,
  },
});
