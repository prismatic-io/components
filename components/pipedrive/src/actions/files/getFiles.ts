import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getFilesInputs } from "../../inputs";
import { getFilesExamplePayload } from "../../examplePayloads";
import { getFilesOutputSchema } from "../../outputSchemas";
export const getFiles = action({
  display: {
    label: "List Files",
    description: "Lists all files attached to all entities.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, pagination: { start, limit } = {} },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/files", {
      params: { start, limit },
    });
    return { data };
  },
  inputs: getFilesInputs,
  examplePayload: getFilesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getFilesOutputSchema,
  }),
});
