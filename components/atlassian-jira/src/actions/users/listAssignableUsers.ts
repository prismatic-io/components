import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { listAssignableUsersExamplePayload } from "../../examplePayloads";
import { listAssignableUsersInputs } from "../../inputs";
import { listAssignableUsersOutputSchema } from "../../outputSchemas";

export const listAssignableUsers = action({
  display: {
    label: "List Assignable Users for Project",
    description: "Return a list of users assignable to the given project.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/user/assignable/search", {
      params: {
        project: params.projectKey,
        startAt: params.pagination.startAt,
        maxResults: params.pagination.maxResults,
      },
    });
    return { data };
  },
  examplePerform: async () => listAssignableUsersExamplePayload,
  inputs: listAssignableUsersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAssignableUsersOutputSchema,
  }),
  examplePayload: listAssignableUsersExamplePayload,
});
