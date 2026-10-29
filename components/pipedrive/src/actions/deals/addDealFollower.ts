import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addDealFollowerInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { addDealFollowerExamplePayload } from "../../examplePayloads";
import { addDealFollowerOutputSchema } from "../../outputSchemas";

export const addDealFollower = action({
  display: {
    label: "Add Deal Follower",
    description: "Adds a follower to a deal.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, userId }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.post(`/deals/${id}/followers`, {
      user_id: userId,
    });
    return { data };
  },
  inputs: addDealFollowerInputs,
  examplePayload: addDealFollowerExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addDealFollowerOutputSchema,
  }),
});
