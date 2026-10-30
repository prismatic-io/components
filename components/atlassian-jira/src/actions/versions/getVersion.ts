import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { getVersionExamplePayload } from "../../examplePayloads";
import { getVersionInputs } from "../../inputs";
import { getVersionOutputSchema } from "../../outputSchemas";

export const getVersion = action({
  display: {
    label: "Get Version",
    description: "Get the information and metadata of an existing version.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/version/${params.versionId}`);
    return { data };
  },
  inputs: getVersionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getVersionOutputSchema,
  }),
  examplePayload: getVersionExamplePayload,
});
