import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDealFollowersInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getDealFollowersExamplePayload } from "../../examplePayloads";
import { getDealFollowersOutputSchema } from "../../outputSchemas";
export const getDealFollowers = action({
  display: {
    label: "Get Deal Followers",
    description: "Lists followers of a deal.",
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
    const { data } = await client.get(`/deals/${id}/followers`, {
      params: {
        limit,
        cursor,
      },
    });
    return { data };
  },
  inputs: getDealFollowersInputs,
  examplePayload: getDealFollowersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDealFollowersOutputSchema,
  }),
});
