import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { getGroupExamplePayload } from "../../examplePayloads";
import { getGroupInputs } from "../../inputs";
import { getGroupOutputSchema } from "../../outputSchemas";

export const getGroup = action({
  display: {
    label: "Get Group",
    description: "Retrieve a group by ID or path.",
  },
  inputs: getGroupInputs,
  performSafety: "safe",
  perform: async (context, { connection, group }) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.get(`/groups/${group}`, {
      params: { with_projects: false },
    });
    return { data };
  },
  examplePayload: getGroupExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getGroupOutputSchema,
  }),
});
