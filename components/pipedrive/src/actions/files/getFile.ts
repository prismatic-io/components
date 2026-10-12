import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getFileInputs } from "../../inputs";
import { getFileExamplePayload } from "../../examplePayloads";
import { getFileOutputSchema } from "../../outputSchemas";
export const getFile = action({
  display: {
    label: "Get File Metadata by ID",
    description: "Gets metadata about one file by ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/files/${id}`);
    return { data };
  },
  inputs: getFileInputs,
  examplePayload: getFileExamplePayload,
  examplePerform: async () => getFileExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getFileOutputSchema,
  }),
});
