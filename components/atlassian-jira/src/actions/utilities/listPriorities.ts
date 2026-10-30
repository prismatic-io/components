import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { listPrioritiesExamplePayload } from "../../examplePayloads";
import { listPrioritiesInputs } from "../../inputs";
import { listPrioritiesOutputSchema } from "../../outputSchemas";

export const listPriorities = action({
  display: {
    label: "List Priorities",
    description: "Return a list of all priorities.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/priority/search", {
      params: {
        maxResults: params.pagination.maxResults,
        startAt: params.pagination.startAt,
      },
    });
    return { data };
  },
  examplePerform: async () => listPrioritiesExamplePayload,
  inputs: listPrioritiesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPrioritiesOutputSchema,
  }),
  examplePayload: listPrioritiesExamplePayload,
});
