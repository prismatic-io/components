import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAlgoliaClient } from "../../client";
import { copySettingsExamplePayload } from "../../examplePayloads";
import { connectionInput, indexName } from "../../inputs";

export const copySettings = action({
  display: {
    label: "Copy Settings",
    description:
      "Copy the settings of an index to another index on the same app.",
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
        scope: ["settings"],
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
      comments: "The index to copy the settings from.",
    },
    indexTo: {
      ...indexName,
      label: "Index To",
      comments: "The index to copy the settings to.",
    },
  },
  examplePayload: copySettingsExamplePayload,
});
