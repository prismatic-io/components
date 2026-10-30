import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { getStatusListExamplePayload } from "../../examplePayloads";
import { getStatusListInputs } from "../../inputs";
import { getStatusListOutputSchema } from "../../outputSchemas";

export const getStatusList = action({
  display: {
    label: "Get Status List",
    description: "Return a list of statuses for a project.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/statuses/search", {
      params: {
        projectId: params.projectId,
        maxResults: params.pagination.maxResults,
        startAt: params.pagination.startAt,
      },
    });
    return { data };
  },
  examplePerform: async () => getStatusListExamplePayload,
  inputs: getStatusListInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getStatusListOutputSchema,
  }),
  examplePayload: getStatusListExamplePayload,
});
