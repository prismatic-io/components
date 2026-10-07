import { action, outputSchema } from "@prismatic-io/spectral";
import type { Space } from "contentful-management";
import { createClient } from "../../client";
import { deleteSpaceExamplePayload } from "../../examplePayloads";
import { deleteSpaceInputs } from "../../inputs";
import { deleteSpaceOutputSchema } from "../../outputSchemas";
export const deleteSpace = action({
  display: {
    label: "Delete Space",
    description: "Deletes an existing space.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, spaceId }) => {
    const client = createClient(connection, context);
    const space: Space = await client.getSpace(spaceId);
    await space.delete();
    return {
      data: {},
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteSpaceExamplePayload,
  inputs: deleteSpaceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteSpaceOutputSchema,
  }),
  examplePayload: deleteSpaceExamplePayload,
});
