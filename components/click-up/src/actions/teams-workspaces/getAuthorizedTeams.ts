import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getAuthorizedTeamsExamplePayload } from "../../examplePayloads";
import { getAuthorizedTeamsInputs } from "../../inputs";
import { getAuthorizedTeamsOutputSchema } from "../../outputSchemas";
export const getAuthorizedTeams = action({
  display: {
    label: "Get Authorized Workspaces",
    description: "List the workspaces available to the authenticated user.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getAuthorizedTeamsOutputSchema,
  }),
  examplePayload: getAuthorizedTeamsExamplePayload,
  performSafety: "safe",
  perform: async (context, { clickUpConnection }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/team");
    return {
      data,
    };
  },
  inputs: getAuthorizedTeamsInputs,
});
