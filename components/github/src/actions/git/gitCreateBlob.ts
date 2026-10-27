import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { gitCreateBlobExamplePayload } from "../../examplePayloads";
import { gitCreateBlobInputs } from "../../inputs";
import { gitCreateBlobOutputSchema } from "../../outputSchemas";
export const gitCreateBlob = action({
  display: {
    label: "Create Blob",
    description: "Create a blob.",
  },
  examplePayload: gitCreateBlobExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: gitCreateBlobOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, owner, repo, content, encoding }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/git/blobs`, {
      content,
      encoding,
    });
    return { data };
  },
  examplePerform: async () => gitCreateBlobExamplePayload,
  inputs: gitCreateBlobInputs,
});
