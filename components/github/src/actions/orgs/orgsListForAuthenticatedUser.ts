import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { orgsListForAuthenticatedUserExamplePayload } from "../../examplePayloads";
import { orgsListForAuthenticatedUserInputs } from "../../inputs";
import { orgsListForAuthenticatedUserOutputSchema } from "../../outputSchemas";

export const orgsListForAuthenticatedUser = action({
  display: {
    label: "List Authenticated User Organizations",
    description: "List organizations for the authenticated user.",
  },
  examplePayload: orgsListForAuthenticatedUserExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: orgsListForAuthenticatedUserOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, pagination }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/user/orgs`, {
      params: { per_page: pagination.perPage, page: pagination.page },
    });
    return { data };
  },
  inputs: orgsListForAuthenticatedUserInputs,
});
