import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getUserExamplePayload } from "../../examplePayloads";
import { getUserInputs } from "../../inputs";
import { getUserOutputSchema } from "../../outputSchemas";
export const getUser = action({
  display: {
    label: "Get User",
    description: "Retrieve information about a user in a workspace.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getUserOutputSchema,
  }),
  examplePayload: getUserExamplePayload,
  performSafety: "safe",
  perform: async (context, { teamId, userId, clickUpConnection }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/team/${teamId}/user/${userId}`);
    return { data };
  },
  inputs: getUserInputs,
});
