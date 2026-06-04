import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAlgoliaClient } from "../../client";
import { setSettingsExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  forwardToReplicas,
  indexName,
  settings,
} from "../../inputs";

export const setSettings = action({
  display: {
    label: "Set Settings",
    description: "Change an index's settings.",
  },
  perform: async (
    context,
    { algoliaConnection, indexName, forwardToReplicas, settings },
  ) => {
    const client = createAlgoliaClient({
      algoliaConnection,
      isGoingToRead: true,
      debug: context.debug.enabled,
    });

    try {
      const { data } = await client.put(
        `/1/indexes/${indexName}/settings`,
        settings,
        {
          params: {
            forwardToReplicas: forwardToReplicas ?? undefined,
          },
        },
      );
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
    settings,
    forwardToReplicas,
  },
  examplePayload: setSettingsExamplePayload,
});
