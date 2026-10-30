import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { searchUsersExamplePayload } from "../../examplePayloads";
import { searchUsersInputs } from "../../inputs";
import { searchUsersOutputSchema } from "../../outputSchemas";

export const searchUsers = action({
  display: {
    label: "Search Users",
    description: "Return a list of users that match the given string of text.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/user/search", {
      params: {
        query: params.searchString,
      },
    });

    return { data };
  },
  examplePerform: async () => searchUsersExamplePayload,
  inputs: searchUsersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchUsersOutputSchema,
  }),
  examplePayload: searchUsersExamplePayload,
});
