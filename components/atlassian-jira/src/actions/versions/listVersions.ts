import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { listVersionsExamplePayload } from "../../examplePayloads";
import { listVersionsInputs } from "../../inputs";
import { listVersionsOutputSchema } from "../../outputSchemas";

export const listVersions = action({
  display: {
    label: "List Versions",
    description: "Return a list of all versions for a project.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/project/${params.projectId}/version`, {
      params: {
        maxResults: params.pagination.maxResults,
        startAt: params.pagination.startAt,
      },
    });
    return { data };
  },
  examplePerform: async () => listVersionsExamplePayload,
  inputs: listVersionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listVersionsOutputSchema,
  }),
  examplePayload: listVersionsExamplePayload,
});
