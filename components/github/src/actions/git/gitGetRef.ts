import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { gitGetRefExamplePayload } from "../../examplePayloads";
import { gitGetRefInputs } from "../../inputs";
import { gitRefOutputSchema } from "../../outputSchemas";
export const gitGetRef = action({
  display: {
    label: "Get Reference",
    description: "Get a reference.",
  },
  examplePayload: gitGetRefExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: gitRefOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, owner, repo, ref }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/repos/${owner}/${repo}/git/ref/${ref}`);
    return { data };
  },
  inputs: gitGetRefInputs,
});
