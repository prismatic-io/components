import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { listSpacesExamplePayload } from "../../examplePayloads";
import { listSpacesInputs } from "../../inputs";
import { listSpacesOutputSchema } from "../../outputSchemas";
export const listSpaces = action({
  display: {
    label: "List Spaces",
    description: "List the spaces available in a workspace.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSpacesOutputSchema,
  }),
  examplePayload: listSpacesExamplePayload,
  performSafety: "safe",
  perform: async (context, { clickUpConnection, teamId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/team/${teamId}/space`);
    return {
      data,
    };
  },
  inputs: listSpacesInputs,
});
