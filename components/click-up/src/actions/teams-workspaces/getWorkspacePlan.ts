import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getWorkspacePlanExamplePayload } from "../../examplePayloads";
import { getWorkspacePlanInputs } from "../../inputs";
import { getWorkspacePlanOutputSchema } from "../../outputSchemas";
export const getWorkspacePlan = action({
  display: {
    label: "Get Workspace Plan",
    description: "Retrieve the current plan for a specified workspace.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWorkspacePlanOutputSchema,
  }),
  examplePayload: getWorkspacePlanExamplePayload,
  performSafety: "safe",
  perform: async (context, { clickUpConnection, teamId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/team/${teamId}/plan`);
    return {
      data,
    };
  },
  inputs: getWorkspacePlanInputs,
});
