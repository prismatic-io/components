import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAlgoliaClient } from "../../client";
import { getSettingsExamplePayload } from "../../examplePayloads";
import { connectionInput, indexName } from "../../inputs";

export const getSettings = action({
  display: {
    label: "Get Settings",
    description: "Get the settings of an index.",
  },
  perform: async (context, { algoliaConnection, indexName }) => {
    const client = createAlgoliaClient({
      algoliaConnection,
      isGoingToRead: true,
      debug: context.debug.enabled,
    });

    try {
      const { data } = await client.get(`/1/indexes/${indexName}/settings`);
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    algoliaConnection: connectionInput,
    indexName,
  },
  examplePayload: getSettingsExamplePayload,
});
