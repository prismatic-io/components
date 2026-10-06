import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getWorkspaceSeatsExamplePayload } from "../../examplePayloads";
import { getWorkspaceSeatsInputs } from "../../inputs";
import { getWorkspaceSeatsOutputSchema } from "../../outputSchemas";
export const getWorkspaceSeats = action({
  display: {
    label: "Get Workspace Seats",
    description:
      "Retrieve the used, total, and available member and guest seats for a workspace.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWorkspaceSeatsOutputSchema,
  }),
  examplePayload: getWorkspaceSeatsExamplePayload,
  performSafety: "safe",
  perform: async (context, { clickUpConnection, teamId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/team/${teamId}/seats`);
    return {
      data,
    };
  },
  inputs: getWorkspaceSeatsInputs,
});
