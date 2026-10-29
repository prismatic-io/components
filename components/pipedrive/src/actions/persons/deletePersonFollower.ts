import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deletePersonFollowerInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { deletePersonFollowerExamplePayload } from "../../examplePayloads";
import { deletePersonFollowerOutputSchema } from "../../outputSchemas";

export const deletePersonFollower = action({
  display: {
    label: "Delete Person Follower",
    description: "Deletes a follower from a person.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, followerId }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.delete(
      `/persons/${id}/followers/${followerId}`,
    );
    return { data };
  },
  inputs: deletePersonFollowerInputs,
  examplePayload: deletePersonFollowerExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deletePersonFollowerOutputSchema,
  }),
});
