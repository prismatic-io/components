import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addPersonFollowerInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { addPersonFollowerExamplePayload } from "../../examplePayloads";
import { addPersonFollowerOutputSchema } from "../../outputSchemas";

export const addPersonFollower = action({
  display: {
    label: "Add Person Follower",
    description: "Adds a follower to a person.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, userId }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const data = await client.post(`/persons/${id}/followers`, {
      user_id: userId,
    });
    return { data };
  },
  inputs: addPersonFollowerInputs,
  examplePayload: addPersonFollowerExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addPersonFollowerOutputSchema,
  }),
});
