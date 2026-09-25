import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { searchUsersExamplePayload } from "../../examplePayloads";
import { searchUsersInputs } from "../../inputs";
import { searchUsersOutputSchema } from "../../outputSchemas";
export const searchUsers = action({
  display: {
    label: "Search Users",
    description: "Return an array of users who meet the search criteria.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { externalId: externalIdBase, zendeskConnection, query },
  ) => {
    const client = createClient({
      zendeskConnection,
      debug: context.debug.enabled,
    });
    const externalId = util.types.toString(externalIdBase);
    const result = await client.users.search({
      ...(externalId ? { external_id: externalId } : {}),
      query: query,
    });
    return {
      data: result,
    };
  },
  examplePerform: async () => searchUsersExamplePayload,
  inputs: searchUsersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchUsersOutputSchema,
  }),
  examplePayload: searchUsersExamplePayload,
});
