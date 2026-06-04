import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { updateEntryExamplePayload } from "../../examplePayloads";
import { patchEntryInputs } from "../../inputs";

export const patchEntry = action({
  display: {
    label: "Patch Entry",
    description:
      "Applies partial updates to an entry using JSON Patch (RFC 6902) operations.",
  },
  perform: async (
    context,
    {
      connection,
      environmentId,
      spaceId,
      entryId,
      patchOperations,
      entryVersion,
    },
  ) => {
    const client = createApiClient(connection, context.debug.enabled);
    const { data } = await client.patch(
      `/spaces/${spaceId}/environments/${environmentId}/entries/${entryId}`,
      patchOperations,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
          "X-Contentful-Version": entryVersion,
        },
      },
    );

    return { data };
  },
  inputs: patchEntryInputs,
  examplePayload: { data: updateEntryExamplePayload },
});
