import { action, outputSchema } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { patchEntryExamplePayload } from "../../examplePayloads";
import { patchEntryInputs } from "../../inputs";
import { patchEntryOutputSchema } from "../../outputSchemas";
export const patchEntry = action({
  display: {
    label: "Patch Entry",
    description:
      "Applies partial updates to an entry using JSON Patch (RFC 6902) operations.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => patchEntryExamplePayload,
  inputs: patchEntryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: patchEntryOutputSchema,
  }),
  examplePayload: patchEntryExamplePayload,
});
