import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getSpaceExamplePayload } from "../../examplePayloads";
import { getSpaceInputs } from "../../inputs";
import { getSpaceOutputSchema } from "../../outputSchemas";
export const getSpace = action({
  display: {
    label: "Get Space",
    description: "Retrieve details for a specific space by ID.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getSpaceOutputSchema,
  }),
  examplePayload: getSpaceExamplePayload,
  performSafety: "safe",
  perform: async (context, { clickUpConnection, spaceId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/space/${spaceId}`);
    return {
      data,
    };
  },
  inputs: getSpaceInputs,
});
