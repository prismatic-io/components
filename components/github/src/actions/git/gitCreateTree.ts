import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { gitCreateTreeExamplePayload } from "../../examplePayloads";
import { gitCreateTreeInputs } from "../../inputs";
import { gitCreateTreeOutputSchema } from "../../outputSchemas";

export const gitCreateTree = action({
  display: {
    label: "Create Tree",
    description: "Create a tree.",
  },
  examplePayload: gitCreateTreeExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: gitCreateTreeOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, owner, repo, tree, baseTree }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/git/trees`, {
      tree,
      base_tree: baseTree,
    });
    return { data };
  },
  examplePerform: async () => gitCreateTreeExamplePayload,
  inputs: gitCreateTreeInputs,
});
