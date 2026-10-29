import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getUserFollowersInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getUserFollowersExamplePayload } from "../../examplePayloads";
import { getUserFollowersOutputSchema } from "../../outputSchemas";

export const getUserFollowers = action({
  display: {
    label: "Get User Followers",
    description: "Lists followers of a user.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, id, pagination: { limit, cursor } = {} },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get(`/users/${id}/followers`, {
      params: { limit, cursor },
    });
    return { data };
  },
  inputs: getUserFollowersInputs,
  examplePayload: getUserFollowersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getUserFollowersOutputSchema,
  }),
});
