import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { gitCreateRefExamplePayload } from "../../examplePayloads";
import { gitCreateRefInputs } from "../../inputs";
import { gitRefOutputSchema } from "../../outputSchemas";

export const gitCreateRef = action({
  display: {
    label: "Create Reference",
    description: "Create a reference.",
  },
  examplePayload: gitCreateRefExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: gitRefOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, owner, repo, ref, sha }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/git/refs`, {
      ref,
      sha,
    });
    return { data };
  },
  examplePerform: async (_context, { ref, sha }) => ({
    data: {
      ...gitCreateRefExamplePayload.data,
      ref,
      object: {
        ...gitCreateRefExamplePayload.data.object,
        sha,
      },
    },
  }),
  inputs: gitCreateRefInputs,
});
