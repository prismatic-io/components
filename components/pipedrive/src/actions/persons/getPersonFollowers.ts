import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonFollowersInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getPersonFollowersExamplePayload } from "../../examplePayloads";
import { getPersonFollowersOutputSchema } from "../../outputSchemas";
export const getPersonFollowers = action({
  display: {
    label: "Get Person Followers",
    description: "Lists followers of a person.",
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
    const { data } = await client.get(`/persons/${id}/followers`, {
      params: { limit, cursor },
    });
    return { data };
  },
  inputs: getPersonFollowersInputs,
  examplePayload: getPersonFollowersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPersonFollowersOutputSchema,
  }),
});
