import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { listProjectsExamplePayload } from "../../examplePayloads";
import { listProjectsInputs } from "../../inputs";
import { listProjectsOutputSchema } from "../../outputSchemas";

export const listProjects = action({
  display: {
    label: "List Projects",
    description: "Retrieve a list of all projects.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const {
      data: { values },
    } = await client.get("/project/search", {
      params: {
        maxResults: params.pagination.maxResults,
        startAt: params.pagination.startAt,
      },
    });
    return { data: values };
  },
  examplePerform: async () => listProjectsExamplePayload,
  inputs: listProjectsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listProjectsOutputSchema,
  }),
  examplePayload: listProjectsExamplePayload,
});
